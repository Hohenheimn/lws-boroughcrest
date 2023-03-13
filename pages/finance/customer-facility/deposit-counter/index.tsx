import React, { useEffect, useState } from "react";
import BankCredit, {
    isTableBankCredit,
    isTableItemObjBC,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import Receiptsbook, {
    isReceiptBookData,
    isTableItemObjRB,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function DepositCounter() {
    const [changeData, setChangeData] = useState({
        dataThatChangeID: "",
        fromWhere: "",
        parentID: "",
        childreID: "",
    });
    const [ReceiptBookData, setReceiptBookData] = useState<isReceiptBookData>({
        selectAll: false,
        itemArray: [],
    });

    const [isBankCredit, setBankCredit] = useState<isTableBankCredit>({
        itemArray: [],
        selectAll: false,
    });
    // Compute Pairing of Receipt Book and Bank Credit
    useEffect(() => {
        if (changeData.dataThatChangeID === "") return;
        // // Receipt book's Index to Bank Credit
        if (changeData.fromWhere === "receipt book") {
            const cloneReceiptBook = ReceiptBookData.itemArray.map(
                (item: isTableItemObjRB) => {
                    if (Number(changeData.parentID) === Number(item.id)) {
                        let variance = item.deposit_amount;
                        item.childrenRB.map((item) => {
                            variance = Number(variance) - Number(item.amount);
                        });
                        variance = Number(variance) - Number(item.indexAmount);

                        if (Number.isNaN(variance)) {
                            return {
                                ...item,
                                variance: item.deposit_amount,
                            };
                        } else {
                            return {
                                ...item,
                                variance: variance <= 0 ? 0 : variance,
                            };
                        }
                    }
                    return item;
                }
            );

            setReceiptBookData({
                selectAll: false,
                itemArray: cloneReceiptBook,
            });
            setChangeData({
                dataThatChangeID: "",
                fromWhere: "",
                parentID: "",
                childreID: "",
            });
        }
        // Bank Credit's Reference no and receipt no to Receipt Book
        if (changeData.fromWhere === "bank credit") {
            const cloneBankCredit = isBankCredit.itemArray.map(
                (item: isTableItemObjBC) => {
                    if (Number(changeData.parentID) === Number(item.id)) {
                        let variance = item.credit_amount;
                        item.childrenBC.map((item) => {
                            variance = Number(variance) - Number(item.amount);
                        });
                        variance =
                            Number(variance) - Number(item.rec_ref_amount);
                        if (Number.isNaN(variance)) {
                            return {
                                ...item,
                                variance: item.credit_amount,
                            };
                        } else {
                            return {
                                ...item,
                                variance: variance <= 0 ? 0 : variance,
                            };
                        }
                    }
                    return item;
                }
            );

            setBankCredit({
                selectAll: false,
                itemArray: cloneBankCredit,
            });

            setChangeData({
                dataThatChangeID: "",
                fromWhere: "",
                parentID: "",
                childreID: "",
            });
        }
        return;
    }, [ReceiptBookData.itemArray, isBankCredit.itemArray]);

    return (
        <>
            <Receiptsbook
                type="unmatched"
                setChangeData={setChangeData}
                isReceiptBookData={ReceiptBookData}
                setReceiptBookData={setReceiptBookData}
                isBankCredit={isBankCredit}
                setBankCredit={setBankCredit}
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
