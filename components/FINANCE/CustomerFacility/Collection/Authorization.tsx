import Link from "next/link";
import React from "react";
import ModalTemp from "../../../Reusable/ModalTemp";

type Props = {
    id: string | number;
    setState: Function;
};

export default function Authorization({ id, setState }: Props) {
    const Submit = () => {
        console.log(id);
    };
    return (
        <ModalTemp narrow={true}>
            <div className="w-full flex justify-center flex-col items-center">
                <h1 className="text-[24px] mb-5">Authorization</h1>
                <p className="label_text mb-5 text-center">
                    Please enter your password to proceed
                </p>
                <input
                    type="password"
                    className="field w-full max-w-[250px] mb-5"
                />
                <div>
                    <button
                        className="button_cancel"
                        onClick={() => setState("")}
                    >
                        CANCEL
                    </button>
                    <button className="buttonRed" onClick={Submit}>
                        CONFIRM
                    </button>
                </div>
            </div>
        </ModalTemp>
    );
}
