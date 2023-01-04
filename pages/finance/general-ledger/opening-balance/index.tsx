import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Index() {
    const router = useRouter();
    useEffect(() => {
        router.push("/finance/general-ledger/opening-balance/general-ledger");
    });
    return <div></div>;
}
