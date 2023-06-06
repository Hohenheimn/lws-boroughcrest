import React from "react";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Journal() {
    const PagePermisson = PageAccessValidation("Journal");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return <div>index</div>;
}
