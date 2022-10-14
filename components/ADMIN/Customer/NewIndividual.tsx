import React from "react";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { motion } from "framer-motion";
import style from "../../../styles/Popup_Modal.module.scss";
export default function NewIndividual() {
    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <ul className={style.ThreeRows}>
                <li>
                    <label>ID</label>
                    <input type="text" className="bg-ThemeRed50" disabled />
                </li>
                <li>
                    <label>CLASS</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </li>
                <li>
                    <label>NAME</label>
                    <input type="text" className="bg-white" />
                </li>
                <li>
                    <label>CO-OWNER</label>
                    <input type="email" className="bg-white" />
                </li>

                <li>
                    <label>CITIZENSHIP</label>
                    <input type="number" className="bg-white" />
                </li>
                <li>
                    <label>BIRTH DATE</label>
                    <input type="number" className="bg-white" />
                </li>
                <li className={style.twoRows}>
                    <div className={style.wrapper}>
                        <div className=" w-[48%]">
                            <label>TIN Number</label>
                            <input type="text" />
                        </div>
                        <div className=" w-[48%]">
                            <label>Branch Code</label>
                            <input type="text" />
                        </div>
                    </div>
                </li>
                <li>
                    <label>PROPERTY</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </li>
            </ul>
        </motion.div>
    );
}
