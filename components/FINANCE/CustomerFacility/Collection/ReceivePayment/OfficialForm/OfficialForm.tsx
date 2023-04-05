import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import AppContext from "../../../../../Context/AppContext";
import { CreateCollection } from "../Query";
import { DefaultOfficial, HeaderForm } from "../ReceivePaymentForm";
import { AdvancesType } from "./OutrightAndAdvances/Advances";
import { Outright } from "./OutrightAndAdvances/OutRight";
import OutrightAndAdvances from "./OutrightAndAdvances/OutrightAndAdvances";
import OutStandingBalance, { Outstanding } from "./OutStandingBalance";
import PaymentSummary from "./PaymentSummary";
import { ErrorSubmit } from "../../../../../Reusable/ErrorMessage";

type Props = {
    Error: () => void;
    headerForm: HeaderForm;
    DefaultOfficial: DefaultOfficial;
    Outstanding: Outstanding[];
    setOutstanding: Function;
    ResetField: () => void;
    outStandingLoading: boolean;
    outStandingError: boolean;
};

export default function OfficialForm({
    Error,
    ResetField,
    headerForm,
    DefaultOfficial,
    Outstanding,
    setOutstanding,
    outStandingLoading,
    outStandingError,
}: Props) {
    const router = useRouter();

    const { setPrompt } = useContext(AppContext);

    const [isSave, setSave] = useState(false);

    let buttonClicked = "";

    const [isOutright, setOutright] = useState<Outright[]>([]);
    useEffect(() => {
        setOutright(DefaultOfficial.Outright);
    }, [DefaultOfficial.Outright]);

    const [isAdvance, setAdvance] = useState<AdvancesType[]>([]);
    useEffect(() => {
        setAdvance(DefaultOfficial.Advances);
    }, [DefaultOfficial.Advances]);

    const onSuccess = () => {
        setPrompt({
            message: "Collection successfully registered!",
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
    const { isLoading, mutate, isError } = CreateCollection(onSuccess, onError);

    const SaveHandler = (button: string) => {
        buttonClicked = button;
        let validate = true;
        Error();
        const PayloadOutRight = isOutright.filter((item: Outright) => {
            if (item.charge_id !== "")
                return {
                    charge_id: item.charge_id,
                    type: "Outright",
                    description: item.description,
                    unit_price: item.unit_price,
                    quantity: item.qty,
                    amount: item.amount,
                };
        });
        const PayloadAdvances = isAdvance.filter((item: AdvancesType) => {
            if (item.charge_id !== "")
                return {
                    charge_id: item.charge_id,
                    type: "Advances",
                    description: item.description,
                    unit_price: 0,
                    quantity: 0,
                    amount: 0,
                };
        });
        if (Outstanding.length > 0) {
            Outstanding.map((provItem: Outstanding) => {
                if (provItem.applied_amount <= 0) {
                    setPrompt({
                        toggle: true,
                        message: "Fill out the fields on Outstanding!",
                        type: "draft",
                    });
                    validate = false;
                    return;
                }
            });
            return;
        }
        if (
            headerForm.amount_paid === "" ||
            headerForm.bank_account_id === "" ||
            headerForm.credit_tax === "" ||
            headerForm.customer_id === "" ||
            headerForm.deposit_date === "" ||
            headerForm.mode_of_payment === "" ||
            headerForm.receipt_date === "" ||
            headerForm.reference_no === ""
        ) {
            setPrompt({
                toggle: true,
                message: "Fill out the fields on the top!",
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
            description: headerForm.description,
            mode_of_payment: headerForm.mode_of_payment,
            deposit_date: isValid(deposit_date)
                ? format(deposit_date, "yyyy-MM-dd")
                : "",
            amount_paid: headerForm.amount_paid,
            bank_account_id: headerForm.bank_account_id,
            reference_no: headerForm.reference_no,
            credit_tax: headerForm.credit_tax,
            outrights: [...PayloadOutRight, ...PayloadAdvances],
            balances: Outstanding.map((item: Outstanding) => {
                return {
                    billing_invoice_id: item.id,
                    payment_amount: item.applied_amount,
                    balance: item.balance,
                };
            }),
        };
        if (Payload.outrights.length <= 0) {
            PayloadAdvances.map((provItem: AdvancesType) => {
                if (
                    provItem.amount <= 0 ||
                    provItem.charge === "" ||
                    provItem.charge_id === ""
                ) {
                    setPrompt({
                        toggle: true,
                        message:
                            "Fill out the all fields on Outright or Advances!",
                        type: "draft",
                    });
                    validate = false;
                    return;
                }
            });
            PayloadOutRight.map((provItem: Outright) => {
                if (
                    provItem.amount <= 0 ||
                    provItem.charge === "" ||
                    provItem.charge_id === "" ||
                    provItem.unit_price <= 0 ||
                    provItem.qty <= 0
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
            setPrompt({
                toggle: true,
                message: "Fill out the all fields on Outright or Advances!",
                type: "draft",
            });
            return;
        }
        if (validate) mutate(Payload);
    };

    return (
        <>
            <OutStandingBalance
                customer_id={headerForm.customer_id}
                amount_paid={Number(headerForm.amount_paid)}
                DefaultOutstanding={Outstanding}
                setDefaultValue={setOutstanding}
                Error={Error}
                outStandingLoading={outStandingLoading}
                outStandingError={outStandingError}
            />
            <OutrightAndAdvances
                DefaultOutright={isOutright}
                setDefaultOutright={setOutright}
                setDefaultAdvances={setAdvance}
                DefaultAdvances={isAdvance}
                Error={Error}
            />
            <PaymentSummary
                Error={Error}
                headerForm={headerForm}
                customer_id={headerForm.customer_id}
            />
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
        </>
    );
}
