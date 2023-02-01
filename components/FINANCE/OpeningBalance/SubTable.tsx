import React, { useEffect, useState } from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import Calendar from "../../Calendar";
import DynamicPopOver from "../../DynamicPopOver";
import DropDownCustomer from "./DropDownCustomer";
import DropDownCharge from "./DropDownCharge";

export type isTableItemArray = {
    id: number | string;
    customer_id: number | string;
    customer_name: string;
    date: string;
    reference_no: number;
    charge_id: number | string;
    charge: string;
    account: string;
    amount: number;
}[];

export type isTableItemObj = {
    id: number | string;
    customer_id: number | string;
    customer_name: string;
    date: string;
    reference_no: number;
    charge_id: number | string;
    charge: string;
    account: string;
    amount: number;
};

export default function SubTable() {
    const [isTableItem, setTableItem] = useState<isTableItemArray>([
        {
            id: 0,
            customer_id: 0,
            customer_name: "",
            date: "",
            reference_no: 0,
            charge_id: 0,
            charge: "",
            account: "Advance",
            amount: 0,
        },
    ]);
    return (
        <>
            <div className="w-full overflow-auto">
                <table className={style.crudTable}>
                    <thead>
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
                            />
                        ))}
                    </tbody>
                </table>
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
                        0-
                    </p>
                </div>
            </div>
            <div className="flex justify-end py-5 mt-5">
                <button className="button_cancel">Cancel</button>
                <button
                    className="buttonRed"
                    onClick={() => {
                        console.log(isTableItem);
                    }}
                >
                    SAVE
                </button>
            </div>
        </>
    );
}
type List = {
    itemDetail: isTableItemObj;
    setTableItem: Function;
    isTableItem: isTableItemArray;
};

const List = ({ itemDetail, setTableItem, isTableItem }: List) => {
    // true is advnace false is received
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });

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
                        amount: event.target.value,
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
                        account: "Advance",
                    };
                }
                if (key === "received") {
                    return {
                        ...item,
                        account: "Received",
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

    return (
        <tr className={`${style.total} ${style.total1}`}>
            <td>
                <h2>{itemDetail.customer_id}</h2>
            </td>
            <td>
                <DropDownCustomer
                    UpdateStateHandler={UpdateStateHandler}
                    itemDetail={itemDetail}
                />
            </td>
            <td>
                <DynamicPopOver
                    className="w-full"
                    toRef={
                        <aside className="calendar relative w-[200px]">
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
                                value={isDate.value}
                                onChange={() => {}}
                                placeholder="dd/mm/yyyy"
                                onClick={() =>
                                    setDate({ ...isDate, toggle: true })
                                }
                                className="p-2 outline-none rounded-md shadow-md"
                            />
                        </aside>
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
            <td>
                <input
                    type="number"
                    value={itemDetail.reference_no}
                    onChange={(e) => {
                        UpdateStateHandler("reference_no", e);
                    }}
                />
            </td>
            <td>
                <DropDownCharge
                    UpdateStateHandler={UpdateStateHandler}
                    itemDetail={itemDetail}
                />
            </td>
            <td>
                <aside className={`ToggleAccount ${itemDetail.account}`}>
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
                </aside>
            </td>
            <td>
                <input
                    type="number"
                    value={itemDetail.amount}
                    onChange={(e) => {
                        UpdateStateHandler("amount", e);
                    }}
                />
            </td>
        </tr>
    );
};
