import React, { useEffect, useState } from "react";

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
    const [hoverNumber, setHoverNumber] = useState(0);
    const [isHover, setHover] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const Length = SubmenuDetail.length;

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
                        isHover={isHover}
                        setHover={setHover}
                        ArrayLength={Length}
                        hoverNumber={hoverNumber}
                        setHoverNumber={setHoverNumber}
                        activePage={activePage}
                        setActivePage={setActivePage}
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
    setHover: Function;
    isHover: any;
    ArrayLength: number;
    setHoverNumber: Function;
    hoverNumber: number;
    setActivePage: Function;
    activePage: number;
};
const List = ({
    closeOnClick,
    SubmenuDetail,
    index,
    item,
    isHover,
    setHover,
    ArrayLength,
    setHoverNumber,
    hoverNumber,
    activePage,
    setActivePage,
}: List) => {
    const router = useRouter();
    const innerUrl = router.pathname.split("/")[2];
    const [selfHover, setSelfHover] = useState(false);
    const EnterHandler = () => {
        setHover(true);
        setSelfHover(true);
        setHoverNumber(index);
    };
    const LeaveHandler = () => {
        setHover(false);
        setSelfHover(false);
        setHoverNumber(0);
    };

    useEffect(() => {
        if (innerUrl === item.ActiveName) {
            setActivePage(index);
        }
    });

    const DelayForward = index * 50;
    const DelayBackward = (ArrayLength - index) * 50;
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
                        style={{
                            transitionDelay: `${
                                isHover ? DelayForward : DelayBackward
                            }ms`,
                        }}
                        className={` duration-[1s] ease-linear first:absolute bg-ThemeRed w-[80px] h-[80px] left-[3px] bottom-[10px] rounded-[6px] origin-left transition-all ${
                            (hoverNumber >= index || activePage >= index) &&
                            "rotate-[-270deg]"
                        } ${
                            innerUrl === item.ActiveName
                                ? "rotate-[-270deg]"
                                : ""
                        }`}
                    ></div>
                    <div className="absolute right-0 top-0 w-[12px] h-[46px] bg-[#fcfcff] rounded-bl-[6px] z-10"></div>

                    <div
                        className={`absolute bottom-0 right-0 transition-all duration-200 h-[8px] ${
                            !selfHover ? "w-[12px]" : "w-[0]"
                        }
                        ${innerUrl === item.ActiveName ? "w-[0]" : ""}
                       
                         bg-gray-300`}
                    ></div>
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
                    <p className=" z-10 relative text-[16px] 1550px:text-[14px]">
                        {item.name}
                    </p>
                </a>
            </Link>
        </li>
    );
};
