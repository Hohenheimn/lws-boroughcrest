import React, { useState } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import Link from "next/link";

export default function NewProperty() {
    const [isSave, setSave] = useState(false);

    return (
        <div className={style.container}>
            <section>
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
                        <Link href="">
                            <a className="cancel_button mr-5 font-bold cursor-pointer">
                                Cancel
                            </a>
                        </Link>

                        <button className={style.Save}>
                            <div onClick={() => setSave(!isSave)}>
                                SAVE{" "}
                                <RiArrowDownSFill className={style.Arrow} />
                            </div>
                            {isSave && (
                                <ul>
                                    <li>
                                        <button>SAVE</button>
                                    </li>

                                    <li>
                                        <button>SAVE & NEW</button>
                                    </li>
                                    <li>
                                        <button>SAVE AS DRAFT</button>
                                    </li>
                                </ul>
                            )}
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
