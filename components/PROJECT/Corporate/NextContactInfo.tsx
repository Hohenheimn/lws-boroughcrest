import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";

type NextContactInfo = {
    setNewActive: Function;
    isNewActive: any;
};

export default function NextContactInfo({
    setNewActive,
    isNewActive,
}: NextContactInfo) {
    const [isSave, setSave] = useState(false);
    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <ul className={style.twoRows_container}>
                <li>
                    <label>CONTACT NO</label>
                    <aside>
                        <input type="text" />
                        <span>Official</span>
                    </aside>
                    <input type="text" />
                </li>
                <li>
                    <label>EMAIL ADDRESS</label>
                    <aside>
                        <input type="text" />
                        <span>Official</span>
                    </aside>
                    <input type="text" />
                </li>
            </ul>
            <p className="text-[14px] font-bold mb-2">ADDRESS</p>
            <ul className={style.ThreeRows}>
                <li>
                    <label>UNIT/FLOOR/HOUSE NO.</label>
                    <input type="text" />
                </li>
                <li>
                    <label>BUILDING</label>
                    <input type="text" />
                </li>
                <li>
                    <label>STREET</label>
                    <input type="text" />
                </li>
                <li>
                    <label>DISTRICT</label>
                    <input type="text" />
                </li>
                <li>
                    <label>MUNICIPALITY</label>
                    <input type="text" />
                </li>
                <li>
                    <label>PROVINCE</label>
                    <input type="text" />
                </li>
                <li>
                    <label>ZIP CODE</label>
                    <input type="text" />
                </li>
            </ul>
            <div className=" w-full flex justify-end items-center  mb-10">
                <button
                    className="cancel_button mr-5 font-bold"
                    onClick={() =>
                        setNewActive((item: any) => [
                            (item[0] = true),
                            (item[1] = false),
                        ])
                    }
                >
                    Back
                </button>
                <button className=" relative text-white flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                    <div
                        className=" h-8 px-5 w-full flex justify-center items-center"
                        onClick={() => setSave(!isSave)}
                    >
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul className=" absolute top-full bg-white w-full">
                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE
                            </a>

                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE & NEW
                            </a>
                        </ul>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
