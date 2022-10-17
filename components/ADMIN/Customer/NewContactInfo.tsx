import React from "react";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";
import style from "../../../styles/Popup_Modal.module.scss";

type NewContactInfo = {
    setActiveForm: Function;
};
export default function NewContactInfo({ setActiveForm }: NewContactInfo) {
    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
            (item[2] = false),
        ]);
    };

    const NextFormValidation = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = false),
            (item[2] = true),
        ]);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <p className="text-[14px] font-bold mb-2">ADDRESS</p>
            <ul className={style.ThreeRows}>
                <li>
                    <label>MOBILE</label>
                    <input type="text" />
                </li>
                <li>
                    <label>REGISTERED-EMAIL</label>
                    <input type="email" />
                </li>
                <li>
                    <label>PREFERED EMAIL</label>
                    <input type="text" />
                    <aside className={style.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="sameEmail"
                            className={style.same}
                        />
                        <label htmlFor="sameEmail">
                            SAME AS REGISTER EMAIL
                        </label>
                    </aside>
                </li>
            </ul>

            <p className="text-[14px] font-bold mb-2">REGISTERED ADDRESS</p>
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
                    <label>MUNICIPALITY CITY</label>
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

            <p className="text-[14px] font-bold mb-2">MAILING ADDRESS</p>
            <aside className={style.checkboxContainer}>
                <input
                    type="checkbox"
                    id="sameAddress"
                    className={style.same}
                />
                <label htmlFor="sameAddress">SAME AS REGISTER ADDRESS</label>
            </aside>

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
                    <label>MUNICIPALITY CITY</label>
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
            <div className=" w-full flex justify-end items-center">
                <button
                    onClick={Back}
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                >
                    Back
                </button>

                <button
                    onClick={NextFormValidation}
                    className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                >
                    NEXT
                </button>
            </div>
        </motion.div>
    );
}
