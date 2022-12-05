import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";
import style from "../../../styles/Popup_Modal.module.scss";
import { ChartofAccountPayload } from "../../../types/COAList";
import AppContext from "../../Context/AppContext";
import {
    COACreate,
    COADelete,
    COAUpdate,
} from "../../ReactQuery/ChartofAccount";
import DefaultAccount from "./DefaultAccount";
import Parent from "./Parent";

type Props = {
    setCreate: Function;
    DefaultFormData: any;
};

export default function COAForm({ setCreate, DefaultFormData }: Props) {
    const { setPrompt } = useContext(AppContext);
    const [saveButton, setSaveButton] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isSave, setSave] = useState(false);
    const [isStatus, setStatus] = useState(true);
    const [isError, setError] = useState({});
    const [isParent, setParent] = useState<any>({
        toggle: false,
        value: "",
        id: 0,
    });
    const [isDefaultAccount, setDefaultAccount] = useState<any>({
        toggle: false,
        value: "",
        id: 0,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<ChartofAccountPayload>({
        defaultValues: DefaultFormData,
    });

    const cancel = () => {
        reset();
        setCreate(false);
        router.push("");
    };

    useEffect(() => {
        setDefaultAccount({
            ...isDefaultAccount,
            id: DefaultFormData.coa_default_account_id,
            value: DefaultFormData.defaultAccount,
        });
        setParent({
            ...isParent,
            id: DefaultFormData.parent_id,
            value: !DefaultFormData.parent ? "" : DefaultFormData.parent,
        });
        setStatus(DefaultFormData.apply_to_sub_acc);
    }, []);

    const onSuccess = () => {
        if (router.query.modify === undefined) {
            setPrompt({
                message: "Account successfully registered!",
                toggle: true,
                type: "success",
            });
            reset();
        } else {
            setPrompt({
                message: "Account successfully updated!",
                toggle: true,
                type: "success",
            });
            reset();
        }
        if (saveButton === "save") {
            router.push("");
            setCreate(false);
        }
        if (saveButton === "new") {
            router.push("");
            setCreate(true);
            setDefaultAccount({
                ...isDefaultAccount,
                id: "",
                value: "",
            });
            setParent({
                ...isParent,
                id: "",
                value: "",
            });
            setStatus(true);
        }
        queryClient.invalidateQueries("COA-list");
    };
    const onError = () => {
        setPrompt({
            message: "Something is wrong!",
            toggle: true,
            type: "error",
        });
    };

    const delSuccess = () => {
        setPrompt({
            message: "Account successfully Deleted!",
            toggle: true,
            type: "success",
        });
        router.push("");
        queryClient.invalidateQueries("COA-list");
    };
    const DelError = () => {
        setPrompt({
            message: "Something is wrong!",
            toggle: true,
            type: "error",
        });
    };

    const { mutate: Save, isLoading: SaveLoading } = COACreate(
        onSuccess,
        onError
    );

    const { mutate: Update, isLoading: UpdateLoading } = COAUpdate(
        onSuccess,
        onError,
        router.query.modify
    );

    const { mutate: Delete, isLoading: DeleteLoading } = COADelete(
        delSuccess,
        DelError,
        router.query.modify
    );

    const deleteHandler = () => {
        Delete();
    };

    const Submit = (data: ChartofAccountPayload) => {
        const Payload = {
            chart_code: data.chart_code,
            parent_id: parseInt(isParent.id),
            code_suffix: data.code_suffix,
            account_name: data.account_name,
            description: data.description,
            coa_default_account_id: isDefaultAccount.id,
            apply_to_sub_acc: isStatus,
            bank_acc_no: data.bank_acc_no,
            bank_branch: data.bank_branch,
        };

        if (router.query.modify === undefined) {
            // Save
            Save(Payload);
        } else {
            // Update
            Update(Payload);
        }
    };

    return (
        <form className={style.container} onSubmit={handleSubmit(Submit)}>
            <section>
                <p className={style.modal_title}>
                    {router.query.modify === undefined ? "Create" : "Modify"}{" "}
                    Account
                </p>
                <h1 className={style.modal_label_primaryRed}>
                    Primary Information
                </h1>
                <ul className={style.FinanceTwoRows}>
                    <li>
                        <label htmlFor="">*CHART CODE</label>
                        <input
                            type="number"
                            {...register("chart_code", {
                                required: "Required!",
                            })}
                            className=" bg-ThemeRed50"
                        />
                        {errors.chart_code && (
                            <p className="text-[10px]">
                                {errors.chart_code.message}
                            </p>
                        )}
                    </li>
                    <li className={style.twoField}>
                        <div>
                            <label>PARENT</label>
                            <div className={style.Dropdown}>
                                <input
                                    type="number"
                                    value={isParent.value}
                                    {...register("parent", {
                                        onChange: () => {
                                            setValue("parent", isParent.value, {
                                                shouldValidate: true,
                                            });
                                        },
                                    })}
                                    onChange={(e: any) =>
                                        setParent({
                                            ...isParent,
                                            value: e.target.value,
                                        })
                                    }
                                    onFocus={() =>
                                        setParent({
                                            ...isParent,
                                            toggle: true,
                                        })
                                    }
                                />
                                {isParent.toggle && (
                                    <Parent
                                        setParent={setParent}
                                        isParent={isParent}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label>*CODE SUFFIX</label>
                            <input
                                type="text"
                                {...register("code_suffix", {
                                    required: "Required!",
                                })}
                            />
                            {errors.code_suffix && (
                                <p className="text-[10px]">
                                    {errors.code_suffix.message}
                                </p>
                            )}
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">*ACCOUNT NAME</label>
                        <input
                            type="text"
                            {...register("account_name", {
                                required: "Required!",
                            })}
                        />
                        {errors.account_name && (
                            <p className="text-[10px]">
                                {errors.account_name.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label htmlFor="">DESCRIPTION</label>
                        <input
                            type="text"
                            {...register("description", {
                                required: "Required!",
                            })}
                        />
                        {errors.description && (
                            <p className="text-[10px]">
                                {errors.description.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label htmlFor="">*DEFAULT ACCOUNT</label>
                        <div className={style.Dropdown}>
                            <input
                                autoComplete="off"
                                type="text"
                                value={isDefaultAccount.value}
                                {...register("defaultAccount")}
                                onChange={(e: any) => {
                                    setDefaultAccount({
                                        ...isDefaultAccount,
                                        value: e.target.value,
                                    });
                                    setValue(
                                        "defaultAccount",
                                        isDefaultAccount,
                                        {
                                            shouldValidate: true,
                                        }
                                    );
                                }}
                                onFocus={() =>
                                    setDefaultAccount({
                                        ...isDefaultAccount,
                                        toggle: true,
                                    })
                                }
                            />
                            {isDefaultAccount.toggle && (
                                <DefaultAccount
                                    setValue={setDefaultAccount}
                                    isValue={isDefaultAccount}
                                />
                            )}
                            {errors.defaultAccount && (
                                <p className="text-[10px]">
                                    {errors.defaultAccount.message}
                                </p>
                            )}
                        </div>
                    </li>
                    <li className={style.status}>
                        <label htmlFor="status">*APPLY TO SUB-ACCOUNT</label>
                        <div
                            className={`statusCircle ${
                                isStatus ? "active" : "inactive"
                            }`}
                            onClick={() => setStatus(!isStatus)}
                        ></div>
                    </li>
                    <li>
                        <label htmlFor="">BANK ACCOUNT NO.</label>
                        <input
                            type="text"
                            {...register("bank_acc_no", {
                                required: "Required!",
                            })}
                        />
                    </li>
                    <li>
                        <label htmlFor="">BANK AND BRANCH</label>
                        <input
                            type="text"
                            {...register("bank_branch", {
                                required: "Required!",
                            })}
                        />
                    </li>
                </ul>
                <div className={style.SaveButton}>
                    <aside className={style.back} onClick={cancel}>
                        CANCEL
                    </aside>

                    {router.query.modify !== undefined && (
                        <aside
                            className={`mr-5 ${style.next}`}
                            onClick={deleteHandler}
                        >
                            {DeleteLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "DELETE"
                            )}
                        </aside>
                    )}

                    <div className={style.Save}>
                        <div>
                            <button
                                name="save"
                                className={style.save_button}
                                type="submit"
                                onClick={() => setSaveButton("save")}
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
                                        type="submit"
                                        onClick={() => setSaveButton("new")}
                                    >
                                        SAVE & NEW
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </form>
    );
}
