import React from "react";
import BillingForm from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";

export default function Id() {
    const Value = [
        {
            id: 0,
            charge: "",
            description: "",
            charge_id: "",
            unit_price: 0,
            quantity: 0,
            uom: "",
            vat: 0,
            amount: 0,
        },
    ];
    const CustomerDefault = {
        id: "",
        name: "",
        class: "",
        property: "",
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
