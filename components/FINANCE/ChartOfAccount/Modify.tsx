import React from "react";
import COAForm from "./COAForm";
import style from "../../../styles/Popup_Modal.module.scss";
import { BeatLoader } from "react-spinners";

export default function Modify({ setCreate }: any) {
    const isLoading = false;
    if (isLoading) {
        return (
            <div className={style.container}>
                <section>
                    <p className={style.modal_title}>Create Account</p>
                    <h1 className={style.modal_label_primaryRed}>
                        Primary Information
                    </h1>
                    <div className="w-full flex justify-center">
                        <BeatLoader
                            color={"#8f384d"}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </section>
            </div>
        );
    }
    return <COAForm setCreate={setCreate} />;
}
