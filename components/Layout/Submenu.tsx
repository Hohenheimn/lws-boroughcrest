import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import "tippy.js/dist/tippy.css";

type SubmenuDetail = {
    SubmenuDetail?: any;
    closeOnClick: () => void;
};

export default function Submenu({
    SubmenuDetail,
    closeOnClick,
}: SubmenuDetail) {
    const router = useRouter();
    const innerUrl = router.pathname.split("/")[2];
    return (
        <ul className=" text-ThemeRed50 font-medium pt-2 overflow-hidden mt-2">
            {SubmenuDetail.map(
                (
                    item: { url: string; ActiveName: string; name: string },
                    index: number
                ) => (
                    <li className=" pl-16 flex items-center mb-2" key={index}>
                        <div
                            className={` h-10 -mt-9 w-3 mr-1 border-l-2 border-b-2 rounded-bl-lg ${
                                innerUrl === item.ActiveName
                                    ? "border-ThemeRed"
                                    : "border-gray-300"
                            }`}
                        ></div>
                        <Link href={`${item.url}`}>
                            <a
                                onClick={closeOnClick}
                                className={` w-fill flex-1 py-1 relative capitalize ${
                                    innerUrl === item.ActiveName
                                        ? "border-r-8 border-Green text-ThemeRed font-bold after:bg-GradientGreen after:w-full after:h-full after:absolute after:left-0 after:top-0"
                                        : "hover:border-r-8 hover:border-Green text-ThemeRed50 duration-75 after:bg-GradientGreen after:w-0 hover:after:w-full after:h-full after:absolute after:right-0 after:top-0 after:duration-[500ms]"
                                }`}
                            >
                                <p className=" z-10 relative text-[16px]">
                                    {item.name}
                                </p>
                            </a>
                        </Link>
                    </li>
                )
            )}
        </ul>
    );
}
