import React, { useState } from "react";

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
                    <List
                        index={index}
                        key={index}
                        SubmenuDetail={SubmenuDetail}
                        closeOnClick={closeOnClick}
                        item={item}
                    />
                )
            )}
        </ul>
    );
}
type List = {
    SubmenuDetail?: any;
    closeOnClick: () => void;
    index: number;
    item: any;
};
const List = ({ closeOnClick, SubmenuDetail, index, item }: List) => {
    const router = useRouter();
    const innerUrl = router.pathname.split("/")[2];
    const [isHover, setHover] = useState(false);
    const EnterHandler = () => {
        setHover(true);
    };
    const LeaveHandler = () => {
        setHover(false);
    };
    return (
        <li
            className=" pl-16 flex items-center mb-2"
            onMouseEnter={EnterHandler}
            onMouseLeave={LeaveHandler}
        >
            <div
                style={{ zIndex: SubmenuDetail.length - index }}
                className="-mt-[45px] mr-1"
            >
                <div className=" w-[15px] h-[50px] bg-gray-300 rounded-bl-[10px] relative overflow-hidden ">
                    <div
                        className={`absolute bg-ThemeRed w-[80px] h-[80px] left-[3px] bottom-[10px] rounded-[6px] origin-left transition-all duration-1000 ${
                            isHover && "rotate-[-270deg]"
                        } ${
                            innerUrl === item.ActiveName
                                ? "rotate-[-270deg]"
                                : ""
                        }`}
                    ></div>
                    <div className="absolute right-0 top-0 w-[12px] h-[46px] bg-[#fcfcff] rounded-bl-[6px]"></div>
                </div>
            </div>
            <Link href={`${item.url}`}>
                <a
                    onClick={closeOnClick}
                    className={` w-fill flex-1 py-1 relative capitalize ${
                        innerUrl === item.ActiveName
                            ? "border-r-8 border-Green text-ThemeRed font-bold after:bg-GradientGreen after:w-full after:h-full after:absolute after:left-0 after:top-0"
                            : "hover:border-r-8 hover:border-Green text-ThemeRed50 duration-75 after:bg-GradientGreen after:w-0 hover:after:w-full after:h-full after:absolute after:right-0 after:top-0 after:duration-[500ms]"
                    }`}
                >
                    <p className=" z-10 relative text-[16px]">{item.name}</p>
                </a>
            </Link>
        </li>
    );
};
