import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ChargeForm from "../../../components/FINANCE/CustomerFacility/Charge/ChargeForm";
import ChargeTable from "../../../components/FINANCE/CustomerFacility/Charge/ChargeTable";
import api from "../../../util/api";

export default function Charge() {
    const router = useRouter();
    const [create, setCreate] = useState(false);
    const { data, isLoading, isError } = useQuery(
        ["get-corporate-list"],
        () => {
            return api.get(`/project/corporate`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );
    return (
        <>
            <ChargeTable
                page="charge"
                data={data}
                column="asd"
                isError={isError}
                isLoading={isLoading}
                setCreate={setCreate}
            />
            {create && <ChargeForm setCreate={setCreate} />}
            {router.query.modify !== undefined && (
                <ChargeForm setCreate={setCreate} />
            )}
        </>
    );
}
