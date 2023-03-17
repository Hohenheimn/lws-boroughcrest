import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import { FadeSide } from "../../../../../../Animation/SimpleAnimation";
import DropDownCharge from "../../../../../../Dropdowns/DropDownCharge";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../../../../Reusable/NumberFormat";
import { TableOneTotal } from "../../../../../../Reusable/TableTotal";

type Props = {
    Error: () => void;
};

type isTableItem = {
    id: string | number;
    charge: string;
    charge_id: string;
    description: string;
    uom: string;
    unit_price: number;
    qty: number;
    amount: number;
};

export default function OutRight({ Error }: Props) {
    const [isTable, setTable] = useState<isTableItem[]>([
        {
            id: 1,
            charge: "",
            charge_id: "",
            description: "",
            uom: "",
            unit_price: 0,
            qty: 0,
            amount: 0,
        },
    ]);

    const [isSave, setSave] = useState(false);

    const SaveHandler = (button: string) => {};

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
                        {isTable.map((item, index) => (
                            <List
                                key={index}
                                itemDetail={item}
                                isTable={isTable}
                                setTable={setTable}
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
    isTable: isTableItem[];
    itemDetail: isTableItem;
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
        setTable((item: isTableItem[]) =>
            item.filter((x: isTableItem) => x.id !== itemDetail.id)
        );
    };

    const updateValue = (keyField: string, value: any) => {
        const closeToUpdate = isTable.map((item: isTableItem) => {
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
                if (keyField === "charge_id") {
                    return {
                        ...item,
                        charge_id: value,
                    };
                }
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "uom") {
                    return {
                        ...item,
                        uom: value,
                    };
                }
                if (keyField === "qty") {
                    return {
                        ...item,
                        qty: value,
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
