import React from "react";
import BillingForm from "../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

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

    const Permission_create = AccessActionValidation("Billing", "create");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (!Permission_create && Permission_create !== undefined) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission for Creating Billing
                    </h1>
                </div>
            </div>
        );
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
