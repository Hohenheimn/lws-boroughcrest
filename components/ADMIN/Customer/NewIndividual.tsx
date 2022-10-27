import React, { useContext, useState } from "react";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import AppContext from "../../Context/AppContext";
import { motion } from "framer-motion";
import style from "../../../styles/Popup_Modal.module.scss";
import { useForm } from "react-hook-form";
import { customerItemDetail, customer } from "../../../types/customerList";
import Link from "next/link";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";

type Props = {
    setActiveForm: Function;
    isType: string;
    status: boolean;
};

export default function NewIndividual({
    setActiveForm,
    isType,
    status,
}: Props) {
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const [isValidIDUrl, setValidIDUrl] = useState("/Images/id-sample.png");

    const DisplayImage = (e: any) => {
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (
                ["image/jpeg", "image/png", "image/svg+xml"].includes(
                    selectedImage.type
                )
            ) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);

                ImageReader.addEventListener("load", (event: any) => {
                    if (e.target.getAttribute("data-type") === "profile") {
                        setProfileUrl(event.target.result);
                    }
                    if (e.target.getAttribute("data-type") === "validID") {
                        setValidIDUrl(event.target.result);
                    }
                });
            } else {
                alert("Invalid Image File");
            }
        } else {
            alert("Nothing Happens");
        }
    };

    const { setNewCustomer, isNewCustomer } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<customer>({
        defaultValues: {
            class: isNewCustomer.class,
            name: isNewCustomer.name,
            individual_co_owner: isNewCustomer.individual_co_owner,
            individual_citizenship: isNewCustomer.individual_citizenship,
            individual_birth_date: isNewCustomer.individual_birth_date,
            tin: isNewCustomer.tin,
            branch_code: isNewCustomer.branch_code,
        },
    });

    const Submit = (data: any) => {
        setNewCustomer({
            ...isNewCustomer,
            class: data.class,
            name: data.name,
            individual_co_owner: data.individual_co_owner,
            individual_citizenship: data.individual_citizenship,
            individual_birth_date: data.individual_birth_date,
            tin: data.tin,
            branch_code: data.branch_code,
            image_photo: data.image_photo,
            image_valid_id: data.image_valid_id,
            image_signature: data.image_signature,
            type: isType,
            status: status ? 1 : 0,
        });
        console.log(isNewCustomer);
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={handleSubmit(Submit)}>
                <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                    <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <aside className="w-20 h-20 relative flex mr-4">
                            <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative overflow-hidden">
                                <Image
                                    src={`${isProfileUrl}`}
                                    alt=""
                                    layout="fill"
                                />
                            </aside>
                            <input
                                type="file"
                                id="image"
                                className="absolute z-[-99] w-0 overflow-hidden"
                                {...register("image_photo", {
                                    required: "Required",
                                })}
                                onChange={DisplayImage}
                                data-type="profile"
                            />
                            <label
                                htmlFor="image"
                                className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                            >
                                <AiFillCamera />
                            </label>
                        </aside>
                        {errors.image_photo && (
                            <p className="text-[10px]">
                                {errors.image_photo.message}
                            </p>
                        )}
                    </li>
                    <li className=" flex flex-col items-center justify-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <div>
                            <input
                                type="file"
                                id="validid"
                                className="absolute z-[-99] w-0 overflow-hidden"
                                {...register("image_valid_id", {
                                    required: "Required",
                                })}
                                onChange={DisplayImage}
                                data-type="validID"
                            />
                            <label
                                htmlFor="validid"
                                className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                            >
                                <aside className=" w-24 mr-2 h-16 relative">
                                    <Image
                                        src={`${isValidIDUrl}`}
                                        alt=""
                                        layout="fill"
                                    />
                                </aside>
                                UPLOAD VALID ID
                            </label>
                        </div>
                        {errors.image_valid_id && (
                            <p className="text-[10px]">
                                {errors.image_valid_id.message}
                            </p>
                        )}
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-center">
                        <div>
                            <label
                                className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                                htmlFor="file"
                            >
                                Upload Signature
                            </label>
                            <input
                                id="file"
                                type="file"
                                className="absolute z-[-99] w-0 overflow-hidden"
                                {...register("image_signature", {
                                    required: "Required",
                                })}
                            />
                        </div>
                        {errors.image_signature && (
                            <p className="text-[10px]">
                                {errors.image_signature.message}
                            </p>
                        )}
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>CLASS</label>
                        <select
                            id=""
                            {...register("class", { required: "Required" })}
                        >
                            <option value="sample">Sample</option>
                        </select>
                        {errors.class && (
                            <p className="text-[10px]">
                                {errors.class.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>NAME</label>
                        <input
                            type="text"
                            className="bg-white"
                            {...register("name", { required: "Required" })}
                        />
                        {errors.name && (
                            <p className="text-[10px]">{errors.name.message}</p>
                        )}
                    </li>
                    <li>
                        <label>CO-OWNER</label>
                        <input
                            type="text"
                            className="bg-white"
                            {...register("individual_co_owner", {
                                required: "Required",
                            })}
                        />
                        {errors.individual_co_owner && (
                            <p className="text-[10px]">
                                {errors.individual_co_owner.message}
                            </p>
                        )}
                    </li>

                    <li>
                        <label>CITIZENSHIP</label>
                        <input
                            type="text"
                            className="bg-white"
                            {...register("individual_citizenship", {
                                required: "Required",
                            })}
                        />
                        {errors.individual_citizenship && (
                            <p className="text-[10px]">
                                {errors.individual_citizenship.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>BIRTH DATE</label>

                        <input
                            type="date"
                            className="bg-white"
                            {...register("individual_birth_date", {
                                required: "Required",
                            })}
                        />
                        {errors.individual_birth_date && (
                            <p className="text-[10px]">
                                {errors.individual_birth_date.message}
                            </p>
                        )}
                    </li>
                    <li className={style.twoRows}>
                        <div className={style.wrapper}>
                            <div className=" w-[48%]">
                                <label>TIN Number</label>
                                <input
                                    type="text"
                                    placeholder="000-000-000"
                                    {...register("tin", {
                                        required: "Required",
                                        minLength: {
                                            value: 11,
                                            message: "Must be 11 Characters",
                                        },
                                        maxLength: {
                                            value: 11,
                                            message: "Must be 11 Characters",
                                        },
                                        pattern: {
                                            value: /^[0-9,-]+$/i,
                                            message: "Only number and Hyphen",
                                        },
                                    })}
                                />
                                {errors.tin && (
                                    <p className="text-[10px]">
                                        {errors.tin.message}
                                    </p>
                                )}
                            </div>
                            <div className=" w-[48%]">
                                <label>Branch Code</label>
                                <input
                                    type="number"
                                    {...register("branch_code", {
                                        required: "Required",
                                        minLength: {
                                            value: 5,
                                            message: "Must be 5 Number",
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "Must be 5 Number",
                                        },
                                    })}
                                />
                                {errors.branch_code && (
                                    <p className="text-[10px]">
                                        {errors.branch_code.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </li>
                </ul>

                <div className=" w-full flex justify-end items-center">
                    <Link href="">
                        <a className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer">
                            CANCEL
                        </a>
                    </Link>
                    <button
                        type="submit"
                        className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                    >
                        NEXT
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
