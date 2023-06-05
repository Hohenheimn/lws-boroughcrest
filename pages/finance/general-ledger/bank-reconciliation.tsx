import React from "react";
import TableForm from "../../../components/FINANCE/General-Ledger/BankReconciliation/TableForm";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function BankReconciliation() {
    const PagePermisson = PageAccessValidation("Bank Reconciliation");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <>
            <TableForm />
        </>
    );
}
