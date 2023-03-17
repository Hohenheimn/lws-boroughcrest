import React, { useContext, useEffect, useState } from "react";
import SelectDropdown from "../../../../Reusable/SelectDropdown";
import CustomerDropdown from "../../../../Dropdowns/CustomerDropdown";
import Calendar from "../../../../Reusable/Calendar";
import Image from "next/image";
import { InputNumberForForm } from "../../../../Reusable/NumberFormat";
import { useForm } from "react-hook-form";
import ProvisionalForm, { isProvisionalTable } from "./ProvisionalForm";
import AppContext from "../../../../Context/AppContext";
import AcknowledgementForm from "./AcknowledgementForm";
import OfficialForm from "./OfficialForm/OfficialForm";

export type ReceivePaymentForm = {
    description: string;
    mode_of_payment: string;
    deposit_date: string;
    cash_account: string;
    reference_no: string;
    amount_paid: string;
    credit_tax: number | string;
};

export type HeaderForm = {
    customer_id: string;
    receipt_type: string;
    receipt_date: string;
    receipt_no: string;
    description: string;
    mode_of_payment: string;
    deposit_date: string;
    cash_account: string;
    reference_no: string;
    amount_paid: number | string;
    credit_tax: number | string;
};

export default function ReceivePaymentForm() {
    const [HeaderForm, setHeaderForm] = useState<HeaderForm>({
        customer_id: "",
        receipt_type: "",
        receipt_date: "Sept 28 2022",
        receipt_no: "OR000258",
        description: "",
        mode_of_payment: "",
        deposit_date: "",
        cash_account: "",
        reference_no: "",
        amount_paid: "",
        credit_tax: "",
    });

    const [isErrorToggle, setErrorToggle] = useState(false);

    const [isCustomer, setCustomer] = useState({
        id: "",
        name: "",
        class: "",
        property: [],
    });

    const [isDepositDate, setDepositDate] = useState({
        value: "",
        toggle: false,
    });

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            deposit_date: isDepositDate.value,
        });
    }, [isDepositDate]);

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            customer_id: isCustomer.id,
        });
    }, [isCustomer]);

    const onChangeNumber = (key: string, value: number) => {
        if (key === "amount_paid") {
            setHeaderForm({
                ...HeaderForm,
                amount_paid: value,
            });
        }
        if (key === "credit_tax") {
            setHeaderForm({
                ...HeaderForm,
                credit_tax: value,
            });
        }
    };

    const ErrorToggleHandler = () => {
        if (
            HeaderForm.amount_paid === "" ||
            HeaderForm.cash_account === "" ||
            HeaderForm.credit_tax === "" ||
            HeaderForm.customer_id === "" ||
            HeaderForm.deposit_date === "" ||
            HeaderForm.description === "" ||
            HeaderForm.mode_of_payment === "" ||
            HeaderForm.receipt_date === "" ||
            HeaderForm.receipt_no === "" ||
            HeaderForm.receipt_type === "" ||
            HeaderForm.reference_no === ""
        ) {
            setErrorToggle(true);
        } else {
            setErrorToggle(false);
        }
    };

    return (
        <>
            <div className="flex flex-wrap border-b border-gray-300 pb-10 mb-10">
                <ul className="w-[25%] flex flex-col pr-10 border-r border-gray-300">
                    <li className="w-full mb-5">
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
                    <li className="w-full mb-5">
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
                            {isCustomer.property.toString().replace(",", ", ")}
                        </h1>
                    </li>
                </ul>
                <ul className=" flex flex-wrap justify-between w-[75%] pl-10">
                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT TYPE
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setHeaderForm({
                                        ...HeaderForm,
                                        receipt_type: value,
                                    });
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={HeaderForm.receipt_type}
                                        readOnly
                                    />
                                }
                                listArray={[
                                    "Official",
                                    "Acknowledgement",
                                    "Provisional",
                                ]}
                            />
                        </label>
                    </li>

                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT DATE
                        </label>
                        <h1>{HeaderForm.receipt_date}</h1>
                    </li>

                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT NO.
                        </label>
                        <h1>{HeaderForm.receipt_no}</h1>
                    </li>

                    <li className="w-full mb-5">
                        <label htmlFor="" className="labelField">
                            DESCRIPTION
                        </label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setHeaderForm({
                                    ...HeaderForm,
                                    description: e.target.value,
                                });
                            }}
                            className="field w-full"
                        />
                        {HeaderForm.description === "" && isErrorToggle && (
                            <p className="text-[10px] text-ThemeRed">
                                Required!
                            </p>
                        )}
                    </li>

                    {(HeaderForm.receipt_type === "Official" ||
                        HeaderForm.receipt_type === "Acknowledgement") && (
                        <>
                            <li className="w-[30%] -mt-1">
                                <label htmlFor="" className="labelField">
                                    MODE OF PAYMENT
                                    <SelectDropdown
                                        selectHandler={(value: string) => {
                                            setHeaderForm({
                                                ...HeaderForm,
                                                mode_of_payment: value,
                                            });
                                        }}
                                        className=""
                                        inputElement={
                                            <input
                                                value={
                                                    HeaderForm.mode_of_payment
                                                }
                                                className="w-full field"
                                                readOnly
                                            />
                                        }
                                        listArray={[
                                            "Official",
                                            "Acknowledgement",
                                            "Provisional",
                                        ]}
                                    />
                                    {HeaderForm.mode_of_payment === "" &&
                                        isErrorToggle && (
                                            <p className="text-[10px] text-ThemeRed">
                                                Required!
                                            </p>
                                        )}
                                </label>
                            </li>
                            <li className="w-[30%]">
                                <label className="labelField flex flex-col">
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
                                            value={HeaderForm.deposit_date}
                                            readOnly
                                            placeholder="MM dd yyyy"
                                            onClick={() =>
                                                setDepositDate({
                                                    ...isDepositDate,
                                                    toggle: true,
                                                })
                                            }
                                            className="field w-full"
                                        />
                                        {isDepositDate.toggle && (
                                            <Calendar
                                                value={isDepositDate}
                                                setValue={setDepositDate}
                                            />
                                        )}
                                    </div>
                                </label>
                                {HeaderForm.deposit_date === "" &&
                                    isErrorToggle && (
                                        <p className="text-[10px] text-ThemeRed">
                                            Required!
                                        </p>
                                    )}
                            </li>
                            <li className="w-[30%]">
                                <label className="labelField flex flex-col">
                                    AMOUNT PAID
                                    <div className="relative">
                                        <InputNumberForForm
                                            className=" field w-full text-end"
                                            prefix=""
                                            keyField="amount_paid"
                                            isValue={HeaderForm.amount_paid}
                                            setValue={onChangeNumber}
                                        />
                                        <div className=" cursor-pointer absolute left-full top-[50%] translate-y-[-50%] w-5 h-5 flex justify-center items-center pl-1">
                                            <Image
                                                src="/Images/f_percent_tag.png"
                                                alt=""
                                                height={15}
                                                width={15}
                                            />
                                        </div>
                                    </div>
                                </label>
                                {(HeaderForm.amount_paid === "" ||
                                    HeaderForm.amount_paid === 0) &&
                                    isErrorToggle && (
                                        <p className="text-[10px] text-ThemeRed">
                                            Required!
                                        </p>
                                    )}
                            </li>
                            <li className="w-[30%]  -mt-1">
                                <label htmlFor="" className="labelField">
                                    CASH ACCOUNT
                                    <SelectDropdown
                                        selectHandler={(value: string) => {
                                            setHeaderForm({
                                                ...HeaderForm,
                                                cash_account: value,
                                            });
                                        }}
                                        className=""
                                        inputElement={
                                            <input
                                                className="w-full field"
                                                readOnly
                                            />
                                        }
                                        listArray={[
                                            "Official",
                                            "Acknowledgement",
                                            "Provisional",
                                        ]}
                                    />
                                    {HeaderForm.cash_account === "" &&
                                        isErrorToggle && (
                                            <p className="text-[10px] text-ThemeRed">
                                                Required!
                                            </p>
                                        )}
                                </label>
                            </li>
                            <li className="w-[30%]">
                                <label className="labelField flex flex-col">
                                    REFERENCE NO.
                                    <input
                                        type="number"
                                        value={HeaderForm.reference_no}
                                        onChange={(e) => {
                                            setHeaderForm({
                                                ...HeaderForm,
                                                reference_no: e.target.value,
                                            });
                                        }}
                                        className="field w-full"
                                    />
                                </label>
                                {HeaderForm.reference_no === "" &&
                                    isErrorToggle && (
                                        <p className="text-[10px] text-ThemeRed">
                                            Required!
                                        </p>
                                    )}
                            </li>
                            {HeaderForm.receipt_type !== "Official" && (
                                <li className="w-[30%]"></li>
                            )}
                            {HeaderForm.receipt_type === "Official" && (
                                <li className="w-[30%]">
                                    <label className="labelField flex flex-col">
                                        CREDIT TAX
                                        <InputNumberForForm
                                            className=" field w-full text-end"
                                            prefix=""
                                            isValue={HeaderForm.credit_tax}
                                            setValue={onChangeNumber}
                                            keyField="credit_tax"
                                        />
                                    </label>
                                    {HeaderForm.credit_tax === "" &&
                                        isErrorToggle && (
                                            <p className="text-[10px] text-ThemeRed">
                                                Required!
                                            </p>
                                        )}
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>
            {HeaderForm.receipt_type === "Provisional" && (
                <ProvisionalForm
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                />
            )}
            {HeaderForm.receipt_type === "Acknowledgement" && (
                <AcknowledgementForm
                    DefaultValue={[
                        {
                            id: 1,
                            charge: "",
                            charge_id: "",
                            description: "",
                            amount: 0,
                        },
                    ]}
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                />
            )}
            {HeaderForm.receipt_type === "Official" && (
                <OfficialForm
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                />
            )}
        </>
    );
}
