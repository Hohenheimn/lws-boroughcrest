import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../components/Context/AppContext";
import BankCredit, {
    isTableBankCredit,
    isTableItemObjBC,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import { SaveTagging } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import Receiptsbook, {
    isReceiptBookData,
    isTableItemObjRB,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

type Payload = {
    id: number;
    type_of_id: string;
    tag_ids: number[];
};

export default function DepositCounter() {
    // use to trigger refresh of table of bank credit and receipt book
    const [isTriggerRefresh, setTriggerRefresh] = useState(false);
    const { setPrompt } = useContext(AppContext);
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
                    if (Number(changeData.parentID) === Number(item?.id)) {
                        let variance = item?.deposit_amount;
                        item?.childrenRB?.map((item) => {
                            variance = Number(variance) - Number(item?.amount);
                        });
                        variance = Number(variance) - Number(item?.indexAmount);

                        if (Number.isNaN(variance)) {
                            return {
                                ...item,
                                variance: item?.deposit_amount,
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
                    if (Number(changeData.parentID) === Number(item?.id)) {
                        let variance = item?.credit_amount;
                        item?.childrenBC.map((item) => {
                            variance = Number(variance) - Number(item?.amount);
                        });
                        variance =
                            Number(variance) - Number(item?.rec_ref_amount);
                        if (Number.isNaN(variance)) {
                            return {
                                ...item,
                                variance: item?.credit_amount,
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

    const onSuccess = () => {
        setPrompt({
            message: `Items successfully updated tagging!`,
            type: "success",
            toggle: true,
        });
    };
    const onError = () => {
        setPrompt({
            message: `Something is wrong!`,
            type: "error",
            toggle: true,
        });
    };

    const { mutate, isLoading } = SaveTagging(onSuccess, onError);

    const SaveHandler = () => {
        console.log(ReceiptBookData);
        const filterReceipt = ReceiptBookData.itemArray.filter(
            (items) => items.indexID !== ""
        );
        const filterBankCredit = isBankCredit.itemArray.filter(
            (items) => Number(items.rec_ref_id) !== 0
        );
        const PayloadRB = filterReceipt.map((itemRB) => {
            const childrenID = itemRB.childrenRB.map((childItem) => {
                return childItem?.indexID;
            });
            return {
                id: itemRB.id,
                type_of_id: "receipt_book",
                tag_ids: [...childrenID, itemRB.indexID],
            };
        });
        const PayloadBC = filterBankCredit.map((itemBC) => {
            const childrenID = itemBC.childrenBC.map((childItem) => {
                return childItem?.receipt_id;
            });
            return {
                id: itemBC.id,
                type_of_id: "bank_credit",
                tag_ids: [...childrenID, itemBC.rec_ref_id],
            };
        });

        const Payload = [...PayloadRB, ...PayloadBC];

        if (Payload.length > 0) {
            mutate(Payload);
        } else {
            setPrompt({
                message: `No tagging happens!`,
                type: "draft",
                toggle: true,
            });
        }
    };

    return (
        <>
            <Receiptsbook
                type="unmatched"
                setChangeData={setChangeData}
                isReceiptBookData={ReceiptBookData}
                setReceiptBookData={setReceiptBookData}
                isBankCredit={isBankCredit}
                setBankCredit={setBankCredit}
                SaveHandler={SaveHandler}
                isLoadingSave={isLoading}
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
