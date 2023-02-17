import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import Calendar from "../../Calendar";
import DropdownSearch from "../../DropdownSearch";
import DropDownCOA from "./DropdownCOA";
import { validateCreditDebitField } from "../OpeningBalance/ValidateCreditDebitField";
import { InputNumberForTable, TextNumberDisplay } from "../../NumberFormat";
import AppContext from "../../Context/AppContext";
import { CreateDraftJournal, CreateJournal, UpdateJournal } from "./Query";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/router";

type defaultArray = defaultObject[];
type defaultObject = {
    id: number | string;
    account_id: string | number;
    accountName: string;
    accountCode: number | string;
    debit: string | number;
    credit: string | number;
};
type Props = {
    DefaultValue: defaultArray;
    DefaultDateValue: string;
    DefaultParticulars: string;
    type: string;
    id?: string | number;
    DefaultStatus: string;
};

export default function JournalForm({
    DefaultValue,
    DefaultDateValue,
    DefaultParticulars,
    type,
    id,
    DefaultStatus,
}: Props) {
    const router = useRouter();
    let buttonClicked = "";
    const { setPrompt } = useContext(AppContext);
    const [isSave, setSave] = useState(false);

    const [isDefault, setDefault] = useState<defaultArray>(DefaultValue);
    const [isDate, setDate] = useState({
        value: DefaultDateValue,
        toggle: false,
    });
    const [isParticulars, setParticulars] = useState(DefaultParticulars);

    // TOTAL
    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    useEffect(() => {
        setTotalDebit(0);
        setTotalCredit(0);
        isDefault.map((item: defaultObject) => {
            setTotalDebit((temp) => Number(temp) + Number(item.debit));
            setTotalCredit((temp) => Number(temp) + Number(item.credit));
        });
    }, [isDefault]);

    const onSuccess = () => {
        if (buttonClicked === "new") {
            setPrompt({
                toggle: true,
                message: "Journal successfully saved!",
                type: "success",
            });
            setDefault([
                {
                    id: "",
                    account_id: "",
                    accountName: "",
                    accountCode: "",
                    debit: "",
                    credit: "",
                },
            ]);
        }
        if (buttonClicked === "save" || buttonClicked === "draft") {
            setPrompt({
                toggle: true,
                message: "Journal successfully saved!",
                type: "success",
            });
            router.push("/finance/general-ledger/journal/journal-list");
        }
    };
    const onError = () => {
        setPrompt({
            toggle: true,
            message: "Something is wrong!",
            type: "error",
        });
    };

    const { isLoading: saveLoading, mutate: saveMutate } = CreateJournal(
        onSuccess,
        onError
    );
    const { isLoading: updateLoading, mutate: updateMutate } = UpdateJournal(
        onSuccess,
        onError,
        id
    );
    const { isLoading: draftLoading, mutate: draftMutate } = CreateDraftJournal(
        onSuccess,
        onError
    );

    const SaveHandler = (button: string) => {
        buttonClicked = button;
        let validate = true;
        if (isDate.value === "" || isParticulars === "") {
            setPrompt({
                message: "Please fill out field!",
                toggle: true,
                type: "draft",
            });
            return;
        }

        const journal = isDefault.map((item: defaultObject) => {
            if (item.account_id === "") {
                setPrompt({
                    message: "Please fill out field!",
                    toggle: true,
                    type: "draft",
                });
                validate = false;
                return;
            } else if (item.debit === "0" && item.credit === "0") {
                setPrompt({
                    message: "Please input a value on debit or credit!",
                    toggle: true,
                    type: "draft",
                });
                validate = false;
                return;
            } else {
                validate = true;
                return {
                    chart_of_account_id: Number(item.account_id),
                    debit: Number(item.debit),
                    credit: Number(item.credit),
                };
            }
        });
        const PayloadUpdate = {
            date: isDate.value,
            particulars: isParticulars,
            status: DefaultStatus,
            journal: journal,
        };
        const PayloadSave = {
            date: isDate.value,
            particulars: isParticulars,
            journal: journal,
        };

        if (!validate) return;

        if (button === "save" || button === "new") {
            if (type === "create") {
                saveMutate(PayloadSave);
            } else {
                updateMutate(PayloadUpdate);
            }
        }
        if (button === "draft") {
            draftMutate(PayloadSave);
        }
    };
    return (
        <>
            <div>
                <ul className="flex flex-wrap justify-between pb-8 mb-8 border-b border-gray-300">
                    <li className="w-[20%] 1366px:w-[30%] 820px:w-full 820px:mb-5 flex items-center">
                        <p className=" labelField">DATE</p>
                        <div className="calendar">
                            <span className="cal">
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
                                placeholder="dd/mm/yyyy"
                                onClick={() =>
                                    setDate({ ...isDate, toggle: true })
                                }
                                className="px-2 h-10 1550px:h-8 outline-none rounded-md shadow-md"
                            />
                            {isDate.toggle && (
                                <Calendar value={isDate} setValue={setDate} />
                            )}
                        </div>
                    </li>
                    <li className="w-[75%] max-w-[850px] 1366px:w-[65%] 820px:w-full flex items-center">
                        <p className=" labelField">PARTICULARS</p>
                        <input
                            type="text"
                            className="px-2 h-10 1550px:h-8 outline-none rounded-md shadow-md w-full"
                            value={isParticulars}
                            onChange={(e) => {
                                setParticulars(e.target.value);
                            }}
                        />
                    </li>
                </ul>
                <div className="table_container">
                    <table className="table_list forCrud">
                        <thead className="textRed">
                            <tr>
                                <th>CODE</th>
                                <th>ACCOUNT NAME</th>
                                <th>DEBIT</th>
                                <th>CREDIT</th>
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
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-wrap justify-end py-5 480px:justify-start">
                    <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                        TOTAL
                    </h1>
                    <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold mr-10">
                        <TextNumberDisplay
                            value={totalDebit}
                            className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                        />
                    </div>
                    <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold">
                        <TextNumberDisplay
                            value={totalCredit}
                            className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                        />
                    </div>
                </div>
            </div>
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

                                setSave(false);
                            }}
                        >
                            {saveLoading || draftLoading || updateLoading ? (
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

                                        setSave(false);
                                    }}
                                >
                                    SAVE & NEW
                                </button>
                            </li>
                            <li>
                                {type === "create" && (
                                    <button
                                        type="submit"
                                        onClick={() => {
                                            SaveHandler("draft");

                                            setSave(false);
                                        }}
                                    >
                                        SAVE AS DRAFT
                                    </button>
                                )}
                            </li>
                        </ul>
                    )}
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
    const AddJournal = (e: any) => {
        const random = Math.random();
        setDefault([
            ...isDefault,
            {
                id: random,
                account_id: "",
                accountCode: "",
                accountName: "",
                debit: "",
                credit: "",
            },
        ]);
    };
    const RemoveJournal = () => {
        setDefault((item: defaultArray[]) =>
            item.filter((x: any) => x.id !== itemList.id)
        );
    };
    const updateValue = (key: string, e: any) => {
        const newItems = isDefault.map((item: any) => {
            if (itemList.id == item.id) {
                if (key === "accountName") {
                    return {
                        ...item,
                        accountName: e.target.innerHTML,
                        account_id: e.target.getAttribute("data-id"),
                        accountCode: e.target.getAttribute("data-code"),
                    };
                }
            }
            return item;
        });
        setDefault(newItems);
    };
    const UpdateStateHandler = (key: string, value: any) => {
        const newItems = isDefault.map((item: any) => {
            if (itemList.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        credit: "",
                        debit: Number(value),
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: Number(value),
                        debit: "",
                    };
                }
            }
            return item;
        });
        setDefault(newItems);
    };

    const [debitValidate, setDebitValidate] = useState("");
    const [creditValidate, setcreditValidate] = useState("");

    useEffect(() => {
        validateCreditDebitField(
            itemList.debit,
            itemList.credit,
            setDebitValidate,
            setcreditValidate
        );
    }, [itemList.debit, itemList.credit]);
    return (
        <tr>
            <td className="w-[20%]">
                <h2>{itemList.accountCode}</h2>
            </td>
            <td>
                <DropDownCOA
                    UpdateStateHandler={updateValue}
                    itemDetail={itemList}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${debitValidate}`}
                    value={itemList.debit}
                    onChange={UpdateStateHandler}
                    type={"debit"}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${creditValidate}`}
                    value={itemList.credit}
                    onChange={UpdateStateHandler}
                    type={"credit"}
                />
            </td>
            <td className="actionIcon">
                {isDefault.length > 1 && (
                    <div onClick={RemoveJournal}>
                        <HiMinus />
                    </div>
                )}
                {isDefault.length - 1 === index && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddJournal(e)}
                    >
                        <BsPlusLg />
                    </div>
                )}
            </td>
        </tr>
    );
};
