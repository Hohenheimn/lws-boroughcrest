import React from "react";
import DepositForm from "../../../../components/FINANCE/CustomerFacility/DepositCounter/DepositForm";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function CreateDeposit() {
    const PagePermisson = PageAccessValidation("Deposit Counter");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <DepositForm
            defDate={""}
            defReferenceNo={""}
            defBank={{
                id: "",
                value: "",
            }}
            defCashReceipt={[]}
        />
    );
}
