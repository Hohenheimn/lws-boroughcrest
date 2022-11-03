import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
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

type ModifyCorporate = {
    setToggleModify: Function;
    CorporateData: corporateColumns;
    Logo: String;
};

export default function ModifyCorporate({
    setToggleModify,
    Logo,
}: ModifyCorporate) {
    const [isNewActive, setNewActive] = useState([true, false]);

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Modify Corporate</p>
                <AnimatePresence mode="wait">
                    <PrimaryInformation
                        key={1}
                        setToggleModify={setToggleModify}
                        setNewActive={setNewActive}
                        Logo={Logo}
                        isNewActive={isNewActive}
                    />

                    <Contact
                        key={2}
                        setToggleModify={setToggleModify}
                        setNewActive={setNewActive}
                        isNewActive={isNewActive}
                    />
                </AnimatePresence>
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
};

const PrimaryInformation = ({
    setToggleModify,
    setNewActive,
    Logo,
    isNewActive,
}: Props) => {
    const router = useRouter();
    // true if may transaction
    const validateTransaction = true;
    // Default Image
    const LogoName = Logo.split("/")[4].split("_")[1];
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
    const { modifyCorporate, setModifyCorporate } = useContext(AppContext);
    const {
        register,
        handleSubmit,
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
                        className=" bg-[#cdb8be]"
                    />
                </li>
                <li>
                    <label>Corporate Name</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Required",
                        })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </li>
            </ul>
            {validateTransaction && (
                <ul className={style.ThreeRows}>
                    <li>
                        <label>TIN Number</label>
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
                        />
                        {errors.tin && (
                            <p className="text-[10px]">{errors.tin.message}</p>
                        )}
                    </li>
                    <li>
                        <label>Branch Code</label>
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
                            required: "Required",
                            minLength: {
                                value: 3,
                                message: "Must be 3 Number",
                            },
                            maxLength: {
                                value: 3,
                                message: "Must be 3 Number",
                            },
                        })}
                    />
                    {errors.rdo_no && (
                        <p className="text-[10px]">{errors.rdo_no.message}</p>
                    )}
                </li>
                <li>
                    <label>GST TYPE.</label>
                    <select
                        {...register("gst_type", {
                            required: true,
                        })}
                        id=""
                        defaultValue={modifyCorporate.gst_type}
                        required
                    >
                        <option
                            className={style.disabled}
                            value={modifyCorporate.gst_type}
                            disabled
                        >
                            {modifyCorporate.gst_type}
                        </option>
                        <option value="VAT">VAT</option>
                        <option value="NON-VATA">NON-VAT</option>
                    </select>
                    {errors.gst_type && <p>{errors.gst_type.message}</p>}
                </li>
                {validateTransaction && (
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            type="number"
                            placeholder="000"
                            {...register("sec_registration_no", {
                                required: "Required",
                                minLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                                maxLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                            })}
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
                                className="buttonRed mr-5 cursor-point"
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
    const { modifyCorporate, setModifyCorporate } = useContext(AppContext);
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
            onSuccess: () => {
                if (whatClickedButon) {
                    queryClient.invalidateQueries([
                        "Corporate-detail",
                        router.query.id,
                    ]);
                    setToggleModify(false);
                } else {
                    router.push("/project/corporate?new");
                }
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
            arrayData.push({
                key: key,
                keyData: modifyCorporate[key],
            });
        });
        arrayData.map(({ key, keyData }: any) => {
            if (keyData === undefined || keyData === "" || keyData === null) {
                console.log("di kasama");
            } else {
                formData.append(key, keyData);
            }
        });
        mutate(formData);
        // console.log(arrayData);
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
                            />
                            <span>Official</span>
                        </aside>
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                        <input
                            type="text"
                            {...register("alt_contact_no", {
                                minLength: {
                                    value: 11,
                                    message: "Must be 11 Numbers",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Must be 11 Number",
                                },
                            })}
                            onChange={(e) =>
                                setModifyCorporate({
                                    ...modifyCorporate,
                                    alt_contact_no: e.target.value,
                                })
                            }
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
                            />
                            <span>Official</span>
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
                        <label>UNIT/FLOOR/HOUSE NO.</label>
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
                        />
                        {errors.address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.address_unit_floor.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>BUILDING</label>
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
                        />
                        {errors.address_building && (
                            <p className="text-[10px]">
                                {errors.address_building.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>STREET</label>
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
                        />
                        {errors.address_street && (
                            <p className="text-[10px]">
                                {errors.address_street.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>DISTRICT</label>
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
                        />
                        {errors.address_district && (
                            <p className="text-[10px]">
                                {errors.address_district.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>MUNICIPALITY</label>
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
                        />
                        {errors.address_municipal_city && (
                            <p className="text-[10px]">
                                {errors.address_municipal_city.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>PROVINCE</label>
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
                        />
                        {errors.address_province && (
                            <p className="text-[10px]">
                                {errors.address_province.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>ZIP CODE</label>
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
                        className="cancel_button mr-5 font-bold cursor-pointer"
                        onClick={() =>
                            setNewActive((item: any) => [
                                (item[0] = true),
                                (item[1] = false),
                            ])
                        }
                    >
                        Back
                    </aside>
                    {MutateLoading && (
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
                    {!MutateLoading && (
                        <div className={style.Save}>
                            <div
                                onClick={() => setSave(!isSave)}
                                className="cursor-pointer"
                            >
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
                                                setWhatClickedButton(true)
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
                                                setWhatClickedButton(false)
                                            }
                                        >
                                            SAVE & NEW
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
