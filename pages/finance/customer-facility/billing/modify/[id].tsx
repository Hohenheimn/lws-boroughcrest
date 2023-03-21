import React from "react";
import BillingForm from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";

export default function Id() {
    const Value = [
        {
            id: 0,
            charge: "",
            description: "",
            charge_id: "",
            charge_vat: "",
            unit_price: 0,
            quantity: 0,
            uom: "",
            vat: 0,
            amount: 0,
        },
    ];
    const CustomerDefault = {
        id: "123",
        name: "123",
        class: "123",
        property: ["sample", "sample 2"],
    };
    return (
        <div>
            <BillingForm
                DefaultValue={Value}
                type="create"
                DefaultCustomer={CustomerDefault}
            />
        </div>
    );
}
