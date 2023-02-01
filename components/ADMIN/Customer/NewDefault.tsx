import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function NewDefault() {
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const [isValidIDUrl, setValidIDUrl] = useState("/Images/id-sample.png");
    const { setCusToggle } = useContext(AppContext);
    return (
        <>
            <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <aside className="w-20 h-20 relative flex mr-4">
                        <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative overflow-hidden">
                            <Image
                                src={`${isProfileUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>
                        <input
                            type="file"
                            id="image"
                            className="hidden pointer-events-none"
                            data-type="profile"
                        />
                        <label
                            htmlFor="image"
                            className=" pointer-events-none  cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                        >
                            <AiFillCamera />
                        </label>
                    </aside>
                </li>
                <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <input
                        type="file"
                        id="validid"
                        className="hidden pointer-events-none"
                        data-type="validID"
                    />
                    <label
                        htmlFor="validid"
                        className="text-[12px] pointer-events-none text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                    >
                        <aside className=" w-24 mr-2 h-16 relative">
                            <Image
                                src={`${isValidIDUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>
                        UPLOAD VALID ID
                    </label>
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                    <label
                        className=" pointer-events-none text-[12px] font-NHU-medium uppercase cursor-pointer w-[90%] 480px:w-full"
                        htmlFor="file"
                    >
                        Upload Signature
                    </label>
                    <input id="file" type="file" className="hidden" />
                </li>
            </ul>
            <motion.ul
                variants={ModalSideFade}
                initial="initial"
                animate="animate"
                exit="exit"
                className={style.ThreeRows}
            >
                <li>
                    <label>CLASS</label>
                    <div className="select">
                        <select name="" id="" disabled>
                            <option value=""></option>
                        </select>
                        <span>
                            <MdOutlineKeyboardArrowDown />
                        </span>
                    </div>
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
            </motion.ul>

            <div className=" w-full flex justify-end items-center">
                <aside
                    onClick={() => setCusToggle(false)}
                    className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                >
                    CANCEL
                </aside>
            </div>
        </>
    );
}
