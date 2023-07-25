import React, { useContext, useState } from "react";

import { getCookie } from "cookies-next";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { ScaleLoader } from "react-spinners";

import api from "../../util/api";
import AppContext from "../Context/AppContext";
import { ErrorSubmit } from "../Reusable/ErrorMessage";
import ModalTemp from "../Reusable/ModalTemp";

type Passwords = {
    current_password: string;
    new_password: string;
    confirm_password: string;
};

export default function ChangePassword({
    setChangePasswordModal,
}: {
    setChangePasswordModal: Function;
}) {
    const { setPrompt } = useContext(AppContext);

    const onSuccess = () => {
        setPrompt({
            message: "Change Password Successfully",
            toggle: true,
            type: "success",
        });
        setChangePasswordModal(false);
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate, isLoading } = ChangePasswordMutation(onSuccess, onError);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Passwords>();

    const password = watch("new_password");

    const SubmitHandler = (data: Passwords) => {
        mutate(data);
    };

    return (
        <ModalTemp>
            <h1 className="mb-5">CHANGE PASSWORD</h1>
            <form onSubmit={handleSubmit(SubmitHandler)}>
                <ul>
                    <li className="flex flex-col mb-3">
                        <label>Current Password</label>
                        <input
                            className="field"
                            type="password"
                            {...register("current_password", {
                                required: {
                                    value: true,
                                    message: "This is Required",
                                },
                            })}
                        />
                        {errors.current_password && (
                            <p className="text-[12px]">
                                {errors.current_password.message}
                            </p>
                        )}
                    </li>

                    <li className="flex flex-col mb-3">
                        <label>New Password</label>
                        <input
                            className="field"
                            type="password"
                            {...register("new_password", {
                                required: {
                                    value: true,
                                    message: "This is Required",
                                },
                            })}
                        />
                        {errors.new_password && (
                            <p className="text-[12px]">
                                {errors.new_password.message}
                            </p>
                        )}
                    </li>

                    <li className="flex flex-col mb-3">
                        <label>Confirm Password</label>
                        <input
                            className="field"
                            type="password"
                            {...register("confirm_password", {
                                required: {
                                    value: true,
                                    message: "This is Required",
                                },
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                        />
                        {errors.confirm_password && (
                            <p className="text-[12px]">
                                {errors.confirm_password.message}
                            </p>
                        )}
                    </li>

                    <li className=" flex justify-end items-center mt-5">
                        <div
                            className="button_cancel"
                            onClick={() => setChangePasswordModal(false)}
                        >
                            CANCEL
                        </div>
                        <button className="buttonRed">
                            {isLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "SAVE"
                            )}
                        </button>
                    </li>
                </ul>
            </form>
        </ModalTemp>
    );
}

const ChangePasswordMutation = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/auth/change-password", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSucces,
            onError: onError,
        }
    );
};
