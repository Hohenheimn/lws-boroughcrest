import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { FadeSide } from "../../../../../../Animation/SimpleAnimation";
import DropDownCharge from "../../../../../../Dropdowns/DropDownCharge";
import {
    MinusButtonTable,
    PlusButtonTable,
} from "../../../../../../Reusable/Icons";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../../../../Reusable/NumberFormat";
import { TableOneTotal } from "../../../../../../Reusable/TableTotal";

type Props = {
    Error: () => void;
    DefaultOutRight: Outright[];
    setDefaultValue: Function;
};

export type Outright = {
    id: string | number;
    charge: string;
    charge_id: string;
    description: string;
    uom: string;
    unit_price: number;
    qty: number;
    amount: number;
};

export default function OutRight({
    Error,
    DefaultOutRight,
    setDefaultValue,
}: Props) {
    const [isTotal, setTotal] = useState(0);
    useEffect(() => {
        setTotal(0);
        DefaultOutRight.map((item: Outright) => {
            setTotal((prevValue) => Number(prevValue) + item.amount);
        });
    }, [DefaultOutRight]);

    return (
        <motion.div
            variants={FadeSide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
        >
            <h2 className="text-[14px] mb-3">Outright</h2>
            <div className="table_container max-half">
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>UNIT PRICE</th>
                            <th>QTY</th>
                            <th>UOM</th>
                            <th>AMOUNT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {DefaultOutRight.map((item, index) => (
                            <List
                                key={index}
                                itemDetail={item}
                                isTable={DefaultOutRight}
                                setTable={setDefaultValue}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <TableOneTotal total={isTotal} label={"SUB TOTAL"} redBG={false} />
        </motion.div>
    );
}

type List = {
    setTable: Function;
    isTable: Outright[];
    itemDetail: Outright;
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
                uom: "",
                unit_price: 0,
                qty: 0,
                amount: 0,
            },
        ]);
    };
    const RemoveRow = () => {
        setTable((item: Outright[]) =>
            item.filter((x: Outright) => x.id !== itemDetail.id)
        );
    };

    const updateValue = (keyField: string, value: any) => {
        const closeToUpdate = isTable.map((item: Outright) => {
            if (item.id === itemDetail.id) {
                if (keyField === "charge") {
                    const charge_id = value.target.getAttribute("data-id");
                    const charge = value.target.innerHTML;
                    const description =
                        value.target.getAttribute("data-description");
                    const uom = value.target.getAttribute("data-uom");
                    return {
                        ...item,
                        charge: charge,
                        charge_id: charge_id,
                        description: description,
                        uom: uom,
                    };
                }
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "qty") {
                    const amount =
                        Number(value) * Number(itemDetail.unit_price);
                    return {
                        ...item,
                        qty: value,
                        amount: amount,
                    };
                }
                if (keyField === "unit_price") {
                    const amount = Number(value) * Number(itemDetail.qty);
                    return {
                        ...item,
                        unit_price: value,
                        amount: amount,
                    };
                }
            }
            return item;
        });
        setTable(closeToUpdate);
    };

    return (
        <tr>
            <td>
                <DropDownCharge
                    UpdateStateHandler={updateValue}
                    itemDetail={itemDetail}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={itemDetail.description}
                    onChange={(e) => updateValue("description", e.target.value)}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={"field number text-end"}
                    value={Number(itemDetail?.unit_price)}
                    onChange={updateValue}
                    type={"unit_price"}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="number field"
                    value={itemDetail.qty}
                    onChange={(e) => {
                        updateValue("qty", e.target.value);
                    }}
                />
            </td>
            <td>{itemDetail.uom}</td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.amount}
                    className={"withPeso w-full"}
                />
            </td>
            <td className="actionIcon">
                {isTable.length > 1 && (
                    <div onClick={RemoveRow}>
                        <MinusButtonTable />
                    </div>
                )}
                {isTable.length - 1 === index && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddRow(e)}
                    >
                        <PlusButtonTable />
                    </div>
                )}
            </td>
        </tr>
    );
};
