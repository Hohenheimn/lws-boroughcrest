import { format, startOfDay } from "date-fns";
import React, { useState } from "react";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import ReceivePaymentForm from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ReceivePaymentForm";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

export default function ReceivePayment() {
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const date = new Date();
    let today = startOfDay(date);

    const HeaderForm = {
        customer_id: "",
        receipt_type: "",
        receipt_date: format(today, "MMM dd yyyy"),
        receipt_no: "",
        description: "",
        mode_of_payment: "",
        deposit_date: "",
        chart_of_account_id: "",
        reference_no: "",
        amount_paid: "",
        credit_tax: "",
        discount: 0,
        chart_of_account_name: "",
    };

    const PagePermisson = PageAccessValidation("Collection");

    const Permission_create = AccessActionValidation("Collection", "create");

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
                        You do not have permission to Create Collection
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint=""
                page="receive-payment"
                isPeriod={isPeriod}
                setPeriod={setPeriod}
                ExportEndpoint={""}
            />
            <ReceivePaymentForm
                DefaultValHeaderForm={HeaderForm}
                type=""
                DefaultCustomer={{
                    id: "",
                    name: "",
                    class: "",
                    property: [],
                }}
                DefaultProvisional={[
                    {
                        id: 1,
                        check_date: "",
                        description: "",
                        check_no: "",
                        bank_branch: "",
                        bank_branch_id: "",
                        amount: 0,
                    },
                ]}
                DefaultValAcknowledgement={[
                    {
                        id: 0,
                        charge: "",
                        charge_id: "",
                        description: "",
                        amount: 0,
                    },
                ]}
                DefaultOfficialOutrightAdvances={{
                    Outright: [
                        {
                            id: 1,
                            charge: "",
                            charge_id: "",
                            description: "",
                            uom: "",
                            unit_price: 0,
                            qty: "",
                            amount: 0,
                        },
                    ],
                    Advances: [
                        {
                            id: 1,
                            charge: "",
                            charge_id: "",
                            description: "",
                            amount: 0,
                        },
                    ],
                }}
            />
        </>
    );
}
