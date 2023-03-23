import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { FadeSide } from "../../../../../../Animation/SimpleAnimation";
import DropDownCharge from "../../../../../../Dropdowns/DropDownCharge";
import { InputNumberForTable } from "../../../../../../Reusable/NumberFormat";
import { TableOneTotal } from "../../../../../../Reusable/TableTotal";

type Props = {
    Error: () => void;
    DefaultAdvances: AdvancesType[];
    setDefaultValue: Function;
};

export type AdvancesType = {
    id: string | number;
    charge: string;
    charge_id: string;
    description: string;
    amount: number;
};

export default function Advances({
    Error,
    DefaultAdvances,
    setDefaultValue,
}: Props) {
    return (
        <motion.div
            variants={FadeSide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
        >
            <h2 className="text-[14px] mb-3">Advances</h2>
            <div className="table_container max-half">
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>AMOUNT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {DefaultAdvances.map((item, index) => (
                            <List
                                key={index}
                                itemDetail={item}
                                isTable={DefaultAdvances}
                                setTable={setDefaultValue}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <TableOneTotal total={123} label={"SUB TOTAL"} redBG={false} />
        </motion.div>
    );
}

type List = {
    setTable: Function;
    isTable: AdvancesType[];
    itemDetail: AdvancesType;
    index: number;
};

const List = ({ setTable, isTable, itemDetail, index }: List) => {
    const AddRow = (e: any) => {
        const random = Math.random();
        setTable([
            ...isTable,
            {
                id: random,
                charge: "",
                charge_id: "",
                description: "",
                amount: 0,
            },
        ]);
    };
    const RemoveRow = () => {
        setTable((item: AdvancesType[]) =>
            item.filter((x: AdvancesType) => x.id !== itemDetail.id)
        );
    };

    const updateValue = (keyField: string, value: any) => {
        const closeToUpdate = isTable.map((item: AdvancesType) => {
            if (item.id === itemDetail.id) {
                if (keyField === "charge") {
                    const charge_id = value.target.getAttribute("data-id");
                    const charge = value.target.innerHTML;
                    const description =
                        value.target.getAttribute("data-description");
                    return {
                        ...item,
                        charge: charge,
                        charge_id: charge_id,
                        description: description,
                    };
                }
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "amount") {
                    return {
                        ...item,
                        amount: Number(value),
                    };
                }
            }
            return item;
        });
        setTable(closeToUpdate);
    };

    return (
        <tr>
            <td className="normal">
                <DropDownCharge
                    UpdateStateHandler={updateValue}
                    itemDetail={itemDetail}
                />
            </td>
            <td className="x2large">
                <input
                    type="text"
                    className="field w-full"
                    value={itemDetail.description}
                    onChange={(e) => {
                        updateValue("description", e.target.value);
                    }}
                />
            </td>

            <td className="normal">
                <InputNumberForTable
                    className={"field number text-end"}
                    value={Number(itemDetail?.amount)}
                    onChange={updateValue}
                    type={"amount"}
                />
            </td>
            <td className="actionIcon">
                {isTable.length > 1 && (
                    <div onClick={RemoveRow}>
                        <HiMinus />
                    </div>
                )}
                {isTable.length - 1 === index && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddRow(e)}
                    >
                        <BsPlusLg />
                    </div>
                )}
            </td>
        </tr>
    );
};
