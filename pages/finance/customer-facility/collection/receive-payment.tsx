import React, { useState } from "react";
import HeaderCollection from "../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import ReceivePaymentForm from "../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ReceivePaymentForm";

export default function ReceivePayment() {
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
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
            <ReceivePaymentForm />
        </>
    );
}
