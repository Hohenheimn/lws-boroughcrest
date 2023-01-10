import React, { useState } from "react";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../styles/finance/Crud-table.module.scss";
import Calendar from "../../Calendar";

type defaultArray = {
    id: number;
    code: number;
    accountName: string;
    debit: string;
    credit: string;
}[];
type defaultObject = {
    id: number;
    code: number;
    accountName: string;
    debit: string;
    credit: string;
};
type Props = {
    DefaultValue: defaultArray;
    type: string;
};

export default function BatchForm({ DefaultValue, type }: Props) {
    const [isSave, setSave] = useState(false);
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });

    const [isDefault, setDefault] = useState<defaultArray>(DefaultValue);
    return (
        <>
            <div>
                <ul className="flex flex-wrap justify-between pb-8 mb-8 border-b border-gray-300">
                    <li className="w-[20%] 1366px:w-[30%] 820px:w-full 820px:mb-5 flex items-center">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold 820px:text-[13px]">
                            DATE
                        </p>
                        <div className="calendar">
                            <span className="cal">
                                <Image
                                    src="/Images/calendar.png"
                                    width={15}
                                    height={15}
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
                            {isDate.toggle && (
                                <Calendar value={isDate} setValue={setDate} />
                            )}
                        </div>
                    </li>
                    <li className="w-[75%] max-w-[850px] 1366px:w-[65%] 820px:w-full flex items-center">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold">
                            PARTICULARS
                        </p>
                        <input
                            type="text"
                            className="p-2 outline-none rounded-md shadow-md w-full"
                        />
                    </li>
                </ul>
                <div className="w-full overflow-auto">
                    <table className={style.crudTable}>
                        <thead>
                            <tr>
                                <th>CODE</th>
                                <th>ACCOUNT NAME</th>
                                <th>DEBIT</th>
                                <th>CREDIT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isDefault?.map((item: any, index: number) => (
                                <List
                                    key={index}
                                    index={index}
                                    setDefault={setDefault}
                                    itemList={item}
                                    isDefault={isDefault}
                                />
                            ))}
                            <tr className={style.total}>
                                <td></td>
                                <td className={style.label}>
                                    <h1>TOTAL</h1>
                                </td>
                                <td>
                                    <div className={style.peso}>
                                        <aside>
                                            <Image
                                                src="/Images/peso.png"
                                                height={13}
                                                width={10}
                                            />
                                        </aside>
                                        <p>-</p>
                                    </div>
                                </td>
                                <td>
                                    <div className={style.peso}>
                                        <aside>
                                            <Image
                                                src="/Images/peso.png"
                                                height={13}
                                                width={10}
                                            />
                                        </aside>
                                        <p>-</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
    itemList: defaultObject;
    setDefault: Function;
    isDefault: defaultArray;
};

const List = ({ itemList, setDefault, isDefault, index }: List) => {
    const AddJournal = () => {
        const random = Math.random();
        setDefault((temp: any) => [
            ...temp,
            {
                id: random,
                code: 0,
                accountName: "",
                debit: "",
                credit: "",
            },
        ]);
    };
    const RemoveJournal = () => {
        setDefault((item: any[]) =>
            item.filter((x: any) => x.id !== itemList.id)
        );
    };
    const updateValue = (key: string, e: any) => {
        const newItems = isDefault.map((item: any) => {
            if (itemList.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        debit: e.target.value,
                    };
                } else if (key === "credit") {
                    return {
                        ...item,
                        credit: e.target.value,
                    };
                } else if (key === "accountName") {
                    return {
                        ...item,
                        accountName: e.target.value,
                    };
                } else if (key === "code") {
                    return {
                        ...item,
                        code: e.target.value,
                    };
                }
            }
            return item;
        });
        setDefault(newItems);
    };
    return (
        <tr>
            <td className="w-[20%]">
                <input
                    type="number"
                    value={itemList.code}
                    onChange={(e) => updateValue("code", e)}
                />
            </td>
            <td className="w-[30%]">
                <input
                    type="text"
                    value={itemList.accountName}
                    onChange={(e) => updateValue("accountName", e)}
                />
            </td>
            <td className="w-[20%]">
                <div className={style.peso}>
                    <aside>
                        <Image src="/Images/peso.png" height={13} width={10} />
                    </aside>
                    <input
                        type="number"
                        value={itemList.debit}
                        className={style.peso}
                        onChange={(e) => updateValue("debit", e)}
                    />
                </div>
            </td>
            <td className="w-[20%]">
                <div className={style.peso}>
                    <aside>
                        <Image src="/Images/peso.png" height={13} width={10} />
                    </aside>
                    <input
                        type="number"
                        value={itemList.credit}
                        className={style.peso}
                        onChange={(e) => updateValue("credit", e)}
                    />
                </div>
            </td>
            <td className={`${style.action}`}>
                {isDefault.length > 1 && (
                    <div onClick={RemoveJournal}>
                        <HiMinus />
                    </div>
                )}
                {isDefault.length - 1 === index && (
                    <div className="ml-5 1024px:ml-2" onClick={AddJournal}>
                        <BsPlusLg />
                    </div>
                )}
            </td>
        </tr>
    );
};
