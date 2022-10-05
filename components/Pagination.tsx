import React from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

export default function Pagination() {
    return (
        <div className=" w-full flex justify-end mt-32">
            <ul className=" flex items-center">
                <li>
                    <RiArrowLeftSLine className=" text-[32px] text-ThemeRed cursor-pointer" />
                </li>
                <li className=" border-2 border-white flex items-center text-gray-400">
                    <div className=" text-ThemeRed font-bold h-8 w-8 480px:w-6 480px:h-6 480px:text-[12px] flex justify-center items-center bg-[#eeeff2] border-r border-white cursor-pointer">
                        1
                    </div>
                    <div className=" h-8 w-8 480px:w-6 480px:h-6 480px:text-[12px] flex justify-center items-center bg-[#eeeff2] border-r border-white cursor-pointer">
                        2
                    </div>
                    <div className=" h-8 w-8 480px:w-6 480px:h-6 480px:text-[12px] flex justify-center items-center bg-[#eeeff2] border-r border-white cursor-pointer">
                        3
                    </div>
                    <div className=" h-8 w-8 480px:w-6 480px:h-6 480px:text-[12px] flex justify-center items-center bg-[#eeeff2] border-r border-white cursor-pointer">
                        4
                    </div>
                    <div className=" h-8 w-8 480px:w-6 480px:h-6 480px:text-[12px] flex justify-center items-center bg-[#eeeff2]">
                        5
                    </div>
                </li>

                <li>
                    <RiArrowRightSLine className=" text-[32px] text-ThemeRed cursor-pointer" />
                </li>
            </ul>
        </div>
    );
}
