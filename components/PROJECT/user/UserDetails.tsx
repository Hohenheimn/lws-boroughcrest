import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";
import ModifyUser from "./ModifyUser";
import UserInformation from "./UserInformation";
import UserRolePermissions from "./UserRolePermissions";
import Modal_Image from "../../Modal_Image";
export default function UserDetails() {
    const [toggleModify, setToggleModify] = useState(false);
    const [isToggleInfoRole, setToggleInfoRole] = useState<boolean>(false);
    const [isView, setView] = useState("");
    return (
        <div>
            {isView !== "" && <Modal_Image setView={setView} isView={isView} />}
            {toggleModify && <ModifyUser setToggleModify={setToggleModify} />}
            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5">
                User Details
            </h1>
            <ul className=" w-full shadow-lg flex p-10 bg-white rounded-2xl flex-wrap mb-10">
                <li className=" flex justify-between items-center w-full mb-5">
                    <h1 className=" font-bold text-[24px] 480px:mb-0 480px:text-[16px]">
                        Primary Information
                    </h1>
                    <HiPencil
                        className=" text-ThemeRed font-bold text-[32px] 480px:text-[24px] cursor-pointer"
                        onClick={() => setToggleModify(true)}
                    />
                </li>
                <li className="w-3/12 480px:w-full p-5 flex justify-center items-center">
                    <aside className=" w-6/12 820px:w-10/12 rounded-full overflow-hidden 480px:w-5/12 aspect-square relative shadow-xl">
                        <Image
                            src="/Images/sampleProfile.png"
                            alt=""
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
                                1234
                            </h4>
                        </li>
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                NAME
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                Juan Dela Cruz
                            </h4>
                        </li>
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px] mb-1">
                                STATUS
                            </p>
                            <div
                                className=" h-5 w-5 rounded-full border-4 border-[#19d142] mb-5"
                                style={{ boxShadow: "0 0 15px 0 #19d142" }}
                            ></div>
                        </li>
                        <li className=" w-6/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px] mb-1">
                                SIGNATURE
                            </p>
                            <button
                                onClick={() => setView("view_signature")}
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
                {!isToggleInfoRole && <UserInformation />}
                {isToggleInfoRole && <UserRolePermissions />}
            </ul>
        </div>
    );
}
