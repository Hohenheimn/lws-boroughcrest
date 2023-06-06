import React from "react";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function Billing() {
    const PagePermisson = PageAccessValidation("Billing");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return <div>index</div>;
}
