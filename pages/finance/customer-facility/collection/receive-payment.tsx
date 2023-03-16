import React, { useState } from "react";
import HeaderCollection from "../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import ReceivePaymentForm from "../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ReceivePaymentForm";

export default function ReceivePayment() {
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    return (
        <>
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint=""
                page="receive-payment"
            />
            <ReceivePaymentForm />
        </>
    );
}
