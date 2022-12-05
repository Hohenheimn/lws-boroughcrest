import { useRouter } from "next/router";
import React, { useState } from "react";
import COAForm from "../../../components/FINANCE/ChartOfAccount/COAForm";
import COATable from "../../../components/FINANCE/ChartOfAccount/COATable";
import FinanceSearchFilter from "../../../components/FINANCE/ChartOfAccount/FinanceSearchFilter";
import Modify from "../../../components/FINANCE/ChartOfAccount/Modify";
import { ChartofAccountPayload } from "../../../types/COAList";
export default function ChartOfAccount() {
    const router = useRouter();
    const [isSearchTable, setSearchTable] = useState("");
    const [isCreate, setCreate] = useState(false);
    const [isFilterTable, setFilterTable] = useState(false);
    const DefaultFormData: ChartofAccountPayload = {
        chart_code: "",
        code_suffix: "",
        account_name: "",
        description: "",
        apply_to_sub_acc: true,
        bank_acc_no: "",
        bank_branch: "",
        coa_default_account_id: 0,
        defaultAccount: "",
        parent_id: 0,
        parent: "",
    };
    return (
        <>
            <FinanceSearchFilter
                page="account"
                setSearchTable={setSearchTable}
                setCreate={setCreate}
                setFilterTable={setFilterTable}
                isFilterTable={isFilterTable}
            />
            <COATable
                isSearchTable={isSearchTable}
                isFilterTable={isFilterTable}
            />
            {isCreate && (
                <COAForm
                    DefaultFormData={DefaultFormData}
                    setCreate={setCreate}
                />
            )}
            {router.query.modify !== undefined && (
                <Modify setCreate={setCreate} />
            )}
        </>
    );
}
