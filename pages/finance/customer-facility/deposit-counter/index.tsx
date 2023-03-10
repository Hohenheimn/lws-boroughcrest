import React, { useEffect, useState } from "react";
import BankCredit, {
    isTableBankCredit,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import { GetReceiptsBook } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import Receiptsbook, {
    isReceiptBookData,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function DepositCounter() {
    const [changeData, setChangeData] = useState({
        dataThatChange: "",
        fromWhere: "",
        id: "",
        key: "",
    });
    const [ReceiptBookData, setReceiptBookData] = useState<isReceiptBookData>({
        selectAll: false,
        itemArray: [],
    });

    const { data, isLoading, isError } = GetReceiptsBook(
        "",
        "",
        "unmatched",
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
                    index: "",
                    select: false,
                    variance: "",
                    childrenBankCredit: [],
                    childrenBankCreditIDS: [],
                };
            });
            // Additional blank row field
            setReceiptBookData({
                itemArray: [
                    ...CloneArray,
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
                        childrenBankCredit: [],
                        childrenBankCreditIDS: [],
                    },
                ],
                selectAll: false,
            });
        }
    }, [data?.status]);

    const [isBankCredit, setBankCredit] = useState<isTableBankCredit>({
        itemArray: [],
        selectAll: false,
    });
    // Compute Pairing of Receipt Book and Bank Credit
    // useEffect(() => {
    //     if (changeData.dataThatChange === "") return;
    //     // Receipt book's Index to Bank Credit
    //     if (changeData.fromWhere === "receipt book") {
    //         const getBankCreditWithSameIndex = isBankCredit.itemArray.filter(
    //             (item) => item.index === changeData.dataThatChange
    //         );
    //         const cloneReceiptBook = ReceiptBookData.itemArray.map((item) => {
    //             if (Number(changeData.id) === item.id) {
    //                 let variance = 0;
    //                 // Computation for Children row
    //                 // if (item.children) {
    //                 //     variance =
    //                 //         Number(item.variance) -
    //                 //         Number(getBankCreditWithSameIndex[0].credit_amount);
    //                 // } else {
    //                 //     // Computation for Main row
    //                 //     variance =
    //                 //         Number(item.deposit_amount) -
    //                 //         Number(getBankCreditWithSameIndex[0].credit_amount);
    //                 // }
    //                 // return {
    //                 //     ...item,
    //                 //     variance: `${variance <= 0 ? 0 : variance}`,
    //                 // };
    //             }
    //             return item;
    //         });
    //         setReceiptBookData({
    //             selectAll: false,
    //             itemArray: cloneReceiptBook,
    //         });
    //         setChangeData({
    //             dataThatChange: "",
    //             fromWhere: "",
    //             id: "",
    //             key: "",
    //         });
    //     }
    //     // Bank Credit's Reference no and receipt no to Receipt Book
    //     if (changeData.fromWhere === "bank credit") {
    //         const getReceiptBookWithSameRecRef =
    //             changeData.key === "receipt"
    //                 ? ReceiptBookData.itemArray.filter(
    //                       (item) =>
    //                           item.receipt_no === changeData.dataThatChange
    //                   )
    //                 : ReceiptBookData.itemArray.filter(
    //                       (item) =>
    //                           item.reference_no === changeData.dataThatChange
    //                   );
    //         const cloneBankCredit = isBankCredit.itemArray.map((item) => {
    //             if (Number(changeData.id) === item.id) {
    //                 const variance =
    //                     Number(item.credit_amount) -
    //                     Number(getReceiptBookWithSameRecRef[0].deposit_amount);
    //                 return {
    //                     ...item,
    //                     variance: `${variance <= 0 ? 0 : variance}`,
    //                 };
    //             }
    //             return item;
    //         });
    //         setBankCredit({
    //             selectAll: false,
    //             itemArray: cloneBankCredit,
    //         });
    //         setChangeData({
    //             dataThatChange: "",
    //             fromWhere: "",
    //             id: "",
    //             key: "",
    //         });
    //     }
    //     return;
    // }, [ReceiptBookData.itemArray, isBankCredit.itemArray]);

    return (
        <>
            <Receiptsbook
                type=""
                setChangeData={setChangeData}
                isReceiptBookData={ReceiptBookData}
                setReceiptBookData={setReceiptBookData}
                isBankCredit={isBankCredit}
                setBankCredit={setBankCredit}
                isLoading={isLoading}
                isError={isError}
                data={data}
            />
            <div className="my-10 h-[1px] bg-gray-300 w-full"></div>
            <BankCredit
                type=""
                setChangeData={setChangeData}
                isReceiptBookData={ReceiptBookData}
                setReceiptBookData={setReceiptBookData}
                isBankCredit={isBankCredit}
                setBankCredit={setBankCredit}
            />
        </>
    );
}
``;
