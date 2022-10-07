import React from "react";

export default function CustomerInformation() {
    return (
        <ul className="flex flex-wrap">
            <li className=" w-full">
                <h1 className=" font-NHU-bold text-[24px] mb-5">
                    Contact Information
                </h1>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">MOBILE</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    09999999999
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">CO-OWNER</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    Jualiana Dela Cruz
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">BIRTH DATE</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    23 July 1998
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    REGITERED EMAIL
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    juan@gmail.com
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    PREFERED EMAIL
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    juandelacruz@no
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    REGISTERED ADDRESS
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    Quezon City
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    MAILING ADDRESS
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    Quezon City
                </h4>
            </li>
        </ul>
    );
}
