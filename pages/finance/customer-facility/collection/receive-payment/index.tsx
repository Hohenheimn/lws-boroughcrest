import { format, startOfDay } from "date-fns";
import React, { useState } from "react";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import ReceivePaymentForm from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ReceivePaymentForm";

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
        bank_account_id: "",
        reference_no: "",
        amount_paid: "",
        credit_tax: "",
    };

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
                DefaultOfficial={{
                    Outright: [
                        {
                            id: 1,
                            charge: "",
                            charge_id: "",
                            description: "",
                            uom: "",
                            unit_price: 0,
                            qty: 0,
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
