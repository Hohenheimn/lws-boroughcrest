import React, { useEffect, useState } from "react";
import CustomerDropdown from "../../../Dropdowns/CustomerDropdown";
import SelectDropdown from "../../../Reusable/SelectDropdown";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import Image from "next/image";
import Calendar from "../../../Reusable/Calendar";
import { FadeSide } from "../../../Animation/SimpleAnimation";
import { AnimatePresence, motion } from "framer-motion";
import DropDownCharge from "../../../Dropdowns/DropDownCharge";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import ChargeTransaction from "./ChargeTransaction";
import AccountTable from "./AccountTable";
import { RiArrowDownSFill } from "react-icons/ri";

export type AdjustmentHeaderForm = {
    customer_id: number;
    memo_type: string;
    memo_date: string;
    description: string;
    charge_id_header: string | number;
    charge_id: string | number;
    document_no: string;
};

export type AdjustmentAccounts = {
    id: number;
    coa_id: number;
    chart_code: string;
    account_name: string;
    debit: number;
    credit: number;
};

export default function AdjustmentForm() {
    const [isSave, setSave] = useState(false);
    const [toggleForm, setToggleForm] = useState(false);
    const [AdvancesToggle, setAdvancesToggle] = useState(false);
    const [isCustomer, setCustomer] = useState<any>({
        id: 0,
        name: "",
        class: "",
        property: [],
    });
    const [isChargeHeader, setChargeHeader] = useState({
        charge: "",
        charge_id: 0,
    });
    const [isMemoDate, setMemoDate] = useState({
        value: "",
        toggle: false,
    });
    const [isErrorToggle, setErrorToggle] = useState(false);

    const [HeaderForm, setHeaderForm] = useState<AdjustmentHeaderForm>({
        customer_id: 0,
        memo_date: "",
        memo_type: "",
        description: "",
        charge_id_header: "",
        charge_id: "",
        document_no: "",
    });

    const [isAccounts, setAccounts] = useState<AdjustmentAccounts[]>([
        {
            id: 1,
            coa_id: 1,
            chart_code: "123",
            account_name: "123",
            debit: 1000,
            credit: 0,
        },
    ]);

    const [isCharge, setCharge] = useState({
        charge: "",
        charge_id: 0,
    });

    const [isTransaction, setTransaction] = useState("");

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            customer_id: isCustomer.id,
        });
    }, [isCustomer]);
    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            memo_date: isMemoDate.value,
        });
    }, [isMemoDate]);
    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            charge_id_header: Number(isChargeHeader.charge_id),
        });
    }, [isChargeHeader]);

    const SaveHandler = (button: string) => {
        console.log(button);
        console.log(isAccounts);
    };

    return (
        <>
            <div className="flex flex-wrap border-b border-gray-300">
                {!toggleForm ? (
                    <motion.div
                        key={1}
                        variants={FadeSide}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-wrap w-full"
                    >
                        <ul className="w-[25%] 640px:w-full 640px:border-none flex flex-col pr-10 pb-10 1550px:pr-5 1550px:pb-5 border-r border-gray-300">
                            <li className="w-full mb-5 640px:mb-2">
                                <label htmlFor="" className="labelField">
                                    CUSTOMER
                                </label>
                                <CustomerDropdown
                                    isCustomer={isCustomer}
                                    setCustomer={setCustomer}
                                />
                                {isCustomer.id === "" && isErrorToggle && (
                                    <p className="text-[10px]">Required!</p>
                                )}
                            </li>
                            <li className="w-full mb-5 640px:mb-2">
                                <label htmlFor="" className="labelField">
                                    CLASS
                                </label>
                                <h1>{isCustomer.class}</h1>
                            </li>
                            <li>
                                <label htmlFor="" className="labelField">
                                    PROPERTIES
                                </label>
                                <h1>
                                    {isCustomer?.property
                                        ?.toString()
                                        .replace(",", ", ")}
                                </h1>
                            </li>
                        </ul>
                        <ul className=" flex flex-wrap justify-between w-[75%] 640px:w-full 640px:pl-0 pl-10  pb-10 1550px:pl-5 1550px:pb-5">
                            <li className="w-[30%] 640px:w-2/4 pr-5">
                                <label htmlFor="" className="labelField">
                                    MEMO TYPE
                                    <SelectDropdown
                                        selectHandler={(value: string) => {
                                            setHeaderForm({
                                                ...HeaderForm,
                                                memo_type: value,
                                            });
                                        }}
                                        className=""
                                        inputElement={
                                            <input
                                                className="w-full field"
                                                value={HeaderForm.memo_type}
                                                readOnly
                                            />
                                        }
                                        listArray={[
                                            "Credit Note",
                                            "Debit Note",
                                        ]}
                                    />
                                </label>
                            </li>
                            <li className="w-[30%] 640px:w-2/4">
                                <DynamicPopOver
                                    toRef={
                                        <label className="labelField flex flex-col mt-1">
                                            DEPOSIT DATE
                                            <div className="calendar">
                                                <span className="cal">
                                                    <Image
                                                        src="/Images/CalendarMini.png"
                                                        width={15}
                                                        height={15}
                                                    />
                                                </span>
                                                <input
                                                    autoComplete="off"
                                                    type="text"
                                                    value={isMemoDate.value}
                                                    readOnly
                                                    placeholder="MM dd yyyy"
                                                    onClick={() =>
                                                        setMemoDate({
                                                            ...isMemoDate,
                                                            toggle: true,
                                                        })
                                                    }
                                                    className="field w-full"
                                                />
                                            </div>
                                        </label>
                                    }
                                    toPop={
                                        <>
                                            {isMemoDate.toggle === true && (
                                                <Calendar
                                                    value={isMemoDate}
                                                    setValue={setMemoDate}
                                                />
                                            )}
                                        </>
                                    }
                                    className={""}
                                />

                                {isMemoDate.value === "" && isErrorToggle && (
                                    <p className="text-[10px] text-ThemeRed">
                                        Required!
                                    </p>
                                )}
                            </li>
                            <li className="w-[30%]"></li>

                            <li className="w-full mb-5">
                                <label htmlFor="" className="labelField">
                                    DESCRIPTION
                                </label>
                                <input
                                    type="text"
                                    className="field w-full"
                                    onChange={(e) =>
                                        setHeaderForm({
                                            ...HeaderForm,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </li>
                            <li className="w-full flex justify-end">
                                <div
                                    onClick={() =>
                                        setAdvancesToggle(!AdvancesToggle)
                                    }
                                    className={`cursor-pointer duration-300 ease-in-out delay-100 text-[#828282] relative h-[28px]  py-[2px] px-[10px] rounded-[50px] ${
                                        AdvancesToggle
                                            ? "pr-[30px] bg-[#4a4a4a]"
                                            : "pl-[30px] bg-[#b7b7b7]"
                                    }`}
                                >
                                    <p className=" -mt-[1px]">Advances</p>
                                    <div
                                        className={`h-[20px] duration-300 ease-in-out w-[20px] rounded-full absolute top-[50%] translate-y-[-50%] ${
                                            AdvancesToggle
                                                ? "right-[5px] bg-ThemeRed "
                                                : "right-[85px] bg-[#4a4a4a]"
                                        }`}
                                    ></div>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                ) : (
                    <motion.div
                        key={2}
                        variants={FadeSide}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full pb-10 1550px:pb-5"
                    >
                        <ul className="flex w-full 640px:flex-wrap pr-10 640px:pr-0 1550px:pr-5 1550px:mb-3 mb-5">
                            <li className="flex items-center  640px:w-full">
                                <label htmlFor="" className="labelField">
                                    CHARGE
                                </label>
                                <DropDownCharge
                                    UpdateStateHandler={(key, e) => {
                                        setChargeHeader({
                                            charge: e.target.innerHTML,
                                            charge_id:
                                                e.target.getAttribute(
                                                    "data-id"
                                                ),
                                        });
                                    }}
                                    itemDetail={isChargeHeader}
                                />
                            </li>
                            <li className="flex items-center ml-5 640px:w-full 640px:ml-0 640px:mt-5">
                                <label htmlFor="" className="labelField">
                                    DOCUMENT&nbsp;NO.
                                </label>
                                <input
                                    type="text"
                                    className="field 640px:w-full"
                                    value={HeaderForm.document_no}
                                    onChange={(e) =>
                                        setHeaderForm({
                                            ...HeaderForm,
                                            document_no: e.target.value,
                                        })
                                    }
                                />
                            </li>
                        </ul>
                        <div className="table_container hAuto">
                            <table className="table_list">
                                <thead className="textRed">
                                    <tr>
                                        <th>DOCUMENT DATE</th>
                                        <th>DOCUMENT NO</th>
                                        <th>DESCRIPTION</th>
                                        <th>CHART CODE</th>
                                        <th>ACCOUNT NAME</th>
                                        <th>DEBIT AMOUNT</th>
                                        <th>CREDIT AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody className="textBlack">
                                    <tr>
                                        <td>Sep 10 2022</td>
                                        <td>INV0001</td>
                                        <td>Lorem Ipsum</td>
                                        <td>0000001</td>
                                        <td>A/R Assoc Deus</td>
                                        <td>
                                            <TextNumberDisplay
                                                className="withPeso w-full text-end"
                                                value={1000}
                                            />
                                        </td>
                                        <td>
                                            <TextNumberDisplay
                                                className="withPeso w-full text-end"
                                                value={1000}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
                <div className="relative w-full -mt-10 ">
                    <div className="flex justify-center mt-5 absolute top-0 left-[50%] translate-x-[-50%]">
                        <ul className="switchButton">
                            <li
                                className={`${!toggleForm && "active"}`}
                                onClick={() => setToggleForm(false)}
                            ></li>
                            <li
                                className={`${toggleForm && "active"}`}
                                onClick={() => setToggleForm(true)}
                            ></li>
                        </ul>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {!AdvancesToggle && (
                    <motion.div
                        key={1}
                        variants={FadeSide}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <ChargeTransaction
                            HeaderForm={HeaderForm}
                            setHeaderForm={setHeaderForm}
                            isCharge={isCharge}
                            setCharge={setCharge}
                            setTransaction={setTransaction}
                            isTransaction={isTransaction}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <AccountTable
                toggle={AdvancesToggle}
                isAccounts={isAccounts}
                setAccounts={setAccounts}
            />
            <div className="flex w-full justify-end mb-10 1550px:mb-5">
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
