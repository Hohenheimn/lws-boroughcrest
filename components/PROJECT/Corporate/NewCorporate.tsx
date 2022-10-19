import React, { useRef, useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import { AddCorporateAccount } from "../../API_methods/AddMutation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import api from "../../../util/api";
import axios from "axios";
import type { firstCorporateForm } from "../../../types/corporateList";
import type { secondCorporateForm } from "../../../types/corporateList";

export default function NewCorporate() {
    const { setToggleNewForm } = useContext(AppContext);
    const [isNewActive, setNewActive] = useState([true, false]);
    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggleNewForm(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <div className={style.container}>
            <section ref={modal}>
                <p className={style.modal_title}>Create Corporate</p>

                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <Primary key={1} setNewActive={setNewActive} />
                    )}
                    {isNewActive[1] && (
                        <Contact key={2} setNewActive={setNewActive} />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

type Props = {
    setNewActive: Function;
};
const Primary = ({ setNewActive }: Props) => {
    const [isLogoStatus, setLogoStatus] = useState("Upload Logo");
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000) {
            setLogoStatus("File is too large");
            return;
        } else {
            setLogoStatus("");
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
                    setProfileUrl(event.target.result);
                });
                const file = e.target.files;
                setLogoStatus(file[0].name);
            } else {
                setLogoStatus("Invalid Image File");
            }
        } else {
        }
    };

    const { setToggleNewForm, setCreateCorporate, createCorporate } =
        useContext(AppContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<firstCorporateForm>({
        defaultValues: {
            logo: createCorporate.logo,
            name: createCorporate.name,
            tin: createCorporate.tin,
            branch_code: createCorporate.branch_code,
            rdo_no: createCorporate.rdo_no,
            gst_type: createCorporate.gst_type,
            sec_registration_no: createCorporate.sec_registration_no,
        },
    });

    const Submit = (data: any) => {
        setCreateCorporate({
            ...createCorporate,
            logo: data.logo[0],
            name: data.name,
            tin: data.tin,
            branch_code: data.branch_code,
            rdo_no: data.rdo_no,
            gst_type: data.gst_type,
            sec_registration_no: data.sec_registration_no,
        });

        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
        console.log(createCorporate);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={handleSubmit(Submit)} encType="multipart/form-data">
                <h1 className={style.modal_label_primary}>
                    Primary Informations
                </h1>
                <input
                    type="file"
                    id="image"
                    {...register("logo", {
                        required: "Required",
                    })}
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
                            {errors.logo && (
                                <p className="text-[10px] capitalize">
                                    Required
                                </p>
                            )}
                        </label>
                    </li>
                    <li>
                        <label>ID</label>
                        <input
                            type="text"
                            value="1"
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
                        {errors.name && (
                            <p className="text-[10px]">{errors.name.message}</p>
                        )}
                    </li>
                </ul>
                <p className="text-[16px]">TIN</p>
                <ul className={style.ThreeRows}>
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
                            </div>
                        </div>
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
                            <p className="text-[10px]">
                                {errors.rdo_no.message}
                            </p>
                        )}
                    </li>
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
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
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
                    <li></li>
                    <li></li>
                </ul>
                <div className={style.button_container}>
                    <aside
                        onClick={() => setToggleNewForm(false)}
                        className="button_cancel cursor-pointer"
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

const Contact = ({ setNewActive }: Props) => {
    const [isSave, setSave] = useState(false);
    const { setCreateCorporate, createCorporate, setToggleNewForm } =
        useContext(AppContext);

    const [ErrorContact, setErrorContact] = useState(false);
    const [ErrorAddress, setErrorAddress] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<secondCorporateForm>();

    const Submit = async (data: any) => {
        if (data.email === data.alt_email) {
            setErrorAddress(true);
            return;
        }
        if (data.contact_no === data.alt_contact_no) {
            setErrorContact(true);
            return;
        }
        const response = await axios.post(
            "https://boroughcrest-api.lws.codes/project/corporate",
            { ...createCorporate, ...data }
        );
        console.log(response);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <form onSubmit={handleSubmit(Submit)} encType="multipart/form-data">
                <ul className={style.twoRows_container}>
                    <li>
                        <label>CONTACT NO</label>
                        <aside>
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
                                })}
                            />
                            <span>Official</span>
                        </aside>
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                        <input
                            type="number"
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
                                type="email"
                                {...register("email", {
                                    required: "Required",
                                })}
                                required
                            />
                            <span>Official</span>
                        </aside>
                        {errors.email && (
                            <p className="text-[10px]">
                                {errors.email.message}
                            </p>
                        )}
                        <input type="email" {...register("alt_email", {})} />
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
                    </li>
                </ul>
                <p className="text-[14px] font-bold mb-2">ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="number"
                            {...register("address_unit_floor", {
                                required: "Required",
                            })}
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
                            type="number"
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
                    <div className={style.Save}>
                        <div onClick={() => setSave(!isSave)}>
                            SAVE{" "}
                            <RiArrowDownSFill className=" ml-1 text-[24px]" />
                        </div>
                        {isSave && (
                            <ul>
                                <li>
                                    <button name="save" data-type="save">
                                        SAVE
                                    </button>
                                </li>

                                <li>
                                    <button name="save" data-type="save-new">
                                        SAVE & NEW
                                    </button>
                                </li>

                                <li>
                                    <button name="draft" data-type="save-draft">
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
