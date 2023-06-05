import React from "react";
import ReportComponent from "../../../components/FINANCE/reports/ReportComponent";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function GeneralReport() {
    const PagePermisson = PageAccessValidation("General Reports");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <>
            <ReportComponent />
        </>
    );
}
