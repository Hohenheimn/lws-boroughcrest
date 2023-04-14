import React from "react";
import { requiredAuthentication } from "../../components/HOC/Authentication";
import { GetServerSideProps } from "next";

export default function index() {
    return <div>index</div>;
}
export const getServerSideProps: GetServerSideProps = requiredAuthentication(
    async (context) => {
        return {
            redirect: {
                permanent: false,
                destination: "/finance/general-ledger/chart-of-account",
            },
        };
    }
);
