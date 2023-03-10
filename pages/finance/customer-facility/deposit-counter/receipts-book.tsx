import React, { useEffect, useState } from "react";
import { GetReceiptsBook } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import Receiptsbook, {
    isReceiptBookData,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function ReceiptsBook() {
    const [isChangeData, setChangeData] = useState({});
    const [isBankCredit, setBankCredit] = useState({
        itemArray: [],
        selectAll: false,
    });

    const [ReceiptBookData, setReceiptBookData] = useState<isReceiptBookData>({
        selectAll: false,
        itemArray: [],
    });
    const { data, isLoading, isError } = GetReceiptsBook(
        "",
        "",
        "matched",
        "receipt_book"
    );
    // APPLY RECEIPT BOOK DATA FROM API
    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.data.map((item: any) => {
                return {
                    id: 2,
                    document_date: item.receipt_date,
                    depositor: item.depositor.name,
                    receipt_no: item.receipt_no,
                    bank_and_account_no: `${item.bank_account.bank_branch} - ${item.bank_account.bank_acc_no}`,
                    reference_no: item.reference_no,
                    deposit_date: item.deposit_date,
                    deposit_amount: item.deposit_amount,
                    index: item.index,
                    select: false,
                    variance: "",
                    childrenBankCredit: [],
                    childrenBankCreditIDS: [],
                };
            });
            // Additional blank row field
            setReceiptBookData({
                itemArray: CloneArray,
                selectAll: false,
            });
        }
    }, [data?.status]);

    return (
        <Receiptsbook
            type="receipts-book"
            setChangeData={setChangeData}
            isReceiptBookData={ReceiptBookData}
            setReceiptBookData={setReceiptBookData}
            isBankCredit={isBankCredit}
            setBankCredit={setBankCredit}
            isLoading={isLoading}
            isError={isError}
            data={data}
        />
    );
}
