import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

type ExtendAppProps = AppProps & {
    Component: any;
};

function MyApp({ Component, pageProps }: ExtendAppProps) {
    if (Component.getLayout) {
        return (
            <>
                <Component {...pageProps} />
            </>
        );
    }
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
