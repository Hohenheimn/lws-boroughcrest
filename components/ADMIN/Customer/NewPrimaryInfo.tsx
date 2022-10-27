import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import NewDefault from "./NewDefault";
import NewIndividual from "./NewIndividual";
import NewCompany from "./NewCompany";
import { AnimatePresence } from "framer-motion";
import style from "../../../styles/Popup_Modal.module.scss";

type NewPrimaryInfo = {
    setActiveForm: Function;
    isType: string;
    setType: Function;
};

export default function NewPrimaryInfo({
    setActiveForm,
    isType,
    setType,
}: NewPrimaryInfo) {
    const [status, setStatus] = useState(true);
    return (
        <>
            <h1 className={style.modal_label_primary}>Primary Informations</h1>
            <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                <aside className=" w-4/12 480px:w-2/4">
                    <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                        TYPE
                    </p>

                    <select
                        name=""
                        id=""
                        value={isType}
                        onChange={(e) => setType(e.target.value)}
                        className="uppercase rounded-md px-2 py-[2px] border-none text-black outline-none w-[90%] 480px:w-full"
                    >
                        <option
                            value=""
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        ></option>
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
                </aside>
                <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                    <span className="mr-2 font-bold">STATUS</span>

                    <div
                        onClick={() => setStatus(!status)}
                        className={`h-5 w-5 rounded-full cursor-pointer border-4 ${
                            status ? "border-[#19d142]" : "border-[#8f384d]"
                        }`}
                        style={
                            status
                                ? { boxShadow: "0 0 15px 0 #19d142" }
                                : { boxShadow: "0 0 15px 0 #8f384d" }
                        }
                    ></div>
                </aside>
            </div>

            <AnimatePresence mode="wait">
                {isType === "" && <NewDefault key={1} />}
                {isType === "individual" && (
                    <NewIndividual
                        key={2}
                        setActiveForm={setActiveForm}
                        isType={isType}
                        status={status}
                    />
                )}
                {isType === "company" && <NewCompany key={3} />}
            </AnimatePresence>
        </>
    );
}
