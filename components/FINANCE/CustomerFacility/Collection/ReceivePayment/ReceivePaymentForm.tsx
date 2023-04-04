import React, { useContext, useEffect, useState } from "react";
import SelectDropdown from "../../../../Reusable/SelectDropdown";
import CustomerDropdown from "../../../../Dropdowns/CustomerDropdown";
import Calendar from "../../../../Reusable/Calendar";
import Image from "next/image";
import { InputNumberForForm } from "../../../../Reusable/NumberFormat";
import ProvisionalForm, { isProvisionalTable } from "./ProvisionalForm";
import AcknowledgementForm from "./AcknowledgementForm";
import OfficialForm from "./OfficialForm/OfficialForm";
import DiscountForm from "./DiscountForm";
import DropdownFieldCOA from "../../../../Dropdowns/DropdownFieldCOA";
import AppContext from "../../../../Context/AppContext";
import { format, startOfDay } from "date-fns";
import BankAccountDropDown from "../../../../Reusable/BankAccountDropDown";
import { Outstanding } from "./OfficialForm/OutStandingBalance";
import { Outright } from "./OfficialForm/OutrightAndAdvances/OutRight";
import { AdvancesType } from "./OfficialForm/OutrightAndAdvances/Advances";
import { GetCustomerOutstanding, GetCustomerSummary } from "./Query";
import { useRouter } from "next/router";

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
    customer_id: string | number;
    receipt_type: string;
    receipt_date: string;
    receipt_no: string;
    description: string;
    mode_of_payment: string;
    deposit_date: string;
    bank_account_id: string | number | any;
    reference_no: string | number | any;
    amount_paid: number | string;
    credit_tax: number | string;
};

type Deposits = {
    id: number;
    charge: string;
    charge_id: string;
    description: string;
    amount: number;
};

export type DefaultOfficial = {
    Outright: Outright[];
    Advances: AdvancesType[];
};

type Props = {
    DefaultCustomer: {
        id: string;
        name: string;
        class: string;
        property: string[] | number[];
    };
    DefaultValHeaderForm: HeaderForm;
    DefaultValAcknowledgement: Deposits[];
    DefaultProvisional: isProvisionalTable[];
    DefaultOfficial: DefaultOfficial;
    type: string;
};

export default function ReceivePaymentForm({
    DefaultCustomer,
    DefaultValHeaderForm,
    DefaultValAcknowledgement,
    DefaultOfficial,
    DefaultProvisional,
}: Props) {
    const { setPrompt } = useContext(AppContext);

    const date = new Date();
    let today = startOfDay(date);

    const [HeaderForm, setHeaderForm] = useState<HeaderForm>({
        customer_id: DefaultValHeaderForm.customer_id,
        receipt_type: DefaultValHeaderForm.receipt_type,
        receipt_date: DefaultValHeaderForm.receipt_date,
        receipt_no: DefaultValHeaderForm.receipt_no,
        description: DefaultValHeaderForm.description,
        mode_of_payment: DefaultValHeaderForm.mode_of_payment,
        deposit_date: DefaultValHeaderForm.deposit_date,
        bank_account_id: DefaultValHeaderForm.bank_account_id,
        reference_no: DefaultValHeaderForm.reference_no,
        amount_paid: DefaultValHeaderForm.amount_paid,
        credit_tax: DefaultValHeaderForm.credit_tax,
    });

    const [isCustomer, setCustomer] = useState<any>({
        id: "",
        name: "",
        class: "",
        property: [],
    });

    useEffect(() => {
        setCustomer({
            id: DefaultCustomer.id,
            name: DefaultCustomer.name,
            class: DefaultCustomer.class,
            property: DefaultCustomer.property,
        });
    }, [DefaultCustomer]);

    const [isOutStanding, setOutstanding] = useState<Outstanding[]>([]);

    const router = useRouter();

    const { isLoading, data, isError } = GetCustomerOutstanding(isCustomer.id);

    useEffect(() => {
        if (data?.status === 200) {
            const getCustomerOutstanding = data?.data[0]?.invoice_list?.map(
                (item: any) => {
                    return {
                        id: item.id,
                        document_no: data?.data[0].invoice_no,
                        charge: item.charge.name,
                        charge_id: item.charge_id,
                        description: item.description,
                        due_amount: item.amount,
                        applied_amount: 0,
                        balance: item.amount,
                    };
                }
            );
            setOutstanding(getCustomerOutstanding);
        }
    }, [data]);

    useEffect(() => {
        setHeaderForm({
            customer_id: DefaultValHeaderForm.customer_id,
            receipt_type: DefaultValHeaderForm.receipt_type,
            receipt_date: DefaultValHeaderForm.receipt_date,
            receipt_no: DefaultValHeaderForm.receipt_no,
            description: DefaultValHeaderForm.description,
            mode_of_payment: DefaultValHeaderForm.mode_of_payment,
            deposit_date: DefaultValHeaderForm.deposit_date,
            bank_account_id: DefaultValHeaderForm.bank_account_id,
            reference_no: DefaultValHeaderForm.reference_no,
            amount_paid: DefaultValHeaderForm.amount_paid,
            credit_tax: DefaultValHeaderForm.credit_tax,
        });
    }, [DefaultValHeaderForm]);

    const ResetField = () => {
        setCustomer({
            id: "",
            name: "",
            class: "",
            property: [],
        });
        setErrorToggle(false);
        setHeaderForm({
            customer_id: "",
            receipt_type: "",
            receipt_date: format(today, "MMM dd yyyy"),
            receipt_no: "",
            description: "",
            mode_of_payment: "",
            deposit_date: "",
            bank_account_id: "",
            reference_no: "",
            amount_paid: "",
            credit_tax: "",
        });
    };

    const [isErrorToggle, setErrorToggle] = useState(false);

    const [isDiscountToggle, setDiscountToggle] = useState(false);

    const [isBank, setBank] = useState({
        id: "",
        value: "",
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
            bank_account_id: isBank.id,
        });
    }, [isBank]);

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            customer_id: isCustomer.id,
        });
    }, [isCustomer]);

    const OpenDiscount = () => {
        if (isCustomer.id === "") {
            setPrompt({
                message: "Choose a customer first",
                type: "draft",
                toggle: true,
            });
        } else {
            setDiscountToggle(true);
        }
    };

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
            HeaderForm.bank_account_id === "" ||
            HeaderForm.credit_tax === "" ||
            HeaderForm.customer_id === "" ||
            HeaderForm.deposit_date === "" ||
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
            {isDiscountToggle && (
                <DiscountForm
                    setDiscountToggle={setDiscountToggle}
                    customer_id={isCustomer.id}
                />
            )}
            <div className="flex flex-wrap border-b border-gray-300 pb-10 mb-10">
                <ul className="w-[25%] flex flex-col pr-10 border-r border-gray-300">
                    <li className="w-full mb-5">
                        <label htmlFor="" className="labelField">
                            *CUSTOMER
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
                            {isCustomer?.property
                                ?.toString()
                                .replace(",", ", ")}
                        </h1>
                    </li>
                </ul>
                <ul className=" flex flex-wrap justify-between w-[75%] pl-10">
                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            *RECEIPT TYPE
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
                    </li>

                    {(HeaderForm.receipt_type === "Official" ||
                        HeaderForm.receipt_type === "Acknowledgement") && (
                        <>
                            <li className="w-[30%] -mt-1">
                                <label htmlFor="" className="labelField">
                                    *MODE OF PAYMENT
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
                                        listArray={["Cash", "Deposit"]}
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
                                    *DEPOSIT DATE
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
                                    *AMOUNT PAID
                                    <div className="relative">
                                        <InputNumberForForm
                                            className=" field w-full text-end"
                                            prefix=""
                                            keyField="amount_paid"
                                            isValue={HeaderForm.amount_paid}
                                            setValue={onChangeNumber}
                                        />
                                        <div
                                            onClick={OpenDiscount}
                                            className=" cursor-pointer absolute left-full top-[50%] translate-y-[-50%] w-5 h-5 flex justify-center items-center pl-1"
                                        >
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
                                    *CASH ACCOUNT
                                    <BankAccountDropDown
                                        isObject={isBank}
                                        setObject={setBank}
                                    />
                                    {HeaderForm.bank_account_id === "" &&
                                        isErrorToggle && (
                                            <p className="text-[10px] text-ThemeRed">
                                                Required!
                                            </p>
                                        )}
                                </label>
                            </li>
                            <li className="w-[30%]">
                                <label className="labelField flex flex-col">
                                    *REFERENCE NO.
                                    <input
                                        type="text"
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
                                        *CREDIT TAX
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
                    ResetField={ResetField}
                    DefaultProvisional={DefaultProvisional}
                />
            )}
            {HeaderForm.receipt_type === "Acknowledgement" && (
                <AcknowledgementForm
                    DefaultValue={DefaultValAcknowledgement}
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                    ResetField={ResetField}
                />
            )}
            {HeaderForm.receipt_type === "Official" && (
                <OfficialForm
                    ResetField={ResetField}
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                    DefaultOfficial={DefaultOfficial}
                    Outstanding={isOutStanding}
                    setOutstanding={setOutstanding}
                    outStandingLoading={isLoading}
                    outStandingError={isError}
                />
            )}
        </>
    );
}
