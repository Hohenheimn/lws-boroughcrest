import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import NewPrimaryInfo from "./NewPrimaryInfo";
import NewContactInfo from "./NewContactInfo";
import NewPropertyInfo from "./NewPropertyInfo";

export default function NewCustomer() {
    const { setNewCustomer, NewCustomerDefault, cusReset, isType, setType } =
        useContext(AppContext);
    const [isActiveForm, setActiveForm] = useState([true, false, false]);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        setNewCustomer({ ...NewCustomerDefault });
        setStatus(true);
    }, [cusReset]);

    useEffect(() => {
        setNewCustomer({ ...NewCustomerDefault });
        setType("");
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
                />
            </section>
        </div>
    );
}
