import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";
import style from "../../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../../Animation/SimpleAnimation";
import AppContext from "../../../Context/AppContext";
import { ChargeCreate, ChargeUpdate } from "../../../ReactQuery/Charge";
import Dropdown from "./Dropdown";
import { ChargePayload, IDstate } from "./Type";

type Props = {
    setCreate: Function;
    isDefaultValue: ChargePayload;
    type: string;
};
export default function ChargeForm({ setCreate, isDefaultValue, type }: Props) {
    const { setPrompt } = useContext(AppContext);
    const queryClient = useQueryClient();
    const router = useRouter();
    var ButtonType = "";
    const [isForm, setForm] = useState([true, false]);

    const cancel = () => {
        router.push("");
        setCreate(false);
    };

    const next = () => {
        setForm([false, true]);
    };
    const [isSave, setSave] = useState(false);
    const back = () => {
        setForm([true, false]);
    };
    const ErrorDefault = {
        code: "",
        type: "",
        name: "",
        uom: "",
        interest: "",
        payment_heirarchy: "",
        soa_sort_order: "",
    };
    const [isError, setError] = useState({
        ...ErrorDefault,
    });

    const [fieldValue, setFieldValue] = useState<ChargePayload>({
        ...isDefaultValue,
    });
    const [isDiscount, setDiscount] = useState<IDstate>({
        value: isDefaultValue.discounts_coa_value,
        id: isDefaultValue.discounts_coa_id,
        toggle: false,
        firstVal: isDefaultValue.discounts_coa_value,
        firstID: isDefaultValue.discounts_coa_id,
    });
    const [isRevenue, setRevenue] = useState<IDstate>({
        value: isDefaultValue.revenue_coa_value,
        id: isDefaultValue.revenue_coa_id,
        toggle: false,
        firstVal: isDefaultValue.revenue_coa_value,
        firstID: isDefaultValue.revenue_coa_id,
    });
    const [isAdvance, setAdvance] = useState<IDstate>({
        value: isDefaultValue.advances_coa_value,
        id: isDefaultValue.advances_coa_id,
        toggle: false,
        firstVal: isDefaultValue.advances_coa_value,
        firstID: isDefaultValue.advances_coa_id,
    });
    const [isReceivable, setReceivable] = useState<IDstate>({
        value: isDefaultValue.receivable_coa_value,
        id: isDefaultValue.receivable_coa_id,
        toggle: false,
        firstVal: isDefaultValue.receivable_coa_value,
        firstID: isDefaultValue.receivable_coa_id,
    });

    const onSuccess = () => {
        queryClient.invalidateQueries("charge-list");
        queryClient.invalidateQueries(["Charge-detail", router.query.modify]);
        if (type === "Modify") {
            setPrompt({
                message: "Charge successfully updated!",
                type: "success",
                toggle: true,
            });
        } else {
            setPrompt({
                message: "Charge successfully registered!",
                type: "success",
                toggle: true,
            });
        }
        setError({ ...ErrorDefault });
        if (ButtonType === "new") {
            // Clear Field
            setFieldValue({
                ...isDefaultValue,
            });
            setAdvance({
                value: "",
                id: "",
                toggle: false,
                firstVal: "",
                firstID: "",
            });
            setDiscount({
                value: "",
                id: "",
                toggle: false,
                firstVal: "",
                firstID: "",
            });
            setRevenue({
                value: "",
                id: "",
                toggle: false,
                firstVal: "",
                firstID: "",
            });
            setReceivable({
                value: "",
                id: "",
                toggle: false,
                firstVal: "",
                firstID: "",
            });
            // back to front form
            setForm([true, false]);
            // Go to create
            router.push("");
            setCreate(true);
        } else {
            router.push("");
            setCreate(false);
        }
    };
    const onError = (e: any) => {
        const error = e.response.data;
        setError({
            ...error,
        });
        if (e.response.status === 422) {
            setPrompt({
                message: "Please check required fields",
                type: "error",
                toggle: true,
            });
        } else {
            setPrompt({
                message: "Something is wrong",
                type: "error",
                toggle: true,
            });
        }
    };

    const { mutate: Save, isLoading: SaveLoading } = ChargeCreate(
        onSuccess,
        onError
    );
    const { mutate: Update, isLoading: UpdateLoading } = ChargeUpdate(
        onSuccess,
        onError,
        router.query.modify
    );

    const SubmitHandler = (typeButton: string) => {
        ButtonType = typeButton;
        setSave(false);
        const Payload: ChargePayload = {
            ...fieldValue,
            receivable_coa_id:
                isReceivable === undefined ? "" : parseInt(isReceivable.id),
            discounts_coa_id:
                isDiscount === undefined ? "" : parseInt(isDiscount.id),
            revenue_coa_id:
                isRevenue === undefined ? "" : parseInt(isRevenue.id),
            advances_coa_id:
                isAdvance === undefined ? "" : parseInt(isAdvance.id),
        };
        if (router.query.modify === undefined) {
            Save(Payload);
        } else {
            Update(Payload);
        }
    };

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>{type} Charge</p>
                <motion.div
                    variants={ModalSideFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className={isForm[0] ? "" : "hidden"}>
                        <h1 className={style.modal_label_primaryRed}>
                            Lorem Ipsum
                        </h1>
                        <ul className={style.ThreeRows}>
                            <li>
                                <label>*CODE</label>
                                <input
                                    type="text"
                                    value={fieldValue.code}
                                    onChange={(e: any) => {
                                        e.target.value.length <= 10 &&
                                            setFieldValue({
                                                ...fieldValue,
                                                code: e.target.value,
                                            });
                                    }}
                                />
                                {isError?.code !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.code}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*TYPE</label>
                                <select
                                    id=""
                                    value={fieldValue.type}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            type: e.target.value,
                                        });
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="Charge">Charge</option>
                                    <option value="Deposit">Deposit</option>
                                </select>
                                {isError?.type !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.type}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*NAME</label>
                                <input
                                    type="text"
                                    value={fieldValue.name}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                {isError?.name !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.name}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>DESCRIPTION</label>
                                <input
                                    type="text"
                                    value={fieldValue.description}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            description: e.target.value,
                                        });
                                    }}
                                />
                            </li>
                            <li>
                                <label>*BASE RATE</label>
                                <input
                                    type="number"
                                    value={fieldValue.base_rate}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            base_rate: parseFloat(
                                                e.target.value
                                            ),
                                        });
                                    }}
                                />
                            </li>
                            <li>
                                <label>*UOM</label>
                                <input
                                    type="text"
                                    value={fieldValue.uom}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            uom: e.target.value,
                                        });
                                    }}
                                />
                                {isError?.uom !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.uom}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*VAT%</label>
                                <input
                                    type="number"
                                    value={fieldValue.vat_percent}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            vat_percent: parseFloat(
                                                e.target.value
                                            ),
                                        });
                                    }}
                                />
                            </li>
                            <li>
                                <label>*RECEIVABLE</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        type="text"
                                        value={isReceivable.value}
                                        onChange={(e: any) =>
                                            setReceivable({
                                                ...isReceivable,
                                                value: e.target.value,
                                            })
                                        }
                                        onClick={() =>
                                            setReceivable({
                                                ...isReceivable,
                                                toggle: true,
                                            })
                                        }
                                    />
                                    {isReceivable.toggle && (
                                        <Dropdown
                                            name="receivable"
                                            fieldObject={isReceivable}
                                            searchValue={isReceivable.value}
                                            setFunction={setReceivable}
                                            endpoint="/finance/customer-facility/charges/coa-options/receivable"
                                        />
                                    )}
                                </div>
                            </li>
                        </ul>

                        <div className={style.SaveButton}>
                            <aside className={style.back} onClick={cancel}>
                                CANCEL
                            </aside>
                            <button className={style.next} onClick={next}>
                                NEXT
                            </button>
                        </div>
                    </div>
                    <div className={isForm[1] ? "" : "hidden"}>
                        <h1 className={style.modal_label_primaryRed}>
                            Primary Information
                        </h1>
                        <ul className={style.ThreeRows}>
                            <li>
                                <label>*DISCOUNTS</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        type="text"
                                        value={isDiscount.value}
                                        onChange={(e: any) =>
                                            setDiscount({
                                                ...isDiscount,
                                                value: e.target.value,
                                            })
                                        }
                                        onClick={() =>
                                            setDiscount({
                                                ...isDiscount,
                                                toggle: true,
                                            })
                                        }
                                    />
                                    {isDiscount.toggle && (
                                        <Dropdown
                                            name="discounts"
                                            fieldObject={isDiscount}
                                            searchValue={isDiscount.value}
                                            setFunction={setDiscount}
                                            endpoint="/finance/customer-facility/charges/coa-options/discounts"
                                        />
                                    )}
                                </div>
                            </li>
                            <li>
                                <label>*REVENUE</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        type="text"
                                        value={isRevenue.value}
                                        onChange={(e: any) =>
                                            setRevenue({
                                                ...isRevenue,
                                                value: e.target.value,
                                            })
                                        }
                                        onClick={() =>
                                            setRevenue({
                                                ...isRevenue,
                                                toggle: true,
                                            })
                                        }
                                    />
                                    {isRevenue.toggle && (
                                        <Dropdown
                                            name="revenue"
                                            fieldObject={isRevenue}
                                            searchValue={isRevenue.value}
                                            setFunction={setRevenue}
                                            endpoint="/finance/customer-facility/charges/coa-options/revenue"
                                        />
                                    )}
                                </div>
                            </li>
                            <li>
                                <label>*ADVANCES</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        type="text"
                                        value={isAdvance.value}
                                        onChange={(e: any) =>
                                            setAdvance({
                                                ...isAdvance,
                                                value: e.target.value,
                                            })
                                        }
                                        onClick={() =>
                                            setAdvance({
                                                ...isAdvance,
                                                toggle: true,
                                            })
                                        }
                                    />
                                    {isAdvance.toggle && (
                                        <Dropdown
                                            name="advance"
                                            fieldObject={isAdvance}
                                            searchValue={isAdvance.value}
                                            setFunction={setAdvance}
                                            endpoint="/finance/customer-facility/charges/coa-options/advances"
                                        />
                                    )}
                                </div>
                            </li>
                            <li>
                                <label>MINIMUM</label>
                                <input
                                    type="number"
                                    value={fieldValue.minimum}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            minimum: parseFloat(e.target.value),
                                        });
                                    }}
                                />
                            </li>
                            <li>
                                <label>*INTEREST</label>

                                <select
                                    value={fieldValue.interest}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            interest: e.target.value,
                                        });
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="Bearing">Bearing</option>
                                    <option value="Non-Bearing">
                                        Non-Bearing
                                    </option>
                                </select>
                                {isError?.interest !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.interest}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*PAYMENT HEIRARCHY</label>
                                <input
                                    type="number"
                                    value={fieldValue.payment_heirarchy}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            payment_heirarchy: parseInt(
                                                e.target.value
                                            ),
                                        });
                                    }}
                                />
                                {isError?.payment_heirarchy !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.payment_heirarchy}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*SOA SORT ORDER</label>
                                <input
                                    type="number"
                                    value={fieldValue.soa_sort_order}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            soa_sort_order: parseInt(
                                                e.target.value
                                            ),
                                        });
                                    }}
                                />
                                {isError?.soa_sort_order !== "" && (
                                    <p className="text-[12px]">
                                        {isError?.soa_sort_order}
                                    </p>
                                )}
                            </li>
                        </ul>

                        <div className={style.SaveButton}>
                            <aside className={style.back} onClick={back}>
                                BACK
                            </aside>

                            <div className={style.Save}>
                                <div>
                                    <button
                                        type="submit"
                                        name="save"
                                        className={style.save_button}
                                        onClick={() => SubmitHandler("save")}
                                    >
                                        {SaveLoading || UpdateLoading ? (
                                            <ScaleLoader
                                                color="#fff"
                                                height="10px"
                                                width="2px"
                                            />
                                        ) : (
                                            "SAVE"
                                        )}
                                    </button>
                                    <aside className={style.Arrow}>
                                        <RiArrowDownSFill
                                            onClick={() => setSave(!isSave)}
                                        />
                                    </aside>
                                </div>
                                {isSave && (
                                    <ul>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    SubmitHandler("new")
                                                }
                                            >
                                                SAVE & NEW
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
