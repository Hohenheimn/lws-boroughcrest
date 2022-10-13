import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { AiFillCamera } from "react-icons/ai";

type PrimaryInfo = {
    setNewActive: Function;
    isNewActive: any;
};

export default function PrimaryInfo({
    setNewActive,
    isNewActive,
}: PrimaryInfo) {
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
        <div>
            <h1 className={style.modal_label_primary}>Primary Informations</h1>
            <ul className={style.ThreeRows}>
                <li className={style.upload_image}>
                    <aside>
                        <aside>
                            <Image src={isProfileUrl} alt="" layout="fill" />
                        </aside>
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={DisplayImage}
                        />
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
            <p className="text-[16px]">TIN</p>
            <ul className={style.ThreeRows}>
                <li className={style.twoRows}>
                    <div className={style.wrapper}>
                        <div className=" w-[48%]">
                            <label>TIN Number</label>
                            <input type="text" />
                        </div>
                        <div className=" w-[48%]">
                            <label>Branch Code</label>
                            <input type="text" />
                        </div>
                    </div>
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label>RDO NO.</label>
                    <input type="text" />
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <label>GST TYPE.</label>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </li>
            </ul>
            <ul className={style.ThreeRows}>
                <li>
                    <label>SEC. Registration</label>
                    <input type="text" />
                </li>
                <li></li>
                <li></li>
            </ul>
            <div className={style.button_container}>
                <Link href="">
                    <a className="button_cancel">CANCEL</a>
                </Link>

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
        </div>
    );
}
