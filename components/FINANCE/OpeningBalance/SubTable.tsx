import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Calendar from "../../Calendar";
import DynamicPopOver from "../../DynamicPopOver";
import DropDownCustomer from "./DropDownCustomer";
import DropDownCharge from "./DropDownCharge";
import { useQuery, useQueryClient } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";
import { BarLoader, ScaleLoader } from "react-spinners";
import TableErrorMessage from "../../TableErrorMessage";
import { CreateUpdateSubledger, GetSubledger } from "./Query";
import AppContext from "../../Context/AppContext";
import { InputNumberForTable, TextNumberDisplay } from "../../NumberFormat";

export type isTableItemArray = isTableItemObj[];

export type isTableItemObj = {
    id: number | string;
    id_backend: null | number;
    customer_id: string;
    customer_name: string;
    date: string;
    reference_no: string;
    charge_id: string;
    charge: string;
    account: string;
    amount: string;
};

export default function SubTable() {
    const { setPrompt } = useContext(AppContext);
    const onSucces = () => {
        setPrompt({
            toggle: true,
            message: "Subledger successfully saved!",
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
    const { data, isLoading, isError } = GetSubledger();
    const { isLoading: mutateLoading, mutate } = CreateUpdateSubledger(
        onSucces,
        onError
    );
    const [isTableItem, setTableItem] = useState<isTableItemArray>([
        {
            id: 0,
            id_backend: null,
            customer_id: "",
            customer_name: "",
            date: "",
            reference_no: "",
            charge_id: "",
            charge: "",
            account: "advance",
            amount: "",
        },
    ]);

    useEffect(() => {
        if (!isLoading && !isError) {
            const random = Math.random();
            const CloneArray = data?.data.map((item: any, index: number) => {
                return {
                    id: index,
                    id_backend: item.id,
                    customer_id: item.customer?.id,
                    customer_name: item.customer?.name,
                    date: item.date,
                    reference_no: item.reference_no,
                    charge_id: item.charge?.id,
                    charge: item.charge?.name,
                    account: item.account_type,
                    amount: item.amount,
                };
            });
            setTableItem(CloneArray);
            // Additional blank row field
            // setTableItem([
            //     ...CloneArray,
            //     {
            //         id: random,
            //         id_backend: null,
            //         customer_id: "",
            //         customer_name: "",
            //         date: "",
            //         reference_no: 0,
            //         charge_id: "",
            //         charge: "",
            //         account: "advance",
            //         amount: 0,
            //     },
            // ]);
        }
    }, [data?.status]);

    const [isTotal, setTotal] = useState<number>(0);

    useEffect(() => {
        if (data?.status === 200) {
            setTotal(0);
            isTableItem.map((item: isTableItemObj) => {
                setTotal((temp) => Number(temp) + Number(item.amount));
            });
        }
    }, [isTableItem]);

    const SubmitHandler = () => {
        let validate = true;
        const subledger = isTableItem.map((item: isTableItemObj) => {
            if (
                item.customer_id === "" ||
                item.date === "" ||
                item.reference_no === "" ||
                item.charge_id === "" ||
                item.amount === "" ||
                item.amount === null
            ) {
                setPrompt({
                    message: "Please fill out all fields!",
                    toggle: true,
                    type: "draft",
                });
                validate = false;
                return;
            } else {
                return {
                    id: item.id_backend === undefined ? null : item.id_backend,
                    customer_id: parseInt(item.customer_id),
                    date: item.date,
                    reference_no: item.reference_no,
                    charge_id: parseInt(item.charge_id),
                    account_type: item.account,
                    amount: parseFloat(item.amount),
                };
            }
        });
        const Payload = {
            subledger: subledger,
        };
        if (validate) mutate(Payload);
    };

    return (
        <>
            <div className="table_container">
                <table className="table_list forCrud">
                    <thead className="textRed">
                        <tr>
                            <th className=" min-w-[130px]">CUSTOMER ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>DATE</th>
                            <th>REFERENCE NO.</th>
                            <th>CHARGE</th>
                            <th>ACCOUNT</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isTableItem.map((item: isTableItemObj, index) => (
                            <List
                                itemDetail={item}
                                setTableItem={setTableItem}
                                isTableItem={isTableItem}
                                key={index}
                                rowNumber={index}
                            />
                        ))}
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
                <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold">
                    <TextNumberDisplay
                        value={isTotal}
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
    isTableItem: isTableItemArray;
    rowNumber: number;
};

const List = ({ itemDetail, setTableItem, isTableItem, rowNumber }: List) => {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });

    useEffect(() => {
        setDate({
            ...isDate,
            value: itemDetail.date,
        });
    }, []);

    useEffect(() => {
        const e = "";
        UpdateStateHandler("date", e);
    }, [isDate]);

    const UpdateStateHandler = (key: string, event: any) => {
        const newItems = isTableItem.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "reference_no") {
                    return {
                        ...item,
                        reference_no: event.target.value,
                    };
                }
                if (key === "amount") {
                    return {
                        ...item,
                        amount: Number(event),
                    };
                }
                if (key === "customer") {
                    return {
                        ...item,
                        customer_id: event.target.getAttribute("data-id"),
                        customer_name: event.target.innerHTML,
                    };
                }
                if (key === "charge") {
                    return {
                        ...item,
                        charge_id: event.target.getAttribute("data-id"),
                        charge: event.target.innerHTML,
                    };
                }
                if (key === "advance") {
                    return {
                        ...item,
                        account: "advance",
                    };
                }
                if (key === "received") {
                    return {
                        ...item,
                        account: "Receivable",
                    };
                }
                if (key === "date") {
                    return {
                        ...item,
                        date: isDate.value,
                    };
                }
            }
            return item;
        });
        setTableItem(newItems);
    };

    const AddRowHandler = (e: any) => {
        if (e.key !== "Enter") {
            return;
        }
        if (isTableItem.length !== rowNumber + 1) {
            return;
        }
        const random = Math.random();
        if (
            itemDetail.customer_name === "" ||
            itemDetail.date === "" ||
            itemDetail.reference_no === "" ||
            itemDetail.reference_no === null ||
            itemDetail.charge === "" ||
            itemDetail.amount === "" ||
            itemDetail.amount === null
        ) {
            return;
        }
        setTableItem([
            ...isTableItem,
            {
                id: random,
                customer_id: 0,
                customer_name: "",
                date: "",
                reference_no: 0,
                charge_id: 0,
                charge: "",
                account: "advance",
                amount: 0,
            },
        ]);
    };

    return (
        <tr>
            <td>
                <h2>{itemDetail.customer_id} </h2>
            </td>
            <td onKeyUp={(e) => AddRowHandler(e)}>
                <DropDownCustomer
                    UpdateStateHandler={UpdateStateHandler}
                    itemDetail={itemDetail}
                />
            </td>
            <td onKeyUp={(e) => AddRowHandler(e)}>
                <DynamicPopOver
                    className=""
                    toRef={
                        <article className="calendar relative">
                            <span className="cal ">
                                <Image
                                    src="/Images/CalendarMini.png"
                                    width={15}
                                    height={15}
                                    alt=""
                                />
                            </span>
                            <input
                                type="text"
                                value={
                                    isDate.value === ""
                                        ? itemDetail.date
                                        : isDate.value
                                }
                                onChange={() => {}}
                                placeholder="dd/mm/yyyy"
                                onClick={() =>
                                    setDate({ ...isDate, toggle: true })
                                }
                            />
                        </article>
                    }
                    toPop={
                        <>
                            {isDate.toggle && (
                                <Calendar value={isDate} setValue={setDate} />
                            )}
                        </>
                    }
                />
            </td>
            <td onKeyUp={(e) => AddRowHandler(e)}>
                <input
                    type="text"
                    value={itemDetail.reference_no}
                    className="field w-full"
                    onChange={(e) => {
                        UpdateStateHandler("reference_no", e);
                    }}
                />
            </td>
            <td onKeyUp={(e) => AddRowHandler(e)}>
                <DropDownCharge
                    UpdateStateHandler={UpdateStateHandler}
                    itemDetail={itemDetail}
                />
            </td>
            <td onKeyUp={(e) => AddRowHandler(e)}>
                <article className={`ToggleAccount ${itemDetail.account}`}>
                    <ul className="min-w-[180px] flex relative">
                        <li
                            className="item ad"
                            onClick={(e) => {
                                UpdateStateHandler("advance", e);
                            }}
                        >
                            Advance
                        </li>
                        <li
                            className="item re"
                            onClick={(e) => {
                                UpdateStateHandler("received", e);
                            }}
                        >
                            Received
                        </li>
                        <li className="moving"></li>
                    </ul>
                </article>
            </td>
            <td onKeyUp={(e) => AddRowHandler(e)}>
                {/* <input
                    type="number"
                    value={itemDetail.amount}
                    className="field w-full"
                    onChange={(e) => {
                        UpdateStateHandler("amount", e);
                    }}
                /> */}
                <InputNumberForTable
                    className="field w-full number"
                    value={itemDetail.amount}
                    type="amount"
                    onChange={UpdateStateHandler}
                />
            </td>
        </tr>
    );
};
