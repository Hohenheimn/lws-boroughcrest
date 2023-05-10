import React, { useState, useEffect, useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import style from "../../../styles/Popup_Modal.module.scss";
import { useForm } from "react-hook-form";
import AppContext from "../../Context/AppContext";
import SelectDropdown from "../../Reusable/SelectDropdown";
import CorporateDropDown from "../../Dropdowns/CorporateDropDown";
import { RiArrowDownSFill } from "react-icons/ri";
import { UpdateUserInfo } from "./Query";
import { useRouter } from "next/router";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import {
    NumberBlockInvalidKey,
    TextFieldValidation,
} from "../../Reusable/InputField";
import { useQueryClient } from "react-query";
import UserRoleAndPermissionsCheckBox from "./UserRoleAndPermissionsCheckBox";

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

export type UserInfo = {
    employee_id: string | number;
    name: string;
    email: string;
    corporate_id: string | number;
    corporate: string;
    department_id: number | null;
    department: string;
    contact_no: string | number;
    position: string;
    image_photo: undefined | null | File;
    image_photo_url: string;
    image_signature: undefined | null | File;
    status: string;
};

type Props = {
    DefaultValue: UserInfo;
    type: string;
    setToggle: Function;
};

export default function UserForm({ DefaultValue, type, setToggle }: Props) {
    const [isButtonClicked, setButtonClicked] = useState("");

    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const [isSave, setSave] = useState(false);

    const [isDepartment, setDepartment] = useState<{
        id: number | null;
        value: string;
    }>({
        id: null,
        value: "",
    });

    const [isPayload, setPayload] = useState<UserInfo>({
        employee_id: "",
        name: "",
        email: "",
        corporate_id: "",
        corporate: "",
        department_id: null,
        department: "",
        contact_no: "",
        position: "",
        image_photo: undefined,
        image_signature: undefined,
        image_photo_url: "",
        status: "Active",
    });

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<UserFormType>();

    const { setNewUserToggle } = useContext(AppContext);

    const [userForm, setUserForm] = useState([true, false]);

    const [isStatus, setStatus] = useState<string>("Active");

    const [isCorporate, setCorporate] = useState<{
        id: string | number;
        value: any;
    }>({
        id: "",
        value: "",
    });

    const [isProfileUrl, setProfileUrl] = useState({
        url: "/Images/sampleProfile.png",
        error: "",
    });

    const [isSignatureUrl, setSignatureUrl] = useState({
        url: "/Images/sampleProfile.png",
        error: "",
    });

    useEffect(() => {
        setPayload({
            ...isPayload,
            image_photo_url: isProfileUrl.url,
        });
    }, [isProfileUrl.url]);

    useEffect(() => {
        if (
            DefaultValue.image_photo_url !== "" &&
            DefaultValue.image_photo_url !== null &&
            DefaultValue.image_photo_url !== undefined
        ) {
            setProfileUrl({
                url: DefaultValue.image_photo_url,
                error: "",
            });
        } else {
            setProfileUrl({
                url: "/Images/sampleProfile.png",
                error: "",
            });
        }
        setDepartment({
            id: DefaultValue.department_id,
            value: DefaultValue.department,
        });
        setCorporate({
            id: DefaultValue.corporate_id,
            value: DefaultValue.corporate,
        });
        setStatus(DefaultValue.status);
        setPayload({
            employee_id: DefaultValue.employee_id,
            name: DefaultValue.name,
            email: DefaultValue.email,
            corporate_id: DefaultValue.corporate_id,
            corporate: DefaultValue.corporate,
            department_id: DefaultValue.department_id,
            department: DefaultValue.department,
            contact_no: DefaultValue.contact_no,
            position: DefaultValue.position,
            image_photo: DefaultValue.image_photo,
            image_signature: DefaultValue.image_signature,
            image_photo_url:
                DefaultValue.image_photo_url === null ||
                DefaultValue.image_photo_url === "" ||
                DefaultValue.image_photo_url === undefined
                    ? "/Images/sampleProfile.png"
                    : DefaultValue.image_photo_url,
            status: DefaultValue.status,
        });
    }, []);

    const DisplayImage = (e: any, setImg: Function, type: string) => {
        let defaultUrl = "/Images/sampleProfile.png";
        if (type === "validID") {
            defaultUrl = "/Images/id-sample.png";
        }
        if (e.target.files[0]?.size > 2000000) {
            setImg({
                url: defaultUrl,
                error: "Image must be 2mb only",
            });
            return;
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
                    setImg({
                        url: event.target.result,
                        error: "",
                    });
                    if (type === "signature") {
                        setPayload({
                            ...isPayload,
                            image_signature: e.target.files[0],
                        });
                    }

                    if (type === "profile") {
                        setPayload({
                            ...isPayload,
                            image_photo: e.target.files[0],
                            image_photo_url: event.target.result,
                        });
                    }
                });
            } else {
                setImg({
                    url: defaultUrl,
                    error: "Invalid Image File",
                });
            }
        } else {
            setImg({
                url: defaultUrl,
                error: "Image file removed",
            });
        }
    };

    const cancel = () => {
        setNewUserToggle(false);
        router.push("");
    };

    const ID: any = router.query.modify;
    const queryClient = useQueryClient();

    const onSuccess = () => {
        if (isButtonClicked === "new") {
            router.push("/project/user?new");
        }
        if (router.query.modify === undefined) {
            queryClient.invalidateQueries(["user-list"]);
        } else {
            queryClient.invalidateQueries(["user-detail"]);
        }
        cancel();
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate: UpdateMutate, isLoading: UpdateLoading } = UpdateUserInfo(
        ID,
        onSuccess,
        onError
    );

    const Next = (data: UserFormType) => {
        if (isProfileUrl.error !== "" || isSignatureUrl.error !== "") return;
        const Payload = {
            employee_id: isPayload.employee_id,
            name: isPayload.name,
            email: isPayload.email,
            corporate_id: isCorporate.id,
            department_id: isDepartment.id,
            contact_no: isPayload.contact_no,
            position: isPayload.position,
            image_photo: data.profile[0] === undefined ? null : data.profile[0],
            image_signature:
                data.signature[0] === undefined ? null : data.signature[0],
            status: isStatus,
        };
        setPayload({
            ...isPayload,
            image_photo: data.profile[0] === undefined ? null : data.profile[0],
            image_signature:
                data.signature[0] === undefined ? null : data.signature[0],
        });
        if (type === "create") {
            setUserForm([false, true]);
        }
        if (type === "modify") {
            const updatePayload = {
                ...Payload,
                _method: "PUT",
            };

            console.log(isButtonClicked);
        }
    };

    if (type === "create" && userForm[1] === true) {
        return (
            <UserRoleAndPermissionsCheckBox
                setUserForm={setUserForm}
                userInfo={isPayload}
                type={"create"}
            />
        );
    }

    return (
        <div className={style.container}>
            <section>
                <form
                    onSubmit={handleSubmit(Next)}
                    className={`${userForm[0] === true ? "" : "hidden"}`}
                >
                    <p className={style.modal_title}>
                        <span className=" capitalize">{type}</span> User
                    </p>
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
                                    className=" bg-white h-full w-full overflow-hidden rounded-full object-cover shadow-lg relative"
                                    htmlFor="profile"
                                >
                                    <Image
                                        src={isPayload.image_photo_url}
                                        alt=""
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="profile"
                                    {...register("profile")}
                                    onChange={(e) =>
                                        DisplayImage(
                                            e,
                                            setProfileUrl,
                                            "profile"
                                        )
                                    }
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
                                {isProfileUrl.error}
                            </p>
                        </li>
                        <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                            <label className=" text-[12px] mb-1 w-[90%]">
                                *NAME
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                value={isPayload.name}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setPayload({
                                        ...isPayload,
                                        name: e.target.value,
                                    });
                                }}
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
                                onChange={(e) =>
                                    DisplayImage(
                                        e,
                                        setSignatureUrl,
                                        "signature"
                                    )
                                }
                            />
                            <p className="text-[10px] text-center w-full">
                                {isSignatureUrl.error}
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
                                value={isPayload.position}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 255)) return;
                                    setPayload({
                                        ...isPayload,
                                        position: e.target.value,
                                    });
                                }}
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
                                value={isPayload.employee_id}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 20)) return;
                                    setPayload({
                                        ...isPayload,
                                        employee_id: e.target.value,
                                    });
                                }}
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
                                selectHandler={(value: string) => {}}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={isDepartment.value}
                                        readOnly
                                        {...register("department")}
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
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid Email",
                                    },
                                })}
                                value={isPayload.email}
                                onChange={(e) => {
                                    if (e.target.value.length > 320) return;
                                    setPayload({
                                        ...isPayload,
                                        email: e.target.value,
                                    });
                                }}
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
                                    minLength: {
                                        value: 11,
                                        message: "Must be 11 Number",
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
                                value={isPayload.contact_no}
                                onKeyDown={NumberBlockInvalidKey}
                                onChange={(e) => {
                                    if (!TextFieldValidation(e, 11)) return;
                                    setPayload({
                                        ...isPayload,
                                        contact_no: e.target.value,
                                    });
                                }}
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
                                    ...register("corporate"),
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
                                CANCEL
                            </aside>

                            <div className={style.Save}>
                                <div>
                                    <button
                                        type="submit"
                                        name="save"
                                        onClick={() => setButtonClicked("save")}
                                        className={style.save_button}
                                    >
                                        SAVE
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
                                                    setButtonClicked("new")
                                                }
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
                {/* {type === "create" && (
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
                )} */}
            </section>
        </div>
    );
}
