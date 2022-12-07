import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ChargeForm from "../../../components/FINANCE/CustomerFacility/Charge/ChargeForm";
import ChargeTable from "../../../components/FINANCE/CustomerFacility/Charge/ChargeTable";
import { ChargePayload } from "../../../components/FINANCE/CustomerFacility/Charge/Type";
import api from "../../../util/api";

export default function Charge() {
    const [create, setCreate] = useState(false);
    const router = useRouter();

    return (
        <>
            <ChargeTable page="charge" setCreate={setCreate} />
            {create && <ChargeForm setCreate={setCreate} />}
            {router.query.modify !== undefined && (
                <ChargeForm setCreate={setCreate} />
            )}
        </>
    );
}
