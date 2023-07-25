import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import style from "../../../styles/Popup_Modal.module.scss";
import AppContext from "../../Context/AppContext";
import CorporateDropDown from "../../Dropdowns/CorporateDropDown";
import { SendLink } from "../../ReactQuery/ForgotPassword";
import DynamicPopOver from "../../Reusable/DynamicPopOver";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import {
    NumberBlockInvalidKey,
    TextFieldValidation,
} from "../../Reusable/InputField";
import { ContactNumberFormat } from "../../Reusable/NumberFormat";
import Department from "./Department";
import { UpdateUserInfo } from "./Query";
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

    let buttonClicked = "";

    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const [isRoleName, setRoleName] = useState({
        id: "",
        value: "",
    });

    const [isSave, setSave] = useState(false);

    const [isDepartmentVal, setDepartmentVal] = useState({
        id: DefaultValue?.department_id,
        value: DefaultValue?.department,
        firstVal: DefaultValue?.department,
        firstID: DefaultValue?.department_id,
    });

    useEffect(() => {
        setPayload({
            ...isPayload,
            department: isDepartmentVal.value,
            department_id: isDepartmentVal.id,
        });
    }, [isDepartmentVal]);

    const [isDepartment, setDepartment] = useState(false);

    const updateDepartmentHandler = (value: any, id: any) => {
        setDepartmentVal({
            id: id,
            value: value,
            firstVal: value,
            firstID: id,
        });
        setValue("department", value);
    };

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
        setValue,
        reset,
        formState: { errors },
    } = useForm<UserFormType>();

    const Reset = () => {
        reset();

        setCorporate({
            id: DefaultValue.corporate_id,
            value: DefaultValue.corporate,
        });

        setRoleName({
            id: "",
            value: "",
        });

        setDepartmentVal({
            id: DefaultValue?.department_id,
            value: DefaultValue?.department,
            firstVal: DefaultValue?.department,
            firstID: DefaultValue?.department_id,
        });

        setSelectedRolePermission([]);

        setPayload({
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

        setProfileUrl({
            url: "/Images/sampleProfile.png",
            error: "",
        });

        setSignatureUrl({
            url: "/Images/sampleProfile.png",
            error: "",
        });

        setUserForm([true, false]);
    };

    const { setNewUserToggle } = useContext(AppContext);

    const [userForm, setUserForm] = useState([true, false]);

    const [isStatus, setStatus] = useState<string>("Active");

    const [isCorporate, setCorporate] = useState<{
        id: string | number;
        value: any;
    }>({
        id: DefaultValue.corporate_id,
        value: DefaultValue.corporate,
    });

    useEffect(() => {
        setPayload({
            ...isPayload,
            corporate: isCorporate.value,
            corporate_id: isCorporate.id,
        });
    }, [isCorporate]);

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
        setDepartmentVal({
            id: DefaultValue?.department_id,
            value: DefaultValue?.department,
            firstVal: DefaultValue?.department,
            firstID: DefaultValue?.department_id,
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

    const closeForm = () => {
        setNewUserToggle(false);
        if (router.query.id === undefined) {
            router.push("");
        }
    };

    const ID: any = router.query.id;
    const queryClient = useQueryClient();

    const onSuccess = () => {
        if (isButtonClicked === "new") {
            router.push("/project/user?new");
        }

        queryClient.invalidateQueries(["user-list"]);

        setPrompt({
            message: "User successfully updated",
            type: "success",
            toggle: true,
        });

        setUserForm([true, false]);

        setToggle(false);
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate: UpdateMutate, isLoading: UpdateLoading } = UpdateUserInfo(
        ID,
        onSuccess,
        onError
    );

    const Next = async (data: UserFormType) => {
        if (isProfileUrl.error !== "" || isSignatureUrl.error !== "") return;
        const Payload = {
            employee_id: isPayload.employee_id,
            name: isPayload.name,
            email: isPayload.email,
            corporate_id: isCorporate.id,
            department_id: isDepartmentVal.id,
            contact_no: isPayload.contact_no,
            position: isPayload.position,
            image_photo: data.profile[0] === undefined ? null : data.profile[0],
            image_signature:
                data.signature[0] === undefined ? null : data.signature[0],
            status:
                isStatus === null || isStatus === undefined
                    ? "Inactive"
                    : isStatus,
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
            if (
                Payload.corporate_id === "" ||
                Payload.corporate_id === null ||
                Payload.corporate_id === undefined
            ) {
                setPrompt({
                    message: "Select a Corporate",
                    type: "draft",
                    toggle: "",
                });
                return;
            }

            const updatePayload: any = {
                ...Payload,
                _method: "PUT",
            };

            const formData = new FormData();

            const arrayData: any = [];

            const keys = Object.keys(updatePayload);

            await keys.forEach((key) => {
                if (
                    key === "image_photo" ||
                    key === "image_valid_id" ||
                    key === "image_signature"
                ) {
                    if (
                        updatePayload[key] === undefined ||
                        updatePayload[key] === null
                    ) {
                        arrayData.push({
                            key: key,
                            keyData: "",
                        });
                    } else {
                        arrayData.push({
                            key: key,
                            keyData: updatePayload[key],
                        });
                    }
                } else {
                    let value = updatePayload[key];
                    if (key === "contact_no") {
                        value = `0${value}`;
                    }

                    arrayData.push({
                        key: key,
                        keyData: value,
                    });
                }
            });

            buttonClicked = isButtonClicked;

            arrayData.map(({ key, keyData }: any) => {
                formData.append(key, keyData);
            });

            UpdateMutate(formData);
        }
    };

    const [isSelectedRolePermission, setSelectedRolePermission] = useState([]);

    const SuccessSendLink = () => {
        setPrompt({
            message: "Email sent successfully",
            type: "success",
            toggle: true,
        });
    };

    const ErrorSendLink = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate: SendFPLink, isLoading: SendLinkLoading } = SendLink(
        SuccessSendLink,
        ErrorSendLink
    );

    const SendLinkFPHandler = () => {
        SendFPLink(DefaultValue.email);
    };

    if (type === "create" && userForm[1] === true) {
        return (
            <UserRoleAndPermissionsCheckBox
                userInfo={isPayload}
                setUserInfo={setPayload}
                setUserForm={setUserForm}
                type={"create"}
                isSelectedRolePermission={isSelectedRolePermission}
                setSelectedRolePermission={setSelectedRolePermission}
                isRoleName={isRoleName}
                setRoleName={setRoleName}
                closeForm={closeForm}
                Reset={Reset}
                DefaultSelected={[]}
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
                                    if (!TextFieldValidation(e, 9999999))
                                        return;
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
                            <DynamicPopOver
                                className="w-full"
                                samewidth={false}
                                toRef={
                                    <input
                                        type="text"
                                        className="field w-full"
                                        onClick={() => setDepartment(true)}
                                        autoComplete="off"
                                        value={isDepartmentVal.value}
                                        {...register("department")}
                                        onChange={(e: any) =>
                                            setDepartmentVal({
                                                ...isDepartmentVal,
                                                value: e.target.value,
                                            })
                                        }
                                    />
                                }
                                toPop={
                                    <>
                                        {isDepartment && (
                                            <Department
                                                set={setDepartment}
                                                update={updateDepartmentHandler}
                                                isValID={isDepartmentVal.id}
                                                isObject={isDepartmentVal}
                                                setObject={setDepartmentVal}
                                            />
                                        )}
                                    </>
                                }
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

                            <ContactNumberFormat
                                value={isPayload.contact_no}
                                className=" w-full"
                                register={{
                                    ...register("mobile", {
                                        minLength: {
                                            value: 10,
                                            message: "Must be 10 Number",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Must be 10 Number",
                                        },
                                        pattern: {
                                            value: /^(9)\d{9}$/,
                                            message: "Invalid Contact Number",
                                        },
                                        onChange: (e) => {
                                            if (e.target.value.length <= 10) {
                                                setValue(
                                                    "mobile",
                                                    e.target.value
                                                );
                                                setPayload({
                                                    ...isPayload,
                                                    contact_no: e.target.value,
                                                });
                                            }
                                        },
                                    }),
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
                                onClick={closeForm}
                            >
                                CANCEL
                            </aside>
                            <button className="buttonRed" type="submit">
                                NEXT
                            </button>
                        </div>
                    ) : (
                        <div className={`relative ${style.SaveButton}`}>
                            <div
                                className="buttonRed cursor-pointer absolute top-0 left-0 480px:top-[-40px]"
                                onClick={SendLinkFPHandler}
                            >
                                {SendLinkLoading ? (
                                    <ScaleLoader
                                        color="#fff"
                                        height="10px"
                                        width="2px"
                                    />
                                ) : (
                                    "RESET PASSWORD"
                                )}
                            </div>
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
                                        {UpdateLoading ? (
                                            <ScaleLoader
                                                color="#fff"
                                                height="10px"
                                                width="2px"
                                            />
                                        ) : (
                                            "SAVE"
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
