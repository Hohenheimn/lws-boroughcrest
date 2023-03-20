import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";
import style from "../../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../../Animation/SimpleAnimation";
import AppContext from "../../../Context/AppContext";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import { ChargeCreate, ChargeUpdate } from "../../../ReactQuery/Charge";
import Dropdown from "../../../Dropdowns/withSameKeyDropdown";
import { ChargePayload, IDstate } from "./Type";
import UOMDropdown from "../../../Dropdowns/UOMDropdown";
import { useForm } from "react-hook-form";

type Props = {
    setCreate: Function;
    isDefaultValue: ChargePayload;
    type: string;
};
type Error = {
    code: string;
    type: string;
    name: string;
    base_rate: string;
    uom: string;
    vat_percent: string;
    receivable: string;
    discounts: string;
    revenue: string;
    advances: string;
    interest: string;
    payment_heirarchy: string;
    soa_sort_order: string;
};
export default function ChargeForm({ setCreate, isDefaultValue, type }: Props) {
    const { setPrompt } = useContext(AppContext);
    const [isSelect, setSelect] = useState({
        type: false,
        interest: false,
    });
    const SelectField = (value: string, key: string) => {
        if (key === "type") {
            setValue("type", value);
            setSelect({
                ...isSelect,
                type: false,
            });
            setFieldValue({
                ...fieldValue,
                type: value,
            });
        }
        if (key === "interest") {
            setValue("interest", value);
            setSelect({
                ...isSelect,
                interest: false,
            });
            setFieldValue({
                ...fieldValue,
                interest: value,
            });
        }
    };

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
    useEffect(() => {
        setValue("discounts", isDiscount.firstVal);
    }, [isDiscount]);
    const [isRevenue, setRevenue] = useState<IDstate>({
        value: isDefaultValue.revenue_coa_value,
        id: isDefaultValue.revenue_coa_id,
        toggle: false,
        firstVal: isDefaultValue.revenue_coa_value,
        firstID: isDefaultValue.revenue_coa_id,
    });
    useEffect(() => {
        setValue("revenue", isRevenue.firstVal);
    }, [isRevenue]);
    const [isAdvance, setAdvance] = useState<IDstate>({
        value: isDefaultValue.advances_coa_value,
        id: isDefaultValue.advances_coa_id,
        toggle: false,
        firstVal: isDefaultValue.advances_coa_value,
        firstID: isDefaultValue.advances_coa_id,
    });
    useEffect(() => {
        setValue("advances", isAdvance.firstVal);
    }, [isAdvance]);
    const [isReceivable, setReceivable] = useState<IDstate>({
        value: isDefaultValue.receivable_coa_value,
        id: isDefaultValue.receivable_coa_id,
        toggle: false,
        firstVal: isDefaultValue.receivable_coa_value,
        firstID: isDefaultValue.receivable_coa_id,
    });
    useEffect(() => {
        setValue("receivable", isReceivable.firstVal);
    }, [isReceivable]);
    const [isUOM, setUOM] = useState({
        value: isDefaultValue.charge_uom_id,
        id: isDefaultValue.charge_uom_value,
        toggle: false,
    });
    useEffect(() => {
        setValue("uom", isUOM.value);
    }, [isUOM]);

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
            setUOM({
                value: "",
                id: "",
                toggle: false,
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

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Error>();

    const SubmitHandler = (typeButton: string) => {
        ButtonType = typeButton;
    };

    const SubmitForm = () => {
        setSave(false);
        const Payload = {
            code: fieldValue.code,
            type: fieldValue.type,
            name: fieldValue.name,
            description: fieldValue.description,
            base_rate: fieldValue.base_rate,
            vat_percent: fieldValue.vat_percent,
            minimum: fieldValue.minimum,
            interest: fieldValue.interest,
            payment_heirarchy: fieldValue.payment_heirarchy,
            soa_sort_order: fieldValue.soa_sort_order,
            receivable_coa_id:
                isReceivable === undefined ? "" : parseInt(isReceivable.id),
            discounts_coa_id:
                isDiscount === undefined ? "" : parseInt(isDiscount.id),
            revenue_coa_id:
                isRevenue === undefined ? "" : parseInt(isRevenue.id),
            advances_coa_id:
                isAdvance === undefined ? "" : parseInt(isAdvance.id),
            charge_uom_id: isUOM === undefined ? "" : parseInt(isUOM.id),
        };
        if (router.query.modify === undefined) {
            Save(Payload);
        } else {
            Update(Payload);
        }
    };

    return (
        <form className={style.container} onSubmit={handleSubmit(SubmitForm)}>
            <section>
                <p className={style.modal_title}>{type} Charge</p>
                <motion.div
                    variants={ModalSideFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className={isForm[0] ? "" : "hidden"}>
                        {/* <h1 className={style.modal_label_primaryRed}>
                            Lorem Ipsum
                        </h1> */}
                        <ul className={style.ThreeRows}>
                            <li>
                                <label>*CODE</label>
                                <input
                                    className="field"
                                    {...register("code", {
                                        required: "Required!",
                                    })}
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
                                {errors?.code && (
                                    <p className="text-[12px]">
                                        {errors?.code.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*TYPE</label>
                                <div className="select">
                                    <span>
                                        <MdOutlineKeyboardArrowDown />
                                    </span>
                                    <DynamicPopOver
                                        toRef={
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="field w-full"
                                                {...register("type", {
                                                    required: "Required!",
                                                })}
                                                readOnly
                                                onClick={() =>
                                                    setSelect({
                                                        ...isSelect,
                                                        type: true,
                                                    })
                                                }
                                                value={fieldValue.type}
                                            />
                                        }
                                        samewidth={true}
                                        toPop={
                                            <>
                                                {isSelect.type && (
                                                    <ul>
                                                        <li
                                                            onClick={() =>
                                                                SelectField(
                                                                    "Charge",
                                                                    "type"
                                                                )
                                                            }
                                                        >
                                                            Charge
                                                        </li>
                                                        <li
                                                            onClick={() =>
                                                                SelectField(
                                                                    "Deposit",
                                                                    "type"
                                                                )
                                                            }
                                                        >
                                                            Deposit
                                                        </li>
                                                    </ul>
                                                )}
                                            </>
                                        }
                                        className=""
                                    />
                                </div>
                                {errors?.type && (
                                    <p className="text-[12px]">
                                        {errors?.type.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*NAME</label>
                                <input
                                    className="field"
                                    type="text"
                                    {...register("name", {
                                        required: "Required!",
                                    })}
                                    value={fieldValue.name}
                                    onChange={(e: any) => {
                                        setFieldValue({
                                            ...fieldValue,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                {errors?.name && (
                                    <p className="text-[12px]">
                                        {errors?.name.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>DESCRIPTION</label>
                                <input
                                    className="field"
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
                                    className="field"
                                    type="number"
                                    {...register("base_rate", {
                                        required: "Required!",
                                    })}
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
                                {errors?.base_rate && (
                                    <p className="text-[12px]">
                                        {errors?.base_rate.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*UOM</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        className="field w-full"
                                        type="text"
                                        {...register("uom", {
                                            required: "Required!",
                                        })}
                                        value={isUOM.value}
                                        onChange={(e: any) =>
                                            setUOM({
                                                ...isUOM,
                                                value: e.target.value,
                                            })
                                        }
                                        onClick={() =>
                                            setUOM({
                                                ...isUOM,
                                                toggle: true,
                                            })
                                        }
                                    />
                                    {isUOM.toggle && (
                                        <UOMDropdown
                                            endpoint={
                                                "/finance/customer-facility/charges/uom-options"
                                            }
                                            name={"Unit of measure"}
                                            value={isUOM.value}
                                            setFunction={setUOM}
                                        />
                                    )}
                                </div>
                                {errors?.uom && (
                                    <p className="text-[12px]">
                                        {errors?.uom.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*VAT%</label>
                                <input
                                    className="field"
                                    type="number"
                                    {...register("vat_percent", {
                                        required: "Required!",
                                    })}
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
                                {errors?.vat_percent && (
                                    <p className="text-[12px]">
                                        {errors?.vat_percent.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*RECEIVABLE</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        className="field w-full"
                                        type="text"
                                        {...register("receivable", {
                                            required: "Required!",
                                        })}
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
                                    {errors?.receivable && (
                                        <p className="text-[12px]">
                                            {errors?.receivable.message}
                                        </p>
                                    )}
                                </div>
                            </li>
                        </ul>

                        <div className="flex w-full justify-end items-center">
                            <aside className="button_cancel" onClick={cancel}>
                                CANCEL
                            </aside>
                            <div
                                className="buttonRed cursor-pointer"
                                onClick={next}
                            >
                                NEXT
                            </div>
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
                                        className="field w-full"
                                        {...register("discounts", {
                                            required: "Required!",
                                        })}
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
                                    {errors?.discounts && (
                                        <p className="text-[12px]">
                                            {errors?.discounts.message}
                                        </p>
                                    )}
                                </div>
                            </li>
                            <li>
                                <label>*REVENUE</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        className="field w-full"
                                        type="text"
                                        {...register("revenue", {
                                            required: "Required!",
                                        })}
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
                                    {errors?.revenue && (
                                        <p className="text-[12px]">
                                            {errors?.revenue.message}
                                        </p>
                                    )}
                                </div>
                            </li>
                            <li>
                                <label>*ADVANCES</label>
                                <div
                                    className={`${style.Dropdown} ${style.full}`}
                                >
                                    <input
                                        className="field w-full"
                                        type="text"
                                        {...register("advances", {
                                            required: "Required!",
                                        })}
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
                                    {errors?.advances && (
                                        <p className="text-[12px]">
                                            {errors?.advances.message}
                                        </p>
                                    )}
                                </div>
                            </li>
                            <li>
                                <label>MINIMUM</label>
                                <input
                                    className="field"
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
                                <div className="select">
                                    <span>
                                        <MdOutlineKeyboardArrowDown />
                                    </span>
                                    <DynamicPopOver
                                        toRef={
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="field w-full"
                                                {...register("interest", {
                                                    required: "Required!",
                                                })}
                                                readOnly
                                                onClick={() =>
                                                    setSelect({
                                                        ...isSelect,
                                                        interest: true,
                                                    })
                                                }
                                                value={fieldValue.interest}
                                            />
                                        }
                                        samewidth={true}
                                        toPop={
                                            <>
                                                {isSelect.interest && (
                                                    <ul>
                                                        <li
                                                            onClick={() =>
                                                                SelectField(
                                                                    "Bearing",
                                                                    "interest"
                                                                )
                                                            }
                                                        >
                                                            Bearing
                                                        </li>
                                                        <li
                                                            onClick={() =>
                                                                SelectField(
                                                                    "Non-Bearing",
                                                                    "interest"
                                                                )
                                                            }
                                                        >
                                                            Non-Bearing
                                                        </li>
                                                    </ul>
                                                )}
                                            </>
                                        }
                                        className=""
                                    />
                                </div>
                                {errors?.interest && (
                                    <p className="text-[12px]">
                                        {errors?.interest.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*PAYMENT HEIRARCHY</label>
                                <input
                                    className="field"
                                    type="number"
                                    {...register("payment_heirarchy", {
                                        required: "Required!",
                                    })}
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
                                {errors?.payment_heirarchy && (
                                    <p className="text-[12px]">
                                        {errors?.payment_heirarchy.message}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>*SOA SORT ORDER</label>
                                <input
                                    className="field"
                                    type="number"
                                    {...register("soa_sort_order", {
                                        required: "Required!",
                                    })}
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
                                {errors?.soa_sort_order && (
                                    <p className="text-[12px]">
                                        {errors?.soa_sort_order.message}
                                    </p>
                                )}
                            </li>
                        </ul>

                        <div className={style.SaveButton}>
                            <aside className="button_cancel" onClick={back}>
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
        </form>
    );
}
