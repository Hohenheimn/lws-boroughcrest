import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";
import ModifyCorporate from "./ModifyCorporate";
import style from "../../../styles/Project/CorporateDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { FadeIn } from "../../../components/Animation/SimpleAnimation";
import { motion } from "framer-motion";
import type { corporateColumns } from "../../../types/corporateList";

type Props = {
    CorporateData: corporateColumns;
};

export default function CorporateDetails({ CorporateData }: Props) {
    const { setModifyCorporate, modifyCorporate } = useContext(AppContext);
    const [toggleModify, setToggleModify] = useState(false);

    useEffect(() => {
        setModifyCorporate({
            ...modifyCorporate,
            id: CorporateData.id,
            name: CorporateData.name,
            tin: CorporateData.tin,
            branch_code: CorporateData.branch_code,
            gst_type: CorporateData.gst_type,
            rdo_no: CorporateData.rdo_no,
            sec_registration_no: CorporateData.sec_registration_no,
            email: CorporateData.email,
            contact_no: CorporateData.contact_no,
            alt_email: CorporateData.alt_email,
            alt_contact_no: CorporateData.alt_contact_no,
            address_unit_floor: CorporateData.address_unit_floor,
            address_building: CorporateData.address_building,
            address_street: CorporateData.address_street,
            address_district: CorporateData.address_district,
            address_municipal_city: CorporateData.address_municipal_city,
            address_province: CorporateData.address_province,
            address_zip_code: CorporateData.address_zip_code,
        });
    });

    const Logo =
        "https://boroughcrest-api.lws.codes/get-img?image=" +
        CorporateData.logo;

    return (
        <motion.div
            variants={FadeIn}
            animate="animate"
            initial="initial"
            exit="exit"
        >
            {toggleModify && (
                <ModifyCorporate
                    setToggleModify={setToggleModify}
                    CorporateData={CorporateData}
                    Logo={Logo}
                />
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
                        <Image src={Logo} alt="" layout="fill" />
                    </aside>
                </li>
                <li className={style.details}>
                    <ul>
                        <li>
                            <p className="label_text">ID</p>
                            <h4 className="main_text">{CorporateData.id}</h4>
                        </li>
                        <li>
                            <p className="label_text">CORPORATE NAME:</p>
                            <h4 className="main_text">{CorporateData.name}</h4>
                        </li>
                        <li>
                            <p className="label_text">GST TYPE</p>
                            <h4 className="main_text">
                                {CorporateData.gst_type}
                            </h4>
                        </li>
                        <li>
                            <p className="label_text">TIN</p>
                            <h4 className="main_text">{CorporateData.tin}</h4>
                        </li>
                        <li>
                            <p className="label_text">RDO NUMBER:</p>
                            <h4 className="main_text">
                                {CorporateData.rdo_no}
                            </h4>
                        </li>
                        <li>
                            <p className="label_text">SEC REGISTRATION NO:</p>
                            <h4 className="main_text">
                                {CorporateData.sec_registration_no}
                            </h4>
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
                            {CorporateData.contact_no} <span>(official)</span>
                        </h4>
                        <h4 className="main_text">
                            {CorporateData.alt_contact_no}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">EMAIL ADDRESS:</p>
                        <h4 className="main_text">
                            {CorporateData.email} <span>(official)</span>
                        </h4>
                        <h4 className="main_text">{CorporateData.alt_email}</h4>
                    </li>
                </ul>
                <h1>Address</h1>
                <ul className={style.address}>
                    <li>
                        <p className="label_text">UNIT/FLOOR/HOUSE NO.</p>

                        <h4 className="main_text">
                            {CorporateData.address_unit_floor}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">BUILDING</p>

                        <h4 className="main_text">
                            {CorporateData.address_building}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">STREET</p>

                        <h4 className="main_text">
                            {CorporateData.address_street}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">DISTRICT</p>

                        <h4 className="main_text">
                            {CorporateData.address_district}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">MUNICIPAL</p>

                        <h4 className="main_text">
                            {CorporateData.address_municipal_city}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">PROVINCE</p>

                        <h4 className="main_text">
                            {CorporateData.address_province}
                        </h4>
                    </li>
                    <li>
                        <p className="label_text">ZIP CODE</p>

                        <h4 className="main_text">
                            {CorporateData.address_zip_code}
                        </h4>
                    </li>
                </ul>
            </ul>
        </motion.div>
    );
}
