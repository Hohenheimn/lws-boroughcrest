import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import index from "../../../../../pages/project";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import { InputNumberForTable } from "../../../../Reusable/NumberFormat";
import { TableOneTotal } from "../../../../Reusable/TableTotal";
import { HeaderForm } from "./ReceivePaymentForm";

type Props = {
    DefaultValue: isTableItem[];
    Error: () => void;
    headerForm: HeaderForm;
};

type isTableItem = {
    id: string | number;
    charge: string;
    charge_id: string;
    description: string;
    amount: number | string;
};

export default function AcknowledgementForm({
    DefaultValue,
    Error,
    headerForm,
}: Props) {
    const [isTable, setTable] = useState<isTableItem[]>([
        {
            id: 1,
            charge: "",
            charge_id: "",
            description: "",
            amount: 0,
        },
    ]);

    useEffect(() => {
        setTable(DefaultValue);
    }, []);

    const [isSave, setSave] = useState(false);

    const SaveHandler = (button: string) => {};

    return (
        <>
            <h1 className="SectionTitle mb-5">Deposits</h1>
            <div className="table_container">
                <table className="table_list journal">
                    <thead className="textRed">
                        <tr>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
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

            <TableOneTotal total={6545646} label="SUB DUE" redBG={false} />
            <TableOneTotal total={6545646} label="VARIANCE" redBG={true} />
            <div className="DropDownSave">
                <button className="ddback">CANCEL</button>
                <div className="ddSave">
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className="ddsave_button"
                            onClick={() => {
                                SaveHandler("save");
                                Error();
                                setSave(false);
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
                                <button
                                    type="submit"
                                    onClick={() => {
                                        SaveHandler("new");
                                        Error();
                                        setSave(false);
                                    }}
                                >
                                    SAVE & NEW
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </>
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
                if (keyField === "charge") {
                    return {
                        ...item,
                        charge: value,
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

    const GetCharge = (key: string, event: any) => {
        const charge_id = event.target.getAttribute("data-id");
        const charge = event.target.innerHTML;
        const description = event.target.getAttribute("data-description");
        updateValue("charge", charge);
        updateValue("charge_id", charge_id);
        updateValue("description", description);
    };

    return (
        <tr>
            <td>
                <DropDownCharge
                    UpdateStateHandler={GetCharge}
                    itemDetail={itemDetail}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field"
                    onChange={(e) => {
                        updateValue("description", e.target.value);
                    }}
                    value={itemDetail?.description}
                />
            </td>
            <td>
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
