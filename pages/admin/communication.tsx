import React from "react";
import { PageAccessValidation } from "../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Communication() {
    const PagePermisson = PageAccessValidation("Customer");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return <div>C</div>;
}
