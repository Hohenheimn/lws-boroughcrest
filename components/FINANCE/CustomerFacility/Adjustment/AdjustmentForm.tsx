import React, { useContext, useEffect, useState } from "react";
import CustomerDropdown from "../../../Dropdowns/CustomerDropdown";
import SelectDropdown from "../../../Reusable/SelectDropdown";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import Image from "next/image";
import Calendar from "../../../Reusable/Calendar";
import { FadeSide } from "../../../Animation/SimpleAnimation";
import { AnimatePresence, motion } from "framer-motion";
import DropDownCharge from "../../../Dropdowns/DropDownCharge";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import InvoiceTransaction from "./InvoiceTransaction";
import AccountTable from "./AccountTable";
import { RiArrowDownSFill } from "react-icons/ri";
import AppContext from "../../../Context/AppContext";
import {
    CreateDraftAdjustment,
    CreateNewAdjustment,
    GetAccountEntriesList,
    GetFilteredAccountEntriesList,
    GetInvoiceByCustomerAndCharge,
    ModifyAdjustment,
    ModifyDraftAdjustment,
} from "./Query";
import { format, isValid, parse } from "date-fns";
import TableLoadingNError from "../../../Reusable/TableLoadingNError";
import { ValidationDebitCredit } from "./AdjustmentDistribution";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { UserInfo } from "../../../PROJECT/user/UserForm";
import { LoginUserInfo } from "../../../HOC/LoginUser/UserInfo";

export type AdjustmentHeaderForm = {
    customer_id: number | string;
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

export type AccountEntries = {
    id: number;
    debit: number;
    credit: number;
    chart_of_account: {
        chart_code: string;
        account_name: string;
    };
    document: {
        id: number;
        document_no: string;
        document_date: string;
    };
    charge: {
        description: string;
    };
};

type CustomerDDData = {
    id: number | string;
    name: string;
    class: string;
    property: string[];
};

export type AdjustmentInvoice = {
    id: number;
    adjustment_amount: number;
    balance: number;
    billing_invoice_id?: number;
    billing_date?: string;
    document_no?: string | number;
    description?: string;
    amount_due?: number;
    remaining_advances?: number;
};

type FilteredAccuntEntries = {
    id: number;
    chart_code: string;
    account_name: string;
    default_account: string;
};

export type DefaultValueAdjustment = {
    Customer: CustomerDDData;
    HeaderForm: AdjustmentHeaderForm;
    Charge: {
        charge: string;
        charge_id: number;
    };
    transaction_type: string;
    Invoice: AdjustmentInvoice[];
    Accounts: AdjustmentAccounts[];
    AdvancesToggle: boolean;
};

type Props = {
    DefaultValue: DefaultValueAdjustment;
};

export default function AdjustmentForm({ DefaultValue }: Props) {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    const { setPrompt } = useContext(AppContext);

    const [isErrorMessage, setErrorMessage] = useState(false);

    const [isSave, setSave] = useState(false);

    const [toggleForm, setToggleForm] = useState(false);

    const [AdvancesToggle, setAdvancesToggle] = useState(
        DefaultValue.AdvancesToggle
    );

    const [isButton, setButton] = useState("");

    const [isTransaction, setTransaction] = useState(
        DefaultValue.transaction_type
    );

    const [isCustomer, setCustomer] = useState<CustomerDDData>(
        DefaultValue.Customer
    );

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            customer_id: isCustomer.id,
        });
    }, [isCustomer]);

    const [isCharge, setCharge] = useState(DefaultValue.Charge);

    const [isChargeHeader, setChargeHeader] = useState({
        charge: "",
        charge_id: "",
    });

    const [isMemoDate, setMemoDate] = useState({
        value: DefaultValue.HeaderForm.memo_date,
        toggle: false,
    });

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            memo_date: isMemoDate.value,
        });
    }, [isMemoDate]);

    const [HeaderForm, setHeaderForm] = useState<AdjustmentHeaderForm>(
        DefaultValue.HeaderForm
    );

    const [isInvoices, setInvoices] = useState<AdjustmentInvoice[]>(
        DefaultValue.Invoice
    );

    const [isAdjustmentTotal, setAdjustmentTotal] = useState(0);

    const [DefaultAccount, setDefaultAccount] = useState<AdjustmentAccounts[]>(
        DefaultValue.Accounts
    );

    const onSuccess = () => {
        if (router.query.modify === undefined) {
            setPrompt({
                message: `Adjustment successfully ${
                    isButton === "draft" ? "registered as draft" : "registered"
                }`,
                toggle: true,
                type: isButton === "draft" ? "draft" : "success",
            });
        } else {
            setPrompt({
                message: `Adjustment successfully ${
                    isButton === "draft" ? "updated as draft" : "updated"
                }`,
                toggle: true,
                type: isButton === "draft" ? "draft" : "success",
            });
        }

        if (isButton !== "new") {
            router.push(
                "/finance/customer-facility/adjustment/adjustment-list"
            );
        }

        if (isButton === "new" && router.query.modify !== undefined) {
            router.push(
                "/finance/customer-facility/adjustment/create-adjustment"
            );
        }

        if (isButton === "new") {
            setCustomer({
                id: 0,
                name: "",
                class: "",
                property: [],
            });

            setHeaderForm({
                customer_id: 0,
                memo_date: "",
                memo_type: "",
                description: "",
                charge_id_header: "",
                charge_id: "",
                document_no: "",
            });

            setMemoDate({
                value: "",
                toggle: false,
            });

            setCharge({
                charge: "",
                charge_id: 0,
            });

            setTransaction("");

            setInvoices([]);

            setDefaultAccount([]);

            setErrorMessage(false);
        }
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const {
        data: invoiceData,
        isLoading,
        isError,
    } = GetInvoiceByCustomerAndCharge(isCustomer.id, isCharge.charge_id);

    const {
        data: refAccEntries,
        isLoading: refAccEntriesLoading,
        isError: refAccEntriesError,
    } = GetAccountEntriesList(isChargeHeader.charge_id, HeaderForm.document_no);

    // Create
    const { mutate: createMutate, isLoading: createLoading } =
        CreateNewAdjustment(onSuccess, onError);
    const { mutate: createDraftMutate, isLoading: createDraftLoading } =
        CreateDraftAdjustment(onSuccess, onError);

    // Modify
    const { mutate: modifyMutate, isLoading: modifyLoading } = ModifyAdjustment(
        onSuccess,
        onError,
        router.query.modify
    );
    const { mutate: modifyDraftMutate, isLoading: modifyDraftLoading } =
        ModifyDraftAdjustment(onSuccess, onError, router.query.modify);

    useEffect(() => {
        if (invoiceData !== undefined) {
            let getCustomerOutstanding: any[] = [];

            invoiceData?.data.map((item: any) => {
                const date = parse(item.billing_date, "yyyy-MM-dd", new Date());
                item?.invoice_list?.map((invoiceItem: any) => {
                    let adjustment_amount = 0;
                    let balance = item?.applied_advances;
                    DefaultValue.Invoice.map((itemDV) => {
                        if (itemDV.id === invoiceItem.id) {
                            adjustment_amount = itemDV.adjustment_amount;
                            balance =
                                Number(item?.applied_advances) -
                                Number(itemDV.adjustment_amount);
                        }
                    });
                    getCustomerOutstanding = [
                        ...getCustomerOutstanding,
                        {
                            id: invoiceItem?.id,
                            billing_invoice_id: item?.id,
                            adjustment_amount: adjustment_amount,
                            balance: balance <= 0 ? 0 : balance,
                            billing_date: isValid(date)
                                ? format(date, "MMM dd yyyy")
                                : "",
                            document_no: item?.invoice_no,
                            description: invoiceItem?.description,
                            amount_due: invoiceItem?.amount,
                            remaining_advances: item?.applied_advances,
                        },
                    ];
                });
            });
            setInvoices(
                getCustomerOutstanding === undefined
                    ? []
                    : getCustomerOutstanding
            );
        }
    }, [invoiceData?.data]);

    useEffect(() => {
        setAdjustmentTotal(0);
        isInvoices.map((item) => {
            setAdjustmentTotal(
                (prev: number) => Number(prev) + item.adjustment_amount
            );
        });
    }, [isInvoices]);

    const {
        data: AccountEntries,
        isLoading: AccountEntriesLoading,
        isError: AccountEntriesError,
    } = GetFilteredAccountEntriesList(isCharge.charge_id, isTransaction);

    const [isAccounts, setAccounts] = useState<AdjustmentAccounts[]>([]);

    useEffect(() => {
        ApplyAccountEntriesHandler();
    }, [AccountEntries?.data, DefaultValue.Accounts]);

    const ApplyAccountEntriesHandler = () => {
        console.log(AccountEntries?.data);
        const cloneTogetData = AccountEntries?.data.map(
            (item: FilteredAccuntEntries, index: number) => {
                const validationDebitOrCreditField = ValidationDebitCredit(
                    isTransaction,
                    item.default_account
                );

                let adjustment_total = isAdjustmentTotal;

                let deferred_customer_gst_account = isAdjustmentTotal;

                let other_account = isAdjustmentTotal;

                const vat_rate = 12;

                if (userInfo?.corporate_gst_type == "NON-VAT") {
                    other_account = isAdjustmentTotal;
                } else {
                    // computation here
                    deferred_customer_gst_account =
                        adjustment_total * (vat_rate / (vat_rate + 100));

                    other_account =
                        Number(adjustment_total) -
                        Number(deferred_customer_gst_account);
                }
                if (AdvancesToggle && router.query.modify !== undefined) {
                    let debit = 0;
                    let credit = 0;
                    DefaultValue.Accounts.map((itemAccount) => {
                        if (item.id === itemAccount.coa_id) {
                            debit = itemAccount.debit;
                            credit = itemAccount.credit;
                            return;
                        }
                    });
                    return {
                        id: index,
                        coa_id: item.id,
                        chart_code: item.chart_code,
                        account_name: item.account_name,
                        debit: Number(debit),
                        credit: Number(credit),
                    };
                }
                return {
                    id: index,
                    coa_id: item.id,
                    chart_code: item.chart_code,
                    account_name: item.account_name,
                    debit:
                        validationDebitOrCreditField === "debit"
                            ? item.default_account ===
                              "Deferred Customer GST Account"
                                ? deferred_customer_gst_account
                                : other_account
                            : 0,
                    credit:
                        validationDebitOrCreditField === "credit"
                            ? item.default_account ===
                              "Deferred Customer GST Account"
                                ? deferred_customer_gst_account
                                : other_account
                            : 0,
                };
            }
        );

        setAccounts(cloneTogetData);

        setDefaultAccount(cloneTogetData);
    };

    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            charge_id_header: Number(isChargeHeader.charge_id),
        });
    }, [isChargeHeader]);

    const SaveHandler = (button: string) => {
        if (button !== "draft") {
            if (
                isCustomer.id === 0 ||
                HeaderForm.memo_type === "" ||
                HeaderForm.memo_date === "" ||
                isCharge.charge_id === 0 ||
                isTransaction === ""
            ) {
                setPrompt({
                    message: "Fill out required fields",
                    toggle: true,
                    type: "draft",
                });
                setErrorMessage(true);
                return;
            }

            if (
                isInvoices.some((item) => item.adjustment_amount === 0) &&
                AdvancesToggle === false
            ) {
                setPrompt({
                    message: "Fill out all adjustment amount",
                    toggle: true,
                    type: "draft",
                });
                return;
            }
            if (
                isAccounts.some((item) => item.credit === 0 && item.debit === 0)
            ) {
                setPrompt({
                    message: "Please input a value on debit or credit!",
                    toggle: true,
                    type: "draft",
                });
                return;
            }
        }

        const memoDate = parse(HeaderForm.memo_date, "MMM dd yyyy", new Date());

        const Payload = {
            customer_id: isCustomer.id,
            charge_id: isCharge.charge_id,
            memo_type: HeaderForm.memo_type,
            date: isValid(memoDate) ? format(memoDate, "yyyy-MM-dd") : "",
            description: HeaderForm.description,
            transaction: isTransaction,
            accounts:
                isAccounts === undefined
                    ? []
                    : isAccounts.map((item) => {
                          return {
                              account_id: item.coa_id,
                              debit: item.debit,
                              credit: item.credit,
                          };
                      }),
            invoices: AdvancesToggle
                ? []
                : isInvoices.map((item) => {
                      return {
                          billing_invoice_list_id: item.id,
                          adjustment_amount: item.adjustment_amount,
                          balance: item.balance,
                      };
                  }),
        };

        setButton(button);

        if (router.query.modify === undefined) {
            // Create
            if (button === "save" || button === "new") {
                createMutate(Payload);
            } else {
                // Draft here
                createDraftMutate(Payload);
            }
        } else {
            // Update
            if (button === "save" || button === "new") {
                modifyMutate(Payload);
            } else {
                // Draft here
                modifyDraftMutate(Payload);
            }
        }
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
                                {isErrorMessage && isCustomer.id === 0 && (
                                    <p className=" text-[12px] text-ThemeRed">
                                        Required!
                                    </p>
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
                                            "Credit Memo",
                                            "Debit Memo",
                                        ]}
                                    />
                                    {isErrorMessage &&
                                        HeaderForm.memo_type === "" && (
                                            <p className=" text-[12px] text-ThemeRed">
                                                Required!
                                            </p>
                                        )}
                                </label>
                            </li>
                            <li className="w-[30%] 640px:w-2/4">
                                <DynamicPopOver
                                    toRef={
                                        <label className="labelField flex flex-col mt-1">
                                            MEMO DATE
                                            <div className="calendar">
                                                <span className="cal">
                                                    <Image
                                                        src="/Images/CalendarMini.png"
                                                        width={15}
                                                        height={15}
                                                        alt="calendar"
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
                                            {isErrorMessage &&
                                                HeaderForm.memo_date === "" && (
                                                    <p className=" text-[12px] text-ThemeRed">
                                                        Required!
                                                    </p>
                                                )}
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
                            </li>
                            <li className="w-[30%]"></li>

                            <li className="w-full mb-5">
                                <label htmlFor="" className="labelField">
                                    DESCRIPTION
                                </label>
                                <input
                                    type="text"
                                    className="field w-full"
                                    value={HeaderForm.description}
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
                                    {refAccEntries?.data.map(
                                        (
                                            item: AccountEntries,
                                            index: number
                                        ) => (
                                            <tr key={index}>
                                                <td>
                                                    {
                                                        item.document
                                                            .document_date
                                                    }
                                                </td>
                                                <td>
                                                    {item.document.document_no}
                                                </td>
                                                <td>
                                                    {item.charge.description}
                                                </td>
                                                <td>
                                                    {
                                                        item.chart_of_account
                                                            .chart_code
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.chart_of_account
                                                            .account_name
                                                    }
                                                </td>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="withPeso w-full text-end"
                                                        value={item.debit}
                                                    />
                                                </td>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="withPeso w-full text-end"
                                                        value={item.credit}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <TableLoadingNError
                                isLoading={refAccEntriesLoading}
                                isError={refAccEntriesError}
                            />
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
                        <InvoiceTransaction
                            isInvoicesAdjustment={isInvoices}
                            setInvoiceAdjustment={setInvoices}
                            HeaderForm={HeaderForm}
                            setHeaderForm={setHeaderForm}
                            isCharge={isCharge}
                            setCharge={setCharge}
                            setTransaction={setTransaction}
                            isTransaction={isTransaction}
                            isLoading={isLoading}
                            isError={isError}
                            isAdjustmentTotal={isAdjustmentTotal}
                            isErrorMessage={isErrorMessage}
                            ApplyAccountEntriesHandler={
                                ApplyAccountEntriesHandler
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <AccountTable
                toggle={AdvancesToggle}
                isAccounts={isAccounts}
                setAccounts={setAccounts}
                DefaultAccount={DefaultAccount}
                isLoading={AccountEntriesLoading}
                isError={AccountEntriesError}
                AdjustmentTotal={isAdjustmentTotal}
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
                            {createLoading ||
                            modifyLoading ||
                            createDraftLoading ||
                            modifyDraftLoading ? (
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
                        <ul className="bottomSide">
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
                                <button
                                    type="submit"
                                    onClick={() => {
                                        SaveHandler("draft");
                                        setSave(false);
                                    }}
                                >
                                    SAVE AS DRAFT
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}
