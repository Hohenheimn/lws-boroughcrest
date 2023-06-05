import React, { useState } from "react";
import Header from "../../../../components/FINANCE/General-Ledger/OpeningBalance/Header";
import SubTable from "../../../../components/FINANCE/General-Ledger/OpeningBalance/SubTable";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Subledger() {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });

    const PagePermisson = PageAccessValidation("Opening Balance");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <>
            <Header isDate={isDate} setDate={setDate} />
            <SubTable />
        </>
    );
}
