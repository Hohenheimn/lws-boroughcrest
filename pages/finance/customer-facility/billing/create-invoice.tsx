import React from "react";
import BillingForm from "../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function CreateInvoice() {
    const Value = [
        {
            id: 0,
            charge: "",
            charge_id: "",
            charge_vat: "",
            description: "",
            unit_price: "",
            quantity: "",
            uom: "",
            vat: "",
            amount: "",
            property_unit_code: "",
            property_id: "",
            billing_readings_list_id: null,
            billing_batch_list_id: null,
        },
    ];

    const PagePermisson = PageAccessValidation("Billing");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            <BillingForm
                DefaultValue={Value}
                formType="create"
                DefaultCustomer={{
                    id: "",
                    name: "",
                    class: "",
                    property: [],
                }}
            />
        </div>
    );
}
