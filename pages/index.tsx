import type { GetServerSideProps, NextPage } from "next";
import { requiredAuthentication } from "../components/HOC/Authentication";

export default function Index() {
    return <div>Index</div>;
}
export const getServerSideProps: GetServerSideProps = requiredAuthentication(
    async (context) => {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }
);
