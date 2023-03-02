import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { useForm } from "react-hook-form";
import { customer } from "../../../types/customerList";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import Calendar from "../../Calendar";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DynamicPopOver from "../../DynamicPopOver";
import SelectDropdown from "../../SelectDropdown";

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

    const {
        setCusToggle,
        isNewCustomer,
        setNewCustomer,
        cusReset,
        CusError,
        setCusError,
        ErrorDefault,
    } = useContext(AppContext);

    // Birth Date Field with custom Calendar
    const [isDate, setDate] = useState({
        value: isNewCustomer.individual_birth_date,
        toggle: false,
    });
    useEffect(() => {
        setNewCustomer({
            ...isNewCustomer,
            individual_birth_date: isDate.value,
        });
    }, [isDate.value]);
    // end

    const [imgError, setImgError] = useState({
        img1: "",
        img2: "",
        img3: "",
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<customer>();

    useEffect(() => {
        setProfileUrl((prev) => (prev = "/Images/sampleProfile.png"));
        setValidIDUrl((prev) => (prev = "/Images/id-sample.png"));
        setSignature(false);
        reset();
    }, [cusReset]);

    // IMAGE VALIDATION
    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            if (e.target.getAttribute("data-type") === "profile") {
                setImgError({
                    ...imgError,
                    img1: "Image must be 2mb only",
                });
            }
            if (e.target.getAttribute("data-type") === "validID") {
                setImgError({
                    ...imgError,
                    img2: "Image must be 2mb only",
                });
            }
            if (e.target.getAttribute("data-type") === "signature") {
                setImgError({
                    ...imgError,
                    img3: "Image must be 2mb only",
                });
            }
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
                        setImgError({
                            ...imgError,
                            img1: "",
                        });
                    }
                    if (e.target.getAttribute("data-type") === "validID") {
                        setValidIDUrl(event.target.result);
                        setImgError({
                            ...imgError,
                            img2: "",
                        });
                    }
                    if (e.target.getAttribute("data-type") === "signature") {
                        setSignature(true);
                        setImgError({
                            ...imgError,
                            img3: "",
                        });
                    }
                });
            } else {
                if (e.target.getAttribute("data-type") === "profile") {
                    setProfileUrl("/Images/sampleProfile.png");
                    setImgError({
                        ...imgError,
                        img1: "Invalid Image File",
                    });
                }
                if (e.target.getAttribute("data-type") === "validID") {
                    setValidIDUrl("/Images/id-sample.png");
                    setImgError({
                        ...imgError,
                        img2: "Invalid Image File",
                    });
                }
                if (e.target.getAttribute("data-type") === "signature") {
                    setImgError({
                        ...imgError,
                        img3: "Invalid Image File",
                    });
                    setSignature(false);
                }
            }
        } else {
            if (e.target.getAttribute("data-type") === "profile") {
                setProfileUrl("/Images/sampleProfile.png");
                setImgError({
                    ...imgError,
                    img1: "Image file removed",
                });
            }
            if (e.target.getAttribute("data-type") === "validID") {
                setValidIDUrl("/Images/id-sample.png");
                setImgError({
                    ...imgError,
                    img2: "Image file removed",
                });
            }
            if (e.target.getAttribute("data-type") === "signature") {
                setImgError({
                    ...imgError,
                    img3: "Image file removed",
                });
                setSignature(false);
            }
        }
    };

    const Submit = (data: any) => {
        setNewCustomer({
            ...isNewCustomer,
            image_photo: data.image_photo[0],
            image_valid_id: data.image_valid_id[0],
            image_signature: data.image_signature[0],
            type: isType,
            status: status ? "active" : "inactive",
        });
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
                        {imgError.img1 !== "" && (
                            <p className="text-[12px]">{imgError.img1}</p>
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
                                <div>
                                    UPLOAD VALID ID
                                    {imgError.img2 !== "" && (
                                        <p className="text-[12px]">
                                            {imgError.img2}
                                        </p>
                                    )}
                                </div>
                            </label>
                        </div>
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-center">
                        <div>
                            <label
                                className="text-[12px] font-NHU-regular uppercase cursor-pointer w-[90%] 480px:w-full"
                                htmlFor="file"
                            >
                                <div>Upload Signature</div>
                            </label>
                            {imgError.img3 !== "" && (
                                <p className="text-[12px]">{imgError.img3}</p>
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
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*CLASS</label>
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setNewCustomer({
                                    ...isNewCustomer,
                                    class: value,
                                });
                                setValue("class", value);
                            }}
                            className=""
                            inputElement={
                                <input
                                    className="w-full field"
                                    {...register("class")}
                                    value={isNewCustomer.class}
                                    readOnly
                                    autoComplete="off"
                                />
                            }
                            listArray={["Developer", "Owner", "Tenant"]}
                        />

                        {CusError?.class !== "" && (
                            <p className="text-[10px]">{CusError?.class}</p>
                        )}
                    </li>
                    <li>
                        <label>*NAME</label>
                        <input
                            type="text"
                            className="field"
                            {...register("name")}
                            value={isNewCustomer.name}
                            onChange={(e) =>
                                setNewCustomer({
                                    ...isNewCustomer,
                                    name: e.target.value,
                                })
                            }
                        />
                        {CusError?.name !== "" && (
                            <p className="text-[10px]">{CusError?.name}</p>
                        )}
                    </li>
                    {(isType === "individual" || isType === "Individual") && (
                        <>
                            <li>
                                <label>CO-OWNER</label>
                                <input
                                    type="text"
                                    className="field"
                                    {...register("individual_co_owner")}
                                    value={isNewCustomer.individual_co_owner}
                                    onChange={(e) =>
                                        setNewCustomer({
                                            ...isNewCustomer,
                                            individual_co_owner: e.target.value,
                                        })
                                    }
                                />
                            </li>

                            <li>
                                <label>*CITIZENSHIP</label>
                                <input
                                    type="text"
                                    className="field"
                                    {...register("individual_citizenship")}
                                    value={isNewCustomer.individual_citizenship}
                                    onChange={(e) =>
                                        setNewCustomer({
                                            ...isNewCustomer,
                                            individual_citizenship:
                                                e.target.value,
                                        })
                                    }
                                />
                                {CusError?.individual_citizenship !== "" && (
                                    <p className="text-[10px]">
                                        {CusError?.individual_citizenship}
                                    </p>
                                )}
                            </li>
                            <li>
                                <label>BIRTH DATE</label>
                                <div className="calendar">
                                    <span className="cal">
                                        <Image
                                            src="/Images/CalendarMini.png"
                                            width={15}
                                            height={15}
                                        />
                                    </span>
                                    <input
                                        {...register("individual_birth_date")}
                                        autoComplete="off"
                                        type="text"
                                        value={isDate.value}
                                        readOnly
                                        placeholder="dd/mm/yyyy"
                                        onClick={() =>
                                            setDate({ ...isDate, toggle: true })
                                        }
                                        className="field w-full"
                                    />
                                    {isDate.toggle && (
                                        <Calendar
                                            value={isDate}
                                            setValue={setDate}
                                        />
                                    )}
                                </div>
                            </li>
                        </>
                    )}
                    <li>
                        <label>
                            {isType === "company" ? "*" : ""}TIN Number
                        </label>
                        <input
                            type="number"
                            placeholder="000000000"
                            {...register("tin", {
                                minLength: {
                                    value: 9,
                                    message: "Must be 9 numbers",
                                },
                                maxLength: {
                                    value: 9,
                                    message: "Must be 9 numbers",
                                },
                            })}
                            className="field"
                            value={isNewCustomer.tin}
                            onChange={(e) => {
                                if (e.target.value.length <= 9) {
                                    setNewCustomer({
                                        ...isNewCustomer,
                                        tin: e.target.value,
                                    });
                                }
                            }}
                        />
                        {errors.tin && (
                            <p className="text-[10px]">{errors.tin.message}</p>
                        )}
                        {CusError?.tin !== "" && (
                            <p className="text-[10px]">{CusError?.tin}</p>
                        )}
                    </li>
                    <li>
                        <label>
                            {isType === "company" ? "*" : ""}Branch Code
                        </label>
                        <input
                            className="field"
                            type="number"
                            placeholder="00000"
                            {...register("branch_code", {
                                minLength: {
                                    value: 5,
                                    message: "Must be 5 Number",
                                },
                                maxLength: {
                                    value: 5,
                                    message: "Must be 5 Number",
                                },
                            })}
                            value={isNewCustomer.branch_code}
                            onChange={(e) => {
                                if (e.target.value.length <= 5) {
                                    setNewCustomer({
                                        ...isNewCustomer,
                                        branch_code: e.target.value,
                                    });
                                }
                            }}
                        />
                        {errors.branch_code && (
                            <p className="text-[10px]">
                                {errors.branch_code.message}
                            </p>
                        )}
                        {CusError?.branch_code !== "" && (
                            <p className="text-[10px]">
                                {CusError?.branch_code}
                            </p>
                        )}
                    </li>
                </ul>

                <div className=" w-full flex justify-end items-center">
                    <aside
                        onClick={() => {
                            setCusToggle(false);
                            setCusError({ ...ErrorDefault });
                        }}
                        className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                    >
                        CANCEL
                    </aside>
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
