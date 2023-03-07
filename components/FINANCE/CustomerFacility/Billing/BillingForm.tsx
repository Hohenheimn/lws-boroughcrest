import React, { useState } from "react";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../../styles/finance/Crud-table.module.scss";
import CustomerDropdown from "../../../Dropdowns/CustomerDropdown";
import DropDownCharge from "../../../Dropdowns/DropDownCharge";

export type customerDD = {
    id: string | number;
    name: string;
    class: string;
    property: string[];
};

type billingArray = billingObject[];
type billingObject = {
    id: number;
    charge_id: string;
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
    DefaultCustomer: customerDD;
};
export default function JournalForm({
    DefaultValue,
    DefaultCustomer,
    type,
}: Props) {
    const [isSave, setSave] = useState(false);
    const [isBilling, setBilling] = useState<billingArray>(DefaultValue);
    const [isCustomer, setCustomer] = useState<customerDD>({
        id: DefaultCustomer?.id,
        name: DefaultCustomer?.name,
        class: DefaultCustomer?.class,
        property: DefaultCustomer.property,
    });

    return (
        <>
            <div>
                <ul className="flex flex-wrap justify-between pb-8 mb-8 border-b border-gray-300">
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2 480px:w-full">
                        <p className="labelField">CUSTOMER</p>
                        <CustomerDropdown
                            setCustomer={setCustomer}
                            isCustomer={isCustomer}
                        />
                    </li>
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2">
                        <p className=" labelField">CLASS</p>
                        <h1>{isCustomer.class}</h1>
                    </li>
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2">
                        <p className=" labelField">PROPERTY</p>
                        <h1>
                            {isCustomer.property.toString().replace(",", ", ")}
                        </h1>
                    </li>
                </ul>
                <div className="table_container">
                    <table className="table_list forCrud">
                        <thead className="textRed">
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
                            onClick={() => {
                                console.log(isBilling);
                            }}
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
                charge_id: "",
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
                        charge: e.target.innerHTML,
                        charge_id: e.target.getAttribute("data-id"),
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
                <DropDownCharge
                    UpdateStateHandler={updateValue}
                    itemDetail={itemList}
                />
            </td>
            <td>
                <input
                    className="field"
                    type="text"
                    value={itemList.description}
                    onChange={(e) => updateValue("description", e)}
                />
            </td>
            <td>
                <input
                    className="field"
                    type="number"
                    value={itemList.unit_price}
                    onChange={(e) => updateValue("unit_price", e)}
                />
            </td>
            <td>
                <input
                    className="field"
                    type="number"
                    value={itemList.quantity}
                    onChange={(e) => updateValue("quantity", e)}
                />
            </td>
            <td>
                <input
                    className="field disabled"
                    type="number"
                    value={itemList.uom}
                    onChange={(e) => updateValue("uom", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="field disabled"
                    value={itemList.vat}
                    onChange={(e) => updateValue("vat", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="field disabled"
                    value={itemList.amount}
                    onChange={(e) => updateValue("amount", e)}
                />
            </td>
            <td className="actionIcon">
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
