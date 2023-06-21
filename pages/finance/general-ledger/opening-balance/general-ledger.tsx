import React, { useState } from "react";
import GeneralLedgerTable from "../../../../components/FINANCE/General-Ledger/OpeningBalance/GeneralLedgerTable";
import Header from "../../../../components/FINANCE/General-Ledger/OpeningBalance/Header";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function GeneralLedger() {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });

    const PagePermisson = PageAccessValidation("Opening Balance");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            <Header
                isDate={isDate}
                setDate={setDate}
                importEndpoint="/finance/general-ledger/opening-balance/general-ledger/import"
            />
            <GeneralLedgerTable date={isDate.value} />
        </div>
    );
}
