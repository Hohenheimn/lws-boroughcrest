import { GetServerSideProps } from "next";
import React from "react";
import { requiredAuthentication } from "../../components/HOC/Authentication";

export default function Index() {
    return <div>Index</div>;
}
export const getServerSideProps: GetServerSideProps = requiredAuthentication(
    async (context) => {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/customer",
            },
        };
    }
);
