import React from "react";

export default function Billing() {
    return <div>index</div>;
}
export async function getServerSideProps(context: any) {
    return {
        redirect: {
            destination: "/finance/customer-facility/billing/create-invoice",
            permanent: false,
        },
    };
}
