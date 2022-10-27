import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import style from "../../../styles/Popup_Modal.module.scss";
import { useRouter } from "next/router";
import {
    PostCustomerDraft,
    PostCustomerSave,
} from "../../ReactQuery/CustomerMethod";

type NewPropertyInfo = {
    setActiveForm: Function;
};

export default function NewPropertyInfo({ setActiveForm }: NewPropertyInfo) {
    const router = useRouter();
    const [whichSaveBtn, setWhichSaveBtn] = useState("");
    const { isNewCustomer, setNewCustomer, emptyCustomer } =
        useContext(AppContext);
    const [isProperty, setProperty] = useState<any>([
        {
            id: 1,
            unitCode: "",
            project: "",
        },
    ]);
    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };
    const [isSave, setSave] = useState(false);

    // MUTATION START HERE
    // Save Mutation
    const Success = () => {
        if (whichSaveBtn === "save") {
            emptyCustomer();
            router.push("");
        }
        if (whichSaveBtn === "savenew") {
            // empty Field
            emptyCustomer();
            // Go to first form
            setActiveForm((item: boolean[]) => [
                (item[0] = true),
                (item[1] = false),
                (item[2] = false),
            ]);
        }
    };
    const {
        isLoading: MutateLoading,
        mutate,
        isError,
        error,
    } = PostCustomerSave(Success);

    // SAVE DRAFT MUTATION
    const SuccessDraft = () => {
        router.push("");
    };
    const {
        isLoading: DraftLoading,
        mutate: DraftMutate,
        isError: DraftError,
    } = PostCustomerDraft(SuccessDraft);

    if (isError) {
        console.log(error);
    }

    const SaveMutation = async () => {
        const ArrayPropertyID = isProperty.map((item: any) => {
            return item.unitCode;
        });

        await setNewCustomer({
            ...isNewCustomer,
            unit_codes: ArrayPropertyID,
        });

        if (ArrayPropertyID.includes("")) {
            alert("Cannot proceed, one of unit code is empty");
            return;
        }

        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(isNewCustomer);

        await keys.forEach((key) => {
            arrayData.push({
                key: key,
                keyData: isNewCustomer[key],
            });
        });
        arrayData.map(({ key, keyData }: any) => {
            formData.append(key, keyData);
        });

        mutate(formData);
        // console.log(arrayData);
    };

    // SAVE BUTTONS
    const Save = () => {
        setWhichSaveBtn("save");
        SaveMutation();
    };
    const SaveNew = () => {
        setWhichSaveBtn("savenew");
        SaveMutation();
    };
    const SaveDraft = async () => {
        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(isNewCustomer);

        const ArrayPropertyID = isProperty.map((item: any) => {
            return item.unitCode;
        });

        await setNewCustomer({
            ...isNewCustomer,
            unit_codes: ArrayPropertyID,
        });

        await keys.forEach((key) => {
            arrayData.push({
                key: key,
                keyData: isNewCustomer[key],
            });
        });
        arrayData.map(({ key, keyData }: any) => {
            formData.append(key, keyData);
        });
        DraftMutate(formData);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className=" w-full text-[24px] mb-3">Property Information</h1>

            <table className="w-full mb-20">
                <thead>
                    <tr>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            UNIT CODE
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            PROJECT
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isProperty.map((item: any, index: number) => (
                        <List
                            detail={item}
                            setProperty={setProperty}
                            key={index}
                            isProperty={isProperty}
                        />
                    ))}
                </tbody>
            </table>

            <div className={style.SaveButton}>
                <button
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={Back}
                >
                    BACK
                </button>
                {(MutateLoading || DraftLoading) && (
                    <div className={style.Save}>
                        <div>
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        </div>
                    </div>
                )}
                {(!MutateLoading || !DraftLoading) && (
                    <div className={style.Save}>
                        <div onClick={() => setSave(!isSave)}>
                            SAVE{" "}
                            <RiArrowDownSFill className=" ml-1 text-[24px]" />
                        </div>
                        {isSave && (
                            <ul>
                                <li>
                                    <button
                                        type="submit"
                                        name="save"
                                        onClick={Save}
                                    >
                                        SAVE
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="submit"
                                        name="save-new"
                                        onClick={SaveNew}
                                    >
                                        SAVE & NEW
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="submit"
                                        name="save-new"
                                        onClick={SaveDraft}
                                    >
                                        SAVE AS DRAFT
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
type List = {
    detail: any;
    setProperty: Function;
    isProperty: {}[];
};
const List = ({ detail, isProperty, setProperty }: List) => {
    const newID = Math.random();

    const updateValue = (event: any, valueType: string) => {
        const newItems = isProperty.map((item: any) => {
            if (detail.id == item.id) {
                if (valueType === "project")
                    return { ...item, project: event.target.value };
                if (valueType === "unitCode")
                    return { ...item, unitCode: event.target.value };
            }
            return item;
        });
        setProperty(newItems);
    };

    return (
        <tr>
            <td className=" pr-2 w-2/4">
                {/* <input
                    type="text"
                    value={detail.unitCode}
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                    onChange={(e) => updateValue(e, "unitCode")}
                /> */}
                <select
                    name=""
                    id=""
                    value={detail.unitCode}
                    onChange={(e) => updateValue(e, "unitCode")}
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                >
                    <option value=""></option>
                    <option value="123">123</option>
                    <option value="321">321</option>
                    <option value="132">132</option>
                </select>
            </td>
            <td className=" pr-2">
                <input
                    type="text"
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none bg-ThemeRed50"
                    value={detail.project}
                    onChange={(e) => updateValue(e, "project")}
                />
            </td>
            <td className=" flex justify-center">
                {isProperty.length > 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed mr-2"
                        onClick={() =>
                            setProperty((item: any[]) =>
                                item.filter(
                                    (x: { id: any }) => x.id !== detail.id
                                )
                            )
                        }
                    >
                        -
                    </button>
                )}
                <button
                    className=" text-[32px] text-ThemeRed"
                    onClick={() =>
                        setProperty((item: any) => [
                            ...item,
                            {
                                id: newID,
                                unitCode: "",
                                project: "",
                            },
                        ])
                    }
                >
                    +
                </button>
            </td>
        </tr>
    );
};
