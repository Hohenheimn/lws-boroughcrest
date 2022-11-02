import React, { useRef, useEffect, useState, useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import AppContext from "../../Context/AppContext";
import { useForm } from "react-hook-form";
import type { customer } from "../../../types/customerList";
import { PutCustomer, SaveDraftUpdate } from "../../ReactQuery/CustomerMethod";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import { useQueryClient } from "react-query";

type ModifyCustomer = {
    setToggleModify: Function;
};

export default function ModifyCustomer({ setToggleModify }: ModifyCustomer) {
    const [isActiveForm, setActiveForm] = useState([true, false, false]);

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Modify Customer</p>
                <AnimatePresence mode="wait">
                    {isActiveForm[0] && (
                        <Primary
                            key={1}
                            setToggleModify={setToggleModify}
                            setActiveForm={setActiveForm}
                        />
                    )}
                    {isActiveForm[1] && (
                        <Contact
                            key={2}
                            setToggleModify={setToggleModify}
                            setActiveForm={setActiveForm}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
type Props = {
    setToggleModify: Function;
    setActiveForm: Function;
};
const Primary = ({ setToggleModify, setActiveForm }: Props) => {
    const [isProfileUrl, setProfileUrl] = useState("");
    const [isValidIDUrl, setValidIDUrl] = useState("");
    const { isModifyCustomer, ImgUrl, setModifyCustomer } =
        useContext(AppContext);
    const [isType, setType] = useState(isModifyCustomer.type);
    const [isStatus, setStatus] = useState(isModifyCustomer.status);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<customer>({
        defaultValues: {
            name: isModifyCustomer.name,
            individual_co_owner: isModifyCustomer.individual_co_owner,
            individual_citizenship: isModifyCustomer.individual_citizenship,
            individual_birth_date: isModifyCustomer.individual_birth_date,
            tin: isModifyCustomer.tin,
            branch_code: isModifyCustomer.branch_code,
        },
    });
    const NextFormValidation = (data: any) => {
        setModifyCustomer({
            ...isModifyCustomer,
            name: data.name,
            individual_co_owner: data.individual_co_owner,
            individual_citizenship: data.individual_citizenship,
            individual_birth_date: data.individual_birth_date,
            tin: data.tin,
            branch_code: data.branch_code,
            image_photo: data.image_photo[0],
            image_signature: data.image_signature[0],
            image_valid_id: data.image_valid_id[0],
            status: isStatus,
        });
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

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

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={handleSubmit(NextFormValidation)}>
                <h1 className=" w-full text-[24px] mb-3">
                    Primary Information
                </h1>
                <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                    <aside className=" w-4/12 480px:w-2/4">
                        <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                            TYPE
                        </p>
                        <select
                            name=""
                            defaultValue="default"
                            id=""
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="default" disabled>
                                {isType}
                            </option>
                            <option
                                value="individual"
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            >
                                Individual
                            </option>
                            <option
                                value="company"
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            >
                                Company
                            </option>
                        </select>
                    </aside>
                    <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                        <span className="mr-2 font-bold">STATUS</span>

                        <div
                            className={`h-5 w-5 rounded-full border-4 border-[#${
                                isStatus === 1 ? "19d142" : "8f384d"
                            }] cursor-pointer`}
                            style={{
                                boxShadow: `0 0 15px 0 #${
                                    isStatus === 1 ? "19d142" : "8f384d"
                                }`,
                            }}
                            onClick={() => {
                                if (isStatus === 1) {
                                    setStatus(0);
                                } else {
                                    setStatus(1);
                                }
                            }}
                        ></div>
                    </aside>
                </div>
                <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                    <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <aside className="w-20 h-20 relative flex mr-4">
                            <aside className=" bg-white h-full w-full text-[12px] rounded-full object-cover shadow-lg relative">
                                <Image
                                    src={
                                        isProfileUrl
                                            ? isProfileUrl
                                            : ImgUrl +
                                              isModifyCustomer.image_photo
                                    }
                                    alt="Sample Profile"
                                    layout="fill"
                                />
                            </aside>

                            <input
                                type="file"
                                {...register("image_photo")}
                                id="image"
                                className="absolute z-[-99] top-[-100px]"
                                data-type="profile"
                                onChange={DisplayImage}
                            />
                            <label
                                htmlFor="image"
                                className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                            >
                                <AiFillCamera />
                            </label>
                        </aside>
                    </li>
                    <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <input
                            type="file"
                            id="validid"
                            className="absolute z-[-99]  top-[-100px]"
                            data-type="validID"
                            {...register("image_valid_id")}
                            onChange={DisplayImage}
                        />
                        <label
                            htmlFor="validid"
                            className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                        >
                            <aside className=" w-24 h-16 mr-2 relative">
                                <Image
                                    src={
                                        isValidIDUrl
                                            ? isProfileUrl
                                            : ImgUrl +
                                              isModifyCustomer.image_valid_id
                                    }
                                    alt="sample id"
                                    layout="fill"
                                />
                            </aside>
                            UPLOAD VALID ID
                        </label>
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                        <label
                            className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                            htmlFor="file"
                        >
                            Upload Signature
                        </label>
                        <input
                            id="file"
                            type="file"
                            className="absolute z-[-99] top-[-100px]"
                            {...register("image_signature")}
                        />
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            ID
                        </label>

                        <p className="w-full bg-ThemeRed50 rounded-md text-black px-2 py-[2px] outline-none 480px:w-full">
                            {isModifyCustomer.id}
                        </p>
                    </li>
                    <li>
                        <label>CLASS</label>
                        <select
                            id=""
                            defaultValue={isModifyCustomer.class}
                            {...register("class", { required: "Required" })}
                        >
                            <option value={isModifyCustomer.class} disabled>
                                {isModifyCustomer.class}
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
                        <label>
                            {(isType === "Company" || isType === "company") &&
                                "COMPANY"}{" "}
                            NAME
                        </label>
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
                    <aside
                        className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                        onClick={() => setToggleModify(false)}
                    >
                        CANCEL
                    </aside>
                    <button
                        type="submit"
                        className=" text-white cursor-pointer h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5"
                    >
                        NEXT
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

const Contact = ({ setActiveForm, setToggleModify }: Props) => {
    const { isModifyCustomer, setModifyCustomer } = useContext(AppContext);
    const [isSameEmail, setSameEmail] = useState(false);
    const [isSameAddress, setSameAddress] = useState(false);
    const router = useRouter();
    const [whatClickedButon, setWhatClickedButton] = useState("");
    const [isSave, setSave] = useState(false);
    const queryClient = useQueryClient();
    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
        ]);
    };
    const onSuccess = () => {
        if (whatClickedButon === "save") {
            queryClient.invalidateQueries([
                "get-customer-detail",
                router.query.id,
            ]);
            setToggleModify(false);
        }
        if (whatClickedButon === "new") {
            router.push("/admin/cusomter?new");
        }
    };

    const { isLoading, isError, mutate } = PutCustomer(
        onSuccess,
        router.query.id
    );
    const {
        isLoading: DraftLoading,
        isError: DraftError,
        mutate: DraftMutate,
    } = SaveDraftUpdate(onSuccess, router.query.id);

    const NextFormValidation = async (data: any) => {
        setModifyCustomer({
            ...isModifyCustomer,
            contact_no: data.contact_no,
            registered_email: data.registered_email,
            preferred_email: data.preferred_email,
            registered_address_unit_floor: data.registered_address_unit_floor,
            registered_address_building: data.registered_address_building,
            registered_address_street: data.registered_address_street,
            registered_address_district: data.registered_address_district,
            registered_address_municipal_city:
                data.registered_address_municipal_city,
            registered_address_province: data.registered_address_province,
            registered_address_zip_code: data.registered_address_zip_code,
            mailing_address_unit_floor: data.mailing_address_unit_floor,
            mailing_address_building: data.mailing_address_building,
            mailing_address_street: data.mailing_address_street,
            mailing_address_district: data.mailing_address_district,
            mailing_address_municipal_city: data.mailing_address_municipal_city,
            mailing_address_province: data.mailing_address_province,
            mailing_address_zip_code: data.mailing_address_zip_code,
        });
        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(isModifyCustomer);

        await keys.forEach((key) => {
            if (
                isModifyCustomer[key] === null ||
                isModifyCustomer[key] === undefined ||
                isModifyCustomer[key] === ""
            ) {
                return;
            } else {
                arrayData.push({
                    key: key,
                    keyData: isModifyCustomer[key],
                });
            }
        });
        arrayData.map(({ key, keyData }: any) => {
            formData.append(key, keyData);
        });
        console.log(arrayData);
        if (whatClickedButon === "save" || whatClickedButon === "new") {
            mutate(formData);
        }
        if (whatClickedButon === "draft") {
            console.log(arrayData);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<customer>();

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={handleSubmit(NextFormValidation)}>
                <h1 className={style.modal_label_primary}>
                    Contact Informations
                </h1>
                <p className="text-[14px] font-bold mb-2">ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>MOBILE</label>
                        <input
                            type="text"
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
                            value={isModifyCustomer.contact_no}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>REGISTERED-EMAIL</label>
                        <input
                            type="email"
                            {...register("registered_email", {
                                required: "Required",
                            })}
                            value={isModifyCustomer.registered_email}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>PREFERED EMAIL</label>
                        <input
                            type="email"
                            {...register("preferred_email", {
                                required: "Required",
                            })}
                            // isNewCustomer.registered_email
                            value={
                                isSameEmail === true
                                    ? isModifyCustomer.registered_email
                                    : isModifyCustomer.preferred_email
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    preferred_email: e.target.value,
                                })
                            }
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
                                onChange={() => setSameEmail(!isSameEmail)}
                            />
                            <label htmlFor="sameEmail">
                                SAME AS REGISTER EMAIL
                            </label>
                        </aside>
                    </li>
                    {isModifyCustomer.type === "company" && (
                        <li>
                            <label>CONTACT PERSON</label>
                            <input
                                type="text"
                                {...register("company_contact_person", {
                                    required: "Required",
                                })}
                                // isNewCustomer.registered_email
                                value={isModifyCustomer.company_contact_person}
                                onChange={(e) =>
                                    setModifyCustomer({
                                        ...isModifyCustomer,
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
                        <label>UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="text"
                            {...register("registered_address_unit_floor", {
                                required: "Required",
                            })}
                            value={
                                isModifyCustomer.registered_address_unit_floor
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>BUILDING</label>
                        <input
                            type="text"
                            {...register("registered_address_building", {
                                required: "Required",
                            })}
                            value={isModifyCustomer.registered_address_building}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>STREET</label>
                        <input
                            type="text"
                            {...register("registered_address_street", {
                                required: "Required",
                            })}
                            value={isModifyCustomer.registered_address_street}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>DISTRICT</label>
                        <input
                            type="text"
                            {...register("registered_address_district", {
                                required: "Required",
                            })}
                            value={isModifyCustomer.registered_address_district}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>MUNICIPALITY CITY</label>
                        <input
                            type="text"
                            {...register("registered_address_municipal_city", {
                                required: "Required",
                            })}
                            value={
                                isModifyCustomer.registered_address_municipal_city
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>PROVINCE</label>
                        <input
                            type="text"
                            {...register("registered_address_province", {
                                required: "Required",
                            })}
                            value={isModifyCustomer.registered_address_province}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        <label>ZIP CODE</label>
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
                            value={isModifyCustomer.registered_address_zip_code}
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
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
                        onChange={() => setSameAddress(!isSameAddress)}
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
                            {...register("mailing_address_unit_floor", {
                                required: "Required",
                            })}
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_unit_floor
                                    : isModifyCustomer.mailing_address_unit_floor
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_unit_floor: e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.mailing_address_unit_floor.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>BUILDING</label>
                        <input
                            type="text"
                            {...register("mailing_address_building", {
                                required: "Required",
                            })}
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_building
                                    : isModifyCustomer.mailing_address_building
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_building: e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_building && (
                            <p className="text-[10px]">
                                {errors.mailing_address_building.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>STREET</label>
                        <input
                            type="text"
                            {...register("mailing_address_street", {
                                required: "Required",
                            })}
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_street
                                    : isModifyCustomer.mailing_address_street
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_street: e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_street && (
                            <p className="text-[10px]">
                                {errors.mailing_address_street.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>DISTRICT</label>
                        <input
                            type="text"
                            {...register("mailing_address_district", {
                                required: "Required",
                            })}
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_district
                                    : isModifyCustomer.mailing_address_district
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_district: e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_district && (
                            <p className="text-[10px]">
                                {errors.mailing_address_district.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>MUNICIPALITY CITY</label>
                        <input
                            type="text"
                            {...register("mailing_address_municipal_city", {
                                required: "Required",
                            })}
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_municipal_city
                                    : isModifyCustomer.mailing_address_municipal_city
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_municipal_city:
                                        e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_municipal_city && (
                            <p className="text-[10px]">
                                {errors.mailing_address_municipal_city.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>PROVINCE</label>
                        <input
                            type="text"
                            {...register("mailing_address_province", {
                                required: "Required",
                            })}
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_province
                                    : isModifyCustomer.mailing_address_province
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_province: e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_province && (
                            <p className="text-[10px]">
                                {errors.mailing_address_province.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>ZIP CODE</label>
                        <input
                            type="text"
                            {...register("mailing_address_zip_code", {
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
                            value={
                                isSameAddress
                                    ? isModifyCustomer.registered_address_zip_code
                                    : isModifyCustomer.mailing_address_zip_code
                            }
                            onChange={(e) =>
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    mailing_address_zip_code: e.target.value,
                                })
                            }
                        />
                        {errors.mailing_address_zip_code && (
                            <p className="text-[10px]">
                                {errors.mailing_address_zip_code.message}
                            </p>
                        )}
                    </li>
                </ul>

                <div className={style.SaveButton}>
                    <button
                        className=" text-ThemeRed font-semibold text-[14px] mr-5"
                        onClick={Back}
                    >
                        BACK
                    </button>
                    {(isLoading || DraftLoading) && (
                        <div className={style.Save}>
                            <div>
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            </div>
                        </div>
                    )}
                    {!isLoading && !DraftLoading && (
                        <div className={style.Save}>
                            <div onClick={() => setSave(!isSave)}>
                                SAVE{" "}
                                <RiArrowDownSFill className=" ml-1 text-[24px]" />
                            </div>
                            {isSave && (
                                <ul>
                                    <li>
                                        <button
                                            type="submit"
                                            name="save"
                                            onClick={() =>
                                                setWhatClickedButton("save")
                                            }
                                        >
                                            SAVE
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            type="submit"
                                            name="save-new"
                                            onClick={() =>
                                                setWhatClickedButton("new")
                                            }
                                        >
                                            SAVE & NEW
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="submit"
                                            name="save-draft"
                                            onClick={() =>
                                                setWhatClickedButton("draft")
                                            }
                                        >
                                            SAVE AS DRAFT
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </motion.div>
    );
};
