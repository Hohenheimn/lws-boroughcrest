import React, { useState, useContext, useEffect } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import AppContext from "../../Context/AppContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";

export default function Form() {
    const router = useRouter();
    const { setNewPropToggle } = useContext(AppContext);
    const [isSave, setSave] = useState(false);
    const [FormModify, setFormModify] = useState("New");

    useEffect(() => {
        if (router.query.id !== undefined) {
            setFormModify("Modify");
        }
    }, []);

    const cancel = () => {
        setNewPropToggle(false);
    };

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>{FormModify} Property</p>
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
                        {FormModify === "Modify" && (
                            <li>
                                <label>ID</label>

                                <p className="rounded-md text-black px-2 py-[2px] outline-none w-[100%] 480px:w-full bg-[#cdb8be]">
                                    {router.query.id}
                                </p>
                            </li>
                        )}
                        <li>
                            <label>TYPE</label>
                            <select name="" id="">
                                <option value="active">Active</option>
                                <option value="inactive">Inctive</option>
                            </select>
                        </li>
                        <li>
                            <label>UNIT CODE</label>
                            <input type="text" />
                        </li>
                        <li>
                            <label>CLASS</label>
                            <select name="" id="">
                                <option value="sample 1">Sample1</option>
                                <option value="sample 2">Sample2</option>
                                <option value="sample 3">Sample3</option>
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
                            <Tippy
                                content={<CRUD_table />}
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={true}
                            >
                                <input type="text" />
                            </Tippy>
                        </li>
                        <li>
                            <label>TOWER</label>
                            <Tippy
                                content={<CRUD_table />}
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={true}
                            >
                                <input type="text" />
                            </Tippy>
                        </li>
                        <li>
                            <label>FLOOR</label>
                            <Tippy
                                content={<CRUD_table />}
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={true}
                            >
                                <input type="text" />
                            </Tippy>
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
                            onClick={cancel}
                        >
                            CANCEL
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
const CRUD_table = () => {
    return (
        <div>
            <table className="crud-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <List />
                </tbody>
            </table>
            <h1 className="cursor-pointer text-ThemeRed text-[16px] py-2">
                ADD
            </h1>
        </div>
    );
};

const List = () => {
    const [isModify, setModify] = useState(false);
    const Selected = () => {
        alert("Selected");
    };
    return (
        <tr className="cursor-pointer">
            <td onClick={() => !isModify && Selected()}>
                <input
                    type="text"
                    placeholder="adad"
                    className={`${!isModify && "disabled"}`}
                />
            </td>
            <td onClick={() => !isModify && Selected()}>
                <input
                    type="text"
                    placeholder="adad"
                    className={`${!isModify && "disabled"}`}
                />
            </td>
            <td className="action">
                <div>
                    <BiEdit
                        className="icon"
                        onClick={() => setModify(!isModify)}
                    />
                    <MdDeleteOutline className="icon" />
                </div>
            </td>
        </tr>
    );
};
