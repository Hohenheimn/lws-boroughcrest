import React, { useRef, useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import NewPrimaryInfo from "./NewPrimaryInfo";
import NewContactInfo from "./NewContactInfo";
import NewPropertyInfo from "./NewPropertyInfo";
import { AnimatePresence } from "framer-motion";

export default function NewCustomer() {
    // click outside close
    const router = useRouter();

    const [isActiveForm, setActiveForm] = useState([true, false, false]);
    const [isType, setType] = useState<string>("");

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Create Customer</p>
                <AnimatePresence mode="wait">
                    {isActiveForm[0] && (
                        <NewPrimaryInfo
                            key={1}
                            setActiveForm={setActiveForm}
                            isType={isType}
                            setType={setType}
                        />
                    )}
                    {isActiveForm[1] && (
                        <NewContactInfo key={2} setActiveForm={setActiveForm} />
                    )}
                    {isActiveForm[2] && (
                        <NewPropertyInfo
                            key={3}
                            setActiveForm={setActiveForm}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
