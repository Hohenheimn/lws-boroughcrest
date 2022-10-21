import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import type {
    corporateColumns,
    firstCorporateForm,
    secondCorporateForm,
} from "../../../types/corporateList";
import { useForm } from "react-hook-form";

type ModifyCorporate = {
    setToggleModify: Function;
    CorporateData: corporateColumns;
};

export default function ModifyCorporate({ setToggleModify }: ModifyCorporate) {
    const [isNewActive, setNewActive] = useState([true, false]);
    const [isLogo, setLogo] = useState("Upload Logo");

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Modify Corporate</p>
                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <PrimaryInformation
                            key={1}
                            setToggleModify={setToggleModify}
                            setNewActive={setNewActive}
                            setLogo={setLogo}
                            isLogo={isLogo}
                        />
                    )}
                    {isNewActive[1] && (
                        <Contact
                            key={2}
                            setToggleModify={setToggleModify}
                            setNewActive={setNewActive}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

type Props = {
    setToggleModify: Function;
    setNewActive: Function;
    isLogo?: string;
    setLogo?: Function;
};

const PrimaryInformation = ({
    setToggleModify,
    setNewActive,
    isLogo,
    setLogo,
}: Props) => {
    // Default Image
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
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
                    setProfileUrl(event.target.result);
                });
            } else {
                alert("Invalid Image File");
            }
        } else {
            alert("Nothing Happens");
        }
    };
    const { modifyCorporate } = useContext(AppContext);
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
            sec_registration_no: modifyCorporate.sec_registration_no,
        },
    });
    const Next = (data: any) => {
        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
    };
    return (
        <motion.form
            onSubmit={handleSubmit(Next)}
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Primary Information</h1>
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

                        <input type="file" id="image" onChange={DisplayImage} />
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

            <ul className={style.ThreeRows}>
                <li>
                    <label>GST TYPE.</label>
                    <select
                        {...register("gst_type", {
                            required: true,
                        })}
                        id=""
                        required
                    >
                        <option value="VAT">VAT</option>
                        <option value="NON-VATA">NON-VAT</option>
                    </select>
                    {errors.gst_type && <p>{errors.gst_type.message}</p>}
                </li>
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
            </ul>

            <div className={style.button_container}>
                <button
                    className="button_cancel"
                    onClick={() => setToggleModify(false)}
                >
                    CANCEL
                </button>

                <button className="buttonRed" type="submit">
                    NEXT
                </button>
            </div>
        </motion.form>
    );
};

const Contact = ({ setNewActive }: Props) => {
    const [isSave, setSave] = useState(false);
    const { modifyCorporate, setModifyCorporate } = useContext(AppContext);

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

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
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
                                    ...setModifyCorporate,
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
                                ...setModifyCorporate,
                                alt_contact_no: e.target.value,
                            })
                        }
                    />
                    {errors.alt_contact_no && (
                        <p className="text-[10px]">
                            {errors.alt_contact_no.message}
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
                                    ...setModifyCorporate,
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
            <div className=" w-full flex justify-end items-center  mb-10">
                <button
                    className="cancel_button mr-5 font-bold"
                    onClick={() =>
                        setNewActive((item: any) => [
                            (item[0] = true),
                            (item[1] = false),
                        ])
                    }
                >
                    Back
                </button>
                <button className=" relative text-white flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                    <div
                        className=" h-8 px-5 w-full flex justify-center items-center"
                        onClick={() => setSave(!isSave)}
                    >
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul className=" absolute top-full bg-white w-full">
                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE
                            </a>

                            <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                SAVE & NEW
                            </a>
                        </ul>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
