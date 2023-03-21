import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import DropDownCharge from "../../../../../Dropdowns/DropDownCharge";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../../../Reusable/NumberFormat";
import {
    TableOneTotal,
    TableThreeTotal,
} from "../../../../../Reusable/TableTotal";
import { HeaderForm } from "../ReceivePaymentForm";

type Props = {
    Error: () => void;
};

type isTableItem = {
    id: string | number;
    document_no: string;
    charge: string;
    charge_id: string;
    description: string;
    due_amount: number;
    applied_amount: number;
    balance: number;
};

export default function OutStandingBalance({ Error }: Props) {
    const [isToggle, setToggle] = useState(false);
    const [isTable, setTable] = useState<isTableItem[]>([
        {
            id: 1,
            charge: "Electricity",
            charge_id: "12",
            description: "sample description",
            due_amount: 1000,
            applied_amount: 0,
            balance: 10000,
            document_no: "sample document",
        },
    ]);

    const [isSave, setSave] = useState(false);

    const SaveHandler = (button: string) => {};

    return (
        <div className="border-b border-gray-300">
            <div className=" flex justify-between items-center">
                <h1 className="SectionTitle mb-5">Outstanding Balance</h1>
                <div
                    onClick={() => setToggle(!isToggle)}
                    className={`cursor-pointer duration-300 ease-in-out delay-100 text-[#828282] relative h-[28px]  py-[2px] px-[10px] rounded-[50px] ${
                        !isToggle
                            ? "pr-[30px] bg-[#4a4a4a]"
                            : "pl-[30px] bg-[#b7b7b7]"
                    }`}
                >
                    <p className=" -mt-[1px]">Heirachy</p>
                    <div
                        className={`h-[20px] duration-300 ease-in-out w-[20px] bg-ThemeRed rounded-full absolute top-[50%] translate-y-[-50%] ${
                            !isToggle ? "right-[5px]" : "right-[78px]"
                        }`}
                    ></div>
                </div>
            </div>
            <div className="table_container">
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            <th>DOCUMENT NO</th>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>DUE AMOUNT</th>
                            <th>APPLIED PAYMENT</th>
                            <th>BALANCE</th>
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
                                isToggle={isToggle}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <TableThreeTotal
                total1={123123}
                total2={123}
                total3={123}
                label={"SUB DUE"}
                redBG={false}
            />
        </div>
    );
}

type List = {
    setTable: Function;
    isTable: isTableItem[];
    itemDetail: isTableItem;
    index: number;
    isToggle: boolean;
};

const List = ({ setTable, isTable, itemDetail, index, isToggle }: List) => {
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
        setTable((item: isTableItem[]) =>
            item.filter((x: isTableItem) => x.id !== itemDetail.id)
        );
    };

    const updateValue = (keyField: string, value: string | number) => {
        const closeToUpdate = isTable.map((item: isTableItem) => {
            if (item.id === itemDetail.id) {
                if (keyField === "applied_payment") {
                    return {
                        ...item,
                        applied_amount: value,
                    };
                }
            }
            return item;
        });
        setTable(closeToUpdate);
    };

    return (
        <tr>
            <td>{itemDetail.document_no}</td>
            <td>{itemDetail.charge}</td>
            <td>{itemDetail.description}</td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.due_amount}
                    className="withPeso w-full"
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`field number text-end ${
                        !isToggle && "disabled"
                    }`}
                    value={Number(itemDetail?.applied_amount)}
                    onChange={updateValue}
                    type={"applied_payment"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.balance}
                    className="withPeso w-full"
                />
            </td>
        </tr>
    );
};
