import React from "react";
import TableForm from "../../../../components/FINANCE/CustomerFacility/Billing/RecordMeter/TableForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function RecordMeterReading() {
    const PagePermisson = PageAccessValidation("Billing");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <>
            <TableForm />
        </>
    );
}
