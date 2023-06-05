import React from "react";
import AdjustmentForm from "../../../../components/FINANCE/CustomerFacility/Adjustment/AdjustmentForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function CreateAdjustment() {
    const PagePermisson = PageAccessValidation("Adjustment");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

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
