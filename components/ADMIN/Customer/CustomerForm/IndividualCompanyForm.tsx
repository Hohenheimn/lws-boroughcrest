import React, { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import style from "../../../../styles/Popup_Modal.module.scss";
import { CustomerFormDefaultValue } from "./CustomerForm";
import { useForm } from "react-hook-form";
import SelectDropdown from "../../../Reusable/SelectDropdown";
import AppContext from "../../../Context/AppContext";
import {
    NumberBlockInvalidKey,
    TextFieldValidation,
} from "../../../Reusable/InputField";
import Calendar from "../../../Reusable/Calendar";
import { format, isValid, parse } from "date-fns";

type Props = {
    isCustomerForm: CustomerFormDefaultValue;
    setCustomerForm: Function;
    setFormPage: Function;
    FormPage: string;
};

export default function IndividualCompanyForm({
    isCustomerForm,
    setCustomerForm,
    FormPage,
    setFormPage,
}: Props) {
    const { CusError, setCusError, ErrorDefault, setCusToggle } =
        useContext(AppContext);

    const [imgProfile, setImgProfile] = useState({
        url:
            isCustomerForm.image_photo_url === ""
                ? "/Images/sampleProfile.png"
                : isCustomerForm.image_photo_url,
        error: "",
    });
    const [imgID, setImgID] = useState({
        url:
            isCustomerForm.image_valid_id_url === ""
                ? "/Images/id-sample.png"
                : isCustomerForm.image_valid_id_url,
        error: "",
    });
    const [imgSignature, setImgSignature] = useState({
        url: "",
        error: "",
    });

    const DisplayImage = (e: any, setImg: Function, type: string) => {
        let defaultUrl = "/Images/sampleProfile.png";
        if (type === "validID") {
            defaultUrl = "/Images/id-sample.png";
        }
        if (e.target.files[0]?.size > 2000000) {
            setImg({
                url: defaultUrl,
                error: "Image must be 2mb only",
            });
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
                    setImg({
                        url: event.target.result,
                        error: "",
                    });
                });
                if (type === "signature") {
                    setCustomerForm({
                        ...isCustomerForm,
                        image_signature: e.target.files[0],
                    });
                }
                if (type === "validID") {
                    setCustomerForm({
                        ...isCustomerForm,
                        image_valid_id: e.target.files[0],
                    });
                }
                if (type === "profile") {
                    setCustomerForm({
                        ...isCustomerForm,
                        image_photo: e.target.files[0],
                    });
                }
            } else {
                setImg({
                    url: defaultUrl,
                    error: "Invalid Image File",
                });
            }
        } else {
            setImg({
                url: defaultUrl,
                error: "Image file removed",
            });
        }
    };

    // Birth Date Field with custom Calendar
    const [isDate, setDate] = useState({
        value: isCustomerForm.individual_birth_date,
        toggle: false,
    });
    useEffect(() => {
        const date = parse(isDate.value, "MMM dd yyyy", new Date());
        setCustomerForm({
            ...isCustomerForm,
            individual_birth_date: isValid(date)
                ? format(date, "yyyy-MM-dd")
                : "",
        });
    }, [isDate.value]);

    // only for validation of email and contact

    const NextHandler = () => {
        setFormPage("contact-information");
    };

    return (
        <>
            {FormPage === "primary" && (
                <div>
                    <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                        <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <aside className="w-20 h-20 relative flex mr-4">
                                <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative overflow-hidden">
                                    <Image
                                        src={`${imgProfile.url}`}
                                        alt=""
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </aside>
                                <input
                                    type="file"
                                    id="profile"
                                    className="absolute z-[-99] w-0 overflow-hidden"
                                    onChange={(e) =>
                                        DisplayImage(
                                            e,

                                            setImgProfile,
                                            "profile"
                                        )
                                    }
                                />

                                <label
                                    htmlFor="profile"
                                    className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                                >
                                    <AiFillCamera />
                                </label>
                            </aside>
                            {imgProfile.error !== "" && (
                                <p className="text-[13px] font-NHU-bold">
                                    {imgProfile.error}
                                </p>
                            )}
                        </li>
                        <li className=" flex flex-col items-center justify-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <div>
                                <input
                                    type="file"
                                    id="validid"
                                    className="absolute z-[-99] w-0 overflow-hidden"
                                    onChange={(e) =>
                                        DisplayImage(e, setImgID, "validID")
                                    }
                                />

                                <label
                                    htmlFor="validid"
                                    className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                                >
                                    <aside className=" w-24 mr-2 h-16 relative">
                                        <Image
                                            src={`${imgID.url}`}
                                            alt=""
                                            layout="fill"
                                        />
                                    </aside>
                                    <div>
                                        UPLOAD VALID ID
                                        {imgID.error !== "" && (
                                            <p className="text-[13px] font-NHU-bold">
                                                {imgID.error}
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
                                    htmlFor="signature"
                                >
                                    <div>Upload Signature</div>
                                </label>

                                {imgSignature.error !== "" && (
                                    <p className="text-[13px] font-NHU-bold">
                                        {imgSignature.error}
                                    </p>
                                )}

                                <input
                                    id="signature"
                                    type="file"
                                    className="absolute z-[-99] w-0 overflow-hidden"
                                    data-type="signature"
                                    onChange={(e) =>
                                        DisplayImage(
                                            e,

                                            setImgSignature,
                                            "signature"
                                        )
                                    }
                                />
                            </div>
                        </li>
                    </ul>
                    <ul className={style.ThreeRows}>
                        <li>
                            <label>*CLASS</label>
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setCustomerForm({
                                        ...isCustomerForm,
                                        class: value,
                                    });
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={isCustomerForm.class}
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
                                value={isCustomerForm.name}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 50)) return;
                                    setCustomerForm({
                                        ...isCustomerForm,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            {CusError?.name !== "" && (
                                <p className="text-[10px]">{CusError?.name}</p>
                            )}
                        </li>
                        {(isCustomerForm.type === "Individual" ||
                            isCustomerForm.type === "Individual") && (
                            <>
                                <li>
                                    <label>CO-OWNER</label>
                                    <input
                                        type="text"
                                        className="field"
                                        value={
                                            isCustomerForm.individual_co_owner
                                        }
                                        onChange={(e) => {
                                            if (!TextFieldValidation(e, 50))
                                                return;
                                            setCustomerForm({
                                                ...isCustomerForm,
                                                individual_co_owner:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                </li>

                                <li>
                                    <label>*CITIZENSHIP</label>
                                    <input
                                        type="text"
                                        className="field"
                                        value={
                                            isCustomerForm.individual_citizenship
                                        }
                                        onChange={(e) => {
                                            if (!TextFieldValidation(e, 50))
                                                return;
                                            setCustomerForm({
                                                ...isCustomerForm,
                                                individual_citizenship:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                    {CusError?.individual_citizenship !==
                                        "" && (
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
                                            autoComplete="off"
                                            type="text"
                                            value={isDate.value}
                                            readOnly
                                            placeholder="MMM dd yyyy"
                                            onClick={() =>
                                                setDate({
                                                    ...isDate,
                                                    toggle: true,
                                                })
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
                                {isCustomerForm.type === "Company" ? "*" : ""}
                                TIN Number
                            </label>
                            <input
                                type="number"
                                placeholder="000000000"
                                className="field"
                                value={isCustomerForm.tin}
                                onKeyDown={NumberBlockInvalidKey}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 9)) return;
                                    setCustomerForm({
                                        ...isCustomerForm,
                                        tin: e.target.value,
                                    });
                                }}
                            />
                            {CusError?.tin !== "" && (
                                <p className="text-[10px]">{CusError?.tin}</p>
                            )}
                        </li>
                        <li>
                            <label>
                                {isCustomerForm.type === "Company" ? "*" : ""}
                                Branch Code
                            </label>
                            <input
                                className="field"
                                type="number"
                                placeholder="00000"
                                value={isCustomerForm.branch_code}
                                onKeyDown={NumberBlockInvalidKey}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 5)) return;
                                    setCustomerForm({
                                        ...isCustomerForm,
                                        branch_code: e.target.value,
                                    });
                                }}
                            />
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
                            onClick={NextHandler}
                            className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            )}
            {FormPage === "contact-information" && (
                <ContactInformation
                    isCustomerForm={isCustomerForm}
                    setCustomerForm={setCustomerForm}
                    FormPage={FormPage}
                    setFormPage={setFormPage}
                />
            )}
        </>
    );
}

type ContactInformationProps = {
    isCustomerForm: CustomerFormDefaultValue;
    setCustomerForm: Function;
    FormPage: string;
    setFormPage: Function;
};

type validateEmailContact = {
    contact_no: number;
    registered_email: string;
    preferred_email: string;
    registered_address_zip_code: number;
    mailing_address_zip_code: number;
};

const ContactInformation = ({
    FormPage,
    setFormPage,
    isCustomerForm,
    setCustomerForm,
}: ContactInformationProps) => {
    const { CusError, setCusError, ErrorDefault, setCusToggle } =
        useContext(AppContext);

    const [isSameEmail, setSameEmail] = useState(false);
    const [isSameAddress, setSameAddress] = useState(false);

    const sameEmail = () => {
        setSameEmail(!isSameEmail);
        if (!isSameEmail) {
            setCustomerForm({
                ...isCustomerForm,
                preferred_email: isCustomerForm.registered_email,
            });
            setValue("preferred_email", isCustomerForm.registered_email);
        } else {
            setCustomerForm({
                ...isCustomerForm,
                preferred_email: "",
            });
        }
    };
    const sameAddress = () => {
        setSameAddress(!isSameAddress);
        if (!isSameAddress) {
            setCustomerForm({
                ...isCustomerForm,
                mailing_address_unit_floor:
                    isCustomerForm.registered_address_unit_floor,
                mailing_address_building:
                    isCustomerForm.registered_address_building,
                mailing_address_street:
                    isCustomerForm.registered_address_street,
                mailing_address_district:
                    isCustomerForm.registered_address_district,
                mailing_address_municipal_city:
                    isCustomerForm.registered_address_municipal_city,
                mailing_address_province:
                    isCustomerForm.registered_address_province,
                mailing_address_zip_code:
                    isCustomerForm.registered_address_zip_code,
            });
        } else {
            setCustomerForm({
                ...isCustomerForm,
                mailing_address_unit_floor: "",
                mailing_address_building: "",
                mailing_address_street: "",
                mailing_address_district: "",
                mailing_address_municipal_city: "",
                mailing_address_province: "",
                mailing_address_zip_code: "",
            });
        }
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<validateEmailContact>();
    const NextFormValidation = () => {
        setFormPage("property");
    };
    const BackHandler = () => {
        setFormPage("primary");
    };
    return (
        <div>
            <form onSubmit={handleSubmit(NextFormValidation)}>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*MOBILE</label>
                        <input
                            type="number"
                            formNoValidate
                            className="field"
                            {...register("contact_no", {
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
                            value={isCustomerForm.contact_no}
                            onKeyDown={NumberBlockInvalidKey}
                            onChange={(e) =>
                                e.target.value.length <= 11 &&
                                setCustomerForm({
                                    ...isCustomerForm,
                                    contact_no: e.target.value,
                                })
                            }
                        />
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                        {CusError.contact_no !== "" && (
                            <p className="text-[10px]">
                                {CusError?.contact_no}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*REGISTERED-EMAIL</label>
                        <input
                            type="text"
                            className="field"
                            {...register("registered_email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid Email",
                                },
                            })}
                            value={isCustomerForm.registered_email}
                            onChange={(e) => {
                                if (e.target.value.length > 20) return;
                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_email: e.target.value,
                                });
                            }}
                        />
                        {errors.registered_email && (
                            <p className="text-[10px]">
                                {errors.registered_email.message}
                            </p>
                        )}
                        {CusError.registered_email !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_email}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PREFERED EMAIL</label>
                        <input
                            type="text"
                            className="field"
                            {...register("preferred_email", {
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid Email",
                                },
                            })}
                            value={isCustomerForm.preferred_email}
                            onChange={(e) => {
                                if (e.target.value.length > 20) return;
                                setCustomerForm({
                                    ...isCustomerForm,
                                    preferred_email: e.target.value,
                                });
                            }}
                        />
                        {errors.preferred_email && (
                            <p className="text-[10px]">
                                {errors.preferred_email.message}
                            </p>
                        )}
                        {CusError.preferred_email !== "" && (
                            <p className="text-[10px]">
                                {CusError?.preferred_email}
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
                    {isCustomerForm.type === "Company" && (
                        <li>
                            <label>CONTACT PERSON</label>
                            <input
                                className="field"
                                type="text"
                                value={isCustomerForm.company_contact_person}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 50)) return;
                                    setCustomerForm({
                                        ...isCustomerForm,
                                        company_contact_person: e.target.value,
                                    });
                                }}
                            />
                        </li>
                    )}
                </ul>

                <p className="text-[14px] font-bold mb-2">REGISTERED ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.registered_address_unit_floor}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_unit_floor:
                                        e.target.value,
                                });
                            }}
                        />
                        {CusError.registered_address_unit_floor !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_unit_floor}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*BUILDING</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.registered_address_building}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_building: e.target.value,
                                });
                            }}
                        />
                        {CusError.registered_address_building !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_building}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*STREET</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.registered_address_street}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_street: e.target.value,
                                });
                            }}
                        />
                        {CusError.registered_address_street !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_street}
                            </p>
                        )}
                    </li>

                    <li>
                        <label>*DISTRICT</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.registered_address_district}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_district: e.target.value,
                                });
                            }}
                        />

                        {CusError.registered_address_district !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_district}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*MUNICIPALITY CITY</label>
                        <input
                            className="field"
                            type="text"
                            value={
                                isCustomerForm.registered_address_municipal_city
                            }
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_municipal_city:
                                        e.target.value,
                                });
                            }}
                        />
                        {CusError.registered_address_municipal_city !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_municipal_city}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PROVINCE</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.registered_address_province}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_province: e.target.value,
                                });
                            }}
                        />
                        {CusError.registered_address_province !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_province}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*ZIP CODE</label>
                        <input
                            className="field"
                            type="number"
                            onKeyDown={NumberBlockInvalidKey}
                            value={isCustomerForm.registered_address_zip_code}
                            {...register("registered_address_zip_code", {
                                maxLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                                minLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                            })}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 4)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    registered_address_zip_code: e.target.value,
                                });
                            }}
                        />
                        {errors.registered_address_zip_code && (
                            <p className="text-[10px]">
                                {errors.registered_address_zip_code.message}
                            </p>
                        )}
                        {CusError.registered_address_zip_code !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_zip_code}
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
                            className="field"
                            type="text"
                            value={isCustomerForm.mailing_address_unit_floor}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;
                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_unit_floor: e.target.value,
                                });
                            }}
                        />
                    </li>
                    <li>
                        <label>BUILDING</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.mailing_address_building}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_building: e.target.value,
                                });
                            }}
                        />
                    </li>
                    <li>
                        <label>STREET</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.mailing_address_street}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_street: e.target.value,
                                });
                            }}
                        />
                    </li>
                    <li>
                        <label>DISTRICT</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.mailing_address_district}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_district: e.target.value,
                                });
                            }}
                        />
                    </li>
                    <li>
                        <label>MUNICIPALITY CITY</label>
                        <input
                            className="field"
                            type="text"
                            value={
                                isCustomerForm.mailing_address_municipal_city
                            }
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_municipal_city:
                                        e.target.value,
                                });
                            }}
                        />
                    </li>
                    <li>
                        <label>PROVINCE</label>
                        <input
                            className="field"
                            type="text"
                            value={isCustomerForm.mailing_address_province}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 50)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_province: e.target.value,
                                });
                            }}
                        />
                    </li>
                    <li>
                        <label>ZIP CODE</label>
                        <input
                            className="field"
                            type="text"
                            onKeyDown={NumberBlockInvalidKey}
                            value={isCustomerForm.mailing_address_zip_code}
                            {...register("mailing_address_zip_code", {
                                maxLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                                minLength: {
                                    value: 4,
                                    message: "Must be 4 number",
                                },
                            })}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 4)) return;

                                setCustomerForm({
                                    ...isCustomerForm,
                                    mailing_address_zip_code: e.target.value,
                                });
                            }}
                        />
                        {errors?.mailing_address_zip_code && (
                            <p className="text-[10px]">
                                {errors?.mailing_address_zip_code.message}
                            </p>
                        )}
                    </li>
                </ul>
                <div className=" w-full flex justify-end items-center">
                    <aside
                        onClick={BackHandler}
                        className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                    >
                        BACK
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
