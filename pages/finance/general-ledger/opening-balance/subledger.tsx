import React, { useState } from "react";
import Header from "../../../../components/FINANCE/General-Ledger/OpeningBalance/Header";
import SubTable from "../../../../components/FINANCE/General-Ledger/OpeningBalance/SubTable";

export default function Subledger() {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });
    return (
        <>
            <Header isDate={isDate} setDate={setDate} />
            <SubTable />
        </>
    );
}
