import { GetServerSideProps } from "next";
import React from "react";
import { requiredAuthentication } from "../components/HOC/Authentication";

function Dashboard() {
    return <div>dashboard</div>;
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = requiredAuthentication(
    async (context) => {
        return {
            props: {},
        };
    }
);
