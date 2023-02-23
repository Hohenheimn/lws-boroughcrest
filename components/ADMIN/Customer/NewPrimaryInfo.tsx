import React, { useState } from "react";
import NewDefault from "./NewDefault";
import NewIndividual from "./NewIndividual";
import style from "../../../styles/Popup_Modal.module.scss";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DynamicPopOver from "../../DynamicPopOver";

type NewPrimaryInfo = {
    setActiveForm: Function;
    isType: string;
    setType: Function;
    isActiveForm: any;
    setStatus: Function;
    status: any;
};

export default function NewPrimaryInfo({
    setActiveForm,
    isType,
    setType,
    isActiveForm,
    setStatus,
    status,
}: NewPrimaryInfo) {
    const Status = () => {
        setStatus(!status);
    };

    const [isSelect, setSelect] = useState(false);
    const SelectField = (value: string) => {
        setType(value);
        setSelect(false);
    };

    return (
        <div className={`${isActiveForm[0] ? "" : "hidden"}`}>
            <h1 className={style.modal_label_primary}>Primary Informations</h1>
            <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                <aside className=" w-4/12 480px:w-2/4">
                    <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                        TYPE
                    </p>
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
                                    readOnly
                                    onClick={() => setSelect(true)}
                                    value={isType}
                                />
                            }
                            samewidth={true}
                            toPop={
                                <>
                                    {isSelect && (
                                        <ul>
                                            <li
                                                onClick={() =>
                                                    SelectField("individual")
                                                }
                                            >
                                                Individual
                                            </li>
                                            <li
                                                onClick={() =>
                                                    SelectField("company")
                                                }
                                            >
                                                Company
                                            </li>
                                        </ul>
                                    )}
                                </>
                            }
                            className=""
                        />
                    </div>

                    {isType === "" && (
                        <label className=" font-NHU-bold">
                            Please Select a Type
                        </label>
                    )}
                </aside>
                <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                    <span className="mr-2 font-bold">STATUS</span>

                    <div
                        onClick={Status}
                        className={`statusCircle ${
                            status ? "active" : "inactive"
                        }`}
                    ></div>
                </aside>
            </div>

            {isType === "" && <NewDefault key={1} />}
            {isType !== "" && (
                <NewIndividual
                    key={2}
                    setActiveForm={setActiveForm}
                    isType={isType}
                    status={status}
                />
            )}
        </div>
    );
}
