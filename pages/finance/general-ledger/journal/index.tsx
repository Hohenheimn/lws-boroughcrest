import React from "react";

export default function Journal() {
    return <div>index</div>;
}
export async function getServerSideProps(context: any) {
    return {
        redirect: {
            destination: "/finance/general-ledger/journal/create-journal",
            permanent: false,
        },
    };
}
