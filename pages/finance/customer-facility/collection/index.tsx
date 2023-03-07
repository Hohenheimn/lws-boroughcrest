import React from "react";

export default function Collection() {
    return <div>index</div>;
}
export async function getServerSideProps(context: any) {
    return {
        redirect: {
            destination:
                "/finance/customer-facility/collection/receive-payment",
            permanent: false,
        },
    };
}
