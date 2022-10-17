import React, { useRef, useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";

type ModifyCorporate = {
    setToggleModify: Function;
};

export default function ModifyCorporate({ setToggleModify }: ModifyCorporate) {
    const modal = useRef<any>();
    const [isNewActive, setNewActive] = useState([true, false]);

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
                <p className={style.modal_title}>Modify Corporate</p>
                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <PrimaryInformation
                            key={1}
                            setToggleModify={setToggleModify}
                            setNewActive={setNewActive}
                        />
                    )}
                    {isNewActive[1] && (
                        <Contact
                            key={2}
                            setToggleModify={setToggleModify}
                            setNewActive={setNewActive}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

type Props = {
    setToggleModify: Function;
    setNewActive: Function;
};

const PrimaryInformation = ({ setToggleModify, setNewActive }: Props) => {
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
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
                    setProfileUrl(event.target.result);
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
            <h1 className={style.modal_label_primary}>Primary Information</h1>
            <ul className={style.ThreeRows}>
                <li className={style.upload_image}>
                    <aside>
                        <aside>
                            <Image
                                src={`${isProfileUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>

                        <input type="file" id="image" onChange={DisplayImage} />
                        <label htmlFor="image">
                            <AiFillCamera />
                        </label>
                    </aside>
                    <label htmlFor="image" className={style.image_label}>
                        <p>UPLOAD LOGO</p>
                    </label>
                </li>
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
                    <label>Corporate Name</label>
                    <input type="text" />
                </li>
            </ul>

            <ul className={style.ThreeRows}>
                <li>
                    <label>GST TYPE.</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </li>
                <li>
                    <label>RDO NO.</label>
                    <input type="text" />
                </li>
            </ul>

            <div className={style.button_container}>
                <button
                    className="button_cancel"
                    onClick={() => setToggleModify(false)}
                >
                    CANCEL
                </button>

                <button
                    className="buttonRed"
                    onClick={() => {
                        setNewActive((item: any) => [
                            (item[0] = false),
                            (item[1] = true),
                        ]);
                    }}
                >
                    NEXT
                </button>
            </div>
        </motion.div>
    );
};

const Contact = ({ setNewActive }: Props) => {
    const [isSave, setSave] = useState(false);
    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <ul className={style.twoRows_container}>
                <li>
                    <label>CONTACT NO</label>
                    <aside>
                        <input type="text" />
                        <span>Official</span>
                    </aside>
                    <input type="text" />
                </li>
                <li>
                    <label>EMAIL ADDRESS</label>
                    <aside>
                        <input type="text" />
                        <span>Official</span>
                    </aside>
                    <input type="text" />
                </li>
            </ul>
            <p className="text-[14px] font-bold mb-2">ADDRESS</p>
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
                    <label>MUNICIPALITY</label>
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
            <div className=" w-full flex justify-end items-center  mb-10">
                <button
                    className="cancel_button mr-5 font-bold"
                    onClick={() =>
                        setNewActive((item: any) => [
                            (item[0] = true),
                            (item[1] = false),
                        ])
                    }
                >
                    Back
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
