import Link from "next/link";
import React from "react";
import ModalTemp from "../../../Reusable/ModalTemp";

export default function Authorization() {
    return (
        <ModalTemp narrow={true}>
            <div className="w-full flex justify-center flex-col items-center">
                <h1 className="text-[24px] mb-5">Authorization</h1>
                <p className="label_text mb-5">
                    Please enter your password to proceed
                </p>
                <input
                    type="password"
                    className="field w-full max-w-[250px] mb-5"
                />
                <div>
                    <button className="button_cancel">CANCEL</button>
                    <button className="buttonRed">CONFIRM</button>
                </div>
            </div>
        </ModalTemp>
    );
}
