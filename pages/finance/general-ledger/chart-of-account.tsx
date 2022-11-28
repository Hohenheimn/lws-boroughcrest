import { useRouter } from "next/router";
import React, { useState } from "react";
import COAForm from "../../../components/FINANCE/ChartOfAccount/COAForm";
import COATable from "../../../components/FINANCE/ChartOfAccount/COATable";
import Modify from "../../../components/FINANCE/ChartOfAccount/Modify";
import FinanceSearchFilter from "../../../components/FINANCE/FinanceSearchFilter";
export default function ChartOfAccount() {
    const router = useRouter();
    const [isSearchTable, setSearchTable] = useState("");
    const [isCreate, setCreate] = useState(false);
    return (
        <>
            <FinanceSearchFilter
                page="account"
                setSearchTable={setSearchTable}
                setCreate={setCreate}
            />
            <COATable isSearchTable={isSearchTable} />
            {isCreate && <COAForm setCreate={setCreate} />}
            {router.query.modify !== undefined && (
                <Modify setCreate={setCreate} />
            )}
        </>
    );
}
