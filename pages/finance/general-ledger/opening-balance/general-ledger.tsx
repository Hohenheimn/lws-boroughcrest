import React, { useState } from "react";
import GeneralLedgerTable from "../../../../components/FINANCE/OpeningBalance/GeneralLedgerTable";
import Header from "../../../../components/FINANCE/OpeningBalance/Header";

export default function GeneralLedger() {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });
    return (
        <div>
            <Header isDate={isDate} setDate={setDate} />
            <GeneralLedgerTable date={isDate.value} />
        </div>
    );
}
