import Link from "next/link";
import React, { useContext, useState } from "react";
import ModalTemp from "../../../Reusable/ModalTemp";
import { VoidCollection } from "./ReceivePayment/Query";
import AppContext from "../../../Context/AppContext";
import { useRouter } from "next/router";
import { BarLoader, ScaleLoader } from "react-spinners";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";

type Props = {
    id: string | number;
    setState: Function;
};

export default function Authorization({ id, setState }: Props) {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    const onSuccess = () => {
        setPrompt({
            message: "Collection successfully deleted",
            type: "success",
            toggle: true,
        });
        router.push("/finance/customer-facility/collection/payment-register");
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };
    const [isPassword, setPassword] = useState("");
    const { isLoading, mutate } = VoidCollection(
        onSuccess,
        onError,
        Number(id)
    );
    const Submit = () => {
        const Payload = {
            password: isPassword,
        };
        mutate(Payload);
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
                    autoComplete="off"
                    value={isPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field text-center w-full max-w-[250px] mb-5"
                />
                <div>
                    <button
                        className="button_cancel"
                        onClick={() => setState("")}
                    >
                        CANCEL
                    </button>
                    <button className="buttonRed" onClick={Submit}>
                        {isLoading ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "CONFIRM"
                        )}
                    </button>
                </div>
            </div>
        </ModalTemp>
    );
}
