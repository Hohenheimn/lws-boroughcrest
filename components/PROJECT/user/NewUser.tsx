import React, { useRef, useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";

export default function NewUser() {
    const modal = useRef<any>();
    const router = useRouter();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                router.push("");
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

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
        <div className={style.container}>
            <section ref={modal}>
                <p className={style.modal_title}>Create User</p>
                <h1 className={style.statusTitle}>
                    <span>STATUS</span>

                    <div className="statusCircle active"></div>
                </h1>
                <ul className=" flex mb-5 flex-wrap 480px:mb-2">
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
                    </li>
                    <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 w-[90%]">
                            NAME
                        </label>
                        <input
                            type="text"
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                        />
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
                <ul className={style.ThreeRows}>
                    <li>
                        <label>POSITION</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label>EMPLOYEE ID</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label>DEPARTMENT</label>
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </li>
                    <li>
                        <label>EMAIL</label>
                        <input type="email" />
                    </li>

                    <li>
                        <label>MOBILE</label>
                        <input type="number" placeholder="+63" />
                    </li>
                    <li>
                        <label>CORPORATE</label>
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </li>
                </ul>
                <div className={style.button_container}>
                    <Link href="">
                        <a className="button_cancel">CANCEL</a>
                    </Link>
                    <button className="buttonRed">NEXT</button>
                </div>
            </section>
        </div>
    );
}
