import { useRouter } from "next/router";
import React, { useState } from "react";
import ChargeForm from "../../../components/FINANCE/CustomerFacility/Charge/ChargeForm";
import ChargeTable from "../../../components/FINANCE/CustomerFacility/Charge/ChargeTable";
import Modify from "../../../components/FINANCE/CustomerFacility/Charge/Modify";
import { ChargePayload } from "../../../components/FINANCE/CustomerFacility/Charge/Type";

export default function Charge() {
    const [create, setCreate] = useState(false);
    const router = useRouter();

    const isDefaultValue: ChargePayload = {
        code: "",
        type: "",
        name: "",
        description: "",
        base_rate: 0,
        uom: "",
        vat_percent: 0,
        minimum: 0,
        interest: "",
        payment_heirarchy: 0,
        soa_sort_order: 0,
        advances_coa_value: "",
        advances_coa_id: "",
        discounts_coa_value: "",
        discounts_coa_id: "",
        receivable_coa_value: "",
        receivable_coa_id: "",
        revenue_coa_value: "",
        revenue_coa_id: "",
    };

    return (
        <>
            <ChargeTable page="charge" setCreate={setCreate} />
            {create && (
                <ChargeForm
                    setCreate={setCreate}
                    isDefaultValue={isDefaultValue}
                    type="Create"
                />
            )}
            {router.query.modify !== undefined && (
                <Modify setCreate={setCreate} />
            )}
        </>
    );
}
