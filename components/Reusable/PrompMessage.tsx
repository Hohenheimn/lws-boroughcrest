import React, { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { motion } from "framer-motion";
import { FadeDown } from "../../components/Animation/SimpleAnimation";

export default function PrompMessage() {
    const { togglePrompt, setPrompt } = useContext(AppContext);
    useEffect(() => {
        const intervalPrompt = setInterval(() => {
            setPrompt(
                (i: any) =>
                    (i = {
                        ...togglePrompt,
                        toggle: false,
                    })
            );
        }, 3000);
        return () => clearInterval(intervalPrompt);
    });
    return (
        <motion.div
            variants={FadeDown}
            animate="animate"
            initial="initial"
            exit="exit"
            className={`${togglePrompt.type === "success" && "bg-[#1c9f11]"} ${
                togglePrompt.type === "error" && "bg-[#8f384d]"
            } ${
                togglePrompt.type === "draft" && "bg-[#f19308]"
            } transition duration-75 fixed top-10 right-10 480px:top-5 480px:right-5 z-[99999] 820px:px-7 820px:py-3 opacity-90 px-10 py-5 shadow-lg rounded-lg`}
        >
            <h1 className="text-white 820px:text-[12px] max-w-[500px]">
                {togglePrompt.message}
            </h1>
        </motion.div>
    );
}
