import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../util/api";
import type { firstCorporateForm } from "../../../types/corporateList";
import type { secondCorporateForm } from "../../../types/corporateList";
import { ScaleLoader } from "react-spinners";
import { getCookie } from "cookies-next";
import Link from "next/link";

export default function NewCorporate() {
    const [isNewActive, setNewActive] = useState([true, false]);
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const { isLoading, isError, data } = useQuery("get-id", () => {
        return api.get("project/corporate", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
    if (isLoading || isError) {
        return <></>;
    }
    let Current_id: any;
    if (data?.data.length === 0) {
        Current_id = 0;
    } else {
        for (let index = 0; index < data?.data.length; index++) {
            const id = data?.data[index];
            Current_id = id.id;
        }
    }

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Create Corporate</p>

                <Primary
                    key={1}
                    setNewActive={setNewActive}
                    Current_id={Current_id}
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
    Current_id?: any;
    isNewActive: any;
    isProfileUrl: any;
    setProfileUrl: Function;
};
const Primary = ({
    setNewActive,
    Current_id,
    isNewActive,
    isProfileUrl,
    setProfileUrl,
}: Props) => {
    const [isLogoStatus, setLogoStatus] = useState("Upload Logo");
    const Next_ID = Current_id + 1;

    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000000) {
            setLogoStatus("Image must be 2mb only");
            return;
        } else {
            setLogoStatus("");
            console.log(e.target.files[0]);
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
                setLogoStatus(file[0].name);
            } else {
                setLogoStatus("Invalid Image File");
            }
        } else {
            setLogoStatus("Please Select an Image");
        }
    };

    const { setCreateCorporate, createCorporate } = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<firstCorporateForm>();

    const Submit = (data: any) => {
        if (
            isLogoStatus === "File is too large" ||
            isLogoStatus === "Invalid Image File" ||
            isLogoStatus === "Please Select an Image"
        ) {
            return;
        }
        setCreateCorporate({
            ...createCorporate,
            logo: data.logo[0],
        });

        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
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
                            value={Next_ID}
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
                            value={createCorporate.name}
                            onChange={(e) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    name: e.target.value,
                                });
                            }}
                        />
                        {errors.name && (
                            <p className="text-[10px]">{errors.name.message}</p>
                        )}
                    </li>
                </ul>
                <p className="text-[16px]">TIN</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>TIN Number</label>
                        <input
                            type="number"
                            placeholder="000000000"
                            {...register("tin", {
                                required: "Required",
                                minLength: {
                                    value: 9,
                                    message: "Must be 9 number only",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Must be 9 number only",
                                },
                            })}
                            value={createCorporate.tin}
                            onChange={(e) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    tin: e.target.value,
                                });
                            }}
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
                            value={createCorporate.branch_code}
                            onChange={(e) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    branch_code: e.target.value,
                                });
                            }}
                        />
                        {errors.branch_code && (
                            <p className="text-[10px]">
                                {errors.branch_code.message}
                            </p>
                        )}
                    </li>
                </ul>
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
                            value={createCorporate.rdo_no}
                            onChange={(e) => {
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
                        <label>GST TYPE.</label>
                        <select
                            {...register("gst_type", {
                                required: true,
                            })}
                            id=""
                            required
                            value={createCorporate.gst_type}
                            onChange={(e) => {
                                setCreateCorporate({
                                    ...createCorporate,
                                    gst_type: e.target.value,
                                });
                            }}
                        >
                            <option value="VAT">VAT</option>
                            <option value="NON-VAT">NON-VAT</option>
                        </select>
                    </li>
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
                    <Link href="">
                        <a className="button_cancel cursor-pointer">CANCEL</a>
                    </Link>
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
    const [whatClickedButon, setWhatClickedButton] = useState(true);
    const [isSave, setSave] = useState(false);
    const { setCreateCorporate, createCorporate } = useContext(AppContext);

    const [ErrorContact, setErrorContact] = useState(false);
    const [ErrorAddress, setErrorAddress] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    const clietQuery = useQueryClient();
    const {
        isLoading: MutateLoading,
        mutate,
        isError,
        error,
    } = useMutation(
        (data: FormData) => {
            return api.post("/project/corporate", data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                // router.reload();
                clietQuery.invalidateQueries("get-corporate-list");
                if (whatClickedButon) {
                    // save
                    router.push("");
                } else {
                    alert("Corporate Successfully Registered!");
                    router.reload();
                }
            },
        }
    );
    if (isError) {
        console.log(error);
    }

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
            arrayData.push({
                key: key,
                keyData: createCorporate[key],
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
                    <li>
                        <label>CONTACT NO</label>
                        <aside>
                            <input
                                type="number"
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
                                value={createCorporate.contact_no}
                                onChange={(e) =>
                                    setCreateCorporate({
                                        ...createCorporate,
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
                            type="number"
                            // placeholder="09"
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
                            value={createCorporate.alt_contact_no}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                                type="email"
                                {...register("email", {
                                    required: "Required",
                                })}
                                required
                                value={createCorporate.email}
                                onChange={(e) =>
                                    setCreateCorporate({
                                        ...createCorporate,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <span>Official</span>
                        </aside>
                        {errors.email && (
                            <p className="text-[10px]">
                                {errors.email.message}
                            </p>
                        )}
                        <input
                            type="email"
                            {...register("alt_email", {})}
                            value={createCorporate.alt_email}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    alt_email: e.target.value,
                                })
                            }
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
                            value={createCorporate.address_unit_floor}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            value={createCorporate.address_building}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            value={createCorporate.address_street}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            value={createCorporate.address_district}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            value={createCorporate.address_municipal_city}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            value={createCorporate.address_province}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            value={createCorporate.address_zip_code}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
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
                            <div onClick={() => setSave(!isSave)}>
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
