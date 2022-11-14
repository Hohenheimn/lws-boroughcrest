import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import ImageVerication from "./ImageVerication";

export default function UpdateDraft() {
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const [isValidIDUrl, setValidIDUrl] = useState("/Images/id-sample.png");
    const [isSignature, setSignature] = useState(false);
    const [imgError, setImgError] = useState({
        img1: "",
        img2: "",
        img3: "",
    });

    const [status, setStatus] = useState(true);
    const [isType, setType] = useState("");

    const router = useRouter();

    const Status = () => {
        setStatus(!status);
    };

    const Close = () => {
        router.push("");
    };

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Draft Customer</p>
                <h1 className={style.modal_label_primary}>
                    Primary Informations
                </h1>
                <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                    <aside className=" w-4/12 480px:w-2/4">
                        <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                            TYPE
                        </p>

                        <select
                            name=""
                            id=""
                            defaultValue={isType}
                            onChange={(e) => setType(e.target.value)}
                            className="uppercase rounded-md px-2 py-[2px] border-none text-black outline-none w-[90%] 480px:w-full"
                        >
                            <option
                                value={isType}
                                className="text-[12px] text-white bg-ThemeRed"
                                disabled
                            >
                                {isType}
                            </option>
                            <option
                                value="individual"
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            >
                                Individual
                            </option>
                            <option
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                                value="company"
                            >
                                Company
                            </option>
                        </select>
                    </aside>
                    <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                        <span className="mr-2 font-bold">STATUS</span>

                        <div
                            onClick={Status}
                            className={`statusCircle ${
                                status ? "active" : "inactive"
                            }`}
                        ></div>
                    </aside>
                </div>
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
                                className="absolute z-[-99] w-0 overflow-hidden"
                                data-type="profile"
                            />
                            <label
                                htmlFor="image"
                                className="  cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
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
                        <select name="" id="" disabled>
                            <option value=""></option>
                        </select>
                    </li>
                    <li>
                        <label>NAME</label>
                        <input disabled type="text" className="bg-white" />
                    </li>
                    {(isType === "individual" || isType === "") && (
                        <>
                            <li>
                                <label>CO-OWNER</label>
                                <input
                                    disabled
                                    type="email"
                                    className="bg-white"
                                />
                            </li>

                            <li>
                                <label>CITIZENSHIP</label>
                                <input
                                    disabled
                                    type="number"
                                    className="bg-white"
                                />
                            </li>
                            <li>
                                <label>BIRTH DATE</label>
                                <input
                                    disabled
                                    type="number"
                                    className="bg-white"
                                />
                            </li>
                        </>
                    )}
                    <li>
                        <label>{isType === "company" && "COMPANY "}NAME</label>
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
                </motion.ul>
                {isType === "" && (
                    <ul>
                        <li>
                            <label>Please Select a Type</label>
                        </li>
                    </ul>
                )}
                <div className=" w-full flex justify-end items-center">
                    <aside
                        onClick={Close}
                        className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                    >
                        CANCEL
                    </aside>
                    {isType !== "" && (
                        <button
                            type="submit"
                            className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                        >
                            NEXT
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
}
