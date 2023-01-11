import React from "react";
import BatchForm from "../../../../components/FINANCE/CustomerFacility/Billing/Batch-Invoice/BatchForm";
import BatchList from "../../../../components/FINANCE/CustomerFacility/Billing/Batch-Invoice/BatchList";

export default function BatchInvoice() {
    const defaultValue = [
        {
            id: 0,
            charge: 0,
            description: "",
            application: "SELECT",
        },
    ];
    return (
        <>
            <BatchForm DefaultValue={defaultValue} />
            <BatchList />
        </>
    );
}
