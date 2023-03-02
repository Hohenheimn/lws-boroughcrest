import React from "react";
import COAForm from "./COAForm";
import style from "../../../../styles/Popup_Modal.module.scss";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/router";
import { COADetail } from "../../../ReactQuery/ChartofAccount";
import {
    ChartofAccountList,
    ChartofAccountPayload,
} from "../../../../types/COAList";

export default function Modify({ setCreate }: any) {
    const router = useRouter();
    const { isLoading, data, isError } = COADetail(router.query.modify);
    const DefaultFormData: ChartofAccountList = {
        chart_code: data?.data.chart_code,
        code_suffix: data?.data.code_suffix,
        account_name: data?.data.account_name,
        description: data?.data.description,
        apply_to_sub_acc: data?.data.apply_to_sub_acc,
        bank_account: data?.data.bank_account?.bank_acc_no,
        bank_account_id: data?.data.bank_account_id,
        coa_default_account_id: data?.data.coa_default_account_id,
        defaultAccount: data?.data.default_account?.name,
        parent_id: data?.data.parent_id,
        parent: data?.data.parent?.chart_code,
    };
    if (isLoading) {
        return (
            <div className={style.container}>
                <section>
                    <p className={style.modal_title}>Create Account</p>
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
    if (isError) {
        return (
            <div className={style.container}>
                <section>
                    <p className={style.modal_title}>Modify Account</p>
                    <h1 className={style.modal_label_primaryRed}>
                        Primary Information
                    </h1>
                    <div className="w-full flex justify-center">
                        <h1>Cannot found the Account!</h1>
                    </div>
                </section>
            </div>
        );
    }
    return (
        <COAForm
            setCreate={setCreate}
            DefaultFormData={DefaultFormData}
            transaction={data?.data.modifiable}
        />
    );
}
