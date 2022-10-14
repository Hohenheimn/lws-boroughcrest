import React, { useRef, useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";

type ModifyCustomer = {
    setToggleModify: Function;
};

export default function ModifyCustomer({ setToggleModify }: ModifyCustomer) {
    const modal = useRef<any>();

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

    const [isActiveForm, setActiveForm] = useState([true, false, false]);

    return (
        <div className={style.container}>
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3 font-bold">Modify Customer</p>
                <AnimatePresence mode="wait">
                    {isActiveForm[0] && (
                        <Primary
                            key={1}
                            setToggleModify={setToggleModify}
                            setActiveForm={setActiveForm}
                        />
                    )}
                    {isActiveForm[1] && (
                        <Contact
                            key={2}
                            setToggleModify={setToggleModify}
                            setActiveForm={setActiveForm}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
type Props = {
    setToggleModify: Function;
    setActiveForm: Function;
};
const Primary = ({ setToggleModify, setActiveForm }: Props) => {
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
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className=" w-full text-[24px] mb-3">Primary Information</h1>
            <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                <aside className=" w-4/12 480px:w-2/4">
                    <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                        TYPE
                    </p>
                    <select
                        name=""
                        id=""
                        className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                    >
                        <option
                            value=""
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        >
                            Individual
                        </option>
                        <option
                            value=""
                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
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
                        <aside className=" bg-white h-full w-full text-[12px] rounded-full object-cover shadow-lg relative">
                            <Image
                                src={`${isProfileUrl}`}
                                alt="Sample Profile"
                                // className=" bg-white h-full w-full rounded-full object-cover shadow-lg"
                                layout="fill"
                            />
                        </aside>

                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            data-type="profile"
                            onChange={DisplayImage}
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
                        data-type="validID"
                        onChange={DisplayImage}
                    />
                    <label
                        htmlFor="validid"
                        className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                    >
                        <aside className=" w-24 h-16 mr-2 relative">
                            <Image
                                src={`${isValidIDUrl}`}
                                alt="sample id"
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
            <ul className=" flex mb-10 flex-wrap 480px:mb-2">
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase">
                        ID
                    </label>
                    <input
                        type="text"
                        disabled={true}
                        className="w-[90%] bg-ThemeRed50 rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    />
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase">
                        CLASS
                    </label>
                    <select
                        name=""
                        id=""
                        className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    >
                        <option
                            value=""
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                        ></option>
                    </select>
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase w-[90%]">
                        NAME
                    </label>
                    <input
                        type="text"
                        className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    />
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase">
                        SPOUSE / CO-OWNER
                    </label>
                    <input
                        type="email"
                        className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    />
                </li>

                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase">
                        CITIZENSHIP
                    </label>
                    <input
                        type="number"
                        className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    />
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase">
                        BIRTH DATE
                    </label>
                    <input
                        type="number"
                        className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    />
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <div className=" w-[90%] flex justify-between  480px:w-full">
                        <div className=" w-[48%]">
                            <label className=" text-[12px] font-semibold mb-1 uppercase">
                                TIN Number
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-md text-black px-2 py-[2px] outline-none text-[12px]"
                            />
                        </div>
                        <div className=" w-[48%]">
                            <label className=" text-[12px] font-semibold mb-1 uppercase">
                                Branch Code
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-md text-black px-2 py-[2px] outline-none text-[12px]"
                            />
                        </div>
                    </div>
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label className=" text-[12px] font-semibold mb-1 uppercase">
                        PROPERTY
                    </label>
                    <input
                        type="text"
                        className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                    />
                </li>
            </ul>
            <div className=" w-full flex justify-end items-center">
                <button
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={() => setToggleModify(false)}
                >
                    CANCEL
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
};

const Contact = ({ setActiveForm }: Props) => {
    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
        ]);
    };

    const [isSave, setSave] = useState(false);
    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={style.ThreeRows}
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
            <div className=" w-full flex justify-end items-center mb-10">
                <button
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={Back}
                >
                    BACK
                </button>
                <button className=" relative text-white flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                    <div
                        className=" h-8 px-5 w-full flex justify-center items-center"
                        onClick={() => setSave(!isSave)}
                    >
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul className=" absolute top-full bg-white w-full">
                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE
                            </a>

                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE & NEW
                            </a>
                        </ul>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
