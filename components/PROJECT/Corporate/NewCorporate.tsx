import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { RiArrowDownSFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";
import style from "../../../styles/Popup_Modal.module.scss";
import type { firstCorporateForm } from "../../../types/corporateList";
import type { secondCorporateForm } from "../../../types/corporateList";
import api from "../../../util/api";
import AppContext from "../../Context/AppContext";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import {
    TextFieldValidation,
    NumberBlockInvalidKey,
} from "../../Reusable/InputField";
import {
    ContactNumberFormat,
    TINNumberFormat,
} from "../../Reusable/NumberFormat";
import SelectDropdown from "../../Reusable/SelectDropdown";

export default function NewCorporate() {
    const [isNewActive, setNewActive] = useState([true, false]);
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Create Corporate</p>

                <Primary
                    key={1}
                    setNewActive={setNewActive}
                    isNewActive={isNewActive}
                    setProfileUrl={setProfileUrl}
                    isProfileUrl={isProfileUrl}
                />
                <Contact
                    key={2}
                    setNewActive={setNewActive}
                    isNewActive={isNewActive}
                    setProfileUrl={setProfileUrl}
                    isProfileUrl={isProfileUrl}
                />
            </section>
        </div>
    );
}

type Props = {
    setNewActive: Function;
    isNewActive: any;
    isProfileUrl: any;
    setProfileUrl: Function;
};
const Primary = ({
    setNewActive,
    isNewActive,
    isProfileUrl,
    setProfileUrl,
}: Props) => {
    const [isLogoStatus, setLogoStatus] = useState("Upload Logo");

    const {
        setCorpToggle,
        setCreateCorporate,
        createCorporate,
        corpReset,
        DefaultCorporate,
    } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<firstCorporateForm>();

    useEffect(() => {
        reset();
        setCreateCorporate({
            ...DefaultCorporate,
        });
        setProfileUrl("/Images/sampleProfile.png");
        setLogoStatus("Upload Logo");
    }, [corpReset]);

    const Submit = (data: any) => {
        setCreateCorporate({
            ...createCorporate,
            logo: data.logo[0],
        });
        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
    };

    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            setLogoStatus("Image must be 2mb only");
            return;
        } else {
            setLogoStatus("");
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (["image/jpeg", "image/png"].includes(selectedImage.type)) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    setProfileUrl(event.target.result);
                });
            } else {
                setLogoStatus("Invalid Image File");
            }
        } else {
            setLogoStatus("Nothing Happens");
        }
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${isNewActive[0] ? "" : "hidden"}`}
        >
            <form onSubmit={handleSubmit(Submit)}>
                <h1 className={style.modal_label_primary}>
                    Primary Informations
                </h1>
                <input
                    type="file"
                    id="image"
                    {...register("logo")}
                    onChange={DisplayImage}
                    className="appearance-none z-[-99] absolute bottom-full"
                />
                <ul className={style.ThreeRows}>
                    <li className={style.upload_image}>
                        <aside>
                            <aside>
                                <Image
                                    src={isProfileUrl}
                                    alt=""
                                    layout="fill"
                                />
                            </aside>
                            <label htmlFor="image">
                                <AiFillCamera />
                            </label>
                        </aside>
                        <label htmlFor="image" className={style.image_label}>
                            <p>{isLogoStatus}</p>
                        </label>
                    </li>

                    <li>
                        <label>*Corporate Name</label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Required",
                            })}
                            value={createCorporate.name}
                            onChange={(e) => {
                                if (!TextFieldValidation(e, 99999)) return;
                                setCreateCorporate({
                                    ...createCorporate,
                                    name: e.target.value,
                                });
                            }}
                            className="field"
                        />
                        {errors.name && (
                            <p className="text-[10px]">{errors.name.message}</p>
                        )}
                    </li>
                    <li>
                        <label>*TIN Number</label>
                        <TINNumberFormat
                            register={{
                                ...register("tin", {
                                    required: "Required",
                                    minLength: {
                                        value: 17,
                                        message: "Must be 14 number only",
                                    },
                                    maxLength: {
                                        value: 17,
                                        message: "Must be 14 number only",
                                    },
                                }),
                            }}
                            setValue={(value: string) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    tin: value,
                                });
                            }}
                            value={createCorporate.tin}
                        />

                        {errors.tin && (
                            <p className="text-[10px]">{errors.tin.message}</p>
                        )}
                    </li>
                </ul>

                <ul className={style.ThreeRows}>
                    <li>
                        <label>RDO NO.</label>
                        <input
                            className="field"
                            type="text"
                            {...register("rdo_no", {
                                minLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                                maxLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                            })}
                            value={createCorporate.rdo_no}
                            onChange={(e) => {
                                e.target.value.length <= 3 &&
                                    setCreateCorporate({
                                        ...createCorporate,
                                        rdo_no: e.target.value,
                                    });
                            }}
                        />
                        {errors.rdo_no && (
                            <p className="text-[10px]">
                                {errors.rdo_no.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*GST TYPE.</label>
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    gst_type: value,
                                });
                                setValue("gst_type", value);
                            }}
                            className=""
                            inputElement={
                                <input
                                    className="w-full field"
                                    autoComplete="off"
                                    value={createCorporate.gst_type}
                                    {...register("gst_type", {
                                        required: "Required",
                                    })}
                                    readOnly
                                />
                            }
                            listArray={["VAT", "NON-VAT"]}
                        />
                        {errors.gst_type && (
                            <p className="text-[10px]">
                                {errors.gst_type.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            className="field"
                            type="text"
                            {...register("sec_registration_no")}
                            onKeyDown={NumberBlockInvalidKey}
                            value={createCorporate.sec_registration_no}
                            onChange={(e) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    sec_registration_no: e.target.value,
                                });
                            }}
                        />
                        {errors.sec_registration_no && (
                            <p className="text-[10px]">
                                {errors.sec_registration_no.message}
                            </p>
                        )}
                    </li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={style.button_container}>
                    <aside
                        className="button_cancel cursor-pointer"
                        onClick={() => setCorpToggle(false)}
                    >
                        CANCEL
                    </aside>
                    <button className="buttonRed" type="submit">
                        NEXT
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

const Contact = ({ setNewActive, isNewActive, setProfileUrl }: Props) => {
    // true for save, false for save and new
    const { corpReset, setCorpReset } = useContext(AppContext);
    const [whatClickedButon, setWhatClickedButton] = useState(true);
    const [isSave, setSave] = useState(false);
    const {
        setCreateCorporate,
        createCorporate,
        setPrompt,
        DefaultCorporate,
        setCorpToggle,
    } = useContext(AppContext);

    const [ErrorContact, setErrorContact] = useState(false);
    const [ErrorAddress, setErrorAddress] = useState(false);
    const clietQuery = useQueryClient();
    const {
        register,
        handleSubmit,
        reset: ResetContactForm,
        formState: { errors },
        setValue,
    } = useForm<secondCorporateForm>({
        defaultValues: {
            email: createCorporate.email,
            contact_no: createCorporate.contact_no,
            alt_email: createCorporate.alt_email,
            alt_contact_no: createCorporate.alt_contact_no,
            address_unit_floor: createCorporate.address_unit_floor,
            address_building: createCorporate.address_building,
            address_street: createCorporate.address_street,
            address_district: createCorporate.address_district,
            address_municipal_city: createCorporate.address_municipal_city,
            address_province: createCorporate.address_province,
            address_zip_code: createCorporate.address_zip_code,
        },
    });

    useEffect(() => {
        ResetContactForm();
    }, [corpReset]);

    const onErrorHandler = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: MutateLoading, mutate } = useMutation(
        (data: FormData) => {
            return api.post("/project/corporate", data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: async () => {
                clietQuery.invalidateQueries("get-corporate-list");
                setSave(false);
                setCorpReset(!corpReset);
                if (whatClickedButon) {
                    await setCreateCorporate({
                        ...DefaultCorporate,
                    });
                    setPrompt((prev: any) => ({
                        ...prev,
                        type: "success",
                        message: "Successfully Registered",
                        toggle: true,
                    }));
                    setCorpToggle((prev: any) => (prev = false));
                } else {
                    await setCreateCorporate({
                        ...DefaultCorporate,
                    });
                    setPrompt((prev: any) => ({
                        ...prev,
                        type: "success",
                        message: "Successfully Registered",
                        toggle: true,
                    }));
                    setNewActive((item: any) => [
                        (item[0] = true),
                        (item[1] = false),
                    ]);
                }
            },
            onError: onErrorHandler,
        }
    );

    const Submit = async (data: any) => {
        if (data.email === data.alt_email) {
            setErrorAddress(true);
            return;
        }
        if (data.contact_no === data.alt_contact_no) {
            setErrorContact(true);
            return;
        }

        // keys name of rows, keyData is the value
        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(createCorporate);

        await keys.forEach((key) => {
            let value = createCorporate[key];
            if (key === "tin") {
                value = value.replaceAll("-", "");
            }
            if (key === "contact_no" || key === "alt_contact_no") {
                value = `0${value}`;
            }
            arrayData.push({
                key: key,
                keyData: value,
            });
        });

        arrayData.map(({ key, keyData }: any) => {
            if (keyData === undefined || keyData === null) {
                formData.append(key, "");
            } else {
                formData.append(key, keyData);
            }
        });
        mutate(formData);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${isNewActive[1] ? "" : "hidden"}`}
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <form onSubmit={handleSubmit(Submit)} autoComplete="off">
                <ul className={style.twoRows_container}>
                    <li className=" flex flex-col justify-start">
                        <label>CONTACT NO</label>
                        <aside className="mb-2  items-center flex flex-wrap">
                            <ContactNumberFormat
                                value={createCorporate.contact_no}
                                register={{
                                    ...register("contact_no", {
                                        required: "Required",
                                        minLength: {
                                            value: 10,
                                            message: "Must be 10 Digits",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Must be 10 Digits",
                                        },
                                        pattern: {
                                            value: /^(9)\d{9}$/,
                                            message: "Invalid Contact Number",
                                        },

                                        onChange: (e) => {
                                            if (e.target.value.length <= 10) {
                                                setValue(
                                                    "contact_no",
                                                    e.target.value
                                                );
                                                setCreateCorporate({
                                                    ...createCorporate,
                                                    contact_no: e.target.value,
                                                });
                                            }
                                        },
                                    }),
                                }}
                            />

                            <span className="ml-2">*Official</span>
                            {errors.contact_no && (
                                <p className="text-[10px] w-full">
                                    {errors.contact_no.message}
                                </p>
                            )}
                        </aside>

                        <aside className="">
                            <ContactNumberFormat
                                value={createCorporate.alt_contact_no}
                                register={{
                                    ...register("alt_contact_no", {
                                        minLength: {
                                            value: 10,
                                            message: "Must be 10 Digits",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Must be 10 Digits",
                                        },
                                        pattern: {
                                            value: /^(9)\d{9}$/,
                                            message: "Invalid Contact Number",
                                        },
                                        onChange: (e) => {
                                            if (e.target.value.length <= 10) {
                                                setValue(
                                                    "alt_contact_no",
                                                    e.target.value
                                                );
                                                setCreateCorporate({
                                                    ...createCorporate,
                                                    alt_contact_no:
                                                        e.target.value,
                                                });
                                            }
                                        },
                                    }),
                                }}
                            />
                            {errors.alt_contact_no && (
                                <p className="text-[10px]">
                                    {errors.alt_contact_no.message}
                                </p>
                            )}
                            {ErrorContact && (
                                <p className="text-[10px]">
                                    Contact number cannot be the same
                                </p>
                            )}
                        </aside>
                    </li>
                    <li>
                        <label>EMAIL ADDRESS</label>
                        <aside className="mb-2">
                            <input
                                className="field mr-2"
                                type="text"
                                {...register("email", {
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid Email",
                                    },
                                    onChange: (e) => {
                                        setValue("email", e.target.value);
                                        setCreateCorporate({
                                            ...createCorporate,
                                            email: e.target.value,
                                        });
                                    },
                                })}
                                value={createCorporate.email}
                                onChange={(e) => {
                                    if (e.target.value.length > 320) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        email: e.target.value,
                                    });
                                }}
                            />
                            <span>*Official</span>
                            {errors.email && (
                                <p className="text-[10px]">
                                    {errors.email.message}
                                </p>
                            )}
                        </aside>

                        <aside>
                            <input
                                className="field"
                                type="text"
                                {...register("alt_email", {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid Email",
                                    },
                                    onChange: (e) => {
                                        if (e.target.value.length > 320) return;
                                        setValue("alt_email", e.target.value);
                                        setCreateCorporate({
                                            ...createCorporate,
                                            alt_email: e.target.value,
                                        });
                                    },
                                })}
                                value={createCorporate.alt_email}
                            />
                            {errors.alt_email && (
                                <p className="text-[10px]">
                                    {errors.alt_email.message}
                                </p>
                            )}
                            {ErrorAddress && (
                                <p className="text-[10px]">
                                    Email cannot be the same
                                </p>
                            )}
                        </aside>
                    </li>
                </ul>
                <p className="text-[14px] font-bold mb-2">ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            className="field"
                            type="text"
                            {...register("address_unit_floor", {
                                required: "Required",
                                onChange: (e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_unit_floor: e.target.value,
                                    });
                                    setValue(
                                        "address_unit_floor",
                                        e.target.value
                                    );
                                },
                            })}
                            value={createCorporate.address_unit_floor}
                        />
                        {errors.address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.address_unit_floor.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*BUILDING</label>
                        <input
                            className="field"
                            type="text"
                            {...register("address_building", {
                                required: "Required",
                                onChange: (e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_building: e.target.value,
                                    });
                                    setValue(
                                        "address_building",
                                        e.target.value
                                    );
                                },
                            })}
                            value={createCorporate.address_building}
                        />
                        {errors.address_building && (
                            <p className="text-[10px]">
                                {errors.address_building.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*STREET</label>
                        <input
                            className="field"
                            type="text"
                            {...register("address_street", {
                                required: "Required",
                                onChange: (e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_street: e.target.value,
                                    });
                                    setValue("address_street", e.target.value);
                                },
                            })}
                            value={createCorporate.address_street}
                        />
                        {errors.address_street && (
                            <p className="text-[10px]">
                                {errors.address_street.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*DISTRICT</label>
                        <input
                            className="field"
                            type="text"
                            {...register("address_district", {
                                required: "Required",
                                onChange: (e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_district: e.target.value,
                                    });
                                    setValue(
                                        "address_district",
                                        e.target.value
                                    );
                                },
                            })}
                            value={createCorporate.address_district}
                        />
                        {errors.address_district && (
                            <p className="text-[10px]">
                                {errors.address_district.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*MUNICIPALITY</label>
                        <input
                            className="field"
                            type="text"
                            {...register("address_municipal_city", {
                                required: "Required",
                                onChange: (e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_municipal_city: e.target.value,
                                    });
                                    setValue(
                                        "address_municipal_city",
                                        e.target.value
                                    );
                                },
                            })}
                            value={createCorporate.address_municipal_city}
                        />
                        {errors.address_municipal_city && (
                            <p className="text-[10px]">
                                {errors.address_municipal_city.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*PROVINCE</label>
                        <input
                            className="field"
                            type="text"
                            {...register("address_province", {
                                required: "Required",
                                onChange: (e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_province: e.target.value,
                                    });
                                    setValue(
                                        "address_province",
                                        e.target.value
                                    );
                                },
                            })}
                            value={createCorporate.address_province}
                        />
                        {errors.address_province && (
                            <p className="text-[10px]">
                                {errors.address_province.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>*ZIP CODE</label>
                        <input
                            className="field"
                            type="number"
                            onKeyDown={NumberBlockInvalidKey}
                            {...register("address_zip_code", {
                                required: "Required",
                                minLength: {
                                    value: 4,
                                    message: "Must be 4 Numbers",
                                },
                                maxLength: {
                                    value: 4,
                                    message: "Must be 4 Numbers",
                                },
                                onChange: (e) => {
                                    if (e.target.value.length > 4) return;
                                    setCreateCorporate({
                                        ...createCorporate,
                                        address_zip_code: e.target.value,
                                    });
                                    setValue(
                                        "address_zip_code",
                                        e.target.value
                                    );
                                },
                            })}
                            value={createCorporate.address_zip_code}
                        />
                        {errors.address_zip_code && (
                            <p className="text-[10px]">
                                {errors.address_zip_code.message}
                            </p>
                        )}
                    </li>
                </ul>
                <div className={style.SaveButton}>
                    <aside
                        className={style.back}
                        onClick={() =>
                            setNewActive((item: any) => [
                                (item[0] = true),
                                (item[1] = false),
                            ])
                        }
                    >
                        BACK
                    </aside>

                    <div className={style.Save}>
                        <div>
                            <button
                                type="submit"
                                name="save"
                                onClick={() => setWhatClickedButton(true)}
                                className={style.save_button}
                            >
                                {MutateLoading ? (
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
                                            setWhatClickedButton(false)
                                        }
                                    >
                                        SAVE & NEW
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
