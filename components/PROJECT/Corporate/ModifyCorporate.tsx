import React, { useRef, useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";

type ModifyCorporate = {
    setToggleModify: Function;
};

export default function ModifyCorporate({ setToggleModify }: ModifyCorporate) {
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
                <p className={style.modal_title}>Modify Corporate</p>
                <h1 className={style.modal_label_primary}>
                    Primary Information
                </h1>
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

                            <input
                                type="file"
                                id="image"
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

                    <button className="buttonRed">NEXT</button>
                </div>
            </section>
        </div>
    );
}
