import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import PrimaryInfo from "./PrimaryInfo";
import NextContactInfo from "./NextContactInfo";
import { AnimatePresence } from "framer-motion";

export default function NewCorporate() {
    const [isNewActive, setNewActive] = useState([true, false]);
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

    return (
        <div className={style.container}>
            <section ref={modal}>
                <p className={style.modal_title}>Create Corporate</p>
                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <PrimaryInfo
                            key={1}
                            setNewActive={setNewActive}
                            isNewActive={isNewActive}
                        />
                    )}
                    {isNewActive[1] && (
                        <NextContactInfo
                            key={2}
                            setNewActive={setNewActive}
                            isNewActive={isNewActive}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
