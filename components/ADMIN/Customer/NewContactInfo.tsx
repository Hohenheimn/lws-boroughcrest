import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import style from "../../../styles/Popup_Modal.module.scss";
import { useForm } from "react-hook-form";
import { customer } from "../../../types/customerList";

type NewContactInfo = {
    setActiveForm: Function;
    isActiveForm: any;
};
export default function NewContactInfo({
    setActiveForm,
    isActiveForm,
}: NewContactInfo) {
    const { isNewCustomer, setNewCustomer, cusReset, CusError } =
        useContext(AppContext);
    const [isSameEmail, setSameEmail] = useState(false);
    const [isSameAddress, setSameAddress] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<customer>({
        defaultValues: {
            contact_no: "",
            registered_email: "",
            company_contact_person: "",
            preferred_email: "",
            registered_address_unit_floor: "",
            registered_address_building: "",
            registered_address_street: "",
            registered_address_district: "",
            registered_address_municipal_city: "",
            registered_address_province: "",
            registered_address_zip_code: "",
            MA: {
                mailing_address_unit_floor: "",
                mailing_address_building: "",
                mailing_address_street: "",
                mailing_address_district: "",
                mailing_address_municipal_city: "",
                mailing_address_province: "",
                mailing_address_zip_code: "",
            },
        },
    });

    useEffect(() => {
        reset();
        setSameEmail(false);
        setSameAddress(false);
    }, [cusReset]);

    const sameEmail = () => {
        setSameEmail(!isSameEmail);
        if (!isSameEmail) {
            setValue("preferred_email", watch("registered_email"), {
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
                    mailing_address_unit_floor: watch(
                        "registered_address_unit_floor"
                    ),
                    mailing_address_building: watch(
                        "registered_address_building"
                    ),
                    mailing_address_street: watch("registered_address_street"),
                    mailing_address_district: watch(
                        "registered_address_district"
                    ),
                    mailing_address_municipal_city: watch(
                        "registered_address_municipal_city"
                    ),
                    mailing_address_province: watch(
                        "registered_address_province"
                    ),
                    mailing_address_zip_code: watch(
                        "registered_address_zip_code"
                    ),
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

    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
            (item[2] = false),
        ]);
    };

    const NextFormValidation = (data: any) => {
        setNewCustomer({
            ...isNewCustomer,
            preferred_email: data.preferred_email,
            mailing_address_unit_floor: data.MA.mailing_address_unit_floor,
            mailing_address_building: data.MA.mailing_address_building,
            mailing_address_street: data.MA.mailing_address_street,
            mailing_address_district: data.MA.mailing_address_district,
            mailing_address_municipal_city:
                data.MA.mailing_address_municipal_city,
            mailing_address_province: data.MA.mailing_address_province,
            mailing_address_zip_code: data.MA.mailing_address_zip_code,
            contact_no: data.contact_no,
            registered_email: data.registered_email,
            registered_address_unit_floor: data.registered_address_unit_floor,
            registered_address_building: data.registered_address_building,
            registered_address_street: data.registered_address_street,
            registered_address_district: data.registered_address_district,
            registered_address_municipal_city:
                data.registered_address_municipal_city,
            registered_address_province: data.registered_address_province,
            registered_address_zip_code: data.registered_address_zip_code,
        });

        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = false),
            (item[2] = true),
        ]);
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
                            formNoValidate
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
                            value={isNewCustomer.contact_no}
                            onChange={(e) =>
                                e.target.value.length <= 11 &&
                                setNewCustomer({
                                    ...isNewCustomer,
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
                            type="email"
                            {...register("registered_email", {
                                onChange: (e) =>
                                    setValue(
                                        "registered_email",
                                        `${e.target.value}`
                                    ),
                            })}
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
                            type="email"
                            {...register("preferred_email", {
                                onChange: (e) =>
                                    setValue(
                                        "preferred_email",
                                        `${e.target.value}`
                                    ),
                            })}
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
                    {isNewCustomer.type === "company" && (
                        <li>
                            <label>CONTACT PERSON</label>
                            <input
                                type="text"
                                {...register("company_contact_person", {
                                    onChange: (e) =>
                                        setValue(
                                            "company_contact_person",
                                            `${e.target.value}`
                                        ),
                                })}
                                // isNewCustomer.registered_email
                                value={isNewCustomer.company_contact_person}
                                onChange={(e) =>
                                    setNewCustomer({
                                        ...isNewCustomer,
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
                                onChange: (e) =>
                                    setValue(
                                        "registered_address_unit_floor",
                                        `${e.target.value}`
                                    ),
                            })}
                        />
                        {errors.registered_address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.registered_address_unit_floor.message}
                            </p>
                        )}
                        {CusError.registered_address_unit_floor !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_unit_floor}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*BUILDING</label>
                        <input
                            type="text"
                            {...register("registered_address_building", {
                                onChange: (e) =>
                                    setValue(
                                        "registered_address_building",
                                        `${e.target.value}`
                                    ),
                            })}
                        />
                        {errors.registered_address_building && (
                            <p className="text-[10px]">
                                {errors.registered_address_building.message}
                            </p>
                        )}
                        {CusError.registered_address_building !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_building}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*STREET</label>
                        <input
                            type="text"
                            {...register("registered_address_street", {})}
                        />
                        {errors.registered_address_street && (
                            <p className="text-[10px]">
                                {errors.registered_address_street.message}
                            </p>
                        )}
                        {CusError.registered_address_street !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_street}
                            </p>
                        )}
                    </li>

                    <li>
                        <label>*DISTRICT</label>
                        <input
                            type="text"
                            {...register("registered_address_district")}
                        />
                        {errors.registered_address_district && (
                            <p className="text-[10px]">
                                {errors.registered_address_district.message}
                            </p>
                        )}
                        {CusError.registered_address_district !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_district}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*MUNICIPALITY CITY</label>
                        <input
                            type="text"
                            {...register("registered_address_municipal_city")}
                        />
                        {errors.registered_address_municipal_city && (
                            <p className="text-[10px]">
                                {
                                    errors.registered_address_municipal_city
                                        .message
                                }
                            </p>
                        )}
                        {CusError.registered_address_municipal_city !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_municipal_city}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PROVINCE</label>
                        <input
                            type="text"
                            {...register("registered_address_province")}
                        />
                        {errors.registered_address_province && (
                            <p className="text-[10px]">
                                {errors.registered_address_province.message}
                            </p>
                        )}
                        {CusError.registered_address_province !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_province}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*ZIP CODE</label>
                        <input
                            type="number"
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
                            type="text"
                            {...register("MA.mailing_address_unit_floor", {
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_unit_floor",
                                        `${e.target.value}`
                                    ),
                            })}
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
                            {...register("MA.mailing_address_building", {
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_building",
                                        `${e.target.value}`
                                    ),
                            })}
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
                            {...register("MA.mailing_address_street", {
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_street",
                                        `${e.target.value}`
                                    ),
                            })}
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
                            {...register("MA.mailing_address_district", {
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_district",
                                        `${e.target.value}`
                                    ),
                            })}
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
                            {...register("MA.mailing_address_municipal_city", {
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_municipal_city",
                                        `${e.target.value}`
                                    ),
                            })}
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
                            {...register("MA.mailing_address_province", {
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_province",
                                        `${e.target.value}`
                                    ),
                            })}
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
                                onChange: (e) =>
                                    setValue(
                                        "MA.mailing_address_zip_code",
                                        `${e.target.value}`
                                    ),
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
}
