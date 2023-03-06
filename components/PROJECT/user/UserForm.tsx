import React, { useState, useEffect, useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { useForm } from "react-hook-form";
import AppContext from "../../Context/AppContext";
import SelectDropdown from "../../Reusable/SelectDropdown";
import CorporateDropDown from "../../Dropdowns/CorporateDropDown";
import { RiArrowDownSFill } from "react-icons/ri";
import UserRolePermissionsForm from "./UserRolePermissionsForm";

export type UserFormType = {
    profile: any;
    name: string;
    signature: any;
    position: string;
    employee_id: string | number;
    department: string | number | null;
    email: string;
    mobile: number | string;
    corporate: string | number;
    corporate_id: string | number;
    status: string;
};

export type UserInfoPayload = {
    employee_id: string | number;
    name: string;
    email: string;
    corporate_id: string | number;
    department_id: string | number;
    contact_no: string | number;
    position: string;
    image_photo: undefined | null | File;
    image_signature: undefined | null | File;
    status: string;
};

type Props = {
    DefaultValue: UserFormType;
    type: string;
    setToggle: Function;
};

export default function UserForm({ DefaultValue, type, setToggle }: Props) {
    const [isSave, setSave] = useState(false);
    const [isDepartment, setDepartment] = useState<any>("");

    const [isPayload, setPayload] = useState<UserInfoPayload>({
        employee_id: "",
        name: "",
        email: "",
        corporate_id: "",
        department_id: "",
        contact_no: "",
        position: "",
        image_photo: undefined,
        image_signature: undefined,
        status: "",
    });

    const { setNewUserToggle } = useContext(AppContext);

    const [userForm, setUserForm] = useState([true, false]);

    const [isProfileStatus, setProfileStatus] = useState("Upload Profile");

    const [isSignatureStatus, setSignatureStatus] =
        useState("Upload Signature");

    const [isStatus, setStatus] = useState<string>("Active");

    const [isCorporate, setCorporate] = useState<{
        id: string | number;
        value: any;
    }>({
        id: "",
        value: "",
    });
    useEffect(() => {
        setValue("corporate", isCorporate.value);
    }, [isCorporate]);

    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");

    const DisplayImage = (e: any, key: string) => {
        if (e.target.files[0]?.size > 2000000) {
            key === "profile" && setProfileStatus("Image must be 2mb only");
            key === "signature" && setSignatureStatus("Image must be 2mb only");

            return;
        } else {
            key === "profile" && setProfileStatus("Upload Profile");
            key === "signature" && setSignatureStatus("Upload Signature");
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (["image/jpeg", "image/png"].includes(selectedImage.type)) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    key === "profile" && setProfileUrl(event.target.result);
                });
                const file = e.target.files;
                if (key === "signature") {
                    setSignatureStatus(file[0].name);
                }
                if (key === "profile") {
                    setProfileStatus(file[0].name);
                }
            } else {
                key === "profile" && setProfileStatus("Invalid Image File");
                key === "signature" && setSignatureStatus("Invalid Image File");
            }
        } else {
            key === "profile" && setProfileStatus("Nothing Happens");
            key === "signature" && setSignatureStatus("Nothing Happens");
        }
    };

    useEffect(() => {
        if (
            DefaultValue.profile !== "" &&
            DefaultValue.profile !== null &&
            DefaultValue.profile !== undefined
        ) {
            setProfileUrl(DefaultValue.profile);
        } else {
            setProfileUrl("/Images/sampleProfile.png");
        }
        setValue("department", DefaultValue.department);
        setDepartment(DefaultValue.department);
        setCorporate({
            id: DefaultValue.corporate_id,
            value: DefaultValue.corporate,
        });
        setValue("corporate", DefaultValue.corporate);
        setStatus(status);
    }, []);

    const cancel = () => {
        setNewUserToggle(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserFormType>({
        defaultValues: DefaultValue,
    });

    const Next = (data: UserFormType) => {
        const Payload: UserInfoPayload = {
            employee_id: data.employee_id,
            name: data.name,
            email: data.email,
            corporate_id: isCorporate.id,
            department_id: isDepartment,
            contact_no: data.mobile,
            position: data.position,
            image_photo: data.profile[0] === undefined ? null : data.profile[0],
            image_signature:
                data.signature[0] === undefined ? null : data.signature[0],
            status: isStatus,
        };
        setPayload({
            employee_id: data.employee_id,
            name: data.name,
            email: data.email,
            corporate_id: isCorporate.id,
            department_id: isDepartment,
            contact_no: data.mobile,
            position: data.position,
            image_photo: data.profile[0] === undefined ? null : data.profile[0],
            image_signature:
                data.signature[0] === undefined ? null : data.signature[0],
            status: isStatus,
        });
        if (type === "create") {
            setUserForm([false, true]);
        }
        if (type === "modify") {
            console.log(Payload);
        }
    };

    return (
        <div className={style.container}>
            <section>
                <form
                    onSubmit={handleSubmit(Next)}
                    className={`${userForm[0] === true ? "" : "hidden"}`}
                >
                    <p className={style.modal_title}>Create User</p>
                    <h1 className={style.statusTitle}>
                        <span>STATUS</span>

                        <div
                            className={`statusCircle ${
                                isStatus === "Active" ? "active" : "inactive"
                            }`}
                            onClick={() =>
                                setStatus((prev) =>
                                    prev === "Active" ? "Inactive" : "Active"
                                )
                            }
                        ></div>
                    </h1>

                    <ul className={`${style.ThreeRows} items-center`}>
                        <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <aside className="w-20 h-20 relative flex mr-4">
                                <label
                                    className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative"
                                    htmlFor="profile"
                                >
                                    <Image
                                        src={isProfileUrl}
                                        alt=""
                                        layout="fill"
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="profile"
                                    {...register("profile")}
                                    onChange={(e) => DisplayImage(e, "profile")}
                                    className="absolute z-[-1] opacity-0"
                                />
                                <label
                                    htmlFor="profile"
                                    className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[-10px] bottom-[-5px]"
                                >
                                    <AiFillCamera />
                                </label>
                            </aside>
                            <p className="text-[12px] mt-1 w-full text-center">
                                {isProfileStatus}
                            </p>
                        </li>
                        <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <label className=" text-[12px] mb-1 w-[90%]">
                                *NAME
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Required",
                                })}
                                className="field"
                            />
                            {errors?.name && (
                                <p className="text-[10px]">
                                    {errors?.name?.message}
                                </p>
                            )}
                        </li>
                        <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                            <label
                                className=" text-[12px] mb-1 text-center uppercase cursor-pointer w-[90%] 480px:w-full"
                                htmlFor="signature"
                            >
                                Upload Signature
                            </label>
                            <input
                                id="signature"
                                type="file"
                                {...register("signature")}
                                className="absolute z-[-1] opacity-0"
                                onChange={(e) => DisplayImage(e, "signature")}
                            />
                            <p className="text-[10px] text-center w-full">
                                {isSignatureStatus}
                            </p>
                            {errors?.signature && (
                                <p className="text-[10px] text-center w-full">
                                    Required
                                </p>
                            )}
                        </li>
                    </ul>
                    <ul className={style.ThreeRows}>
                        <li>
                            <label>POSITION</label>
                            <input
                                type="text"
                                className="field"
                                {...register("position")}
                            />
                            {errors?.position && (
                                <p className="text-[10px]">
                                    {errors?.position?.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>EMPLOYEE ID</label>
                            <input
                                type="text"
                                className="field"
                                {...register("employee_id")}
                            />
                            {errors?.employee_id && (
                                <p className="text-[10px]">
                                    {errors?.employee_id?.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*DEPARTMENT</label>
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setDepartment(value);
                                    setValue("department", value);
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={isDepartment}
                                        readOnly
                                        {...register("department", {
                                            required: "Required",
                                        })}
                                    />
                                }
                                listArray={["Sample Department"]}
                            />
                            {errors?.department && (
                                <p className="text-[10px]">
                                    {errors?.department?.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*EMAIL</label>
                            <input
                                type="email"
                                className="field w-full"
                                {...register("email", {
                                    required: "Required",
                                })}
                            />
                            {errors?.email && (
                                <p className="text-[10px]">
                                    {errors?.email?.message}
                                </p>
                            )}
                        </li>

                        <li>
                            <label>*MOBILE</label>
                            <input
                                type="number"
                                className="field"
                                placeholder="+63"
                                {...register("mobile", {
                                    required: "Required",
                                    minLength: {
                                        value: 11,
                                        message: "Must be 11 Number",
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "Must be 11 Number",
                                    },
                                })}
                            />
                            {errors?.mobile && (
                                <p className="text-[10px]">
                                    {errors?.mobile?.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*CORPORATE</label>
                            <CorporateDropDown
                                isCorporate={isCorporate}
                                setCorporate={setCorporate}
                                register={{
                                    ...register("corporate", {
                                        required: "Required",
                                    }),
                                }}
                            />
                            {errors?.corporate && (
                                <p className="text-[10px]">
                                    {errors?.corporate?.message}
                                </p>
                            )}
                        </li>
                    </ul>

                    {type === "create" ? (
                        <div className={style.button_container}>
                            <aside
                                className="button_cancel cursor-pointer"
                                onClick={cancel}
                            >
                                CANCEL
                            </aside>
                            <button className="buttonRed" type="submit">
                                NEXT
                            </button>
                        </div>
                    ) : (
                        <div className={style.SaveButton}>
                            <aside
                                className={style.back}
                                onClick={() => {
                                    setUserForm([true, false]);
                                    setToggle(false);
                                }}
                            >
                                BACK
                            </aside>

                            <div className={style.Save}>
                                <div>
                                    <button
                                        type="submit"
                                        name="save"
                                        className={style.save_button}
                                    >
                                        Save
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
                                            >
                                                SAVE & NEW
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </form>
                {type === "create" && (
                    <UserRolePermissionsForm
                        setUserForm={setUserForm}
                        userForm={userForm}
                        userInfo={isPayload}
                        type={type}
                        DefaultTable={[
                            {
                                id: 1,
                                permission: "",
                                access: "",
                                duration: "",
                            },
                        ]}
                    />
                )}
            </section>
        </div>
    );
}
