import React from "react";
import CustomerDetail from "../../../components/ADMIN/Customer/CustomerDetails";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Id() {
    const PagePermisson = PageAccessValidation("Customer");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            <CustomerDetail />
        </div>
    );
}
