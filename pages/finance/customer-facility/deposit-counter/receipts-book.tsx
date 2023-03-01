import React, { useState } from "react";
import Receiptsbook from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function ReceiptsBook() {
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
                receipt_no: "0000000202",
                bank_and_account_no: "BD0-549845",
                reference_no: "RF48489754",
                deposit_date: "Sept 28 2022",
                deposit_amount: 10000,
                index: "",

                select: false,
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
            },
        ],
    });
    return (
        <Receiptsbook
            isBankCredit={isBankCredit}
            setBankCredit={setBankCredit}
            isReceiptBookData={isReceiptBookData}
            setReceiptBookData={setReceiptBookData}
            type="receipts-book"
        />
    );
}
