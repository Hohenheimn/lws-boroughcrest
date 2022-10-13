import React, { useState } from "react";
import Link from "next/link";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../styles/Popup_Modal.module.scss";

type NextContactInfo = {
    setNewActive: Function;
    isNewActive: any;
};

export default function NextContactInfo({
    setNewActive,
    isNewActive,
}: NextContactInfo) {
    const [isSave, setSave] = useState(false);
    return (
        <div>
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
            <div className=" w-full flex justify-end items-center">
                <button
                    className="cancel_button mr-5"
                    onClick={() =>
                        setNewActive((item: any) => [
                            (item[0] = true),
                            (item[1] = false),
                        ])
                    }
                >
                    Back
                </button>
                <button className="buttonRed relative">
                    <div
                        className=" w-full flex justify-center items-center"
                        onClick={() => setSave(!isSave)}
                    >
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul className=" absolute left-0 top-full bg-white w-full">
                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE
                            </a>
                            <Link href="/project/corporate?new">
                                <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                    SAVE & NEW
                                </a>
                            </Link>
                        </ul>
                    )}
                </button>
            </div>
        </div>
    );
}
