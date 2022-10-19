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

    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");

    return (
        <div className={style.container}>
            <section ref={modal}>
                <p className={style.modal_title}>Create Corporate</p>

                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <Primary
                            key={1}
                            setNewActive={setNewActive}
                            isProfileUrl={isProfileUrl}
                            setProfileUrl={setProfileUrl}
                        />
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
    isProfileUrl?: any;
    setProfileUrl?: any;
};
const Primary = ({ setProfileUrl, isProfileUrl, setNewActive }: Props) => {
    const [isLargeFile, setLargeFile] = useState("Upload Logo");

    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000) {
            setLargeFile("File is too large");
            return;
        } else {
            setLargeFile("");
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
                setLargeFile(file[0].name);
            } else {
                setLargeFile("Invalid Image File");
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
    } = useForm({
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
            logo: data.logo[0].name,
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
                            <p>{isLargeFile}</p>
                            <p className=" text-[12px] text-black lowercase">
                                {/* {errors.image && "This is Required"} */}
                            </p>
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
                                required: true,
                            })}
                            required
                        />
                    </li>
                </ul>
                <p className="text-[16px]">TIN</p>
                <ul className={style.ThreeRows}>
                    <li className={style.twoRows}>
                        <div className={style.wrapper}>
                            <div className=" w-[48%]">
                                <label>TIN Number</label>
                                <input
                                    {...register("tin", {
                                        required: true,
                                    })}
                                    type="number"
                                    required
                                />
                            </div>
                            <div className=" w-[48%]">
                                <label>Branch Code</label>
                                <input
                                    {...register("branch_code", {
                                        required: true,
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>RDO NO.</label>
                        <input
                            type="number"
                            {...register("rdo_no", {
                                required: true,
                            })}
                            required
                        />
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
                            <option value="SAMPLE">SAMPLE</option>
                        </select>
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            type="number"
                            {...register("sec_registration_no", {
                                required: true,
                            })}
                            required
                        />
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
    const { setCreateCorporate, createCorporate, setToggleNewForm } =
        useContext(AppContext);

    const [isSave, setSave] = useState(false);

    const onSuccess = () => {
        alert("Successfuly Created an Account");
        setToggleNewForm(false);
    };
    // const {
    //     isLoading: mutateLoading,
    //     mutate,
    //     isError: mutateError,
    // } = AddCorporateAccount(onSuccess);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const {
        isLoading: mutateLoading,
        mutate,
        isError: mutateError,
    } = useMutation((CorporateDetail) => {
        return api.post("/project/corporate", CorporateDetail);
    });

    const Submit = async (data: any) => {
        // mutate({
        //     ...createCorporate,
        //     ...data,
        // });
        // setCreateCorporate({ ...createCorporate, ...data });
        // console.log(createCorporate);
        const response = await axios.post(
            "https://boroughcrest-api.lws.codes/project/corporate",
            { ...createCorporate, ...data }
        );
        console.log(response);
    };

    if (mutateLoading) {
        return <h1>Loading Mutation</h1>;
    }
    if (mutateError) {
        return <h1>Error Mutation</h1>;
    }

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <form onSubmit={handleSubmit(Submit)}>
                <ul className={style.twoRows_container}>
                    <li>
                        <label>CONTACT NO</label>
                        <aside>
                            <input
                                type="number"
                                {...register("contact_no", {
                                    required: true,
                                })}
                                required
                            />
                            <span>Official</span>
                        </aside>
                        <input type="number" {...register("alt_contact_no")} />
                    </li>
                    <li>
                        <label>EMAIL ADDRESS</label>
                        <aside>
                            <input
                                type="email"
                                {...register("email", {
                                    required: true,
                                })}
                                required
                            />
                            <span>Official</span>
                        </aside>
                        <input type="email" {...register("alt_email")} />
                    </li>
                </ul>
                <p className="text-[14px] font-bold mb-2">ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="number"
                            {...register("address_unit_floor", {
                                required: true,
                            })}
                            required
                        />
                    </li>
                    <li>
                        <label>BUILDING</label>
                        <input
                            type="text"
                            {...register("address_building", {
                                required: true,
                            })}
                            required
                        />
                    </li>
                    <li>
                        <label>STREET</label>
                        <input
                            type="text"
                            {...register("address_street", {
                                required: true,
                            })}
                            required
                        />
                    </li>
                    <li>
                        <label>DISTRICT</label>
                        <input
                            type="text"
                            {...register("address_district", {
                                required: true,
                            })}
                            required
                        />
                    </li>
                    <li>
                        <label>MUNICIPALITY</label>
                        <input
                            type="text"
                            {...register("address_municipal_city", {
                                required: true,
                            })}
                            required
                        />
                    </li>
                    <li>
                        <label>PROVINCE</label>
                        <input
                            type="text"
                            {...register("address_province", {
                                required: true,
                            })}
                            required
                        />
                    </li>
                    <li>
                        <label>ZIP CODE</label>
                        <input
                            type="number"
                            {...register("address_zip_code", {
                                required: true,
                            })}
                            required
                        />
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
