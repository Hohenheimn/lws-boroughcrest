import React, { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { RiArrowDownSFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import style from "../../../styles/Popup_Modal.module.scss";
import type {
    corporateColumns,
    firstCorporateForm,
    secondCorporateForm,
} from "../../../types/corporateList";
import api from "../../../util/api";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import AppContext from "../../Context/AppContext";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import {
    NumberBlockInvalidKey,
    TextFieldValidation,
} from "../../Reusable/InputField";
import {
    ContactNumberFormat,
    TINNumberFormat,
} from "../../Reusable/NumberFormat";
import SelectDropdown from "../../Reusable/SelectDropdown";

type ModifyCorporate = {
    setToggleModify: Function;
    CorporateData: corporateColumns;
    Logo: String;
    validataLogo: any;
};

export default function ModifyCorporate({
    setToggleModify,
    Logo,
    validataLogo,
}: ModifyCorporate) {
    const [isNewActive, setNewActive] = useState([true, false]);

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Modify Corporate</p>

                <PrimaryInformation
                    key={1}
                    setToggleModify={setToggleModify}
                    setNewActive={setNewActive}
                    Logo={Logo}
                    isNewActive={isNewActive}
                    validataLogo={validataLogo}
                />

                <Contact
                    key={2}
                    setToggleModify={setToggleModify}
                    setNewActive={setNewActive}
                    isNewActive={isNewActive}
                />
            </section>
        </div>
    );
}

type Props = {
    setToggleModify: Function;
    setNewActive: Function;
    isLogo?: string;
    Logo?: any;
    setLogo?: any;
    isNewActive: any;
    validataLogo?: any;
};

const PrimaryInformation = ({
    setToggleModify,
    setNewActive,
    Logo,
    isNewActive,
    validataLogo,
}: Props) => {
    const router = useRouter();

    const [isSelect, setSelect] = useState(false);
    const SelectField = (value: string) => {
        setModifyCorporate({
            ...modifyCorporate,
            gst_type: value,
        });
        setValue("gst_type", value);
        setSelect(false);
    };
    // true if may transaction
    const validateTransaction = true;
    // Default Image
    let LogoName;
    if (validataLogo) {
        LogoName = Logo.split("/")[4].split("_")[1];
    } else {
        LogoName = "N/A";
    }
    const [isLogo, setLogo] = useState(`${LogoName}`);
    const [isProfileUrl, setProfileUrl] = useState(`${Logo}`);
    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            setLogo("Image must be 2mb only");
            return;
        } else {
            setLogo("");
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (["image/jpeg", "image/png"].includes(selectedImage.type)) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    setProfileUrl(event.target.result);
                });
                const file = e.target.files;
                setLogo(file[0].name);
            } else {
                setLogo("Invalid Image File");
            }
        } else {
            setLogo("Please Select an Image");
        }
    };
    const { modifyCorporate, setModifyCorporate, setPrompt } =
        useContext(AppContext);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<firstCorporateForm>({
        defaultValues: {
            logo: modifyCorporate.logo,
            name: modifyCorporate.name,
            rdo_no: modifyCorporate.rdo_no,
            gst_type: modifyCorporate.gst_type,
            tin: modifyCorporate.tin,
            sec_registration_no: modifyCorporate.sec_registration_no,
        },
    });

    useEffect(() => {
        setValue("tin", modifyCorporate.tin);
    }, [modifyCorporate.tin]);

    const Next = (data: any) => {
        setModifyCorporate({
            ...modifyCorporate,
            logo: data.logo[0],
            name: data.name,
            rdo_no: data.rdo_no,
            gst_type: data.gst_type,
            tin: data.tin,
            sec_registration_no: data.sec_registration_no,
        });
        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
    };

    const {
        isLoading: DeleteLoading,
        mutate,
        isError: DeleteError,
    } = useMutation(
        (id: any) => {
            return api.delete(`/project/corporate/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                setPrompt((prev: any) => ({
                    ...prev,
                    type: "success",
                    message: "Corporate successfully Deleted!",
                    toggle: true,
                }));
                router.push("/project/corporate");
            },
            onError: (e) => {
                ErrorSubmit(e, setPrompt);
            },
        }
    );

    const DeleteHandler = () => {
        const id = router.query.id;
        mutate(id);
    };
    return (
        <motion.form
            onSubmit={handleSubmit(Next)}
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${isNewActive[0] ? "" : "hidden"}`}
        >
            <h1 className={style.modal_label_primary}>Primary Information</h1>
            <input
                type="file"
                id="image"
                {...register("logo")}
                onChange={DisplayImage}
                className="appearance-none absolute z-[-99] bottom-full"
            />
            <ul className={style.ThreeRows}>
                <li className={style.upload_image}>
                    <aside>
                        <aside>
                            <Image
                                src={`${isProfileUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>

                        <label htmlFor="image">
                            <AiFillCamera />
                        </label>
                    </aside>
                    <label htmlFor="image" className={style.image_label}>
                        <p>{isLogo}</p>
                    </label>
                </li>
                <li>
                    <label>ID</label>
                    <input
                        type="text"
                        value={`${modifyCorporate.id}`}
                        disabled={true}
                        className="field disabled"
                    />
                </li>
                <li>
                    <label>*Corporate Name</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Required",
                        })}
                        value={modifyCorporate.name}
                        onChange={(e) => {
                            if (!TextFieldValidation(e, 99999)) return;
                            setModifyCorporate({
                                ...modifyCorporate,
                                name: e.target.value,
                            });
                        }}
                        className="field"
                    />
                    {errors.name && (
                        <p className="text-[10px]">{errors.name.message}</p>
                    )}
                </li>
                {validateTransaction && (
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
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    tin: value,
                                });
                            }}
                            value={modifyCorporate.tin}
                        />

                        {errors.tin && (
                            <p className="text-[10px]">{errors.tin.message}</p>
                        )}
                    </li>
                )}
                <li>
                    <label>RDO NO.</label>
                    <input
                        className="field"
                        type="text"
                        placeholder="000"
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
                        value={modifyCorporate.rdo_no}
                        onChange={(e) => {
                            e.target.value.length <= 3 &&
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    rdo_no: e.target.value,
                                });
                        }}
                    />
                    {errors.rdo_no && (
                        <p className="text-[10px]">{errors.rdo_no.message}</p>
                    )}
                </li>
                <li>
                    <label>*GST TYPE.</label>
                    <SelectDropdown
                        selectHandler={(value: string) => {
                            setModifyCorporate({
                                ...modifyCorporate,
                                gst_type: value,
                            });
                            setValue("gst_type", value);
                        }}
                        className=""
                        inputElement={
                            <input
                                className="w-full field"
                                autoComplete="off"
                                value={modifyCorporate.gst_type}
                                {...register("gst_type", {
                                    required: "Required",
                                })}
                                readOnly
                            />
                        }
                        listArray={["VAT", "NON-VAT"]}
                    />

                    {errors.gst_type && (
                        <p className="text-[10px]">{errors.gst_type.message}</p>
                    )}

                    {errors.gst_type && <p>{errors.gst_type.message}</p>}
                </li>
                {validateTransaction && (
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            className="field"
                            type="text"
                            {...register("sec_registration_no")}
                            value={modifyCorporate.sec_registration_no}
                            onChange={(e) => {
                                setModifyCorporate({
                                    ...modifyCorporate,
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
                )}
            </ul>

            <div className={style.button_container}>
                <button
                    className="button_cancel"
                    onClick={() => setToggleModify(false)}
                >
                    CANCEL
                </button>

                {validateTransaction && (
                    <>
                        {!modifyCorporate.with_transaction && (
                            <>
                                {!DeleteLoading && (
                                    <aside
                                        className="buttonRed mr-5 cursor-pointer"
                                        onClick={DeleteHandler}
                                    >
                                        DELETE
                                    </aside>
                                )}

                                {DeleteLoading && (
                                    <div className="buttonRed mr-5">
                                        <div>
                                            <ScaleLoader
                                                color="#fff"
                                                height="10px"
                                                width="2px"
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                <button className="buttonRed" type="submit">
                    NEXT
                </button>
            </div>
        </motion.form>
    );
};

const Contact = ({ setNewActive, setToggleModify, isNewActive }: Props) => {
    const router = useRouter();
    const [isSave, setSave] = useState(false);
    const [ErrorContact, setErrorContact] = useState(false);
    const [ErrorAddress, setErrorAddress] = useState(false);
    const {
        modifyCorporate,
        setModifyCorporate,
        setPrompt,
        DefaultCorporate,
        togglePrompt,
        setCorpToggle,
    } = useContext(AppContext);
    // true for save, false for save and new
    const [whatClickedButon, setWhatClickedButton] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<secondCorporateForm>({
        defaultValues: {
            email: modifyCorporate.email,
            contact_no: modifyCorporate.contact_no,
            alt_email: modifyCorporate.alt_email,
            alt_contact_no: modifyCorporate.alt_contact_no,
            address_unit_floor: modifyCorporate.address_unit_floor,
            address_building: modifyCorporate.address_building,
            address_street: modifyCorporate.address_street,
            address_district: modifyCorporate.address_district,
            address_municipal_city: modifyCorporate.address_municipal_city,
            address_province: modifyCorporate.address_province,
            address_zip_code: modifyCorporate.address_zip_code,
        },
    });
    const queryClient = useQueryClient();
    const { isLoading: MutateLoading, mutate } = useMutation(
        (data: FormData) => {
            return api.post(`/project/corporate/${router.query.id}`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: async () => {
                if (whatClickedButon) {
                    queryClient.invalidateQueries([
                        "Corporate-detail",
                        router.query.id,
                    ]);
                    await setModifyCorporate({
                        id: 0,
                        ...DefaultCorporate,
                        _method: "PUT",
                    });

                    setPrompt((prev: any) => ({
                        ...prev,
                        type: "success",
                        message: "Corporate successfully updated!",
                        toggle: true,
                    }));

                    setToggleModify(false);
                } else {
                    await setModifyCorporate({
                        id: 0,
                        ...DefaultCorporate,
                        _method: "PUT",
                    });

                    setPrompt((prev: any) => ({
                        ...prev,
                        type: "success",
                        message: "Corporate successfully updated! Create new",
                        toggle: true,
                    }));
                    setCorpToggle((prev: any) => (prev = true));
                    router.push("/project/corporate");
                }
            },
            onError: (error: any) => {
                ErrorSubmit(error, setPrompt);
            },
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
        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(modifyCorporate);

        await keys.forEach((key) => {
            if (key === "logo") {
                if (modifyCorporate[key]) {
                    arrayData.push({
                        key: key,
                        keyData: modifyCorporate[key],
                    });
                }
            } else {
                if (
                    modifyCorporate[key] === null ||
                    modifyCorporate[key] === undefined
                ) {
                    arrayData.push({
                        key: key,
                        keyData: "",
                    });
                } else {
                    let value = modifyCorporate[key];
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
                }
            }
        });
        arrayData.map(({ key, keyData }: any) => {
            formData.append(key, keyData);
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
            <form onSubmit={handleSubmit(Submit)}>
                <h1 className={style.modal_label_primary}>
                    Contact Informations
                </h1>
                <ul className={style.twoRows_container}>
                    <li className="flex justify-start flex-col">
                        <label>CONTACT NO</label>
                        <aside className="mb-2  items-center flex flex-wrap">
                            <ContactNumberFormat
                                value={modifyCorporate.contact_no}
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
                                                setModifyCorporate({
                                                    ...modifyCorporate,
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
                                value={modifyCorporate.alt_contact_no}
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
                                                setModifyCorporate({
                                                    ...modifyCorporate,
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
                                        if (e.target.value.length > 320) return;
                                        setValue("email", e.target.value);
                                        setModifyCorporate({
                                            ...modifyCorporate,
                                            email: e.target.value,
                                        });
                                    },
                                })}
                                value={modifyCorporate.email}
                                onChange={(e) =>
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        email: e.target.value,
                                    })
                                }
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
                                        setModifyCorporate({
                                            ...modifyCorporate,
                                            alt_email: e.target.value,
                                        });
                                    },
                                })}
                                value={modifyCorporate.alt_email}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_unit_floor: e.target.value,
                                    });
                                    setValue(
                                        "address_unit_floor",
                                        e.target.value
                                    );
                                },
                            })}
                            value={modifyCorporate.address_unit_floor}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_building: e.target.value,
                                    });
                                    setValue(
                                        "address_building",
                                        e.target.value
                                    );
                                },
                            })}
                            value={modifyCorporate.address_building}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_street: e.target.value,
                                    });
                                    setValue("address_street", e.target.value);
                                },
                            })}
                            value={modifyCorporate.address_street}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_district: e.target.value,
                                    });
                                    setValue(
                                        "address_district",
                                        e.target.value
                                    );
                                },
                            })}
                            value={modifyCorporate.address_district}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_municipal_city: e.target.value,
                                    });
                                    setValue(
                                        "address_municipal_city",
                                        e.target.value
                                    );
                                },
                            })}
                            value={modifyCorporate.address_municipal_city}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_province: e.target.value,
                                    });
                                    setValue(
                                        "address_province",
                                        e.target.value
                                    );
                                },
                            })}
                            value={setModifyCorporate.address_province}
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
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        address_zip_code: e.target.value,
                                    });
                                    setValue(
                                        "address_zip_code",
                                        e.target.value
                                    );
                                },
                            })}
                            value={modifyCorporate.address_zip_code}
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
                        Back
                    </aside>
                    <div className={style.Save}>
                        <div className="cursor-pointer">
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
