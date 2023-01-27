import React, { useState } from "react";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../../../styles/finance/Crud-table.module.scss";
import Calendar from "../../../../Calendar";

type defaultArray = {
    id: number;
    charge: number;
    description: string;
    application: string;
}[];
type defaultObject = {
    id: number;
    charge: number;
    description: string;
    application: string;
};
type Props = {
    DefaultValue: defaultArray;
};

export default function BatchForm({ DefaultValue }: Props) {
    const [isDefault, setDefault] = useState<defaultArray>(DefaultValue);
    return (
        <>
            <div className="w-full overflow-auto border-b border-gray-300 pb-10 mb-10 1550px:mb-5 1550px:pb-5">
                <table className={style.crudTable}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>APPLICATION</th>
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
                        {/* <tr className={style.total}>
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
                            </tr> */}
                    </tbody>
                </table>
                <div className="py-2 flex justify-end">
                    <button className="buttonRed">APPLY</button>
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
                charge: 0,
                description: "",
                application: "SELECT",
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
                }
            }
            return item;
        });
        setDefault(newItems);
    };
    return (
        <tr>
            <td className="checkbox">
                <input type="checkbox" />
            </td>
            <td className="flex items-center">
                <input
                    type="number"
                    value={itemList.charge}
                    onChange={(e) => updateValue("charge", e)}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={itemList.description}
                    onChange={(e) => updateValue("description", e)}
                />
            </td>
            <td>
                <div className={style.SelectModal}>{itemList.application}</div>
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
