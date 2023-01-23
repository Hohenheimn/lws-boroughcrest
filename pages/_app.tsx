import "../styles/tailwind.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AppProvider from "../components/Context/AppProvider";
// Page Loading
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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
