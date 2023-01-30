import React from "react";
import GeneralLedgerTable from "../../../../components/FINANCE/OpeningBalance/GeneralLedgerTable";
import Header from "../../../../components/FINANCE/OpeningBalance/Header";

export default function GeneralLedger() {
    return (
        <div>
            <Header />
            <GeneralLedgerTable />
        </div>
    );
}
