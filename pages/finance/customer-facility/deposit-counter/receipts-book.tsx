import React, { useState } from "react";
import Receiptsbook from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function ReceiptsBook() {
    const [isChangeData, setChangeData] = useState({});
    const [isBankCredit, setBankCredit] = useState({
        itemArray: [],
        selectAll: false,
    });
    const [isReceiptBookData, setReceiptBookData] = useState({
        selectAll: false,
        itemArray: [
            {
                id: 1,
                document_date: "Sep 28 2022",
                depositor: "Juan Carlos",
                receipt_no: "0000000303",
                bank_and_account_no: "BD0-549845",
                reference_no: "RF54897321",
                deposit_date: "Sept 28 2022",
                deposit_amount: 10000,
                index: "",
                select: false,
                variance: "",
                children: false,
                childrenID: "",
            },
            {
                id: 2,
                document_date: "Sep 24 2022",
                depositor: "Hulio Cadiente",
                receipt_no: "0000000333",
                bank_and_account_no: "BD0-549888",
                reference_no: "RF48489754",
                deposit_date: "Sept 28 2022",
                deposit_amount: 1000,
                index: "",
                select: false,
                variance: "",
                children: false,
                childrenID: "",
            },
        ],
    });
    return (
        <Receiptsbook
            type="receipts-book"
            setChangeData={setChangeData}
            isReceiptBookData={isReceiptBookData}
            setReceiptBookData={setReceiptBookData}
            isBankCredit={isBankCredit}
            setBankCredit={setBankCredit}
        />
    );
}
