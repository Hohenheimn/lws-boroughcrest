import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Calendar from "../../Calendar";
import DynamicPopOver from "../../DynamicPopOver";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import styleSearch from "../../../styles/SearchFilter.module.scss";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";
import AppContext from "../../../components/Context/AppContext";
import { CustomerImport } from "../../../components/ReactQuery/CustomerMethod";
import PeriodCalendar from "../../PeriodCalendar";
import DropdownSearch from "../../DropdownSearch";
import BankAccountDropDown from "../../BankAccountDropDown";
import { CreateUpdateBR, GetBR } from "./Query";
import TableErrorMessage from "../../TableErrorMessage";
import { InputNumberForTable, TextNumberDisplay } from "../../NumberFormat";
import { validateCreditDebitField } from "../OpeningBalance/ValidateCreditDebitField";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";

type isTableitemArray = isTableitemObj[];

type isTableitemObj = {
    id: string | number;
    date: string;
    debit: string;
    credit: string;
    balance: string;
    remarks: string;
    document_no: string;
};

export default function TableForm() {
    const { setPrompt } = useContext(AppContext);
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    const [isBankAccount, setBankAccount] = useState({
        id: "",
        value: "",
    });
    const [isTableItem, setTableItem] = useState<isTableitemArray>([]);
    const onSucces = () => {
        setPrompt({
            toggle: true,
            message: "Subledger successfully saved!",
            type: "success",
        });
    };
    const onError = () => {
        setPrompt({
            toggle: true,
            message: "Something is wrong!",
            type: "error",
        });
    };
    const { isLoading: mutateLoading, mutate } = CreateUpdateBR(
        onSucces,
        onError
    );
    const { isLoading, isError, data } = GetBR(
        isPeriod.from,
        isPeriod.to,
        isBankAccount.id
    );
    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: any, index: number) => {
                return {
                    id: item.id,
                    date: item.date,
                    balance: item.balance,
                    remarks: item.remarks,
                    document_no: "",
                    debit:
                        item.debit === 0 || item.debit === "0"
                            ? ""
                            : item.debit,
                    credit:
                        item.credit === 0 || item.credit === "0"
                            ? ""
                            : item.credit,
                };
            });
            // Additional blank row field
            if (data?.data.length <= 0) {
                setTableItem([
                    ...CloneArray,
                    {
                        id: "",
                        date: "",
                        balance: "",
                        remarks: "",
                        document_no: "",
                        debit: "",
                        credit: "",
                    },
                ]);
            } else {
                setTableItem(CloneArray);
            }
        }
    }, [data?.status, isBankAccount, isPeriod]);

    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [prevBalance, setPrevBalance] = useState<number>(0);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    useEffect(() => {
        if (data?.status === 200) {
            setTotalDebit(0);
            setTotalCredit(0);
            setTotalBalance(0);
            isTableItem.map((item: isTableitemObj) => {
                setTotalDebit((temp) => Number(temp) + Number(item.debit));
                setTotalCredit((temp) => Number(temp) + Number(item.credit));
                setTotalBalance((temp) => Number(temp) + Number(item.balance));
            });
        }
    }, [isTableItem]);

    const SubmitHandler = () => {
        let validate = true;
        const bank_recon = isTableItem.map((item: isTableitemObj) => {
            if (item.date === "" || item.remarks === "") {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields!",
                    type: "draft",
                });
                validate = false;
                return;
            }
            if (item.debit === "" && item.credit === "") {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields!",
                    type: "draft",
                });
                validate = false;
                return;
            }

            return {
                date: item.date,
                debit: `${item.debit}`,
                credit: `${item.credit}`,
                remarks: item.remarks,
                document_no: item.document_no,
            };
        });
        const Payload = {
            bank_recon: bank_recon,
            bank_account_id: `${isBankAccount.id}`,
        };

        if (validate) mutate(Payload);
    };

    return (
        <>
            <section className={styleSearch.container}>
                <div className={styleSearch.period}>
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    <div className="flex items-center ml-5 1280px:ml-0 1280px:mt-5">
                        <p className="labelField">BANK ACCOUNT</p>
                        <BankAccountDropDown
                            isObject={isBankAccount}
                            setObject={setBankAccount}
                        />
                    </div>
                </div>

                <ul className={styleSearch.navigation}>
                    <li className={styleSearch.importExportPrint}>
                        <Tippy theme="ThemeRed" content="Export">
                            <div className={styleSearch.icon}>
                                <Image
                                    src="/Images/Export.png"
                                    layout="fill"
                                    alt="Export"
                                />
                            </div>
                        </Tippy>
                        <Tippy theme="ThemeRed" content="Import">
                            <div className={styleSearch.icon}>
                                <label htmlFor="import">
                                    <Image
                                        src="/Images/Import.png"
                                        layout="fill"
                                        alt="Import"
                                    />
                                </label>
                            </div>
                        </Tippy>
                        <input type="file" id="import" className="hidden" />
                    </li>
                </ul>
            </section>
            <div className="table_container">
                <table className="table_list forCrud">
                    <thead className="textRed">
                        <tr>
                            <th>DATE</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                            <th>BALANCE</th>
                            <th>REMARKS</th>
                            <th>DOCUMENT NO.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h1 className="text-end text-ThemeRed">
                                    TOTAL
                                </h1>
                            </td>
                            <td>
                                <TextNumberDisplay
                                    value={totalDebit}
                                    className="withPeso text-end inline-block w-full"
                                />
                            </td>
                            <td>
                                <TextNumberDisplay
                                    value={totalCredit}
                                    className="withPeso text-end inline-block w-full"
                                />
                            </td>
                            <td>
                                <TextNumberDisplay
                                    value={totalBalance}
                                    className="withPeso text-end inline-block w-full"
                                />
                            </td>
                            <td>
                                <div>
                                    <p></p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p></p>
                                </div>
                            </td>
                        </tr>
                        {isBankAccount.id === "" ? (
                            <></>
                        ) : (
                            <>
                                {isTableItem.map((item: any, index: number) => (
                                    <List
                                        itemDetail={item}
                                        key={index}
                                        isTableItem={isTableItem}
                                        setTableItem={setTableItem}
                                        rowNumber={index}
                                        setPrevBalance={setPrevBalance}
                                        prevBalance={prevBalance}
                                    />
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
                {isLoading && (
                    <div className="w-full h-full flex justify-center items-center">
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
            <div className="flex justify-end py-5 mt-20">
                <button className="button_cancel">Cancel</button>
                <button
                    className="buttonRed disabled:bg-ThemeRed50 disabled:pointer-events-none"
                    disabled={isBankAccount.id === "" ? true : false}
                    onClick={SubmitHandler}
                >
                    {mutateLoading ? (
                        <ScaleLoader color="#fff" height="10px" width="2px" />
                    ) : (
                        "SAVE"
                    )}
                </button>
            </div>
        </>
    );
}

type ListProps = {
    itemDetail: isTableitemObj;
    isTableItem: isTableitemArray;
    setTableItem: Function;
    rowNumber: number;
    setPrevBalance: Function;
    prevBalance: number | string;
};

const List = ({
    itemDetail,
    isTableItem,
    setTableItem,
    rowNumber,
    setPrevBalance,
    prevBalance,
}: ListProps) => {
    const { setPrompt } = useContext(AppContext);
    const itemData: isTableitemObj = itemDetail;
    const [isDate, setDate] = useState({
        value: itemData.date,
        toggle: false,
    });

    useEffect(() => {
        const e = "";
        UpdateStateHandler("date", e);
    }, [isDate]);

    useEffect(() => {
        setPrevBalance(itemData.balance);
    }, []);

    const UpdateStateHandler = (key: string, value: any) => {
        const newItems = isTableItem.map((item: any) => {
            if (itemData.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        debit: Number(value),
                        credit: "",
                        balance:
                            Number(prevBalance) -
                            Number(value) +
                            Number(itemData.credit),
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: Number(value),
                        debit: "",
                        balance:
                            Number(prevBalance) -
                            Number(value) +
                            Number(itemData.debit),
                    };
                }
                if (key === "date") {
                    return {
                        ...item,
                        date:
                            isDate.value === "" ? itemData.date : isDate.value,
                    };
                }
                if (key === "remarks") {
                    return {
                        ...item,
                        remarks: value,
                    };
                }
                if (key === "document_no") {
                    return {
                        ...item,
                        document_no: value,
                    };
                }
            }
            return item;
        });
        setTableItem(newItems);
    };
    const [debitValidate, setDebitValidate] = useState("");
    const [creditValidate, setcreditValidate] = useState("");

    useEffect(() => {
        validateCreditDebitField(
            itemData.debit,
            itemData.credit,
            setDebitValidate,
            setcreditValidate
        );
    }, [itemData.debit, itemData.credit]);

    const AddRowHandler = (e: any) => {
        if (isTableItem.length !== rowNumber + 1) {
            return;
        }
        const random = Math.random();
        if (itemData.date === "" || itemData.remarks === "") {
            setPrompt({
                toggle: true,
                message: "Fill out the fields!",
                type: "draft",
            });
            return;
        }
        if (itemData.debit === "" && itemData.credit === "") {
            setPrompt({
                toggle: true,
                message: "Fill out the fields!",
                type: "draft",
            });
            return;
        }
        setTableItem([
            ...isTableItem,
            {
                id: random,
                date: "",
                balance: prevBalance,
                remarks: "",
                document_no: "",
                debit: "",
                credit: "",
            },
        ]);
    };
    const RemoveRowHandler = () => {
        setTableItem((item: any[]) =>
            item.filter((x: any) => x.id !== itemData.id)
        );
    };

    return (
        <tr>
            <td>
                <DynamicPopOver
                    className="w-[200px]"
                    samewidth={false}
                    toRef={
                        <article className="calendar relative w-full">
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
                                value={itemData.date}
                                onChange={() => {}}
                                placeholder="dd/mm/yyyy"
                                onClick={() =>
                                    setDate({ ...isDate, toggle: true })
                                }
                            />
                        </article>
                    }
                    toPop={
                        <>
                            {isDate.toggle && (
                                <Calendar value={isDate} setValue={setDate} />
                            )}
                        </>
                    }
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${debitValidate}`}
                    value={itemData.debit}
                    onChange={UpdateStateHandler}
                    type={"debit"}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${creditValidate}`}
                    value={itemData.credit}
                    onChange={UpdateStateHandler}
                    type={"credit"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={itemData.balance}
                    className="withPeso text-end inline-block w-full"
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field w-full"
                    onChange={(e) => {
                        UpdateStateHandler("remarks", e.target.value);
                    }}
                    value={itemData.remarks}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field disabled w-full"
                    onChange={(e) => {
                        UpdateStateHandler("document_no", e.target.value);
                    }}
                    value={itemData.document_no}
                />
            </td>
            <td className="actionIcon">
                {isTableItem.length > 1 && (
                    <div onClick={RemoveRowHandler}>
                        <HiMinus />
                    </div>
                )}
                {isTableItem.length - 1 === rowNumber && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddRowHandler(e)}
                    >
                        <BsPlusLg />
                    </div>
                )}
            </td>
        </tr>
    );
};
