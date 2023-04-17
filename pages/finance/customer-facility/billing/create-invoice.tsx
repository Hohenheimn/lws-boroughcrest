import React from "react";
import BillingForm from "../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";

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
