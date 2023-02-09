import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";
import { BarLoader, ScaleLoader } from "react-spinners";
import AppContext from "../../Context/AppContext";
import TableErrorMessage from "../../TableErrorMessage";
import { CreateUpdateGeneralLedger, GetGeneralLedger } from "./Query";

type isTableItem = isTableItemObj[];

type isTableItemObj = {
    id: string;
    account_id: string;
    chart_code: string;
    category: string;
    account_name: string;
    debit: string;
    credit: string;
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
    const onError = () => {
        setPrompt({
            toggle: true,
            message: "Something is wrong!",
            type: "error",
        });
    };
    const { isLoading: mutateLoading, mutate } = CreateUpdateGeneralLedger(
        onSucces,
        onError
    );
    const { data, isLoading, isError } = GetGeneralLedger();
    const [isTableItem, setTableItem] = useState<isTableItem>([
        {
            id: "",
            account_id: "",
            chart_code: "",
            category: "",
            account_name: "",
            debit: "",
            credit: "",
            account_type: null,
            id_backend: null,
        },
    ]);

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
                    debit: item.debit,
                    credit: item.credit,
                };
            });
            // Additional blank row field
            setTableItem(CloneArray);
        }
    }, [data]);

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
        const Payload = {
            general_ledger: subledger,
            date: date,
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
                    <div className="w-full h-full flex justify-center items-center">
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
                <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] mr-5">
                    <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                        <Image
                            src="/Images/peso.png"
                            height={13}
                            width={10}
                            alt=""
                        />
                    </aside>
                    <p className=" text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]">
                        {totalDebit}-
                    </p>
                </div>
                <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] ">
                    <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                        <Image
                            src="/Images/peso.png"
                            height={13}
                            width={10}
                            alt=""
                        />
                    </aside>
                    <p className=" text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]">
                        {totalCredit}-
                    </p>
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
    const UpdateStateHandler = (key: string, event: any) => {
        const newItems = isTableItem.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        debit: event.target.value,
                        credit: 0,
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: event.target.value,
                        debit: 0,
                    };
                }
            }
            return item;
        });
        setTableItem(newItems);
    };

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
                <input
                    type="number"
                    className={`field w-full ${
                        itemDetail.account_type !== null && "disabled bg-black"
                    }`}
                    value={itemDetail.debit}
                    onChange={(e) => UpdateStateHandler("debit", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    className={`field w-full ${
                        itemDetail.account_type !== null && "disabled"
                    }`}
                    value={itemDetail.credit}
                    onChange={(e) => UpdateStateHandler("credit", e)}
                />
            </td>
        </tr>
    );
};
