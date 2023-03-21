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
import CreateDeposit from "../../../../../pages/finance/customer-facility/deposit-counter/create-deposit";
import { CreateCollection } from "./Query";
import { format, isValid, parse } from "date-fns";

export type isProvisionalTable = {
    id: string | number;
    check_date: string;
    description: string;
    check_no: string;
    bank_branch: string;
    bank_branch_id: string;
    amount: number | string;
};

type Props = {
    Error: () => void;
    headerForm: HeaderForm;
};

export default function ProvisionalForm({ Error, headerForm }: Props) {
    const { setPrompt } = useContext(AppContext);
    let buttonClicked = "";
    const [isSave, setSave] = useState(false);
    const [isTable, setTable] = useState<isProvisionalTable[]>([
        {
            id: 1,
            check_date: "",
            description: "",
            check_no: "",
            bank_branch: "",
            bank_branch_id: "",
            amount: 0,
        },
    ]);

    const onSuccess = () => {};
    const onError = () => {};

    const { isLoading, mutate } = CreateCollection(onSuccess, onError);

    const SaveHandler = (button: string) => {
        buttonClicked = button;
        let validate = true;
        isTable.map((provItem: isProvisionalTable) => {
            if (
                provItem.amount === "" ||
                provItem.bank_branch === "" ||
                provItem.bank_branch_id === "" ||
                provItem.check_date === "" ||
                provItem.check_no === "" ||
                provItem.description === ""
            ) {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields!",
                    type: "draft",
                });
                validate = false;
                return;
            }
        });
        if (
            headerForm.customer_id === "" ||
            headerForm.description === "" ||
            headerForm.receipt_date === "" ||
            headerForm.receipt_no === "" ||
            headerForm.receipt_type === ""
        ) {
            setPrompt({
                toggle: true,
                message: "Fill out the fields!",
                type: "draft",
            });
            validate = false;
            return;
        }
        const receipt_date = parse(
            headerForm.receipt_date,
            "MMM dd yyyy",
            new Date()
        );
        const Payload = {
            customer_id: headerForm.customer_id,
            receipt_type: headerForm.receipt_type,
            receipt_date: isValid(receipt_date)
                ? format(receipt_date, "yyyy-MM-dd")
                : "",
            receipt_no: headerForm.receipt_no,
            description: headerForm.description,
            wareHouse: isTable.map((item: isProvisionalTable) => {
                const date = parse(item.check_date, "MMM dd yyyy", new Date());
                return {
                    check_date: isValid(date) ? format(date, "yyyy-MM-dd") : "",
                    description: item.description,
                    check_no: item.check_no,
                    bank_branch_id: item.bank_branch_id,
                    amount: item.amount,
                };
            }),
        };
        if (validate) console.log(Payload);
    };

    return (
        <div>
            <h1 className="SectionTitle mb-5">Check Warehouse</h1>
            <div className="table_container">
                <table className="table_list journal">
                    <thead className="textRed">
                        <tr>
                            <th>CHECK DATE</th>
                            <th>DESCRIPTION</th>
                            <th>CHECK NO.</th>
                            <th>BANK & BRANCH</th>
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
            <TableOneTotal total={123123} label="Total" redBG={false} />
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
        </div>
    );
}

type ListProps = {
    itemDetail: isProvisionalTable;
    isTable: isProvisionalTable[];
    setTable: Function;
    index: number;
};

const List = ({ itemDetail, isTable, setTable, index }: ListProps) => {
    const [isDate, setDate] = useState({
        value: itemDetail?.check_date,
        toggle: false,
    });
    const [isBank, setBank] = useState({
        id: itemDetail?.bank_branch_id,
        value: itemDetail?.bank_branch,
    });

    const AddRow = (e: any) => {
        const random = Math.random();
        setTable([
            ...isTable,
            {
                id: random,
                check_date: "",
                description: "",
                check_no: "",
                bank_branch: "",
                bank_branch_id: "",
                amount: "",
            },
        ]);
    };
    const RemoveRow = () => {
        setTable((item: isProvisionalTable[]) =>
            item.filter((x: isProvisionalTable) => x.id !== itemDetail.id)
        );
    };

    useEffect(() => {
        updateValue("date", isDate.value);
    }, [isDate]);

    useEffect(() => {
        updateValue("bank_branch", isBank.value);
    }, [isBank]);

    const updateValue = (keyField: string, value: string | number) => {
        const closeToUpdate = isTable.map((item: isProvisionalTable) => {
            if (item.id === itemDetail.id) {
                if (keyField === "date") {
                    return {
                        ...item,
                        check_date:
                            isDate.value === ""
                                ? itemDetail.check_date
                                : isDate.value,
                    };
                }
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "check_no") {
                    return {
                        ...item,
                        check_no: value,
                    };
                }
                if (keyField === "bank_branch") {
                    return {
                        ...item,
                        bank_branch: isBank.value,
                        bank_branch_id: isBank.id,
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
                <article className="calendar  relative">
                    <span className="cal ">
                        <Image
                            src="/Images/CalendarMini.png"
                            width={15}
                            height={15}
                            alt=""
                        />
                    </span>
                    <input
                        type="text"
                        value={isDate.value}
                        onChange={() => {}}
                        placeholder="MM dd yyyy"
                        onClick={() => setDate({ ...isDate, toggle: true })}
                    />
                    {isDate.toggle && (
                        <Calendar value={isDate} setValue={setDate} />
                    )}
                </article>
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
                <input
                    type="text"
                    className="field"
                    onChange={(e) => {
                        updateValue("check_no", e.target.value);
                    }}
                    value={itemDetail?.check_no}
                />
            </td>
            <td>
                <BankAccountDropDown isObject={isBank} setObject={setBank} />
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
