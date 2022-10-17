import React, { useRef, useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import NewDefault from "./NewDefault";
import NewIndividual from "./NewIndividual";
import NewCompany from "./NewCompany";
import { AnimatePresence } from "framer-motion";
import style from "../../../styles/Popup_Modal.module.scss";

type NewPrimaryInfo = {
    setActiveForm: Function;
};

export default function NewPrimaryInfo({ setActiveForm }: NewPrimaryInfo) {
    const [isType, setType] = useState<string>("");

    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const [isValidIDUrl, setValidIDUrl] = useState("/Images/id-sample.png");

    const NextFormValidation = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

    const DisplayImage = (e: any) => {
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (
                ["image/jpeg", "image/png", "image/svg+xml"].includes(
                    selectedImage.type
                )
            ) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);

                ImageReader.addEventListener("load", (event: any) => {
                    if (e.target.getAttribute("data-type") === "profile") {
                        setProfileUrl(event.target.result);
                    }
                    if (e.target.getAttribute("data-type") === "validID") {
                        setValidIDUrl(event.target.result);
                    }
                });
            } else {
                alert("Invalid Image File");
            }
        } else {
            alert("Nothing Happens");
        }
    };

    return (
        <>
            <h1 className={style.modal_label_primary}>Primary Informations</h1>
            <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                <aside className=" w-4/12 480px:w-2/4">
                    <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                        TYPE
                    </p>

                    <select
                        name=""
                        id=""
                        onChange={(e) => setType(e.target.value)}
                        className="uppercase rounded-md px-2 py-[2px] border-none text-black outline-none w-[90%] 480px:w-full"
                    >
                        <option
                            value=""
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        ></option>
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
                        className=" h-5 w-5 rounded-full border-4 border-[#19d142] cursor-pointer"
                        style={{ boxShadow: "0 0 15px 0 #19d142" }}
                    ></div>
                </aside>
            </div>
            <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <aside className="w-20 h-20 relative flex mr-4">
                        <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative">
                            <Image
                                src={`${isProfileUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={DisplayImage}
                            data-type="profile"
                        />
                        <label
                            htmlFor="image"
                            className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                        >
                            <AiFillCamera />
                        </label>
                    </aside>
                </li>
                <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <input
                        type="file"
                        id="validid"
                        className="hidden"
                        onChange={DisplayImage}
                        data-type="validID"
                    />
                    <label
                        htmlFor="validid"
                        className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
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
                        className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                        htmlFor="file"
                    >
                        Upload Signature
                    </label>
                    <input id="file" type="file" className="hidden" />
                </li>
            </ul>
            <AnimatePresence mode="wait">
                {isType === "" && <NewDefault key={1} />}
                {isType === "individual" && <NewIndividual key={2} />}
                {isType === "company" && <NewCompany key={3} />}
            </AnimatePresence>

            <div className=" w-full flex justify-end items-center">
                <Link href="">
                    <a className=" text-ThemeRed font-semibold text-[14px] mr-5">
                        CANCEL
                    </a>
                </Link>
                <button
                    onClick={NextFormValidation}
                    className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                >
                    NEXT
                </button>
            </div>
        </>
    );
}
