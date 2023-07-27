import React, { useContext, useEffect, useState } from "react";
import { format, startOfDay } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";

import AppContext from "../../../../Context/AppContext";
import CustomerDropdown from "../../../../Dropdowns/CustomerDropdown";
import DropdownFieldCOA from "../../../../Dropdowns/DropdownFieldCOA";
import Calendar from "../../../../Reusable/Calendar";
import DynamicPopOver from "../../../../Reusable/DynamicPopOver";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { InputNumberForForm } from "../../../../Reusable/NumberFormat";
import SelectDropdown from "../../../../Reusable/SelectDropdown";
import { Type_Invoice_list } from "../../Adjustment/AdjustmentForm";
import { GetInvoiceByCustomerPostedOnly } from "../../Adjustment/Query";
import AcknowledgementForm from "./AcknowledgementForm";
import DiscountForm from "./DiscountForm";
import OfficialForm from "./OfficialForm/OfficialForm";
import { AdvancesType } from "./OfficialForm/OutrightAndAdvances/Advances";
import { Outright } from "./OfficialForm/OutrightAndAdvances/OutRight";
import { Outstanding } from "./OfficialForm/OutStandingBalance";
import ProvisionalForm, { isProvisionalTable } from "./ProvisionalForm";

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
    chart_of_account_id: string | number | any;
    chart_of_account_name: string;
    reference_no: string | number | any;
    amount_paid: number | string;
    credit_tax: number | string;
    discount: number;
};

export type Deposits = {
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
    DefaultOfficialOutrightAdvances: DefaultOfficial;
    type: string;
};

export default function ReceivePaymentForm({
    DefaultCustomer,
    DefaultValHeaderForm,
    DefaultValAcknowledgement,
    DefaultOfficialOutrightAdvances,
    DefaultProvisional,
}: Props) {
    const router = useRouter();

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
        chart_of_account_id: DefaultValHeaderForm.chart_of_account_id,
        reference_no: DefaultValHeaderForm.reference_no,
        amount_paid: DefaultValHeaderForm.amount_paid,
        credit_tax: DefaultValHeaderForm.credit_tax,
        discount: DefaultValHeaderForm.discount,
        chart_of_account_name: DefaultValHeaderForm.chart_of_account_name,
    });

    useEffect(() => {
        if (HeaderForm.mode_of_payment === "Cash") {
            setHeaderForm({
                ...HeaderForm,
                reference_no: "",
                deposit_date: "",
            });
        }
    }, [HeaderForm.mode_of_payment]);

    const [applyDiscount, setApplyDiscount] = useState(false);

    const [isCustomer, setCustomer] = useState<any>({
        id: "",
        name: "",
        class: "",
        property: [],
    });

    useEffect(() => {
        setHeaderForm({
            customer_id: DefaultValHeaderForm.customer_id,
            receipt_type: DefaultValHeaderForm.receipt_type,
            receipt_date: DefaultValHeaderForm.receipt_date,
            receipt_no: DefaultValHeaderForm.receipt_no,
            description: DefaultValHeaderForm.description,
            mode_of_payment: DefaultValHeaderForm.mode_of_payment,
            deposit_date: DefaultValHeaderForm.deposit_date,
            chart_of_account_id: DefaultValHeaderForm.chart_of_account_id,
            reference_no: DefaultValHeaderForm.reference_no,
            amount_paid: DefaultValHeaderForm.amount_paid,
            credit_tax: DefaultValHeaderForm.credit_tax,
            discount: DefaultValHeaderForm.discount,
            chart_of_account_name: DefaultValHeaderForm.chart_of_account_name,
        });

        setCustomer({
            id: DefaultCustomer.id,
            name: DefaultCustomer.name,
            class: DefaultCustomer.class,
            property: DefaultCustomer.property,
        });
    }, [DefaultValHeaderForm, DefaultCustomer]);

    const [isOutStanding, setOutstanding] = useState<Outstanding[]>([]);

    // const { isLoading, data, isError } = GetCustomerOutstanding(isCustomer.id);

    const { isLoading, data, isError } = GetInvoiceByCustomerPostedOnly(
        isCustomer.id
    );

    useEffect(() => {
        if (data?.status === 200) {
            let Discount_Total = 0;
            let getCustomerOutstanding = data?.data.map(
                (item: Type_Invoice_list) => {
                    let balance = 0;
                    if (applyDiscount) {
                        balance =
                            Number(item.due_amount) -
                            Number(item.discount_amount);
                    } else {
                        balance = Number(item.due_amount) - 0;
                    }
                    Discount_Total =
                        Number(Discount_Total) + Number(item.discount_amount);
                    return {
                        id: item.id,
                        billing_invoice_id: item.billing_invoice_id,
                        document_no: item.document_no,
                        charge: item.name,
                        charge_id: item.charge_id,
                        description: item.description,
                        due_amount: item.due_amount,
                        applied_amount: applyDiscount
                            ? item.discount_amount
                            : 0,
                        balance: balance,
                        discount_ids: item.discount_ids,
                    };
                }
            );
            setOutstanding(
                getCustomerOutstanding === undefined
                    ? []
                    : getCustomerOutstanding
            );
            setDiscountToggle({
                value: Discount_Total,
                toggle: false,
            });
        }
    }, [data?.data, applyDiscount]);

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
            chart_of_account_id: "",
            chart_of_account_name: "",
            reference_no: "",
            amount_paid: "",
            credit_tax: "",
            discount: 0,
        });
    };

    const [isCancel, setCancel] = useState(false);

    const CancelHandler = () => {
        setCancel(true);
    };

    const [isErrorToggle, setErrorToggle] = useState(false);

    const [isDiscount, setDiscountToggle] = useState({
        value: DefaultValHeaderForm.discount,
        toggle: false,
    });

    useEffect(() => {
        setDiscountToggle({
            value: DefaultValHeaderForm.discount,
            toggle: false,
        });
    }, [DefaultValHeaderForm]);

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            discount: applyDiscount ? isDiscount.value : 0,
        });
    }, [isDiscount.value, applyDiscount]);

    const [isChartOAccount, setChartOfAccount] = useState({
        id: DefaultValHeaderForm.chart_of_account_id,
        value: DefaultValHeaderForm.chart_of_account_name,
    });

    useEffect(() => {
        setChartOfAccount({
            id: DefaultValHeaderForm.chart_of_account_id,
            value: DefaultValHeaderForm.chart_of_account_name,
        });
    }, [DefaultValHeaderForm]);

    const [DepositDateRP, setDepositDateRP] = useState<{
        value: string;
        toggle: boolean;
    }>({
        value: "",
        toggle: false,
    });

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            deposit_date: DepositDateRP.value,
        });
    }, [DepositDateRP]);

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            chart_of_account_id: isChartOAccount.id,
        });
    }, [isChartOAccount]);

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
            setDiscountToggle({
                ...isDiscount,
                toggle: true,
            });
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
            HeaderForm.chart_of_account_id === "" ||
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
            {isCancel && (
                <ModalTemp narrow={true}>
                    <h1 className="text-center mb-5 text-[20px]">
                        Are you sure you want to cancel ?
                    </h1>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className="button_cancel"
                            onClick={() => setCancel(false)}
                        >
                            NO
                        </button>
                        <button
                            className="buttonRed"
                            onClick={() =>
                                router.push(
                                    "/finance/customer-facility/collection/payment-register"
                                )
                            }
                        >
                            YES
                        </button>
                    </div>
                </ModalTemp>
            )}
            {isDiscount.toggle && (
                <DiscountForm
                    setDiscountToggle={setDiscountToggle}
                    isDiscount={isDiscount}
                    customer_id={isCustomer.id}
                    setApplyDiscount={setApplyDiscount}
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
                            *RECEIPT&nbsp;TYPE
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
                                        className={`w-full field ${
                                            router.query.from ===
                                                "check_warehouse" && "disabled"
                                        }`}
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
                            RECEIPT&nbsp;DATE
                        </label>
                        <h1>{HeaderForm.receipt_date}</h1>
                    </li>

                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT&nbsp;NO.
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
                            value={HeaderForm.description}
                            className="field w-full"
                        />
                    </li>

                    {(HeaderForm.receipt_type === "Official" ||
                        HeaderForm.receipt_type === "Acknowledgement") && (
                        <>
                            <li className="w-[30%] -mt-1">
                                <label htmlFor="" className="labelField">
                                    *MODE&nbsp;OF&nbsp;PAYMENT
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
                                <DynamicPopOver
                                    toRef={
                                        <label className="labelField flex flex-col">
                                            *DEPOSIT&nbsp;DATE
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
                                                    value={
                                                        HeaderForm.deposit_date
                                                    }
                                                    readOnly
                                                    placeholder="MM dd yyyy"
                                                    onClick={() =>
                                                        setDepositDateRP({
                                                            ...DepositDateRP,
                                                            toggle:
                                                                HeaderForm.mode_of_payment ===
                                                                "Cash"
                                                                    ? false
                                                                    : true,
                                                        })
                                                    }
                                                    className={`field w-full ${
                                                        HeaderForm.mode_of_payment ===
                                                            "Cash" &&
                                                        "pointer-events-none disabled"
                                                    }`}
                                                />
                                            </div>
                                        </label>
                                    }
                                    toPop={
                                        <>
                                            {DepositDateRP.toggle === true && (
                                                <Calendar
                                                    value={DepositDateRP}
                                                    setValue={setDepositDateRP}
                                                />
                                            )}
                                        </>
                                    }
                                    className={""}
                                />

                                {HeaderForm.deposit_date === "" &&
                                    (HeaderForm.mode_of_payment === "Deposit" ||
                                        HeaderForm.mode_of_payment === "") &&
                                    isErrorToggle && (
                                        <p className="text-[10px] text-ThemeRed">
                                            Required!
                                        </p>
                                    )}
                            </li>
                            <li className="w-[30%]">
                                <label className="labelField flex flex-col">
                                    *AMOUNT&nbsp;PAID
                                    <div className="relative">
                                        <InputNumberForForm
                                            className=" field w-full text-end"
                                            prefix=""
                                            keyField="amount_paid"
                                            isValue={HeaderForm.amount_paid}
                                            setValue={onChangeNumber}
                                        />
                                        {router.query.from !==
                                            "check_warehouse" && (
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
                                        )}
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
                                    *CASH&nbsp;ACCOUNT
                                    <DropdownFieldCOA
                                        className={"field"}
                                        value={isChartOAccount.value}
                                        setValue={setChartOfAccount}
                                    />
                                    {HeaderForm.chart_of_account_id === "" &&
                                        isErrorToggle && (
                                            <p className="text-[10px] text-ThemeRed">
                                                Required!
                                            </p>
                                        )}
                                </label>
                            </li>
                            <li className="w-[30%]">
                                <label className="labelField flex flex-col">
                                    *REFERENCE&nbsp;NO.
                                    <input
                                        type="text"
                                        value={HeaderForm.reference_no}
                                        disabled={
                                            HeaderForm.mode_of_payment ===
                                            "Cash"
                                        }
                                        onChange={(e) => {
                                            setHeaderForm({
                                                ...HeaderForm,
                                                reference_no: e.target.value,
                                            });
                                        }}
                                        className={`field w-full ${
                                            HeaderForm.mode_of_payment ===
                                                "Cash" && "disabled"
                                        }`}
                                    />
                                </label>
                                {HeaderForm.reference_no === "" &&
                                    (HeaderForm.mode_of_payment === "Deposit" ||
                                        HeaderForm.mode_of_payment === "") &&
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
                                        *CREDIT&nbsp;TAX
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
                    CancelHandler={CancelHandler}
                />
            )}
            {HeaderForm.receipt_type === "Acknowledgement" && (
                <AcknowledgementForm
                    DefaultValue={DefaultValAcknowledgement}
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                    ResetField={ResetField}
                    CancelHandler={CancelHandler}
                />
            )}
            {HeaderForm.receipt_type === "Official" && (
                <OfficialForm
                    ResetField={ResetField}
                    Error={ErrorToggleHandler}
                    headerForm={HeaderForm}
                    DefaultOfficialOutrightAdvances={
                        DefaultOfficialOutrightAdvances
                    }
                    Outstanding={isOutStanding}
                    setOutstanding={setOutstanding}
                    outStandingLoading={isLoading}
                    outStandingError={isError}
                    CancelHandler={CancelHandler}
                />
            )}
        </>
    );
}
