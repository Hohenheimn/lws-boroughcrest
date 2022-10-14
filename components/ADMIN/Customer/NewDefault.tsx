import React from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { motion } from "framer-motion";

export default function NewDefault() {
    return (
        <motion.ul
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={style.ThreeRows}
        >
            <li>
                <label>ID</label>
                <input type="text" disabled className="bg-ThemeRed50" />
            </li>
            <li>
                <label>CLASS</label>
                <select name="" id="" disabled>
                    <option value=""></option>
                </select>
            </li>
            <li>
                <label>NAME</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>SPOUSE / CO-OWNER</label>
                <input disabled type="email" className="bg-white" />
            </li>

            <li>
                <label>CITIZENSHIP</label>
                <input disabled type="number" className="bg-white" />
            </li>
            <li>
                <label>BIRTH DATE</label>
                <input disabled type="number" className="bg-white" />
            </li>
            <li>
                <label>COMPANY NAME</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>CONTACT PERSON</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>PROPERTY</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>TIN</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>BRANCH CODE</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>PORTAL ID</label>
                <input disabled type="text" className="bg-white" />
            </li>
            <li>
                <label>Please Select a Type</label>
            </li>
        </motion.ul>
    );
}
