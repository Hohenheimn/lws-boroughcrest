import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import AppProvider from "../components/Context/AppProvider";
import { LoginUserInfo } from "../components/HOC/LoginUser/UserInfo";
// Page Loading
import Layout from "../components/Layout/Layout";
import NoPermissionComp from "../components/Reusable/PermissionValidation/NoPermissionComp";
import "../styles/globals.scss";

import "../styles/tailwind.css";

type ExtendAppProps = AppProps & {
  Component: any;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: ExtendAppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  });

  const [userInfo, setUserInfo] = useState<LoginUserInfo>();
  useEffect(() => {
    if (!router.pathname.includes("/login")) {
      setUserInfo(JSON.parse(localStorage.userInfo));
    }
  }, []);
  // //   block other pages from system admin
  if (userInfo?.system_admin && router.pathname.includes("/project")) {
    return <NoPermissionComp />;
  }
  //   block other pages from corporate admin
  if (
    userInfo?.corporate_admin &&
    (router.pathname.includes("/admin") || router.pathname.includes("/finance"))
  ) {
    return <NoPermissionComp />;
  }

  if (Component.getLayout) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </AppProvider>
        </QueryClientProvider>
      </>
    );
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
