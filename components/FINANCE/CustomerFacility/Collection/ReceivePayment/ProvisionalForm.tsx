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
import { useRouter } from "next/router";

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
    DefaultProvisional: isProvisionalTable[];
    ResetField: () => void;
};

export default function ProvisionalForm({
    Error,
    headerForm,
    ResetField,
    DefaultProvisional,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    let buttonClicked = "";
    const [isSave, setSave] = useState(false);
    const [isTotal, setTotal] = useState(0);
    const [isTable, setTable] = useState<isProvisionalTable[]>([]);

    useEffect(() => {
        setTable(DefaultProvisional);
    }, [DefaultProvisional]);

    const onSuccess = () => {
        setPrompt({
            message: "Collection successfully registered!",
            type: "success",
            toggle: true,
        });
        if (buttonClicked === "new") {
            ResetField();
            setTable([
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
        } else {
            router.push(
                "/finance/customer-facility/collection/payment-register"
            );
        }
    };
    const onError = () => {
        setPrompt({
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        });
    };

    const { isLoading, mutate } = CreateCollection(onSuccess, onError);

    useEffect(() => {
        setTotal(0);
        isTable.map((item) => {
            setTotal((prevValue) => Number(prevValue) + Number(item.amount));
        });
    }, [isTable]);

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
            headerForm.receipt_date === "" ||
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
        const wareHouse = isTable.map((item: isProvisionalTable) => {
            const date = parse(item.check_date, "MMM dd yyyy", new Date());
            return {
                check_date: isValid(date) ? format(date, "yyyy-MM-dd") : "",
                description: item.description,
                check_no: item.check_no,
                bank_branch: item.bank_branch_id,
                amount: item.amount,
            };
        });
        const Payload = {
            customer_id: headerForm.customer_id,
            receipt_type: headerForm.receipt_type,
            receipt_date: isValid(receipt_date)
                ? format(receipt_date, "yyyy-MM-dd")
                : "",
            description: headerForm.description,
            check_warehouses: wareHouse,
        };

        if (validate) mutate(Payload);
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
            <TableOneTotal total={isTotal} label="Total" redBG={false} />
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
                                    {isLoading ? (
                                        <ScaleLoader
                                            color="#fff"
                                            height="10px"
                                            width="2px"
                                        />
                                    ) : (
                                        "SAVE & NEW"
                                    )}
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
