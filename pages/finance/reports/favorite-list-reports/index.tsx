import React from "react";
import FavoriteList from "../../../../components/FINANCE/reports/FavoriteList";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function FavoriteListReports() {
    const PagePermisson_customer = PageAccessValidation("Customer Reports");

    const PagePermisson_general = PageAccessValidation("General Reports");

    if (
        (!PagePermisson_general && PagePermisson_general !== undefined) ||
        (!PagePermisson_customer && PagePermisson_customer !== undefined)
    ) {
        return <NoPermissionComp />;
    }
    return (
        <>
            <FavoriteList />
        </>
    );
}
