import React, { useEffect, useState } from "react";
import BankCredit from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import Receiptsbook from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function index() {
    const [changeData, setChangeData] = useState({
        dataThatChange: "",
        fromWhere: "",
        id: "",
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
            },
        ],
    });

    const [isBankCredit, setBankCredit] = useState({
        itemArray: [
            {
                id: 1,
                index: "0001",
                bank_account_no: "BDO-555534",
                credit_date: "SEP 22 2022",
                credit_amount: 5000,
                remarks: "Bounce Check",
                receipt_reference_no: "Receipt No.",
                variance: "",
                select: false,
                status: "Posted",
                receipt_no: "",
                reference_no: "",
            },
            {
                id: 2,
                index: "0002",
                bank_account_no: "BDO-555534",
                credit_date: "SEP 22 2022",
                credit_amount: 3000,
                remarks: "Bounce Check",
                receipt_reference_no: "Receipt No.",
                variance: "",
                select: false,
                status: "Posted",
                receipt_no: "",
                reference_no: "",
            },
        ],
        selectAll: false,
    });

    useEffect(() => {
        if (changeData.dataThatChange === "") return;

        if (changeData.fromWhere === "receipt book") {
            const getBankCreditWithSameIndex = isBankCredit.itemArray.filter(
                (item) => item.index === changeData.dataThatChange
            );
            const cloneReceiptBook = isReceiptBookData.itemArray.map((item) => {
                if (Number(changeData.id) === item.id) {
                    const variance =
                        Number(item.deposit_amount) -
                        Number(getBankCreditWithSameIndex[0].credit_amount);
                    return {
                        ...item,
                        variance: `${variance <= 0 ? 0 : variance}`,
                    };
                }
                return item;
            });
            setReceiptBookData({
                selectAll: false,
                itemArray: cloneReceiptBook,
            });
            setChangeData({
                dataThatChange: "",
                fromWhere: "",
                id: "",
            });
        }
        return;
    }, [isReceiptBookData.itemArray]);

    return (
        <>
            <Receiptsbook
                type=""
                setChangeData={setChangeData}
                isReceiptBookData={isReceiptBookData}
                setReceiptBookData={setReceiptBookData}
                isBankCredit={isBankCredit}
                setBankCredit={setBankCredit}
            />
            <div className="my-10 h-[1px] bg-gray-300 w-full"></div>
            <BankCredit
                type=""
                isReceiptBookData={isReceiptBookData}
                setReceiptBookData={setReceiptBookData}
                isBankCredit={isBankCredit}
                setBankCredit={setBankCredit}
            />
        </>
    );
}
``;
