import React, { useState } from "react";
import { useRouter } from "next/router";

import COAForm from "../../../components/FINANCE/General-Ledger/ChartOfAccount/COAForm";
import COATable from "../../../components/FINANCE/General-Ledger/ChartOfAccount/COATable";
import FinanceSearchFilter from "../../../components/FINANCE/General-Ledger/ChartOfAccount/FinanceSearchFilter";
import Modify from "../../../components/FINANCE/General-Ledger/ChartOfAccount/Modify";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import { ChartofAccountList } from "../../../types/COAList";

export default function ChartOfAccount() {
  const router = useRouter();
  const [isSearchTable, setSearchTable] = useState("");
  const [isCreate, setCreate] = useState(false);
  const [isFilterTable, setFilterTable] = useState(false);
  const DefaultFormData: ChartofAccountList = {
    chart_code: "",
    code_suffix: "",
    account_name: "",
    description: "",
    apply_to_sub_acc: true,
    bank_account: "",
    bank_account_id: "",
    coa_default_account_id: 0,
    defaultAccount: "",
    parent_id: "",
    parent: "",
  };

  const PagePermisson = PageAccessValidation("Chart of Accounts");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  return (
    <>
      <FinanceSearchFilter
        page="account"
        setSearchTable={setSearchTable}
        setCreate={setCreate}
        setFilterTable={setFilterTable}
        isFilterTable={isFilterTable}
      />
      <COATable isSearchTable={isSearchTable} isFilterTable={isFilterTable} />
      {isCreate && (
        <COAForm
          DefaultFormData={DefaultFormData}
          setCreate={setCreate}
          transaction={false}
        />
      )}
      {router.query.modify !== undefined && <Modify setCreate={setCreate} />}
    </>
  );
}
