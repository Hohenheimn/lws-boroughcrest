import React from "react";
import AdjustmentForm from "../../../../components/FINANCE/CustomerFacility/Adjustment/AdjustmentForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

export default function CreateAdjustment() {
    const Permission_create = AccessActionValidation("Adjustment", "create");

    const PagePermisson = PageAccessValidation("Adjustment");

    if (!Permission_create && Permission_create !== undefined) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission for Creating Adjustment
                    </h1>
                </div>
            </div>
        );
    }

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
                        vat_rate: 0,
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
