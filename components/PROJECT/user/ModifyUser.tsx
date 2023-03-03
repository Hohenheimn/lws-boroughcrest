import React, { useRef, useEffect, useState, useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import style from "../../../styles/Popup_Modal.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import AppContext from "../../Context/AppContext";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SelectDropdown from "../../Reusable/SelectDropdown";

type ModifyUser = {
    setToggleModify: Function;
};

export default function ModifyUser({ setToggleModify }: any) {
    const [isLogoStatus, setLogoStatus] = useState("Upload Logo");
    const [isStatus, setStatus] = useState(true);
    const [isSave, setSave] = useState(false);
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            setLogoStatus("Image must be 2mb only");
            return;
        } else {
            setLogoStatus("");
            console.log(e.target.files[0]);
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (["image/jpeg", "image/png"].includes(selectedImage.type)) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    setProfileUrl(event.target.result);
                });
                const file = e.target.files;
                setLogoStatus(file[0].name);
            } else {
                setLogoStatus("Invalid Image File");
            }
        } else {
            setLogoStatus("Nothing Happens");
        }
    };

    const cancel = () => {
        setToggleModify(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const Save = () => {};

    return (
        <div className={style.container}>
            <section>
                <form onSubmit={handleSubmit(Save)}>
                    <p className={style.modal_title}>Create User</p>
                    <h1 className={style.statusTitle}>
                        <span>STATUS</span>

                        <div
                            className={`statusCircle ${
                                isStatus ? "active" : "inactive"
                            }`}
                            onClick={() => setStatus(!isStatus)}
                        ></div>
                    </h1>

                    <ul className={`${style.ThreeRows} items-center`}>
                        <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <aside className="w-20 h-20 relative flex mr-4">
                                <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative">
                                    <Image
                                        src={isProfileUrl}
                                        alt=""
                                        layout="fill"
                                    />
                                </aside>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={DisplayImage}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image"
                                    className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[-10px] bottom-[-5px]"
                                >
                                    <AiFillCamera />
                                </label>
                            </aside>
                            <p className="text-[12px] mt-1">{isLogoStatus}</p>
                        </li>
                        <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <label className=" text-[12px] font-semibold mb-1 w-[90%]">
                                *NAME
                            </label>
                            <input type="text" className="field w-full" />
                        </li>
                        <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                            <label
                                className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                                htmlFor="file"
                            >
                                *Upload Signature
                            </label>
                            <input id="file" type="file" className="hidden" />
                        </li>
                    </ul>
                    <ul className={style.ThreeRows}>
                        <li>
                            <label>POSITION</label>
                            <input type="text" className="field w-full" />
                        </li>
                        <li>
                            <label>EMPLOYEE ID</label>
                            <input type="text" className="field w-full" />
                        </li>
                        <li>
                            <label>*DEPARTMENT</label>
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    // setReceiptType(value);
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={""}
                                        readOnly
                                    />
                                }
                                listArray={["Department"]}
                            />
                        </li>
                        <li>
                            <label>*EMAIL</label>
                            <input type="email" className="field w-full" />
                        </li>

                        <li>
                            <label>*MOBILE</label>
                            <input
                                type="number"
                                placeholder="+63"
                                className="field w-full"
                            />
                        </li>
                        <li>
                            <label>*CORPORATE</label>
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    // setReceiptType(value);
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={""}
                                        readOnly
                                    />
                                }
                                listArray={["Department"]}
                            />
                        </li>
                    </ul>
                    <div className={style.SaveButton}>
                        <aside className={style.back} onClick={cancel}>
                            CANCEL
                        </aside>

                        <button className={style.Save}>
                            <div>
                                <button
                                    type="submit"
                                    name="save"
                                    className={style.save_button}
                                >
                                    Save
                                </button>
                                <aside className={style.Arrow}>
                                    <RiArrowDownSFill
                                        onClick={() => setSave(!isSave)}
                                    />
                                </aside>
                            </div>
                            {isSave && (
                                <ul>
                                    <li>
                                        <button type="submit" name="save-new">
                                            SAVE & NEW
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
