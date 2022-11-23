import React, { useState } from "react";
import COAForm from "../../../components/FINANCE/ChartOfAccount/COAForm";
import COATable from "../../../components/FINANCE/ChartOfAccount/COATable";
import FinanceSearchFilter from "../../../components/FINANCE/FinanceSearchFilter";
export default function ChartOfAccount() {
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
        </>
    );
}
