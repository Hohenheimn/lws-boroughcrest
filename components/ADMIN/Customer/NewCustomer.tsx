import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import NewPrimaryInfo from "./NewPrimaryInfo";
import NewContactInfo from "./NewContactInfo";
import NewPropertyInfo from "./NewPropertyInfo";
import { AnimatePresence } from "framer-motion";

export default function NewCustomer() {
    // click outside close
    const modal = useRef<any>();
    const router = useRouter();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                router.push("");
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const [isActiveForm, setActiveForm] = useState([true, false, false]);

    return (
        <div className={style.container}>
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3 font-bold">Create Customer</p>
                <AnimatePresence mode="wait">
                    {isActiveForm[0] && (
                        <NewPrimaryInfo key={1} setActiveForm={setActiveForm} />
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
