import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import { RiArrowDownSFill } from "react-icons/ri";
import { BarLoader, ScaleLoader } from "react-spinners";


import AppContext from "../../../../../Context/AppContext";
import { ErrorSubmit } from "../../../../../Reusable/ErrorMessage";
import { CreateCollection, GetCollectionByCustomer } from "../Query";
import { DefaultOfficial, HeaderForm } from "../ReceivePaymentForm";
import { AdvancesType } from "./OutrightAndAdvances/Advances";
import { Outright } from "./OutrightAndAdvances/OutRight";
import OutrightAndAdvances from "./OutrightAndAdvances/OutrightAndAdvances";
import OutStandingBalance, { Outstanding } from "./OutStandingBalance";
import PaymentSummaryTable from "./PaymentSummary";


type Props = {
    Error: () => void;
    headerForm: HeaderForm;
    DefaultOfficialOutrightAdvances: DefaultOfficial;
    Outstanding: Outstanding[];
    setOutstanding: Function;
    ResetField: () => void;
    outStandingLoading: boolean;
    outStandingError: boolean;
    CancelHandler: () => void;
};

export default function OfficialForm({
    Error,
    ResetField,
    headerForm,
    DefaultOfficialOutrightAdvances,
    Outstanding,
    setOutstanding,
    outStandingLoading,
    outStandingError,
    CancelHandler,
}: Props) {
    const router = useRouter();
    const { setPrompt } = useContext(AppContext);
    const [isSave, setSave] = useState(false);
    let buttonClicked = "";

    const [isVarianceValidation, setVarianceValidation] = useState(false);

    // Outstanding Totals
    const [isDueAmountTotal, setDueAmountTotal] = useState(0);
    const [isAppliedAmount, setAppliedAmount] = useState(0);
    const [isBalanceTotal, setBalanceAmount] = useState(0);
    // Outrights and Advances Total
    const [OATotal, setOATotal] = useState(0);

    const [isOutright, setOutright] = useState<Outright[]>([]);
    useEffect(() => {
        setOutright(DefaultOfficialOutrightAdvances.Outright);
    }, [DefaultOfficialOutrightAdvances.Outright]);

    const [isAdvance, setAdvance] = useState<AdvancesType[]>([]);
    useEffect(() => {
        setAdvance(DefaultOfficialOutrightAdvances.Advances);
    }, [DefaultOfficialOutrightAdvances.Advances]);

    useEffect(() => {
        let totalOutright = 0;
        let totalAdvances = 0;
        isOutright.map((item) => {
            totalOutright = totalOutright + item.amount;
        });
        isAdvance.map((item) => {
            totalAdvances = totalAdvances + item.amount;
        });
        setOATotal(Number(totalOutright) + Number(totalAdvances));
    }, [isOutright, isAdvance]);

    const onSuccess = () => {
        let message = "Collection successfully registered!";

        if (router.query.from === "payment_queueing") {
            message = "Collection successfully updated!";
        }

        setPrompt({
            message: message,
            type: "success",
            toggle: true,
        });

        if (buttonClicked === "new") {
            ResetField();
            setOutright([
                {
                    id: 1,
                    charge: "",
                    charge_id: "",
                    description: "",
                    uom: "",
                    unit_price: 0,
                    qty: 0,
                    amount: 0,
                },
            ]);

            setAdvance([
                {
                    id: 1,
                    charge: "",
                    charge_id: "",
                    description: "",
                    amount: 0,
                },
            ]);
        } else {
            router.push(
                "/finance/customer-facility/collection/payment-register"
            );
        }
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const id: any = router.query.modify_id;

    const { isLoading, mutate } = CreateCollection(onSuccess, onError);

    const SaveHandler = (button: string) => {
        buttonClicked = button;
        let validate = true;
        Error();
        const PayloadOutRightFilter = isOutright.filter(
            (item: Outright) => item.charge_id !== ""
        );
        const PayloadOutRight = PayloadOutRightFilter.map((item) => {
            return {
                charge_id: item.charge_id,
                type: "Outright",
                description: item.description,
                unit_price: item.unit_price,
                quantity: item.qty,
                amount: item.amount,
            };
        });

        const PayloadAdvancesFilter = isAdvance.filter(
            (item: AdvancesType) => item.charge_id !== ""
        );

        const PayloadAdvances = PayloadAdvancesFilter.map((item) => {
            return {
                charge_id: item.charge_id,
                type: "Advance",
                description: item.description,
                unit_price: 0,
                quantity: 0,
                amount: item.amount,
            };
        });

        if (
            headerForm.amount_paid === "" ||
            headerForm.chart_of_account_id === "" ||
            headerForm.customer_id === "" ||
            headerForm.mode_of_payment === "" ||
            headerForm.credit_tax === "" ||
            headerForm.receipt_date === "" ||
            headerForm.receipt_type === ""
        ) {
            setPrompt({
                toggle: true,
                message: "Fill out the fields on the top!",
                type: "draft",
            });
            validate = false;
            return;
        }

        if (
            headerForm.mode_of_payment === "Deposit" &&
            (headerForm.reference_no === "" || headerForm.deposit_date === "")
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
        const deposit_date = parse(
            headerForm.deposit_date,
            "MMM dd yyyy",
            new Date()
        );
        const Payload = {
            customer_id: headerForm.customer_id,
            receipt_date: isValid(receipt_date)
                ? format(receipt_date, "yyyy-MM-dd")
                : "",
            receipt_type: headerForm.receipt_type,
            description: headerForm.description,
            mode_of_payment: headerForm.mode_of_payment,
            deposit_date: isValid(deposit_date)
                ? format(deposit_date, "yyyy-MM-dd")
                : "",
            amount_paid: headerForm.amount_paid,
            chart_of_account_id: headerForm.chart_of_account_id,
            reference_no: headerForm.reference_no,
            credit_tax: headerForm.credit_tax,
            outrights: [...PayloadOutRight, ...PayloadAdvances],
            balances: Outstanding.map((item: Outstanding) => {
                return {
                    charge_id: item.charge_id,
                    billing_invoice_id: item.billing_invoice_id,
                    billing_invoice_list_id: item.id,
                    payment_amount: item.applied_amount,
                    balance: item.balance,
                    discount_ids: item.discount_ids,
                };
            }),
            discount: headerForm.discount,
        };

        PayloadAdvances.map((provItem) => {
            if (provItem.amount <= 0 || provItem.charge_id === "") {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields on Outright or Advances!",
                    type: "draft",
                });
                validate = false;
                return;
            }
        });
        PayloadOutRight.map((provItem: any) => {
            if (
                provItem.amount <= 0 ||
                provItem.charge_id === "" ||
                provItem.unit_price <= 0 ||
                Number(provItem.quantity) <= 0 ||
                provItem.unit_price === "" ||
                provItem.quantity === ""
            ) {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields on Outright or Advances!",
                    type: "draft",
                });
                validate = false;
                return;
            }
        });

        if (!isVarianceValidation) {
            setPrompt({
                toggle: true,
                message: "Variance should be zero to save",
                type: "draft",
            });
            validate = false;
            return;
        }

        if (validate) {
            if (router.query.from === "payment_queueing") {
                const PayloadUpdate = { ...Payload, collection_id: id };
                mutate(PayloadUpdate);
            }
            if (router.query.modify_id === undefined) {
                mutate(Payload);
            }
        }
    };

    const {
        data: CDdata,
        isLoading: CDloading,
        isError: CDerror,
    } = GetCollectionByCustomer(headerForm.customer_id);

    return (
        <>
            <OutStandingBalance
                customer_id={headerForm.customer_id}
                amount_paid={Number(headerForm.amount_paid)}
                DefaultOutstanding={Outstanding}
                setDefaultValue={setOutstanding}
                Error={Error}
                // Totals
                outStandingLoading={outStandingLoading}
                outStandingError={outStandingError}
                setDueAmountTotal={setDueAmountTotal}
                isDueAmountTotal={isDueAmountTotal}
                setAppliedAmount={setAppliedAmount}
                isAppliedAmount={isAppliedAmount}
                setBalanceAmount={setBalanceAmount}
                isBalanceTotal={isBalanceTotal}
                DiscountAmount={Number(headerForm.discount)}
                CreditTax={Number(headerForm.credit_tax)}
            />
            <OutrightAndAdvances
                DefaultOutright={isOutright}
                setDefaultOutright={setOutright}
                setDefaultAdvances={setAdvance}
                DefaultAdvances={isAdvance}
                Error={Error}
            />
            <div className="mb-10 1550px:mb-5 640px:mb-3"></div>
            {!CDloading && !CDerror && (
                <PaymentSummaryTable
                    SummaryItems={CDdata?.data}
                    CreditTax={Number(headerForm.credit_tax)}
                    TotalDue={Number(isAppliedAmount) + Number(OATotal)}
                    triggerID={Number(headerForm.customer_id)}
                    LessDiscount={headerForm.discount}
                    AmoundPaid={Number(headerForm.amount_paid)}
                    setVarianceValidation={setVarianceValidation}
                />
            )}
            {CDloading && (
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
            <div className="DropDownSave">
                <button className="ddback" onClick={CancelHandler}>
                    CANCEL
                </button>
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
        </>
    );
}
