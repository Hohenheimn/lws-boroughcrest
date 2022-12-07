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
    transaction: boolean;
};

export default function COAForm({
    setCreate,
    DefaultFormData,
    transaction,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [saveButton, setSaveButton] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isSave, setSave] = useState(false);
    const [isStatus, setStatus] = useState(true);
    const [isChartCode, setChartcode] = useState({
        parent: "",
        suffix: "",
    });
    const ErrorDefault = {
        account_name: "",
        chart_code: "",
        coa_default_account_id: "",
        code_suffix: "",
        parent_id: "",
    };
    const [isError, setError] = useState({
        ...ErrorDefault,
    });
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
        setChartcode({
            parent:
                DefaultFormData.parent === undefined
                    ? ""
                    : DefaultFormData.parent,
            suffix: DefaultFormData.code_suffix,
        });
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
            setChartcode({
                parent: "",
                suffix: "",
            });
            setStatus(true);
        }
        queryClient.invalidateQueries("COA-list");
        queryClient.invalidateQueries(["COA-detail", router.query.modify]);
        setError({
            ...ErrorDefault,
        });
    };
    const onError = (e: any) => {
        setError({
            ...e.response?.data,
        });
        if (!e.response?.data) {
            setPrompt({
                message: "Something is wrong!",
                toggle: true,
                type: "error",
            });
        }
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
            chart_code: isChartCode.parent + isChartCode.suffix,
            parent_id:
                isParent.id === 0 ||
                isParent.id === undefined ||
                isParent.id === null
                    ? ""
                    : isParent.id,
            code_suffix: data.code_suffix,
            account_name: data.account_name,
            description: data.description,
            coa_default_account_id:
                isDefaultAccount.id === 0 ||
                isDefaultAccount.id === undefined ||
                isDefaultAccount.id === null
                    ? ""
                    : isDefaultAccount.id,
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
                            type="text"
                            disabled
                            value={isChartCode.parent + isChartCode.suffix}
                            onChange={() => {}}
                            className=" bg-ThemeRed50"
                        />
                        {isError.chart_code !== "" && (
                            <p className="text-[10px]">{isError.chart_code}</p>
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
                                    onChange={(e: any) => {
                                        setParent({
                                            ...isParent,
                                            value: e.target.value,
                                        });
                                        setChartcode({
                                            ...isChartCode,
                                            parent: e.target.value,
                                        });
                                    }}
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
                                        setChartcode={setChartcode}
                                        isChartcode={isChartCode}
                                        isParent={isParent}
                                    />
                                )}
                                {isError.parent_id && (
                                    <p className="text-[10px]">
                                        {isError.parent_id}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>*CODE SUFFIX</label>
                            <input
                                type="number"
                                {...register("code_suffix")}
                                value={isChartCode.suffix}
                                onChange={(e) => {
                                    if (e.target.value.length <= 2) {
                                        setChartcode({
                                            ...isChartCode,
                                            suffix: e.target.value,
                                        });
                                    }
                                }}
                            />
                            {isError.code_suffix && (
                                <p className="text-[10px]">
                                    {isError.code_suffix}
                                </p>
                            )}
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">*ACCOUNT NAME</label>
                        <input type="text" {...register("account_name")} />
                        {isError.account_name && (
                            <p className="text-[10px]">
                                {isError.account_name}
                            </p>
                        )}
                    </li>
                    <li>
                        <label htmlFor="">DESCRIPTION</label>
                        <input type="text" {...register("description")} />
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
                            {isError.coa_default_account_id && (
                                <p className="text-[10px]">
                                    {isError.coa_default_account_id}
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
                        <input type="text" {...register("bank_acc_no")} />
                    </li>
                    <li>
                        <label htmlFor="">BANK AND BRANCH</label>
                        <input type="text" {...register("bank_branch")} />
                    </li>
                </ul>
                <div className={style.SaveButton}>
                    <aside className={style.back} onClick={cancel}>
                        CANCEL
                    </aside>

                    {router.query.modify !== undefined && (
                        <>
                            {transaction ? (
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
                            ) : (
                                ""
                            )}
                        </>
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
