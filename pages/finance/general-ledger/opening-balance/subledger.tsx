import React, { useState } from "react";
import Header from "../../../../components/FINANCE/OpeningBalance/Header";
import SubTable from "../../../../components/FINANCE/OpeningBalance/SubTable";

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
