import React, { useRef, useEffect, useState } from "react";
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
    const [isNewActive, setNewActive] = useState([true, false]);
    const modal = useRef<any>();
    const router = useRouter();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                router.push("");
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
        tin_no: "",
        branch_code: "",
        rdo_no: "",
        gst_type: "",
        sec_registration: "",
        email: "",
        contact_no: "",
        alt_email: "",
        alt_contact_no: "",
        address_unit_floor: "",
        address_building: "",
        street: "",
        district: "",
        municifality: "",
        province: "",
        zip_code: "",
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
const Primary = ({
    setNewActive,
    Corporate,
    setCorporate,
    setProfileUrl,
    isProfileUrl,
}: Props) => {
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

                const fileName = e.target.value.split("fakepath\\")[1];
                setCorporate({
                    ...Corporate,
                    logo: "corporate-logos/" + fileName,
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
            <h1 className={style.modal_label_primary}>Primary Informations</h1>
            <ul className={style.ThreeRows}>
                <li className={style.upload_image}>
                    <aside>
                        <aside>
                            <Image src={isProfileUrl} alt="" layout="fill" />
                        </aside>
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={DisplayImage}
                        />
                        <label htmlFor="image">
                            <AiFillCamera />
                        </label>
                    </aside>
                    <label htmlFor="image" className={style.image_label}>
                        <p>UPLOAD LOGO</p>
                    </label>
                </li>
                <li>
                    <label>ID</label>
                    <input
                        type="text"
                        value="123"
                        disabled={true}
                        className=" bg-[#cdb8be]"
                    />
                </li>
                <li>
                    <label>Corporate Name</label>
                    <input
                        type="text"
                        value={Corporate.name}
                        onChange={(e) =>
                            setCorporate({ ...Corporate, name: e.target.value })
                        }
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
                                type="text"
                                value={Corporate.tin_no}
                                onChange={(e) =>
                                    setCorporate({
                                        ...Corporate,
                                        tin_no: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className=" w-[48%]">
                            <label>Branch Code</label>
                            <input
                                type="text"
                                value={Corporate.branch_code}
                                onChange={(e) =>
                                    setCorporate({
                                        ...Corporate,
                                        branch_code: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </li>
                <li>
                    <label>RDO NO.</label>
                    <input
                        type="text"
                        value={Corporate.rdo_no}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                rdo_no: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>GST TYPE.</label>
                    <select
                        name=""
                        id=""
                        value={Corporate.gst_type}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                gsp_type: e.target.value,
                            })
                        }
                    >
                        <option value=""></option>
                    </select>
                </li>
            </ul>
            <ul className={style.ThreeRows}>
                <li>
                    <label>SEC. Registration</label>
                    <input
                        type="text"
                        value={Corporate.sec_registration}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                sec_registration: e.target.value,
                            })
                        }
                    />
                </li>
                <li></li>
                <li></li>
            </ul>
            <div className={style.button_container}>
                <Link href="">
                    <a className="button_cancel">CANCEL</a>
                </Link>

                <button
                    className="buttonRed"
                    onClick={() => {
                        setNewActive((item: any) => [
                            (item[0] = false),
                            (item[1] = true),
                        ]);
                    }}
                >
                    NEXT
                </button>
            </div>
        </motion.div>
    );
};

const Contact = ({ setNewActive, setCorporate, Corporate }: Props) => {
    const [isSave, setSave] = useState(false);
    const {
        isLoading: mutateLoading,
        mutate,
        isError: mutateError,
    } = AddCorporateAccount();

    const addCorporate = () => {
        // mutate(Corporate);
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
                            type="text"
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
                        type="text"
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
                            type="text"
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
                        type="text"
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
                        type="text"
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
                        value={Corporate.street}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                street: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>DISTRICT</label>
                    <input
                        type="text"
                        value={Corporate.district}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                district: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>MUNICIPALITY</label>
                    <input
                        type="text"
                        value={Corporate.municifality}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                municifality: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>PROVINCE</label>
                    <input
                        type="text"
                        value={Corporate.province}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                province: e.target.value,
                            })
                        }
                    />
                </li>
                <li>
                    <label>ZIP CODE</label>
                    <input
                        type="text"
                        value={Corporate.zip_code}
                        onChange={(e) =>
                            setCorporate({
                                ...Corporate,
                                zip_code: e.target.value,
                            })
                        }
                    />
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
                            <a
                                onClick={addCorporate}
                                className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75"
                            >
                                SAVE
                            </a>

                            <a
                                onClick={addCorporate}
                                className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75"
                            >
                                SAVE & NEW
                            </a>
                        </ul>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
