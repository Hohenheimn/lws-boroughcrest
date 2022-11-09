import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { useForm } from "react-hook-form";
import { customer } from "../../../types/customerList";
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
    const [isSignature, setSignature] = useState(false);
    const { isDraft } = useContext(AppContext);

    useEffect(() => {
        if (isNewCustomer.image_photo !== "") {
            setProfileUrl(isNewCustomer.image_photo);
        }
        if (isNewCustomer.image_valid_id !== "") {
            setValidIDUrl(isNewCustomer.image_valid_id);
        }
        if (isNewCustomer.image_signature !== "") {
            setSignature(true);
        }
    }, []);

    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            alert("Image must be 2mb only");
            return;
        }
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
                    if (e.target.getAttribute("data-type") === "signature") {
                        setSignature(true);
                    }
                });
            } else {
                if (e.target.getAttribute("data-type") === "profile") {
                    setProfileUrl("/Images/sampleProfile.png");
                }
                if (e.target.getAttribute("data-type") === "validID") {
                    setValidIDUrl("/Images/id-sample.png");
                }
                if (e.target.getAttribute("data-type") === "signature") {
                    setSignature(false);
                }
                alert("Invalid Image File");
            }
        } else {
            if (e.target.getAttribute("data-type") === "profile") {
                setProfileUrl("/Images/sampleProfile.png");
            }
            if (e.target.getAttribute("data-type") === "validID") {
                setValidIDUrl("/Images/id-sample.png");
            }
            if (e.target.getAttribute("data-type") === "signature") {
                setSignature(false);
            }
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
        if (isDraft) {
            setNewCustomer({
                ...isNewCustomer,
                class: data.class,
                name: data.name,
                individual_co_owner: data.individual_co_owner,
                individual_citizenship: data.individual_citizenship,
                individual_birth_date: data.individual_birth_date,
                tin: data.tin,
                branch_code: data.branch_code,
                type: isType,
                status: status ? 1 : 0,
            });
        } else {
            setNewCustomer({
                ...isNewCustomer,
                class: data.class,
                name: data.name,
                individual_co_owner: data.individual_co_owner,
                individual_citizenship: data.individual_citizenship,
                individual_birth_date: data.individual_birth_date,
                tin: data.tin,
                branch_code: data.branch_code,
                image_photo: data.image_photo[0],
                image_valid_id: data.image_valid_id[0],
                image_signature: data.image_signature[0],
                type: isType,
                status: status ? 1 : 0,
            });
        }

        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

    return (
        <div>
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
                                {...register("image_photo")}
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
                                {...register("image_valid_id")}
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
                            {isSignature ? (
                                <label
                                    className=" text-[12px] text-[#19d142] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                                    htmlFor="file"
                                >
                                    Upload Signature
                                </label>
                            ) : (
                                <label
                                    className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                                    htmlFor="file"
                                >
                                    Upload Signature
                                </label>
                            )}
                            <input
                                id="file"
                                type="file"
                                className="absolute z-[-99] w-0 overflow-hidden"
                                {...register("image_signature")}
                                onChange={DisplayImage}
                                data-type="signature"
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
                            defaultValue={isNewCustomer.class}
                        >
                            <option
                                value={isNewCustomer.class}
                                className={style.disabled}
                                disabled
                            >
                                {isNewCustomer.class}
                            </option>
                            <option value="developer">Developer</option>
                            <option value="owner">Owner</option>
                            <option value="tenant">Tenant</option>
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
                    {(isType === "individual" || isType === "Individual") && (
                        <>
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
                        </>
                    )}
                    <li>
                        <label>TIN Number</label>
                        <input
                            type="text"
                            placeholder="000000000"
                            {...register("tin", {
                                required: "Required",
                                minLength: {
                                    value: 9,
                                    message: "Must be 9 numbers only",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Must be 9 numbers only",
                                },
                            })}
                        />
                        {errors.tin && (
                            <p className="text-[10px]">{errors.tin.message}</p>
                        )}
                    </li>
                    <li>
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
        </div>
    );
}
