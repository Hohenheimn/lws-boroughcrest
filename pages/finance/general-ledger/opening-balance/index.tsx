import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Index() {
    return <div></div>;
}
export async function getServerSideProps() {
    return {
        redirect: {
            destination:
                "/finance/general-ledger/opening-balance/general-ledger",
            permanent: false,
        },
    };
}
