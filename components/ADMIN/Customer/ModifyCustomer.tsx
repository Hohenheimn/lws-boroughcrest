import React, { useEffect, useState, useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import AppContext from "../../Context/AppContext";
import { useForm } from "react-hook-form";
import type { customer } from "../../../types/customerList";
import { PutCustomer, SaveDraftUpdate } from "../../ReactQuery/CustomerMethod";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import { useQueryClient } from "react-query";
import Calendar from "../../Reusable/Calendar";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DynamicPopOver from "../../Reusable/DynamicPopOver";
import SelectDropdown from "../../Reusable/SelectDropdown";

type ModifyCustomer = {
    setToggleModify: Function;
    isDraft: any;
};

export default function ModifyCustomer({
    setToggleModify,
    isDraft,
}: ModifyCustomer) {
    const [isActiveForm, setActiveForm] = useState([true, false, false]);
    const { isModifyCustomer } = useContext(AppContext);

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Modify Customer</p>

                <Primary
                    setToggleModify={setToggleModify}
                    setActiveForm={setActiveForm}
                    isActiveForm={isActiveForm}
                />

                <Contact
                    setToggleModify={setToggleModify}
                    setActiveForm={setActiveForm}
                    isActiveForm={isActiveForm}
                    isDraft={isDraft}
                />
            </section>
        </div>
    );
}
type Props = {
    setToggleModify: Function;
    setActiveForm: Function;
    isActiveForm: any;
    isDraft?: any;
};
const Primary = ({ setToggleModify, setActiveForm, isActiveForm }: Props) => {
    const { isModifyCustomer, ImgUrl, setModifyCustomer, CusError } =
        useContext(AppContext);

    const [isSelect, setSelect] = useState(false);
    const SelectField = (value: string) => {
        setModifyCustomer({
            ...isModifyCustomer,
            class: value,
        });
        setValue("class", value);
        setSelect(false);
    };

    // Birth Date Field with custom Calendar
    const [isDate, setDate] = useState({
        value: isModifyCustomer.individual_birth_date,
        toggle: false,
    });
    useEffect(() => {
        setModifyCustomer({
            ...isModifyCustomer,
            individual_birth_date: isDate.value,
        });
    }, [isDate.value]);
    // end
    const [isType, setType] = useState(isModifyCustomer.type);
    const [isStatus, setStatus] = useState(isModifyCustomer.status);

    const [isSignature, setSignature] = useState(false);
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const [isValidIDUrl, setValidIDUrl] = useState("/Images/id-sample.png");
    const [imgError, setImgError] = useState({
        img1: "",
        img2: "",
        img3: "",
    });

    useEffect(() => {
        if (isModifyCustomer.image_signature !== null) {
            setSignature(true);
        }
        if (isModifyCustomer.image_photo !== null) {
            setProfileUrl(ImgUrl + isModifyCustomer.image_photo);
        }
        if (isModifyCustomer.image_valid_id !== null) {
            setValidIDUrl(ImgUrl + isModifyCustomer.image_valid_id);
        }
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
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
            class: data.class,
        });
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };

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

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${isActiveForm[0] ? "" : "hidden"}`}
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
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setType(value);
                            }}
                            className=""
                            inputElement={
                                <input
                                    className="w-full field"
                                    value={isType}
                                    readOnly
                                    autoComplete="off"
                                />
                            }
                            listArray={["Individual", "Company"]}
                        />
                    </aside>
                    <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                        <span className="mr-2 font-bold">STATUS</span>

                        <div
                            className={`statusCircle cursor-pointer ${isStatus}`}
                            onClick={() => {
                                if (isStatus === "Active") {
                                    setStatus("Inactive");
                                } else {
                                    setStatus("Active");
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
                                    src={isProfileUrl}
                                    alt="Sample Profile"
                                    layout="fill"
                                />
                            </aside>

                            <input
                                type="file"
                                {...register("image_photo")}
                                id="image"
                                className="absolute z-[-99] top-[-500px]"
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
                        {imgError.img1 !== "" && (
                            <p className="text-[12px]">{imgError.img1}</p>
                        )}
                    </li>
                    <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <input
                            type="file"
                            id="validid"
                            className="absolute z-[-99] top-[-500px]"
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
                                    src={isValidIDUrl}
                                    alt="sample id"
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
                            className="absolute z-[-99] top-[-500px]"
                            {...register("image_signature")}
                            onChange={(e) => {
                                e.target.files
                                    ? setSignature(true)
                                    : setSignature(false);
                            }}
                        />
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            ID
                        </label>

                        <input
                            type="text"
                            className="field disabled"
                            value={isModifyCustomer.id}
                        />
                    </li>
                    <li>
                        <label>*CLASS</label>
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setModifyCustomer({
                                    ...isModifyCustomer,
                                    class: value,
                                });
                                setValue("class", value);
                            }}
                            className=""
                            inputElement={
                                <input
                                    className="w-full field"
                                    {...register("class")}
                                    value={isModifyCustomer.class}
                                    readOnly
                                    autoComplete="off"
                                />
                            }
                            listArray={["Developer", "Owner", "Tenant"]}
                        />

                        {errors.class && (
                            <p className="text-[10px]">
                                {errors.class.message}
                            </p>
                        )}
                        {CusError?.class !== "" && (
                            <p className="text-[10px]">{CusError?.class}</p>
                        )}
                    </li>
                    <li>
                        <label>
                            *
                            {(isType === "Company" || isType === "company") &&
                                "COMPANY"}{" "}
                            NAME
                        </label>
                        <input
                            type="text"
                            className="field"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-[10px]">{errors.name.message}</p>
                        )}
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
                                />
                                {errors.individual_co_owner && (
                                    <p className="text-[10px]">
                                        {errors.individual_co_owner.message}
                                    </p>
                                )}
                            </li>

                            <li>
                                <label>*CITIZENSHIP</label>
                                <input
                                    type="text"
                                    className="field"
                                    {...register("individual_citizenship")}
                                />
                                {errors.individual_citizenship && (
                                    <p className="text-[10px]">
                                        {errors.individual_citizenship.message}
                                    </p>
                                )}
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
                                        onChange={() => {}}
                                        placeholder="dd/mm/yyyy"
                                        onClick={() =>
                                            setDate({ ...isDate, toggle: true })
                                        }
                                        className="field"
                                    />
                                    {isDate.toggle && (
                                        <Calendar
                                            value={isDate}
                                            setValue={setDate}
                                        />
                                    )}
                                </div>
                                {errors.individual_birth_date && (
                                    <p className="text-[10px]">
                                        {errors.individual_birth_date.message}
                                    </p>
                                )}
                            </li>
                        </>
                    )}
                    <li>
                        <label>*TIN Number</label>
                        <input
                            type="number"
                            {...register("tin", {
                                minLength: {
                                    value: 9,
                                    message: "Must be 9 numbers only",
                                },
                                maxLength: {
                                    value: 9,
                                    message: "Must be 9 numbers only",
                                },
                            })}
                            className="field"
                            value={isModifyCustomer.tin}
                            onChange={(e) => {
                                e.target.value.length <= 9 &&
                                    setModifyCustomer({
                                        ...isModifyCustomer,
                                        tin: e.target.value,
                                    });
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
                        <label>*Branch Code</label>
                        <input
                            type="number"
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
                            className="field"
                            value={isModifyCustomer.branch_code}
                            onChange={(e) => {
                                e.target.value.length <= 5 &&
                                    setModifyCustomer({
                                        ...isModifyCustomer,
                                        branch_code: e.target.value,
                                    });
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

const Contact = ({
    setActiveForm,
    setToggleModify,
    isActiveForm,
    isDraft,
}: Props) => {
    const {
        isModifyCustomer,
        setModifyCustomer,
        setPrompt,
        setCusToggle,
        setCusError,
        CusError,
    } = useContext(AppContext);
    const [isSameEmail, setSameEmail] = useState(false);
    const [isSameAddress, setSameAddress] = useState(false);
    const router = useRouter();
    const [whatClickedButon, setWhatClickedButton] = useState("");
    const [isSave, setSave] = useState(false);
    const queryClient = useQueryClient();
    const [isError, setError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<customer>({
        defaultValues: {
            preferred_email: isModifyCustomer.preferred_email,
            MA: {
                mailing_address_unit_floor:
                    isModifyCustomer.mailing_address_unit_floor,
                mailing_address_building:
                    isModifyCustomer.mailing_address_building,
                mailing_address_street: isModifyCustomer.mailing_address_street,
                mailing_address_district:
                    isModifyCustomer.mailing_address_district,
                mailing_address_municipal_city:
                    isModifyCustomer.mailing_address_municipal_city,
                mailing_address_province:
                    isModifyCustomer.mailing_address_province,
                mailing_address_zip_code:
                    isModifyCustomer.mailing_address_zip_code,
            },
        },
    });

    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
        ]);
    };
    const onSuccess = () => {
        setPrompt({
            message: `Customer successfully ${
                whatClickedButon === "save" || whatClickedButon === "new"
                    ? "updated"
                    : "saved as draft"
            }!`,
            type: `${
                whatClickedButon === "save" || whatClickedButon === "new"
                    ? "success"
                    : "draft"
            }`,
            toggle: true,
        });
        setError("");
        setSave(false);
        queryClient.invalidateQueries(["get-customer-detail", router.query.id]);
        if (whatClickedButon === "save" || whatClickedButon === "draft") {
            setToggleModify(false);
        }
        if (whatClickedButon === "new") {
            setCusToggle(true);
            setToggleModify(false);
            router.push("/admin/customer");
        }
    };

    const onError = (e: any) => {
        const ErrorField = e.response.data;
        let message: any;
        if (ErrorField > 0 || ErrorField !== null || ErrorField !== undefined) {
            setCusError({ ...ErrorField });
            message = "Please check all the fields!";
        } else {
            message = "Something is wrong!";
        }
        setPrompt((prev: any) => ({
            ...prev,
            message: message,
            type: "error",
            toggle: true,
        }));
    };

    const { isLoading, mutate } = PutCustomer(
        onSuccess,
        onError,
        router.query.id
    );

    const NextFormValidation = async (data: any) => {
        let Payload = {
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
            mailing_address_unit_floor: data.MA.mailing_address_unit_floor,
            mailing_address_building: data.MA.mailing_address_building,
            mailing_address_street: data.MA.mailing_address_street,
            mailing_address_district: data.MA.mailing_address_district,
            mailing_address_municipal_city:
                data.MA.mailing_address_municipal_city,
            mailing_address_province: data.MA.mailing_address_province,
            mailing_address_zip_code: data.MA.mailing_address_zip_code,
        };

        delete Payload["updated_at"];
        delete Payload["created_at"];
        delete Payload["portal_id"];
        delete Payload["assigned_customer_id"];
        delete Payload["deleted_at"];
        delete Payload["id"];
        delete Payload["audits"];

        if (Payload.type === "Company" || Payload.type === "company") {
            Payload = {
                ...Payload,
                individual_birth_date: "",
                individual_citizenship: "",
                individual_co_owner: "",
            };
        }
        if (Payload.type === "individual" || Payload.type === "Individual") {
            Payload = { ...Payload, company_contact_person: "" };
        }

        // Draft button clicked, change status to draft
        if (whatClickedButon === "draft") {
            Payload = {
                ...Payload,
                status: "draft",
            };
        } else {
            Payload = {
                ...Payload,
                status: isModifyCustomer.status,
            };
        }

        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(Payload);

        await keys.forEach((key) => {
            if (
                key === "image_photo" ||
                key === "image_signature" ||
                key === "image_valid_id"
            ) {
                if (Payload[key]) {
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
            formData.append(key, keyData);
        });

        mutate(formData);
    };
    const sameEmail = () => {
        setSameEmail(!isSameEmail);

        if (!isSameEmail) {
            setValue("preferred_email", isModifyCustomer.registered_email, {
                shouldValidate: true,
            });
        } else {
            setValue("preferred_email", isModifyCustomer.mailing_email, {
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
                        isModifyCustomer.registered_address_unit_floor,
                    mailing_address_building:
                        isModifyCustomer.registered_address_building,
                    mailing_address_street:
                        isModifyCustomer.registered_address_street,
                    mailing_address_district:
                        isModifyCustomer.registered_address_district,
                    mailing_address_municipal_city:
                        isModifyCustomer.registered_address_municipal_city,
                    mailing_address_province:
                        isModifyCustomer.registered_address_province,
                    mailing_address_zip_code:
                        isModifyCustomer.registered_address_zip_code,
                },
                { shouldValidate: true }
            );
        } else {
            setValue(
                "MA",
                {
                    mailing_address_unit_floor:
                        isModifyCustomer.mailing_address_unit_floor,
                    mailing_address_building:
                        isModifyCustomer.mailing_address_building,
                    mailing_address_street:
                        isModifyCustomer.mailing_address_street,
                    mailing_address_district:
                        isModifyCustomer.mailing_address_district,
                    mailing_address_municipal_city:
                        isModifyCustomer.mailing_address_municipal_city,
                    mailing_address_province:
                        isModifyCustomer.mailing_address_province,
                    mailing_address_zip_code:
                        isModifyCustomer.mailing_address_zip_code,
                },
                { shouldValidate: true }
            );
        }
    };
    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${isActiveForm[1] ? "" : "hidden"}`}
        >
            <form onSubmit={handleSubmit(NextFormValidation)}>
                <h1 className={style.modal_label_primary}>
                    Contact Informations
                </h1>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*MOBILE</label>
                        <input
                            type="text"
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
                            value={isModifyCustomer.contact_no}
                            onChange={(e) =>
                                e.target.value.length <= 11 &&
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
                        {CusError?.contact_no !== "" && (
                            <p className="text-[10px]">
                                {CusError?.contact_no}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*REGISTERED-EMAIL</label>
                        <input
                            className="field"
                            type="email"
                            {...register("registered_email")}
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
                        {CusError?.registered_email !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_email}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PREFERED EMAIL</label>
                        <input
                            type="email"
                            {...register("preferred_email")}
                            className="field"
                        />
                        {errors.preferred_email && (
                            <p className="text-[10px]">
                                {errors.preferred_email.message}
                            </p>
                        )}
                        {CusError?.preferred_email !== "" && (
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
                    {isModifyCustomer.type === "company" && (
                        <li>
                            <label>*CONTACT PERSON</label>
                            <input
                                type="text"
                                className="field"
                                {...register("company_contact_person")}
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
                            {CusError?.company_contact_person !== "" && (
                                <p className="text-[10px]">
                                    {CusError?.company_contact_person}
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
                            className="field"
                            type="text"
                            {...register("registered_address_unit_floor")}
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
                        {CusError?.registered_address_unit_floor !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_unit_floor}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*BUILDING</label>
                        <input
                            type="text"
                            className="field"
                            {...register("registered_address_building")}
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
                        {CusError?.registered_address_building !== "" && (
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
                            {...register("registered_address_street")}
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
                        {CusError?.registered_address_street !== "" && (
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
                            {...register("registered_address_district")}
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
                        {CusError?.registered_address_district !== "" && (
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
                            {...register("registered_address_municipal_city")}
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
                        {CusError?.registered_address_municipal_city !== "" && (
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
                            {...register("registered_address_province")}
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
                        {CusError?.registered_address_province !== "" && (
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
                        {CusError?.registered_address_zip_code !== "" && (
                            <p className="text-[10px]">
                                {CusError?.registered_address_zip_code}
                            </p>
                        )}
                    </li>
                </ul>

                <p className="text-[14px] font-bold mb-2">*MAILING ADDRESS</p>
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
                        <label>*UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            className="field"
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
                        <label>*BUILDING</label>
                        <input
                            className="field"
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
                        <label>*STREET</label>
                        <input
                            className="field"
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
                        <label>*DISTRICT</label>
                        <input
                            className="field"
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
                        <label>*MUNICIPALITY CITY</label>
                        <input
                            className="field"
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
                        <label>*PROVINCE</label>
                        <input
                            className="field"
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
                        <label>*ZIP CODE</label>
                        <input
                            className="field"
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

                {isError !== "" && <p>{isError}</p>}

                <div className={style.SaveButton}>
                    <aside className={style.back} onClick={Back}>
                        BACK
                    </aside>

                    <div className={style.Save}>
                        <div>
                            <button
                                type="submit"
                                name="save"
                                onClick={() => setWhatClickedButton("save")}
                                className={style.save_button}
                            >
                                {isLoading ? (
                                    <ScaleLoader
                                        color="#fff"
                                        height="10px"
                                        width="2px"
                                    />
                                ) : (
                                    "Save"
                                )}
                            </button>
                            <aside className={style.Arrow}>
                                <RiArrowDownSFill
                                    onClick={() => setSave(!isSave)}
                                />
                            </aside>
                        </div>
                        {isSave && (
                            <ul>
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
                                        className={
                                            isDraft ? style.disabled : ""
                                        }
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
                </div>
            </form>
        </motion.div>
    );
};
