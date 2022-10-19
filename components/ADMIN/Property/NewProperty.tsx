import React, { useRef, useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";

export default function NewProperty() {
    const { setToggleNewForm } = useContext(AppContext);
    const modal = useRef<any>();
    const [isSave, setSave] = useState(false);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggleNewForm(false);
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
                        <aside
                            className="cancel_button mr-5 font-bold cursor-pointer"
                            onClick={() => setToggleNewForm(false)}
                        >
                            Cancel
                        </aside>

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
