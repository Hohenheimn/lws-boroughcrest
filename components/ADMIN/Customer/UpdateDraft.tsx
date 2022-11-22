import React, { useState, useContext, useEffect, useRef } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import {
    GetCustomerDraft,
    GetUnitCode,
    PutCustomer,
} from "../../ReactQuery/CustomerMethod";
import ImageVerication from "./ImageVerication";
import { useForm } from "react-hook-form";
import { customer } from "../../../types/customerList";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { useQueryClient } from "react-query";

export default function UpdateDraft() {
    const { ImgUrl, isDraft, setDraft, NewCustomerDefault } =
        useContext(AppContext);
    const [isActiveForm, setActiveForm] = useState([true, false, false]);
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const [isValidIDUrl, setValidIDUrl] = useState("/Images/id-sample.png");
    const [isSignature, setSignature] = useState(false);
    const [readOnce, setReadOnce] = useState(true);
    const [imgError, setImgError] = useState({
        img1: "",
        img2: "",
        img3: "",
    });

    const [status, setStatus] = useState(true);
    const [isType, setType] = useState("");
    const router = useRouter();
    const id = router.query.draft;

    const { data, isLoading } = GetCustomerDraft(id);
    const draft = data?.data;

    let tin = draft?.tin.replaceAll("-", "");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<customer>({
        defaultValues: {
            type: draft?.type,
            class: draft?.class,
            name: draft?.name,
            tin: tin,
            branch_code: draft?.branch_code,
            individual_citizenship: draft?.individual_citizenship,
            individual_birth_date: draft?.individual_birth_date,
            individual_co_owner: draft?.individual_co_owner,
        },
    });

    const Status = () => {
        setStatus(!status);
    };

    const Close = () => {
        setDraft({
            ...NewCustomerDefault,
            _method: "PUT",
        });
        router.push("");
    };

    useEffect(() => {
        if (data?.status === 200) {
            if (readOnce === true) {
                setReadOnce(false);
                setType(draft?.type);
                setValue("name", draft.name, {
                    shouldValidate: true,
                });
                setValue("tin", tin, {
                    shouldValidate: true,
                });
                setValue("branch_code", draft.branch_code, {
                    shouldValidate: true,
                });
                setValue("individual_co_owner", draft.individual_co_owner, {
                    shouldValidate: true,
                });
                setValue("individual_birth_date", draft.individual_birth_date, {
                    shouldValidate: true,
                });
                setValue(
                    "individual_citizenship",
                    draft.individual_citizenship,
                    {
                        shouldValidate: true,
                    }
                );
                setDraft({
                    ...draft,
                    _method: "PUT",
                });
                if (!isLoading) {
                    setProfileUrl(`${ImgUrl}${draft.image_photo}`);
                    setValidIDUrl(`${ImgUrl}${draft.image_valid_id}`);
                }
            }
        }
    }, [data?.status]);

    const Submit = (data: any) => {
        setDraft({
            ...isDraft,
            status: status ? "active" : "inactive",
            type: data?.type,
            class: data?.class,
            name: data?.name,
            tin: data.tin,
            branch_code: data?.branch_code,
            individual_citizenship: data?.individual_citizenship,
            individual_birth_date: data?.individual_birth_date,
            individual_co_owner: data?.individual_co_owner,
            image_photo:
                data?.image_photo.length === 1 ? data?.image_photo[0] : "",
            image_signature:
                data?.image_signature.length === 1
                    ? data?.image_signature[0]
                    : "",
            image_valid_id:
                data?.image_valid_id.length === 1
                    ? data?.image_valid_id[0]
                    : "",
        });
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Draft Customer</p>

                {data?.status === 200 ? (
                    <>
                        <form
                            onSubmit={handleSubmit(Submit)}
                            className={`${isActiveForm[0] ? "" : "hidden"}`}
                        >
                            <h1 className={style.modal_label_primary}>
                                Primary Informations
                            </h1>
                            <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                                <aside className=" w-4/12 480px:w-2/4">
                                    <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                                        TYPE
                                    </p>

                                    <select
                                        id=""
                                        defaultValue={draft?.type}
                                        {...register("type", {
                                            required: "Required",
                                        })}
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }
                                        className="uppercase rounded-md px-2 py-[2px] border-none text-black outline-none w-[90%] 480px:w-full"
                                    >
                                        <option
                                            value={draft?.type}
                                            className={style.disabled}
                                        >
                                            {draft?.type}
                                        </option>
                                        <option
                                            value="individual"
                                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                                        >
                                            Individual
                                        </option>
                                        <option
                                            className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                                            value="company"
                                        >
                                            Company
                                        </option>
                                    </select>
                                </aside>
                                <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                                    <span className="mr-2 font-bold">
                                        STATUS
                                    </span>

                                    <div
                                        onClick={Status}
                                        className={`statusCircle ${
                                            status ? "active" : "inactive"
                                        }`}
                                    ></div>
                                </aside>
                            </div>
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
                                            data-type="profile"
                                            {...register("image_photo")}
                                            onChange={(e) =>
                                                ImageVerication(
                                                    e,
                                                    setImgError,
                                                    imgError,
                                                    setProfileUrl,
                                                    setSignature,
                                                    setValidIDUrl
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="image"
                                            className="  cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                                        >
                                            <AiFillCamera />
                                        </label>
                                    </aside>
                                    {imgError.img1 !== "" && (
                                        <p className="text-[12px]">
                                            {imgError.img1}
                                        </p>
                                    )}
                                </li>
                                <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                                    <input
                                        type="file"
                                        id="validid"
                                        className="absolute z-[-99] w-0 overflow-hidden"
                                        data-type="validID"
                                        {...register("image_valid_id")}
                                        onChange={(e) =>
                                            ImageVerication(
                                                e,
                                                setImgError,
                                                imgError,
                                                setProfileUrl,
                                                setSignature,
                                                setValidIDUrl
                                            )
                                        }
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
                                </li>
                                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                                    <label
                                        className="text-[12px] font-NHU-medium uppercase cursor-pointer w-[90%] 480px:w-full"
                                        htmlFor="file"
                                    >
                                        Upload Signature
                                    </label>
                                    {imgError.img3 !== "" && (
                                        <p className="text-[12px]">
                                            {imgError.img3}
                                        </p>
                                    )}
                                    <input
                                        id="file"
                                        type="file"
                                        className="absolute z-[-99] w-0 overflow-hidden"
                                        {...register("image_signature")}
                                        onChange={(e) =>
                                            ImageVerication(
                                                e,
                                                setImgError,
                                                imgError,
                                                setProfileUrl,
                                                setSignature,
                                                setValidIDUrl
                                            )
                                        }
                                    />
                                </li>
                            </ul>
                            <motion.ul
                                variants={ModalSideFade}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={style.ThreeRows}
                            >
                                <li>
                                    <label>*CLASS</label>
                                    <select
                                        id=""
                                        defaultValue={draft?.class}
                                        {...register("class", {
                                            required: "Required",
                                        })}
                                    >
                                        <option value={draft?.class}>
                                            {draft?.class}
                                        </option>
                                        <option value="developer">
                                            Developer
                                        </option>
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
                                    <label>*NAME</label>
                                    <input
                                        type="text"
                                        className="bg-white"
                                        {...register("name", {
                                            required: "Required",
                                        })}
                                    />
                                    {errors.name && (
                                        <p className="text-[10px]">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </li>
                                {(isType === "individual" || isType === "") && (
                                    <>
                                        <li>
                                            <label>CO-OWNER</label>
                                            <input
                                                type="email"
                                                className="bg-white"
                                                {...register(
                                                    "individual_co_owner"
                                                )}
                                            />
                                            {errors.individual_co_owner && (
                                                <p className="text-[10px]">
                                                    {
                                                        errors
                                                            .individual_co_owner
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </li>

                                        <li>
                                            <label>*CITIZENSHIP</label>
                                            <input
                                                type="number"
                                                className="bg-white"
                                                {...register(
                                                    "individual_citizenship",
                                                    {
                                                        required: "Required",
                                                    }
                                                )}
                                            />
                                            {errors.individual_citizenship && (
                                                <p className="text-[10px]">
                                                    {
                                                        errors
                                                            .individual_citizenship
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </li>
                                        <li>
                                            <label>BIRTH DATE</label>
                                            <input
                                                {...register(
                                                    "individual_birth_date"
                                                )}
                                                type="date"
                                                className="bg-white"
                                            />
                                            {errors.individual_birth_date && (
                                                <p className="text-[10px]">
                                                    {
                                                        errors
                                                            .individual_birth_date
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </li>
                                    </>
                                )}

                                <li>
                                    <label>*TIN</label>
                                    <input
                                        type="text"
                                        className="bg-white"
                                        placeholder="000000000"
                                        {...register("tin", {
                                            required: "Required",
                                            minLength: {
                                                value: 9,
                                                message: "Must be 9 numbers",
                                            },
                                            maxLength: {
                                                value: 9,
                                                message: "Must be 9 numbers",
                                            },
                                        })}
                                    />
                                    {errors.tin && (
                                        <p className="text-[10px]">
                                            {errors.tin.message}
                                        </p>
                                    )}
                                </li>
                                <li>
                                    <label>*BRANCH CODE</label>
                                    <input
                                        type="text"
                                        className="bg-white"
                                        placeholder="00000"
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
                            </motion.ul>
                            {isType === "" && (
                                <ul>
                                    <li>
                                        <label>Please Select a Type</label>
                                    </li>
                                </ul>
                            )}
                            <div className=" w-full flex justify-end items-center">
                                <aside
                                    onClick={Close}
                                    className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                                >
                                    CANCEL
                                </aside>
                                {isType !== "" && (
                                    <button
                                        type="submit"
                                        className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                                    >
                                        NEXT
                                    </button>
                                )}
                            </div>
                        </form>
                        <Contact
                            setActiveForm={setActiveForm}
                            isActiveForm={isActiveForm}
                            draft={draft}
                        />
                        {isActiveForm[2] && (
                            <Property
                                isActiveForm={isActiveForm}
                                setActiveForm={setActiveForm}
                                status={status}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex justify-center py-10">
                        <BeatLoader
                            color={"#8f384d"}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}
            </section>
        </div>
    );
}

const Contact = ({ setActiveForm, isActiveForm, draft }: any) => {
    const { setDraft, isDraft } = useContext(AppContext);
    const [isSameEmail, setSameEmail] = useState(false);
    const [isSameAddress, setSameAddress] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<customer>({
        defaultValues: {
            contact_no: draft.contact_no,
            registered_email: draft.registered_email,
            company_contact_person: draft.company_contact_person,
            preferred_email: draft.preferred_email,
            registered_address_unit_floor: draft.registered_address_unit_floor,
            registered_address_building: draft.registered_address_building,
            registered_address_street: draft.registered_address_street,
            registered_address_district: draft.registered_address_district,
            registered_address_municipal_city:
                draft.registered_address_municipal_city,
            registered_address_province: draft.registered_address_province,
            registered_address_zip_code: draft.registered_address_zip_code,
            MA: {
                mailing_address_unit_floor: draft.mailing_address_unit_floor,
                mailing_address_building: draft.mailing_address_building,
                mailing_address_street: draft.mailing_address_street,
                mailing_address_district: draft.mailing_address_district,
                mailing_address_municipal_city:
                    draft.mailing_address_municipal_city,
                mailing_address_province: draft.mailing_address_province,
                mailing_address_zip_code: draft.mailing_address_zip_code,
            },
        },
    });

    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
            (item[2] = false),
        ]);
    };
    const NextFormValidation = (data: any) => {
        setDraft({
            ...isDraft,
            preferred_email: data.preferred_email,
            mailing_address_unit_floor: data.MA.mailing_address_unit_floor,
            mailing_address_building: data.MA.mailing_address_building,
            mailing_address_street: data.MA.mailing_address_street,
            mailing_address_district: data.MA.mailing_address_district,
            mailing_address_municipal_city:
                data.MA.mailing_address_municipal_city,
            mailing_address_province: data.MA.mailing_address_province,
            mailing_address_zip_code: data.MA.mailing_address_zip_code,
        });

        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = false),
            (item[2] = true),
        ]);
    };

    const sameEmail = () => {
        setSameEmail(!isSameEmail);
        if (!isSameEmail) {
            setValue("preferred_email", isDraft.registered_email, {
                shouldValidate: true,
            });
        } else {
            setValue("preferred_email", "", {
                shouldValidate: true,
            });
        }
    };

    const sameAddress = () => {
        setSameAddress(!isSameAddress);
        if (!isSameAddress) {
            setValue(
                "MA",
                {
                    mailing_address_unit_floor:
                        isDraft.registered_address_unit_floor,
                    mailing_address_building:
                        isDraft.registered_address_building,
                    mailing_address_street: isDraft.registered_address_street,
                    mailing_address_district:
                        isDraft.registered_address_district,
                    mailing_address_municipal_city:
                        isDraft.registered_address_municipal_city,
                    mailing_address_province:
                        isDraft.registered_address_province,
                    mailing_address_zip_code:
                        isDraft.registered_address_zip_code,
                },
                { shouldValidate: true }
            );
        } else {
            setValue(
                "MA",
                {
                    mailing_address_unit_floor: "",
                    mailing_address_building: "",
                    mailing_address_street: "",
                    mailing_address_district: "",
                    mailing_address_municipal_city: "",
                    mailing_address_province: "",
                    mailing_address_zip_code: "",
                },
                { shouldValidate: true }
            );
        }
    };

    return (
        <div className={`${isActiveForm[1] ? "" : "hidden"}`}>
            <form onSubmit={handleSubmit(NextFormValidation)}>
                <h1 className={style.modal_label_primary}>
                    Contact Informations
                </h1>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*MOBILE</label>
                        <input
                            type="number"
                            {...register("contact_no", {
                                required: "Required",
                                minLength: {
                                    value: 11,
                                    message: "Must be 11 Numbers",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Must be 11 Number",
                                },
                                pattern: {
                                    value: /^(09)\d{9}$/,
                                    message: "Invalid Contact Number",
                                },
                            })}
                            value={isDraft.contact_no}
                            onChange={(e) =>
                                e.target.value.length <= 11 &&
                                setDraft({
                                    ...isDraft,
                                    contact_no: e.target.value,
                                })
                            }
                        />
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*REGISTERED-EMAIL</label>
                        <input
                            type="email"
                            {...register("registered_email", {
                                required: "Required",
                            })}
                            value={isDraft.registered_email}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_email: e.target.value,
                                })
                            }
                        />
                        {errors.registered_email && (
                            <p className="text-[10px]">
                                {errors.registered_email.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PREFERED EMAIL</label>
                        <input
                            type="email"
                            {...register("preferred_email", {
                                required: "Required",
                            })}
                        />
                        {errors.preferred_email && (
                            <p className="text-[10px]">
                                {errors.preferred_email.message}
                            </p>
                        )}
                        <aside className={style.checkboxContainer}>
                            <input
                                type="checkbox"
                                id="sameEmail"
                                className={style.same}
                                checked={isSameEmail}
                                onChange={sameEmail}
                            />
                            <label htmlFor="sameEmail">
                                SAME AS REGISTER EMAIL
                            </label>
                        </aside>
                    </li>
                    {isDraft.type === "company" && (
                        <li>
                            <label>CONTACT PERSON</label>
                            <input
                                type="text"
                                {...register("company_contact_person")}
                                // isNewCustomer.registered_email
                                value={isDraft.company_contact_person}
                                onChange={(e) =>
                                    setDraft({
                                        ...isDraft,
                                        company_contact_person: e.target.value,
                                    })
                                }
                            />
                            {errors.company_contact_person && (
                                <p className="text-[10px]">
                                    {errors.company_contact_person.message}
                                </p>
                            )}
                        </li>
                    )}
                </ul>

                <p className="text-[14px] font-bold mb-2">REGISTERED ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="text"
                            {...register("registered_address_unit_floor", {
                                required: "Required",
                            })}
                            value={isDraft.registered_address_unit_floor}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_unit_floor:
                                        e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.registered_address_unit_floor.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*BUILDING</label>
                        <input
                            type="text"
                            {...register("registered_address_building", {
                                required: "Required",
                            })}
                            value={isDraft.registered_address_building}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_building: e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_building && (
                            <p className="text-[10px]">
                                {errors.registered_address_building.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*STREET</label>
                        <input
                            type="text"
                            {...register("registered_address_street", {
                                required: "Required",
                            })}
                            value={isDraft.registered_address_street}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_street: e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_street && (
                            <p className="text-[10px]">
                                {errors.registered_address_street.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*DISTRICT</label>
                        <input
                            type="text"
                            {...register("registered_address_district", {
                                required: "Required",
                            })}
                            value={isDraft.registered_address_district}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_district: e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_district && (
                            <p className="text-[10px]">
                                {errors.registered_address_district.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*MUNICIPALITY CITY</label>
                        <input
                            type="text"
                            {...register("registered_address_municipal_city", {
                                required: "Required",
                            })}
                            value={isDraft.registered_address_municipal_city}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_municipal_city:
                                        e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_municipal_city && (
                            <p className="text-[10px]">
                                {
                                    errors.registered_address_municipal_city
                                        .message
                                }
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PROVINCE</label>
                        <input
                            type="text"
                            {...register("registered_address_province", {
                                required: "Required",
                            })}
                            value={isDraft.registered_address_province}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_province: e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_province && (
                            <p className="text-[10px]">
                                {errors.registered_address_province.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*ZIP CODE</label>
                        <input
                            type="number"
                            {...register("registered_address_zip_code", {
                                required: "Required",
                                maxLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                                minLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                            })}
                            value={isDraft.registered_address_zip_code}
                            onChange={(e) =>
                                setDraft({
                                    ...isDraft,
                                    registered_address_zip_code: e.target.value,
                                })
                            }
                        />
                        {errors.registered_address_zip_code && (
                            <p className="text-[10px]">
                                {errors.registered_address_zip_code.message}
                            </p>
                        )}
                    </li>
                </ul>

                <p className="text-[14px] font-bold mb-2">MAILING ADDRESS</p>
                <aside className={style.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="sameAddress"
                        className={style.same}
                        checked={isSameAddress}
                        onChange={sameAddress}
                    />
                    <label htmlFor="sameAddress">
                        SAME AS REGISTER ADDRESS
                    </label>
                </aside>

                <ul className={style.ThreeRows}>
                    <li>
                        <label>UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_unit_floor")}
                        />
                        {errors.MA?.mailing_address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.MA?.mailing_address_unit_floor.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>BUILDING</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_building")}
                        />
                        {errors.MA?.mailing_address_building && (
                            <p className="text-[10px]">
                                {errors.MA?.mailing_address_building.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>STREET</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_street")}
                        />
                        {errors.MA?.mailing_address_street && (
                            <p className="text-[10px]">
                                {errors.MA?.mailing_address_street.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>DISTRICT</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_district")}
                        />
                        {errors.MA?.mailing_address_district && (
                            <p className="text-[10px]">
                                {errors.MA?.mailing_address_district.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>MUNICIPALITY CITY</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_municipal_city")}
                        />
                        {errors.MA?.mailing_address_municipal_city && (
                            <p className="text-[10px]">
                                {
                                    errors.MA?.mailing_address_municipal_city
                                        .message
                                }
                            </p>
                        )}
                    </li>
                    <li>
                        <label>PROVINCE</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_province")}
                        />
                        {errors.MA?.mailing_address_province && (
                            <p className="text-[10px]">
                                {errors.MA?.mailing_address_province.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>ZIP CODE</label>
                        <input
                            type="text"
                            {...register("MA.mailing_address_zip_code", {
                                maxLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                                minLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                            })}
                        />
                        {errors.MA?.mailing_address_zip_code && (
                            <p className="text-[10px]">
                                {errors.MA?.mailing_address_zip_code.message}
                            </p>
                        )}
                    </li>
                </ul>
                <div className=" w-full flex justify-end items-center">
                    <aside
                        onClick={Back}
                        className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                    >
                        Back
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
};

const Property = ({ isActiveForm, setActiveForm, status }: any) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setPrompt, isDraft } = useContext(AppContext);
    const [isProperty, setProperty] = useState<any>([
        {
            id: 1,
            unitCode: "",
            project: "",
        },
    ]);
    const [isError, setError] = useState("");

    useEffect(() => {
        if (isDraft.properties.length !== 0) {
            const existedProperties = isDraft.properties.map((item: any) => {
                return {
                    id: item?.id,
                    unitCode: item?.unit_code,
                    project: item?.project?.name,
                };
            });
            setProperty(existedProperties);
        }
    }, []);

    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

    const Success = async () => {
        queryClient.invalidateQueries("get-customer-list");
        // Prompt Message
        setPrompt((prev: any) => ({
            ...prev,
            message: `Customer successfully saved!`,
            type: "success",
            toggle: true,
        }));
        setError("");

        // Reset UnitCode Array
        setProperty([
            {
                id: 1,
                unitCode: "",
                project: "",
            },
        ]);
        router.push("");
    };

    const onError = (e: any) => {
        if (
            e?.response?.data?.registered_email?.includes(
                "Customer Already Exists!"
            )
        ) {
            setError("Customer Email Already Registered!");
        } else {
            setError("Please fill out all required field!");
        }
        setPrompt((prev: any) => ({
            ...prev,
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        }));
    };

    const { isLoading: MutateLoading, mutate } = PutCustomer(
        Success,
        onError,
        router.query.draft
    );

    const Save = async () => {
        const ArrayPropertyID = isProperty.map((item: any) => {
            return item?.unitCode;
        });
        let Payload = { ...isDraft, unit_codes: ArrayPropertyID };
        // if Type is company, empty the field of not for company
        if (Payload.type === "Company" || Payload.type === "company") {
            Payload = {
                ...Payload,
                individual_birth_date: "",
                individual_citizenship: "",
                individual_co_owner: "",
            };
        }
        // if Type is individual, empty the field of not for individual
        if (Payload.type === "individual" || Payload.type === "Individual") {
            Payload = { ...Payload, company_contact_person: "" };
        }
        delete Payload["updated_at"];
        delete Payload["created_at"];
        delete Payload["portal_id"];
        delete Payload["assigned_customer_id"];
        delete Payload["deleted_at"];
        delete Payload["id"];
        delete Payload["properties"];
        delete Payload["audits"];

        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(Payload);
        await keys.forEach((key) => {
            if (
                key === "image_photo" ||
                key === "image_valid_id" ||
                key === "image_signature"
            ) {
                if (Payload[key] === undefined) {
                    arrayData.push({
                        key: key,
                        keyData: "",
                    });
                } else {
                    arrayData.push({
                        key: key,
                        keyData: Payload[key],
                    });
                }
            } else {
                arrayData.push({
                    key: key,
                    keyData: Payload[key],
                });
            }
        });
        arrayData.map(({ key, keyData }: any) => {
            if (key === "unit_codes") {
                const stringify = JSON.stringify(keyData);
                formData.append("unit_codes", stringify);
            } else {
                formData.append(key, keyData);
            }
        });
        mutate(formData);
    };

    return (
        <div className={`${isActiveForm[2] ? "" : "hidden"}`}>
            <h1 className=" w-full text-[24px] mb-3">Property Information</h1>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            UNIT CODE
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            PROJECT
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isProperty.map((item: any, index: number) => (
                        <List
                            detail={item}
                            setProperty={setProperty}
                            id={index}
                            key={index}
                            isProperty={isProperty}
                            setError={setError}
                        />
                    ))}
                </tbody>
            </table>
            {isError !== "" && <p className={style.ErrorMsg}>{isError}</p>}

            <div className={style.SaveButton}>
                <button
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={Back}
                >
                    BACK
                </button>

                <div className={style.Save}>
                    <div>
                        <button
                            type="submit"
                            name="save"
                            onClick={Save}
                            className="buttonRed"
                        >
                            {MutateLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "SAVE"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const List = ({ detail, isProperty, setProperty, id, setError }: any) => {
    const newID = Math.random();
    const [isSelect, setSelect] = useState(false);

    const updateValue = (event: any) => {
        const UnitCode = event.target.innerHTML;
        let validate = true;
        isProperty.map((item: any) => {
            if (item?.unitCode === UnitCode) {
                setError("Selected Unit Code already in the list");
                validate = false;
                return;
            }
        });
        if (validate === true) {
            const newItems = isProperty.map((item: any) => {
                if (detail.id == item.id) {
                    return {
                        ...item,
                        project: event.target.getAttribute("data-projname"),
                        unitCode: UnitCode,
                    };
                }
                return item;
            });
            setProperty(newItems);
            setSelect(false);
        }
    };

    return (
        <tr>
            <td className=" max-w-[50px] pr-2 ">
                <div className=" relative">
                    <input
                        type="text"
                        value={detail?.unitCode}
                        onChange={(e) => updateValue(e)}
                        className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                        onFocus={() => setSelect(true)}
                    />
                    {isSelect && (
                        <Select
                            setSelect={setSelect}
                            updateValue={updateValue}
                        />
                    )}
                </div>
            </td>
            <td className="pr-2">
                <p className="w-full rounded-md text-black h-6 px-2 text-[14px] py-[2px] outline-none bg-ThemeRed50">
                    {detail.project}
                </p>
            </td>
            <td className=" flex justify-center">
                <div className="flex justify-between w-10">
                    {isProperty.length > 1 && (
                        <button
                            className=" text-[32px] text-ThemeRed mr-2"
                            onClick={() =>
                                setProperty((item: any[]) =>
                                    item.filter(
                                        (x: { id: any }) => x.id !== detail.id
                                    )
                                )
                            }
                        >
                            -
                        </button>
                    )}
                    {isProperty.length - 1 === id && (
                        <button
                            className=" text-[32px] text-ThemeRed"
                            onClick={() =>
                                setProperty((item: any) => [
                                    ...item,
                                    {
                                        id: newID,
                                        unitCode: "",
                                        project: "",
                                    },
                                ])
                            }
                        >
                            +
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

const Select = ({ setSelect, updateValue }: any) => {
    const Menu = useRef<any>();

    // Get unit codes to display
    const { isLoading, data, isError } = GetUnitCode();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!Menu.current.contains(e.target)) {
                setSelect(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <ul
            ref={Menu}
            className=" absolute top-full left-0 w-full bg-white p-3 z-10"
        >
            {isLoading && (
                <div className="flex justify-center">
                    <ScaleLoader color="#8f384d" height="10px" width="2px" />
                </div>
            )}
            {!isLoading &&
                data?.data.map((item: any, index: number) => (
                    <li
                        key={index}
                        data-projname={item.project.name}
                        onClick={updateValue}
                        className="cursor-pointer"
                    >
                        {item.unit_code}
                    </li>
                ))}
        </ul>
    );
};
