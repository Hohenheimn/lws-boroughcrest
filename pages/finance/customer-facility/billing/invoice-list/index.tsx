import React, { useState } from "react";
import BillingList from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingList";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function Index() {
    const PagePermisson = PageAccessValidation("Billing");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            <BillingList />
        </div>
    );
}
