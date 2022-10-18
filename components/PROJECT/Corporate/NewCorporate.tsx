import React, { useRef, useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import type { corporateColumns } from "../../../types/corporateList";
import { AddCorporateAccount } from "../../API_methods/AddMutation";

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
    const [Corporate, setCorporate] = useState<corporateColumns>({
        logo: "",
        name: "",
        email: "",
        contact_no: undefined,
        alt_email: "",
        alt_contact_no: undefined,
        address_unit_floor: undefined,
        address_building: "",
        address_street: "",
        address_district: undefined,
        address_municipal_city: "",
        address_province: "",
        address_zip_code: undefined,
        tin: "",
        branch_code: undefined,
        gst_type: "VAT",
        rdo_no: undefined,
        sec_registration_no: undefined,
    });

    return (
        <div className={style.container}>
            <section ref={modal}>
                <p className={style.modal_title}>Create Corporate</p>

                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <Primary
                            key={1}
                            Corporate={Corporate}
                            setCorporate={setCorporate}
                            setNewActive={setNewActive}
                            isProfileUrl={isProfileUrl}
                            setProfileUrl={setProfileUrl}
                        />
                    )}
                    {isNewActive[1] && (
                        <Contact
                            key={2}
                            Corporate={Corporate}
                            setNewActive={setNewActive}
                            setCorporate={setCorporate}
                        />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

type Props = {
    setNewActive: Function;
    Corporate: any;
    setCorporate: Function;
    isProfileUrl?: any;
    setProfileUrl?: any;
};
const Primary = ({ setProfileUrl, isProfileUrl, setNewActive }: Props) => {
    const { setToggleNewForm } = useContext(AppContext);
    const [isLargeFile, setLargeFile] = useState("");
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

    const OnSubmitHandler = (e: any) => {
        e.preventDefault();
        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={OnSubmitHandler}>
                <h1 className={style.modal_label_primary}>
                    Primary Informations
                </h1>
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
                            <input
                                type="file"
                                id="image"
                                required
                                className="hidden"
                                name="logo"
                                onChange={DisplayImage}
                            />
                            <label htmlFor="image">
                                <AiFillCamera />
                            </label>
                        </aside>
                        <label htmlFor="image" className={style.image_label}>
                            <p>UPLOAD LOGO</p>
                            {isLargeFile !== "" && (
                                <p className=" text-[12px] text-black lowercase">
                                    {isLargeFile}
                                </p>
                            )}
                        </label>
                    </li>
                    <li>
                        <label>ID</label>
                        <input
                            type="text"
                            value="123"
                            disabled={true}
                            required
                            className=" bg-[#cdb8be]"
                        />
                    </li>
                    <li>
                        <label>Corporate Name</label>
                        <input type="text" required name="name" />
                    </li>
                </ul>
                <p className="text-[16px]">TIN</p>
                <ul className={style.ThreeRows}>
                    <li className={style.twoRows}>
                        <div className={style.wrapper}>
                            <div className=" w-[48%]">
                                <label>TIN Number</label>
                                <input name="tin" required type="number" />
                            </div>
                            <div className=" w-[48%]">
                                <label>Branch Code</label>
                                <input
                                    name="branch_code"
                                    type="number"
                                    required
                                />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>RDO NO.</label>
                        <input type="number" name="rdo_no" required />
                    </li>
                    <li>
                        <label>GST TYPE.</label>
                        <select name="gst_type" id="" required>
                            <option value="VAT">VAT</option>
                        </select>
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            type="number"
                            name="sec_registration_no"
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

                    <button className="buttonRed">NEXT</button>
                </div>
            </form>
        </motion.div>
    );
};

const Contact = ({ setNewActive, setCorporate, Corporate }: Props) => {
    const router = useRouter();
    const [isSave, setSave] = useState(false);

    const onSuccess = () => {
        alert("Successfuly Created an Account");
        router.push("");
    };
    const {
        isLoading: mutateLoading,
        mutate,
        isError: mutateError,
    } = AddCorporateAccount(onSuccess);

    const addCorporate = (typeOfSave: string) => {
        mutate(Corporate);
        console.log(Corporate);
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
            <ul className={style.twoRows_container}>
                <li>
                    <label>CONTACT NO</label>
                    <aside>
                        <input
                            type="number"
                            value={Corporate.contact_no}
                            onChange={(e) =>
                                setCorporate({
                                    ...Corporate,
                                    contact_no: e.target.value,
                                })
                            }
                        />
                        <span>Official</span>
                    </aside>
                    <input
                        type="number"
                        value={Corporate.alt_contact_no}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                alt_contact_no: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>EMAIL ADDRESS</label>
                    <aside>
                        <input
                            type="email"
                            value={Corporate.email}
                            onChange={(e) =>
                                setCorporate({
                                    ...Corporate,
                                    email: e.target.value,
                                })
                            }
                        />
                        <span>Official</span>
                    </aside>
                    <input
                        type="email"
                        value={Corporate.alt_email}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                alt_email: e.target.value,
                            })
                        }
                    />
                </li>
            </ul>
            <p className="text-[14px] font-bold mb-2">ADDRESS</p>
            <ul className={style.ThreeRows}>
                <li>
                    <label>UNIT/FLOOR/HOUSE NO.</label>
                    <input
                        type="number"
                        value={Corporate.address_unit_floor}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_unit_floor: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>BUILDING</label>
                    <input
                        type="text"
                        value={Corporate.address_building}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_building: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>STREET</label>
                    <input
                        type="text"
                        value={Corporate.address_street}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_street: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>DISTRICT</label>
                    <input
                        type="text"
                        value={Corporate.address_district}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_district: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>MUNICIPALITY</label>
                    <input
                        type="text"
                        value={Corporate.address_municipal_city}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_municipal_city: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>PROVINCE</label>
                    <input
                        type="text"
                        value={Corporate.address_province}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_province: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>ZIP CODE</label>
                    <input
                        type="text"
                        value={Corporate.address_zip_code}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                address_zip_code: e.target.value,
                            })
                        }
                    />
                </li>
            </ul>
            <div className={style.SaveButton}>
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
                <div className={style.Save}>
                    <div onClick={() => setSave(!isSave)}>
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul>
                            <li>
                                <button
                                    name="save"
                                    onClick={() => addCorporate("save")}
                                >
                                    SAVE
                                </button>
                            </li>

                            <li>
                                <button
                                    name="save"
                                    onClick={() => addCorporate("save_new")}
                                >
                                    SAVE & NEW
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => addCorporate("save_draft")}
                                    name="draft"
                                >
                                    SAVE AS DRAFT
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
