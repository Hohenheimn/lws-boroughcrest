import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import NewPrimaryInfo from "./NewPrimaryInfo";
import NewContactInfo from "./NewContactInfo";
import NewPropertyInfo from "./NewPropertyInfo";

export default function NewCustomer({ Draft, DraftImageFile }: any) {
    const { setDraft, isNewCustomer, setNewCustomer, ImgUrl } =
        useContext(AppContext);
    const [isActiveForm, setActiveForm] = useState([true, false, false]);
    const [isType, setType] = useState<string>("");
    const [status, setStatus] = useState(true);

    const DraftData = Draft?.values;
    const image_photo_PathName = DraftData?.image_photo;
    const image_valid_id_PathName = DraftData?.image_valid_id;
    const image_signature_Pathname = DraftData?.image_signature;

    useEffect(() => {
        // Check there is draft
        if (DraftData) {
            setNewCustomer({
                ...DraftData,
                image_photo: ImgUrl + image_photo_PathName,
                image_valid_id: ImgUrl + image_valid_id_PathName,
                image_signature: ImgUrl + image_signature_Pathname,
            });
            setType(DraftData.type);
            setDraft(true);

            // convert source to file
        }
    }, []);

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Create Customer</p>
                <NewPrimaryInfo
                    key={1}
                    setActiveForm={setActiveForm}
                    isType={isType}
                    setType={setType}
                    isActiveForm={isActiveForm}
                    status={status}
                    setStatus={setStatus}
                />

                <NewContactInfo
                    key={2}
                    setActiveForm={setActiveForm}
                    isActiveForm={isActiveForm}
                />

                <NewPropertyInfo
                    key={3}
                    setActiveForm={setActiveForm}
                    isActiveForm={isActiveForm}
                    DraftImageFile={DraftImageFile}
                />
            </section>
        </div>
    );
}
