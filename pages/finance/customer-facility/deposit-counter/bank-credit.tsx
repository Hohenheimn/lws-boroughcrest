import React, { useState } from "react";

import BankCreditComp from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function BankCredit() {
  const [isChangeData, setChangeData] = useState({});
  const [isReceiptBookData, setReceiptBookData] = useState({
    itemArray: [],
    selectAll: false,
  });
  const [isBankCredit, setBankCredit] = useState({
    itemArray: [],
    selectAll: false,
  });

  const PagePermisson = PageAccessValidation("Deposit Counter");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }
  return (
    <BankCreditComp
      setChangeData={setChangeData}
      isBankCredit={isBankCredit}
      setBankCredit={setBankCredit}
      isReceiptBookData={isReceiptBookData}
      setReceiptBookData={setReceiptBookData}
      type="bank-credit"
    />
  );
}
