import React from "react";

export default function Adjustment() {
    return <div>index</div>;
}
export async function getServerSideProps(context: any) {
    return {
        redirect: {
            destination:
                "/finance/customer-facility/adjustment/create-adjustment",
            permanent: false,
        },
    };
}
