import React from "react";
import Wysiwyg from "../../../components/Reusable/Wysiwyg";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import { AccessActionValidation } from "../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

export default function Index() {
    const PagePermisson = PageAccessValidation("Email Blast");
    const Permission_create = AccessActionValidation("Email Blast", "create");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (!Permission_create && Permission_create !== undefined) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission to Create Email Blast
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="pageTitle">Email Blast</h1>
            <ul className="w-full flex flex-wrap border-b border-gray-300 pb-10 mb-10">
                <li className="w-2/4 pr-5 640px:p-0 640px:w-full 640px:mb-5">
                    <div className="flex items-center mb-5 w-full 480px:flex-col 480px:items-start 480px:text-[14px]">
                        <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                            *RECIPIENT
                        </h2>
                        <input type="text" className="field w-full" />
                    </div>
                    <div className="flex items-center w-full 480px:flex-col 480px:items-start 480px:text-[14px]">
                        <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                            *TEMPLATE
                        </h2>
                        <input type="text" className="field w-full" />
                    </div>
                </li>
                <li className="w-2/4 pl-5 640px:p-0 640px:w-full">
                    <div className=" bg-white rounded-lg 1024px:text-[14px] 375px:text-[13px] shadow-lg p-2 h-20 overflow-auto font-NHU-bold text-RegularColor">
                        SB19, BLACK PINK, JUAN DELA CRUZ
                    </div>
                </li>
            </ul>
            <div>
                <div className="flex w-[500px] 640px:w-full mb-10 480px:flex-col 480px:items-start 480px:text-[14px]">
                    <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                        *SUBJECT
                    </h2>
                    <div>
                        <input type="text" className="field w-full" />
                        <span className="text-gray-400 text-[13px] italic">
                            Edit subject description
                        </span>
                    </div>
                </div>
                <p className="text-[20px] 1024px:text-[18px] mb-5">
                    Email Content
                </p>
                <Wysiwyg />
            </div>

            <div className="mt-5 w-full flex justify-end">
                <button className="button_cancel">CANCEL</button>
                <button className="buttonRed">APPLY</button>
            </div>
        </>
    );
}
