import React from "react";

export default function Reports() {
    return (
        <>
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
        </>
    );
}
