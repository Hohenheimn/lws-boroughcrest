import React from "react";
import NewDefault from "./NewDefault";
import NewIndividual from "./NewIndividual";
import style from "../../../styles/Popup_Modal.module.scss";

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

    return (
        <div className={`${isActiveForm[0] ? "" : "hidden"}`}>
            <h1 className={style.modal_label_primary}>Primary Informations</h1>
            <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                <aside className=" w-4/12 480px:w-2/4">
                    <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                        TYPE
                    </p>

                    <select
                        name=""
                        id=""
                        defaultValue={isType}
                        onChange={(e) => setType(e.target.value)}
                        className="uppercase rounded-md px-2 py-[2px] border-none text-black outline-none w-[90%] 480px:w-full"
                    >
                        <option
                            value={isType}
                            className="text-[12px] text-white bg-ThemeRed"
                            disabled
                        >
                            {isType}
                        </option>
                        <option
                            value="individual"
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        >
                            Individual
                        </option>
                        <option
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            value="company"
                        >
                            Company
                        </option>
                    </select>
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
