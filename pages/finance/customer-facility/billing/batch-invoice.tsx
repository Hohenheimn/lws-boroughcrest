import React from "react";
import BatchForm from "../../../../components/FINANCE/CustomerFacility/Billing/Batch-Invoice/BatchForm";
import BatchList from "../../../../components/FINANCE/CustomerFacility/Billing/Batch-Invoice/BatchList";
import { useRouter } from "next/router";
import ModifyBatchInvoice from "../../../../components/FINANCE/CustomerFacility/Billing/Batch-Invoice/ModifyBatchInvoice";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function BatchInvoice() {
    const router = useRouter();
    const defaultValue = [
        {
            id: 0,
            backend_id: null,
            charge: "",
            charge_id: 0,
            description: "",
            application: [],
        },
    ];

    const PagePermisson = PageAccessValidation("Billing");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <>
            {router.query.modify === undefined ? (
                <BatchForm DefaultValue={defaultValue} />
            ) : (
                <ModifyBatchInvoice />
            )}

            <BatchList />
        </>
    );
}
