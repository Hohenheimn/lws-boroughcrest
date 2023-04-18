import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ChargeDetail } from "../../../ReactQuery/Charge";
import ChargeForm from "./ChargeForm";
import style from "../../../../styles/Popup_Modal.module.scss";
import { BeatLoader } from "react-spinners";
import { ChargePayload } from "./Type";

type Props = {
    setCreate: Function;
};

export default function Modify({ setCreate }: Props) {
    const router = useRouter();
    const id = router.query.modify;

    const { isLoading, data, isError } = ChargeDetail(id);

    const isDefaultValue: ChargePayload = {
        code: data?.data.code,
        type: data?.data.type,
        name: data?.data.name,
        description: data?.data.description,
        base_rate: data?.data.base_rate,
        charge_uom_id: data?.data?.uom?.id,
        charge_uom_value: data?.data?.uom?.name,
        vat_percent: data?.data.vat_percent,
        minimum: data?.data.minimum,
        interest: data?.data.interest,
        payment_heirarchy: data?.data.payment_heirarchy,
        soa_sort_order: data?.data.soa_sort_order,
        advances_coa_value: data?.data.advances_coa?.account_name,
        advances_coa_id: data?.data.advances_coa_id,
        discounts_coa_value: data?.data.discounts_coa?.account_name,
        discounts_coa_id: data?.data?.discounts_coa_id,
        receivable_coa_value: data?.data.receivable_coa?.account_name,
        receivable_coa_id: data?.data.receivable_coa_id,
        revenue_coa_value: data?.data.revenue_coa?.account_name,
        revenue_coa_id: data?.data.revenue_coa_id,
    };
    if (isLoading) {
        return (
            <div className={style.container}>
                <section>
                    <p className={style.modal_title}>Modify Account</p>
                    <h1 className={style.modal_label_primaryRed}>
                        Primary Information
                    </h1>
                    <div className="w-full flex justify-center">
                        <BeatLoader
                            color={"#8f384d"}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </section>
            </div>
        );
    }

    return (
        <ChargeForm
            setCreate={setCreate}
            isDefaultValue={isDefaultValue}
            type="Modify"
        />
    );
}
