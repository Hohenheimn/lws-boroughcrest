import React, { useState } from "react";
import Image from "next/image";
import Tippy from "@tippy.js/react";

import { PencilButton } from "../../Reusable/Icons";
import Modal_Image from "../../Reusable/Modal_Image";
import DisplayUserRolePermissions from "./DisplayUserRolePermissions";
import UserForm from "./UserForm";
import UserInformation from "./UserInformation";
import { UserDetail } from "./UserTable";

type Props = {
    UserDetail: UserDetail;
};
export default function UserDetails({ UserDetail }: Props) {
    const [toggleModify, setToggleModify] = useState(false);
    const [isToggleInfoRole, setToggleInfoRole] = useState<boolean>(false);
    const [isView, setView] = useState<string | null>("");

    let ImagePhoto = "/Images/sampleProfile.png";
    if (UserDetail?.image_photo !== null) {
        ImagePhoto =
            "https://boroughcrest-api.lws.codes/get-img?image=" +
            UserDetail?.image_photo;
    }

    let Contact: any = UserDetail.contact_no ? UserDetail.contact_no : "";
    const first = Contact[0];
    if (first === 0 || first === "0") {
        Contact = Contact.replace(first, "");
    }

    return (
        <div>
            {isView !== "" && <Modal_Image setView={setView} isView={isView} />}
            {toggleModify && (
                <UserForm
                    setToggle={setToggleModify}
                    DefaultValue={{
                        image_photo: null,
                        image_photo_url: ImagePhoto,
                        image_signature: null,
                        name: UserDetail.name,
                        position: UserDetail.position,
                        employee_id: UserDetail.employee_id,
                        department_id: UserDetail.department_id,
                        department: UserDetail.department_name,
                        email: UserDetail.email,
                        contact_no: Contact,
                        corporate: UserDetail.corporate_name,
                        corporate_id: UserDetail.corporate_id,
                        status: UserDetail.status,
                    }}
                    type={"modify"}
                />
            )}

            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5">
                User Details
            </h1>
            <ul className=" w-full shadow-lg flex p-10 bg-white rounded-2xl flex-wrap mb-10">
                <li className=" flex justify-between items-center w-full mb-5">
                    <h1 className=" font-bold text-[24px] 480px:mb-0 480px:text-[16px]">
                        Primary Information
                    </h1>

                    <div>
                        <PencilButton
                            FunctionOnClick={() => setToggleModify(true)}
                            title={"Modify"}
                        />
                    </div>
                </li>
                <li className="w-3/12 480px:w-full p-5 flex justify-center items-center">
                    <aside className=" w-6/12 820px:w-10/12 rounded-full overflow-hidden 480px:w-5/12 aspect-square relative shadow-xl">
                        <Image
                            src={ImagePhoto}
                            alt=""
                            objectFit="cover"
                            layout="fill"
                        />
                    </aside>
                </li>
                <li className=" w-9/12  480px:w-full flex flex-wrap items-start">
                    <ul className=" w-full flex flex-wrap">
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {UserDetail.id}
                            </h4>
                        </li>
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                NAME
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {UserDetail.name}
                            </h4>
                        </li>
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px] mb-1">
                                STATUS
                            </p>
                            <Tippy
                                content={
                                    UserDetail.status === null
                                        ? "Inactive"
                                        : UserDetail.status
                                }
                                theme="ThemeRed"
                            >
                                <div className=" inline-block">
                                    <div
                                        className={`statusCircle ${UserDetail.status}`}
                                    ></div>
                                </div>
                            </Tippy>
                        </li>
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px] mb-1">
                                SIGNATURE
                            </p>
                            <button
                                onClick={() =>
                                    setView(UserDetail.image_signature)
                                }
                                className=" px-5 rounded-lg py-1 bg-ThemeRed text-white hover:bg-ThemeRed50 duration-75"
                            >
                                VIEW
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul className="flex items-end mb-2">
                <li
                    className={` text-[16px] uppercase mr-4 hover:underline cursor-pointer text-ThemeRed 480px:text-[14px] ${
                        !isToggleInfoRole && "underline font-NHU-bold"
                    }`}
                    onClick={() => setToggleInfoRole(false)}
                >
                    INFORMATION
                </li>
                <li
                    className={` text-[16px] uppercase mr-4 hover:underline cursor-pointer text-ThemeRed 480px:text-[14px] ${
                        isToggleInfoRole && "underline font-NHU-bold"
                    }`}
                    onClick={() => setToggleInfoRole(true)}
                >
                    Role and Permissions
                </li>
            </ul>
            <ul className=" w-full shadow-lg p-10  bg-white rounded-2xl">
                {!isToggleInfoRole && <UserInformation UserInfo={UserDetail} />}
                {isToggleInfoRole && (
                    <DisplayUserRolePermissions UserDetail={UserDetail} />
                )}
            </ul>
        </div>
    );
}
