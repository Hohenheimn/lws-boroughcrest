import React, { useContext, useEffect, useState } from "react";
import { BarLoader, ScaleLoader } from "react-spinners";
import { TableOneTotal } from "../../../../Reusable/TableTotal";
import Image from "next/image";
import Calendar from "../../../../Reusable/Calendar";
import BankAccountDropDown from "../../../../Reusable/BankAccountDropDown";
import { InputNumberForTable } from "../../../../Reusable/NumberFormat";
import { GetPropertyList } from "../../../../ReactQuery/PropertyMethod";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";
import { HeaderForm } from "./ReceivePaymentForm";
import AppContext from "../../../../Context/AppContext";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { GetDiscountList } from "./Query";

export type isProvisionalTable = {
    id: string | number;
    charge: string;
    charge_id: string | number;
    description: string;
    amount: number;
    back_id: string | number;
};
type Props = {
    setDiscountToggle: Function;
};

export default function DiscountForm({ setDiscountToggle }: Props) {
    const { setPrompt } = useContext(AppContext);
    const [isSave, setSave] = useState(false);
    const [isTable, setTable] = useState<isProvisionalTable[]>([]);
    const { isLoading, data, isError } = GetDiscountList();

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.data.map((item: any) => {
                return {
                    id: 1,
                    back_id: "",
                    charge: "",
                    charge_id: "",
                    description: "",
                    amount: 0,
                };
            });

            setTable(CloneArray);
        }
    }, [data?.status]);

    const SaveHandler = () => {};

    return (
        <ModalTemp>
            <div>
                <h1 className="SectionTitle mb-5">Discount</h1>
                <div className="table_container">
                    <table className="table_list miniTable">
                        <thead className="textRed">
                            <tr>
                                <th>Charge</th>
                                <th>Description</th>
                                <th>Amount</th>
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
                    {isLoading && (
                        <div className="w-full flex justify-center items-center">
                            <aside className="text-center flex justify-center py-5">
                                <BarLoader
                                    color={"#8f384d"}
                                    height="10px"
                                    width="200px"
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </aside>
                        </div>
                    )}
                    {isError && <TableErrorMessage />}
                </div>
                <TableOneTotal total={0} label="Total Discount" redBG={false} />
                <div className="DropDownSave">
                    <button
                        className="ddback"
                        onClick={() => setDiscountToggle(false)}
                    >
                        CANCEL
                    </button>

                    <button className="buttonRed" onClick={SaveHandler}>
                        {isLoading ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "SAVE"
                        )}
                    </button>
                </div>
            </div>
        </ModalTemp>
    );
}

type ListProps = {
    itemDetail: isProvisionalTable;
    isTable: isProvisionalTable[];
    setTable: Function;
    index: number;
};

const List = ({ itemDetail, isTable, setTable, index }: ListProps) => {
    const AddRow = (e: any) => {
        const random = Math.random();
        setTable([
            ...isTable,
            {
                id: random,
                back_id: "",
                charge: "",
                charge_id: "",
                description: "",
                amount: 0,
            },
        ]);
    };
    const RemoveRow = () => {
        setTable((item: isProvisionalTable[]) =>
            item.filter((x: isProvisionalTable) => x.id !== itemDetail.id)
        );
    };

    const updateValue = (keyField: string, value: any) => {
        const closeToUpdate = isTable.map((item: isProvisionalTable) => {
            if (item.id === itemDetail.id) {
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "charge") {
                    const charge_id = value.target.getAttribute("data-id");
                    const charge = value.target.innerHTML;
                    const description =
                        value.target.getAttribute("data-description");
                    return {
                        ...item,
                        charge_id: charge_id,
                        charge: charge,
                        description: description,
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
                    className="field mini"
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field mini"
                    onChange={(e) => {
                        updateValue("description", e.target.value);
                    }}
                    value={itemDetail?.description}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={"field mini number text-end"}
                    value={Number(itemDetail?.amount)}
                    onChange={updateValue}
                    type={"amount"}
                />
            </td>
            <td className="actionIcon">
                {isTable.length > 1 && (
                    <div onClick={RemoveRow}>
                        <HiMinus className=" text-ThemeRed" />
                    </div>
                )}
                {isTable.length - 1 === index && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddRow(e)}
                    >
                        <BsPlusLg className=" text-ThemeRed" />
                    </div>
                )}
            </td>
        </tr>
    );
};
