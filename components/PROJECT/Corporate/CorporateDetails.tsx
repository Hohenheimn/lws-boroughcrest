import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";
import ModifyCorporate from "./ModifyCorporate";
import style from "../../../styles/Project/CorporateDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
export default function CorporateDetails() {
    const [toggleModify, setToggleModify] = useState(false);
    return (
        <div>
            {toggleModify && (
                <ModifyCorporate setToggleModify={setToggleModify} />
            )}
            <h1 className="pageTitle mb-5">Corporate Details</h1>
            <ul className={style.primary}>
                <li className={style.head}>
                    <h1>Primary Information</h1>
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">Modify</span>}
                    >
                        <div>
                            <HiPencil
                                className={style.pencil}
                                onClick={() => setToggleModify(true)}
                            />
                        </div>
                    </Tippy>
                </li>
                <li className={style.image}>
                    <aside>
                        <Image
                            src="/Images/sampleProfile.png"
                            alt=""
                            layout="fill"
                        />
                    </aside>
                </li>
                <li className={style.details}>
                    <ul>
                        <li>
                            <p className="label_text">ID</p>
                            <h4 className="main_text">1234</h4>
                        </li>
                        <li>
                            <p className="label_text">CORPORATE NAME:</p>
                            <h4 className="main_text">XYZ Company</h4>
                        </li>
                        <li>
                            <p className="label_text">GST TYPE</p>
                            <h4 className="main_text">Non-VAT</h4>
                        </li>
                        <li>
                            <p className="label_text">TIN</p>
                            <h4 className="main_text">246-807-853-0000</h4>
                        </li>
                        <li>
                            <p className="label_text">RDO NUMBER:</p>
                            <h4 className="main_text">056</h4>
                        </li>
                        <li>
                            <p className="label_text">SEC REGISTRATION NO:</p>
                            <h4 className="main_text">2468078534</h4>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul className={style.Contact_Address}>
                <h1>Contact Information</h1>
                <ul className={style.contact}>
                    <li>
                        <p className="label_text">CONTACT NO:</p>
                        <h4 className="main_text">
                            09999999999 <span>(official)</span>
                        </h4>
                        <h4 className="main_text">09999999999</h4>
                    </li>
                    <li>
                        <p className="label_text">EMAIL ADDRESS:</p>
                        <h4 className="main_text">
                            email@sample.com <span>(official)</span>
                        </h4>
                        <h4 className="main_text">email@sample.com</h4>
                    </li>
                </ul>
                <h1>Address</h1>
                <ul className={style.address}>
                    <li>
                        <p className="label_text">UNIT/FLOOR/HOUSE NO.</p>

                        <h4 className="main_text">1234</h4>
                    </li>
                    <li>
                        <p className="label_text">BUILDING</p>

                        <h4 className="main_text">Building 1</h4>
                    </li>
                    <li>
                        <p className="label_text">STREET</p>

                        <h4 className="main_text">Malaya kana street</h4>
                    </li>
                    <li>
                        <p className="label_text">DISTRICT</p>

                        <h4 className="main_text">District 1</h4>
                    </li>
                    <li>
                        <p className="label_text">MUNICIPAL</p>

                        <h4 className="main_text">Manila City</h4>
                    </li>
                    <li>
                        <p className="label_text">PROVINCE</p>

                        <h4 className="main_text">Metro Manila</h4>
                    </li>
                    <li>
                        <p className="label_text">ZIP CODE</p>

                        <h4 className="main_text">2111</h4>
                    </li>
                </ul>
            </ul>
        </div>
    );
}
