import React, { useState, useContext, useEffect } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import AppContext from "../../Context/AppContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import Floor from "./Floor";
import Tower from "./Tower";
import Project from "./Project";

export default function Form() {
    const router = useRouter();
    const [isProject, setProject] = useState(false);
    const [isTower, setTower] = useState(false);
    const [isFloor, setFloor] = useState(false);
    const { setNewPropToggle } = useContext(AppContext);
    const [isSave, setSave] = useState(false);
    const [FormModify, setFormModify] = useState("New");

    const [isProjectVal, setProjectVal] = useState({
        id: 0,
        value: "",
    });
    const [isTowerVal, setTowerVal] = useState({
        id: 0,
        value: "",
    });
    const [isFloorVal, setFloorVal] = useState({
        id: 0,
        value: "",
    });

    const updateProject = (value: any, id: any) => {
        setProjectVal({
            id: id,
            value: value,
        });
    };

    const updateTower = (value: any, id: any) => {
        setTowerVal({
            id: id,
            value: value,
        });
    };
    const updateFloor = (value: any, id: any) => {
        setFloorVal({
            id: id,
            value: value,
        });
    };

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
                                content={
                                    <>
                                        {isProject && (
                                            <Project
                                                set={setProject}
                                                update={updateProject}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isProject ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    value={isProjectVal.value}
                                    onFocus={() => setProject(true)}
                                    onChange={() => {}}
                                />
                            </Tippy>
                        </li>
                        <li>
                            <label>TOWER</label>
                            <Tippy
                                content={
                                    <>
                                        {isTower && (
                                            <Tower
                                                set={setTower}
                                                is={isTower}
                                                update={updateTower}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isTower ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    value={isTowerVal.value}
                                    onFocus={() => setTower(true)}
                                    onChange={() => {}}
                                />
                            </Tippy>
                        </li>
                        <li>
                            <label>FLOOR</label>
                            <Tippy
                                content={
                                    <>
                                        {isFloor && (
                                            <Floor
                                                set={setFloor}
                                                is={isFloor}
                                                update={updateFloor}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isFloor ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    value={isFloorVal.value}
                                    onFocus={() => setFloor(true)}
                                    onChange={() => {}}
                                />
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
