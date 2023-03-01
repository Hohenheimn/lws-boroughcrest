import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { getCookie } from "cookies-next";
import { ScaleLoader } from "react-spinners";
import { useMutation, useQueryClient } from "react-query";
import api from "../../../util/api";
import type {
    corporateColumns,
    firstCorporateForm,
    secondCorporateForm,
} from "../../../types/corporateList";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DynamicPopOver from "../../DynamicPopOver";

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
            branch_code: modifyCorporate.branch_code,
            sec_registration_no: modifyCorporate.sec_registration_no,
        },
    });
    const Next = (data: any) => {
        setModifyCorporate({
            ...modifyCorporate,
            logo: data.logo[0],
            name: data.name,
            rdo_no: data.rdo_no,
            gst_type: data.gst_type,
            tin: data.tin,
            branch_code: data.branch_code,
            sec_registration_no: data.sec_registration_no,
        });
        // setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
        console.log(modifyCorporate);
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
                        className="field"
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </li>
            </ul>
            {validateTransaction && (
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*TIN Number</label>
                        <input
                            type="number"
                            {...register("tin", {
                                required: "Required",
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
                        />
                        {errors.tin && (
                            <p className="text-[10px]">{errors.tin.message}</p>
                        )}
                    </li>
                    <li>
                        <label>*Branch Code</label>
                        <input
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
                            type="number"
                            className="field"
                        />
                        {errors.branch_code && (
                            <p className="text-[10px]">
                                {errors.branch_code.message}
                            </p>
                        )}
                    </li>
                </ul>
            )}
            <ul className={style.ThreeRows}>
                <li>
                    <label>RDO NO.</label>
                    <input
                        type="number"
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
                        className="field"
                    />
                    {errors.rdo_no && (
                        <p className="text-[10px]">{errors.rdo_no.message}</p>
                    )}
                </li>
                <li>
                    <label>*GST TYPE.</label>
                    <div className="select">
                        <span>
                            <MdOutlineKeyboardArrowDown />
                        </span>
                        <DynamicPopOver
                            toRef={
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="field w-full"
                                    {...register("gst_type", {
                                        required: "Required",
                                    })}
                                    onChange={() => {}}
                                    onClick={() => setSelect(true)}
                                    value={modifyCorporate.gst_type}
                                />
                            }
                            samewidth={true}
                            toPop={
                                <>
                                    {isSelect && (
                                        <ul>
                                            <li
                                                onClick={() =>
                                                    SelectField("VAT")
                                                }
                                            >
                                                VAT
                                            </li>
                                            <li
                                                onClick={() =>
                                                    SelectField("NON-VAT")
                                                }
                                            >
                                                NON-VAT
                                            </li>
                                        </ul>
                                    )}
                                </>
                            }
                            className=""
                        />
                    </div>
                    {errors.gst_type && (
                        <p className="text-[10px]">{errors.gst_type.message}</p>
                    )}

                    {errors.gst_type && <p>{errors.gst_type.message}</p>}
                </li>
                {validateTransaction && (
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            type="number"
                            placeholder="000"
                            {...register("sec_registration_no", {
                                minLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                                maxLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                            })}
                            className="field"
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
                setPrompt((prev: any) => ({
                    ...prev,
                    type: "error",
                    message: `Something is wrong!, ${error.message}`,
                    toggle: true,
                }));
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
                    arrayData.push({
                        key: key,
                        keyData: modifyCorporate[key],
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
                    <li>
                        <label>CONTACT NO</label>
                        <aside>
                            <input
                                type="text"
                                placeholder="09"
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
                                onChange={(e) =>
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        contact_no: e.target.value,
                                    })
                                }
                                className="field"
                            />
                            <span>*Official</span>
                        </aside>
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                        <input
                            type="text"
                            placeholder="09"
                            {...register("alt_contact_no", {
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
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    alt_contact_no: e.target.value,
                                })
                            }
                            className="field"
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
                    </li>
                    <li>
                        <label>EMAIL ADDRESS</label>
                        <aside>
                            <input
                                type="text"
                                {...register("email", {
                                    required: "Required",
                                })}
                                required
                                onChange={(e) =>
                                    setModifyCorporate({
                                        ...modifyCorporate,
                                        email: e.target.value,
                                    })
                                }
                                className="field"
                            />
                            <span>*Official</span>
                        </aside>
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                        <input
                            type="text"
                            {...register("alt_email", {})}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    alt_email: e.target.value,
                                })
                            }
                            className="field"
                        />
                        {errors.alt_contact_no && (
                            <p className="text-[10px]">
                                {errors.alt_contact_no.message}
                            </p>
                        )}
                        {ErrorAddress && (
                            <p className="text-[10px]">
                                Email cannot be the same
                            </p>
                        )}
                    </li>
                </ul>
                <p className="text-[14px] font-bold mb-2">ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>*UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="text"
                            {...register("address_unit_floor", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_unit_floor: e.target.value,
                                })
                            }
                            className="field"
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
                            type="text"
                            {...register("address_building", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_building: e.target.value,
                                })
                            }
                            className="field"
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
                            type="text"
                            {...register("address_street", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_street: e.target.value,
                                })
                            }
                            className="field"
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
                            type="text"
                            {...register("address_district", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_district: e.target.value,
                                })
                            }
                            className="field"
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
                            type="text"
                            {...register("address_municipal_city", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_municipal_city: e.target.value,
                                })
                            }
                            className="field"
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
                            type="text"
                            {...register("address_province", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_province: e.target.value,
                                })
                            }
                            className="field"
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
                            type="text"
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
                            })}
                            className="field"
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    address_zip_code: e.target.value,
                                })
                            }
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
                        <div
                            onClick={() => setSave(!isSave)}
                            className="cursor-pointer"
                        >
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
