import React, { useState } from "react";
import BankCreditComp from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";

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
