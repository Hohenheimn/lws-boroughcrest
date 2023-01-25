import React, { useState } from "react";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../../styles/finance/Crud-table.module.scss";
import DropdownSearch from "../../../DropdownSearch";

type billingArray = {
    id: number;
    charge: any;
    description: string;
    unit_price: number;
    quantity: number;
    uom: any;
    vat: number;
    amount: number;
}[];
type billingObject = {
    id: number;
    charge: any;
    description: string;
    unit_price: number;
    quantity: number;
    uom: any;
    vat: number;
    amount: number;
};
type Props = {
    DefaultValue: billingArray;
    type: string;
};

export default function JournalForm({ DefaultValue, type }: Props) {
    const [isSave, setSave] = useState(false);

    const [isBilling, setBilling] = useState<billingArray>(DefaultValue);
    return (
        <>
            <div>
                <ul className="flex flex-wrap justify-between pb-8 mb-8 border-b border-gray-300">
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2 480px:w-full">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold 820px:text-[13px]">
                            CUSTOMER
                        </p>
                        <DropdownSearch />
                    </li>
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold 820px:text-[13px]">
                            CLASS
                        </p>
                        <h1>Lorem ipsum</h1>
                    </li>
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold 820px:text-[13px]">
                            PROPERTY
                        </p>
                        <h1>Lorem ipsum</h1>
                    </li>
                </ul>
                <div className="w-full overflow-auto">
                    <table className={style.crudTable}>
                        <thead>
                            <tr>
                                <th>CHARGE</th>
                                <th>DESCRIPTION</th>
                                <th>UNIT PRICE</th>
                                <th>QUANTITY</th>
                                <th>UOM</th>
                                <th>VAT</th>
                                <th>AMOUNT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isBilling?.map((item: any, index: number) => (
                                <List
                                    key={index}
                                    index={index}
                                    setState={setBilling}
                                    itemList={item}
                                    isState={isBilling}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-10 border-b border-ThemeRed"></div>
                <div className="flex flex-wrap justify-end py-5 480px:justify-start">
                    <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                        TOTAL
                    </h1>

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
                            -123123123
                        </p>
                    </div>
                </div>
            </div>

            <div className="DropDownSave">
                <button className="ddback">CANCEL</button>

                <div className="ddSave">
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className="ddsave_button"
                        >
                            SAVE
                        </button>
                        <aside className="ddArrow">
                            <RiArrowDownSFill
                                onClick={() => setSave(!isSave)}
                            />
                        </aside>
                    </div>
                    {isSave && (
                        <ul>
                            <li>
                                <button type="submit">SAVE & NEW</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

type List = {
    index: number;
    itemList: billingObject;
    setState: Function;
    isState: billingArray;
};

const List = ({ itemList, setState, isState, index }: List) => {
    const AddJournal = () => {
        const random = Math.random();
        setState((temp: any) => [
            ...temp,
            {
                id: random,
                charge: "",
                description: "",
                unit_price: 0,
                quantity: 0,
                uom: "",
                vat: 0,
                amount: 0,
            },
        ]);
    };
    const RemoveJournal = () => {
        setState((item: any[]) =>
            item.filter((x: any) => x.id !== itemList.id)
        );
    };
    const updateValue = (key: string, e: any) => {
        const newItems = isState.map((item: any) => {
            if (itemList.id == item.id) {
                if (key === "charge") {
                    return {
                        ...item,
                        charge: e.target.value,
                    };
                } else if (key === "description") {
                    return {
                        ...item,
                        description: e.target.value,
                    };
                } else if (key === "unit_price") {
                    return {
                        ...item,
                        unit_price: e.target.value,
                    };
                } else if (key === "quantity") {
                    return {
                        ...item,
                        quantity: e.target.value,
                    };
                } else if (key === "uom") {
                    return {
                        ...item,
                        uom: e.target.value,
                    };
                } else if (key === "vat") {
                    return {
                        ...item,
                        vat: e.target.value,
                    };
                } else if (key === "amount") {
                    return {
                        ...item,
                        amount: e.target.value,
                    };
                }
            }
            return item;
        });
        setState(newItems);
    };
    return (
        <tr>
            <td>
                {/* <input
                    type="number"
                    value={itemList.charge}
                    onChange={(e) => updateValue("charge", e)}
                /> */}
                <DropdownSearch />
            </td>
            <td>
                <input
                    type="text"
                    value={itemList.description}
                    onChange={(e) => updateValue("description", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemList.unit_price}
                    onChange={(e) => updateValue("unit_price", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemList.quantity}
                    onChange={(e) => updateValue("quantity", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemList.uom}
                    className={style.disabled}
                    onChange={(e) => updateValue("uom", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemList.vat}
                    className={style.disabled}
                    onChange={(e) => updateValue("vat", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    className={style.disabled}
                    value={itemList.amount}
                    onChange={(e) => updateValue("amount", e)}
                />
            </td>
            <td className={`${style.action}`}>
                {isState.length > 1 && (
                    <div onClick={RemoveJournal}>
                        <HiMinus />
                    </div>
                )}
                {isState.length - 1 === index && (
                    <div className="ml-5 1024px:ml-2" onClick={AddJournal}>
                        <BsPlusLg />
                    </div>
                )}
            </td>
        </tr>
    );
};
