import React from "react";
import AdjustmentForm from "../../../../components/FINANCE/CustomerFacility/Adjustment/AdjustmentForm";

export default function CreateAdjustment() {
    return (
        <>
            <AdjustmentForm
                DefaultValue={{
                    Customer: {
                        id: "",
                        name: "",
                        class: "",
                        property: [],
                    },
                    HeaderForm: {
                        customer_id: "",
                        memo_type: "",
                        memo_date: "",
                        description: "",
                        charge_id_header: "",
                        charge_id: "",
                        document_no: "",
                    },
                    Charge: {
                        charge: "",
                        charge_id: 0,
                    },
                    transaction_type: "",
                    AdvancesToggle: false,
                    Invoice: [],
                    Accounts: [],
                }}
            />
        </>
    );
}
