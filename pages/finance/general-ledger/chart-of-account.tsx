import { useRouter } from "next/router";
import React, { useState } from "react";
import COAForm from "../../../components/FINANCE/ChartOfAccount/COAForm";
import COATable from "../../../components/FINANCE/ChartOfAccount/COATable";
import FinanceSearchFilter from "../../../components/FINANCE/ChartOfAccount/FinanceSearchFilter";
import Modify from "../../../components/FINANCE/ChartOfAccount/Modify";
export default function ChartOfAccount() {
    const router = useRouter();
    const [isSearchTable, setSearchTable] = useState("");
    const [isCreate, setCreate] = useState(false);
    const [isFilterTable, setFilterTable] = useState(false);
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
            {isCreate && <COAForm setCreate={setCreate} />}
            {router.query.modify !== undefined && (
                <Modify setCreate={setCreate} />
            )}
        </>
    );
}
