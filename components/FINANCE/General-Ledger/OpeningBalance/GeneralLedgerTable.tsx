import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { BarLoader, ScaleLoader } from "react-spinners";
import AppContext from "../../../Context/AppContext";
import { CreateUpdateGeneralLedger, GetGeneralLedger } from "./Query";
import { validateCreditDebitField } from "./ValidateCreditDebitField";
import {
    TextNumberDisplay,
    InputNumberForTable,
} from "../../../Reusable/NumberFormat";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import { format, isValid, parse } from "date-fns";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";

type isTableItem = isTableItemObj[];

type isTableItemObj = {
    id: string;
    account_id: string;
    chart_code: string;
    category: string;
    account_name: string;
    debit: string | number;
    credit: string | number;
    account_type: string | null;
    id_backend: string | null;
};
type GeneralLedgerTableProps = {
    date: string;
};
export default function GeneralLedgerTable({ date }: GeneralLedgerTableProps) {
    const { setPrompt } = useContext(AppContext);
    const onSucces = () => {
        setPrompt({
            toggle: true,
            message: "General Ledger successfully saved!",
            type: "success",
        });
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };
    const { isLoading: mutateLoading, mutate } = CreateUpdateGeneralLedger(
        onSucces,
        onError
    );
    const { data, isLoading, isError } = GetGeneralLedger();
    const [isTableItem, setTableItem] = useState<isTableItem>([]);

    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: any, index: number) => {
                return {
                    id: index,
                    id_backend: item.id,
                    account_id: item.chart_of_account?.id,
                    chart_code: item.chart_of_account?.chart_code,
                    category: item.chart_of_account?.category,
                    account_name: item.chart_of_account?.account_name,
                    account_type: item.account_type,
                    debit:
                        item.debit === 0 || item.debit === "0"
                            ? ""
                            : item.debit,
                    credit:
                        item.credit === 0 || item.credit === "0"
                            ? ""
                            : item.credit,
                };
            });
            // Additional blank row field
            setTableItem(CloneArray);
        }
    }, [data?.status]);

    useEffect(() => {
        if (data?.status === 200) {
            setTotalDebit(0);
            setTotalCredit(0);
            isTableItem.map((item: isTableItemObj) => {
                setTotalDebit((temp) => Number(temp) + Number(item.debit));
                setTotalCredit((temp) => Number(temp) + Number(item.credit));
            });
        }
    }, [isTableItem]);

    const SubmitHandler = () => {
        let validate = true;
        const subledger = isTableItem.map((item: isTableItemObj) => {
            if (date === "") {
                setPrompt({
                    message: "Please fill out date field!",
                    toggle: true,
                    type: "draft",
                });
                validate = false;
                return;
            } else if (item.debit === "0" && item.credit === "0") {
                setPrompt({
                    message: "Please input a value on debit or credit!",
                    toggle: true,
                    type: "draft",
                });
                validate = false;
            } else {
                return {
                    id: item.id_backend,
                    chart_of_account_id:
                        item.account_id === null ||
                        item.account_id === undefined
                            ? null
                            : parseInt(item.account_id),
                    debit: Number(item.debit),
                    credit: Number(item.credit),
                };
            }
        });

        const dateConvert = parse(date, "MMM dd yyyy", new Date());
        const Payload = {
            general_ledger: subledger,
            date: isValid(dateConvert) ? format(dateConvert, "yyyy-MM-dd") : "",
        };
        if (validate) mutate(Payload);
    };

    return (
        <>
            <div className="table_container">
                <table className="table_list forCrud">
                    <thead className="textRed">
                        <tr>
                            <th>CHART CODE</th>
                            <th>CATEGORY</th>
                            <th>ACCOUNT NAME</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && !isError && (
                            <>
                                {isTableItem.map(
                                    (item: isTableItemObj, index) => (
                                        <List
                                            itemDetail={item}
                                            setTableItem={setTableItem}
                                            isTableItem={isTableItem}
                                            key={index}
                                        />
                                    )
                                )}
                            </>
                        )}
                    </tbody>
                </table>

                {isLoading && (
                    <div className="w-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="10px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                {isError && <TableErrorMessage />}
            </div>
            <div className="mt-10 border-b border-ThemeRed"></div>
            <div className="flex flex-wrap justify-end py-5 480px:justify-start">
                <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                    SUBTOTAL
                </h1>
                <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold  mr-5">
                    <TextNumberDisplay
                        value={totalDebit}
                        className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                    />
                </div>
                <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold ml-20">
                    <TextNumberDisplay
                        value={totalCredit}
                        className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                    />
                </div>
            </div>

            <div className="flex justify-end py-5 mt-5">
                <button className="button_cancel">Cancel</button>
                <button className="buttonRed" onClick={SubmitHandler}>
                    {mutateLoading ? (
                        <ScaleLoader color="#fff" height="10px" width="2px" />
                    ) : (
                        "SAVE"
                    )}
                </button>
            </div>
        </>
    );
}

type List = {
    itemDetail: isTableItemObj;
    setTableItem: Function;
    isTableItem: isTableItem;
};

const List = ({ itemDetail, setTableItem, isTableItem }: List) => {
    const UpdateStateHandler = (key: string, value: any) => {
        const newItems = isTableItem.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        debit: Number(value),
                        credit: "",
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: Number(value),
                        debit: "",
                    };
                }
            }
            return item;
        });
        setTableItem(newItems);
    };

    const [debitValidate, setDebitValidate] = useState("");
    const [creditValidate, setcreditValidate] = useState("");

    useEffect(() => {
        if (itemDetail.account_type !== null) {
            setDebitValidate((prev) => (prev = "disabled"));
            setcreditValidate((prev) => (prev = "disabled"));
            return;
        }
        validateCreditDebitField(
            itemDetail.debit,
            itemDetail.credit,
            setDebitValidate,
            setcreditValidate
        );
    }, [itemDetail.debit, itemDetail.credit]);

    return (
        <tr>
            <td>
                <h2 className="w-[70px]">{itemDetail.chart_code}</h2>
            </td>
            <td>
                <h2 className="min-w-[250px] w-full">{itemDetail.category}</h2>
            </td>
            <td>
                <h2 className="min-w-[250px] w-full">
                    {itemDetail.account_name}
                </h2>
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${debitValidate}`}
                    value={itemDetail.debit}
                    onChange={UpdateStateHandler}
                    type={"debit"}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${creditValidate}`}
                    value={itemDetail.credit}
                    onChange={UpdateStateHandler}
                    type={"credit"}
                />
            </td>
        </tr>
    );
};
