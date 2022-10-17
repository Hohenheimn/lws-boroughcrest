import React, { useRef, useEffect, useState } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { useRouter } from "next/router";
import { RiArrowDownSFill } from "react-icons/ri";
import Link from "next/link";

type Props = {
    setToggleModify: Function;
};

export default function ModifyProperty({ setToggleModify }: Props) {
    const modal = useRef<any>();
    const router = useRouter();

    const [isSave, setSave] = useState(false);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggleModify(false);
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
                <p className={style.modal_title}>New Property</p>
                <motion.div
                    variants={ModalSideFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1 className={style.modal_label_primary}>
                        Primary Information
                    </h1>
                    <ul className={style.ThreeRows}>
                        <li>
                            <label>ID</label>
                            <input
                                type="text"
                                value="123"
                                disabled={true}
                                className=" bg-[#cdb8be]"
                            />
                        </li>
                        <li>
                            <label>TYPE</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                        <li>
                            <label>UNIT CODE</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>CLASS</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                        <li>
                            <label>ADDRESS</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>DEVELOPER</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>PROJECT</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                        <li>
                            <label>TOWER</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                        <li>
                            <label>FLOOR</label>
                            <select name="" id="">
                                <option value=""></option>
                            </select>
                        </li>
                        <li>
                            <label>AREA</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>ACCEPTANCE DATE</label>
                            <input type="date" />
                        </li>
                        <li>
                            <label>TURNOVER DATE</label>
                            <input type="date" />
                        </li>
                    </ul>
                    <div className={style.SaveButton}>
                        <a
                            className="cancel_button mr-5 font-bold cursor-pointer"
                            onClick={() => setToggleModify(false)}
                        >
                            Cancel
                        </a>

                        <button className={style.Save}>
                            <div onClick={() => setSave(!isSave)}>
                                SAVE{" "}
                                <RiArrowDownSFill className={style.Arrow} />
                            </div>
                            {isSave && (
                                <ul>
                                    <li>SAVE</li>

                                    <li>SAVE & NEW</li>
                                </ul>
                            )}
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
