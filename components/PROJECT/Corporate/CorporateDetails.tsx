import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import { imgProfile } from "../../../public/Images/Image";
import Image from "next/image";
import ModifyCorporate from "./ModifyCorporate";
export default function CorporateDetails() {
    const [toggleModify, setToggleModify] = useState(false);
    return (
        <div>
            {toggleModify && (
                <ModifyCorporate setToggleModify={setToggleModify} />
            )}
            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5">
                Corporate Details
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
                    <aside className=" w-6/12 820px:w-10/12  480px:w-5/12 aspect-square relative shadow-xl">
                        <Image src={imgProfile.profile} layout="fill" />
                    </aside>
                </li>
                <li className=" w-9/12  480px:w-full flex flex-wrap items-start">
                    <ul className=" w-full flex flex-wrap">
                        <li className=" w-4/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                1234
                            </h4>
                        </li>
                        <li className=" w-4/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                CORPORATE NAME:
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                XYZ Company
                            </h4>
                        </li>
                        <li className=" w-4/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                GST TYPE
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                Non-VAT
                            </h4>
                        </li>
                        <li className=" w-4/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TIN
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                246-807-853-0000
                            </h4>
                        </li>
                        <li className=" w-4/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                RDO NUMBER:
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                056
                            </h4>
                        </li>
                        <li className=" w-4/12 text-start  820px:w-2/4 480px:w-full pr-2">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                SEC REGISTRATION NO:
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                2468078534
                            </h4>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul className=" w-full shadow-lg p-10  bg-white rounded-2xl">
                <h1 className=" font-bold text-[24px] mb-5">
                    Contact Information
                </h1>
                <ul className=" pl-10 1024px:pl-5 flex flex-wrap w-2/4 1280px:w-full mb-20 480px:mb-10">
                    <li className=" w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            CONTACT NO:
                        </p>
                        <h4 className=" text-gray-500 1024px:text-[14px]">
                            09999999999{" "}
                            <span className=" text-gray-400 text-[12px]">
                                (official)
                            </span>
                        </h4>
                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            09999999999
                        </h4>
                    </li>
                    <li className=" w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            EMAIL ADDRESS:
                        </p>
                        <h4 className=" text-gray-500 1024px:text-[14px]">
                            email@sample.com{" "}
                            <span className=" text-gray-400 text-[12px]">
                                (official)
                            </span>
                        </h4>
                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            email@sample.com
                        </h4>
                    </li>
                </ul>
                <h1 className=" font-bold text-[24px] mb-5">Address</h1>
                <ul className=" pl-10 1024px:pl-5 flex w-full flex-wrap">
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            UNIT/FLOOR/HOUSE NO.
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            1234
                        </h4>
                    </li>
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            BUILDING
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            Building 1
                        </h4>
                    </li>
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            STREET
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            Malaya kana street
                        </h4>
                    </li>
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            DISTRICT
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            District 1
                        </h4>
                    </li>
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            MUNICIPAL
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            Manila City
                        </h4>
                    </li>
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            PROVINCE
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            Metro Manila
                        </h4>
                    </li>
                    <li className=" w-1/4 1280px:w-4/12 1024px:w-2/4 480px:w-full pr-2">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            ZIP CODE
                        </p>

                        <h4 className=" text-gray-500 mb-3 1024px:text-[14px]">
                            2111
                        </h4>
                    </li>
                </ul>
            </ul>
        </div>
    );
}
