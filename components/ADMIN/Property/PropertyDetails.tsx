import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";
import style from "../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import ModifyProperty from "./ModifyProperty";
export default function PropertyDetails() {
    const [toggleModify, setToggleModify] = useState(false);
    return (
        <div>
            {toggleModify && (
                <ModifyProperty setToggleModify={setToggleModify} />
            )}
            <h1 className="pageTitle mb-5">Property Details</h1>
            <ul className={style.FourRows}>
                <aside>
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">Modify</span>}
                    >
                        <div>
                            <HiPencil
                                className={style.pencil}
                                onClick={() => setToggleModify(true)}
                            />
                        </div>
                    </Tippy>
                </aside>
                <li>
                    <p className="label_text">ID</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">UNIT CODE</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">ADDRESS</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">PROJECT</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">TOWER</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">PROJECT</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">FLOOR</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">TYPE</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">DEVELOPER</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">AREA</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">CLASS</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">ACCEPTANCE DATE</p>
                    <h4 className="main_text">1234</h4>
                </li>
                <li>
                    <p className="label_text">TURN OVER DATE</p>
                    <h4 className="main_text">1234</h4>
                </li>
            </ul>
            <h1 className={style.title}>OCCUPANTS</h1>
            <ul className={style.Occupants}>
                <li>
                    <p className="label_text">OWNER</p>
                    <h4 className="main_text">Juan Dela Cruz</h4>
                </li>
                <li>
                    <p className="label_text">TENANTS</p>
                    <ul>
                        <li>
                            <h4 className="main_text">Juan Dela Cruz</h4>
                        </li>
                        <li>
                            <h4 className="main_text">Juan Dela Cruz</h4>
                        </li>
                        <li>
                            <h4 className="main_text">Juan Dela Cruz</h4>
                        </li>
                        <li>
                            <h4 className="main_text">Juan Dela Cruz</h4>
                        </li>
                        <li>
                            <h4 className="main_text">Juan Dela Cruz</h4>
                        </li>
                        <li>
                            <h4 className="main_text">Juan Dela Cruz</h4>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
