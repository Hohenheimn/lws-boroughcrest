import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type AdvanceFilter = {
    isAdvFilter: {
        name: string;
        subName: string;
    }[];
    setAdvFilter: Function;
};

export function AdvanceFilter({ isAdvFilter, setAdvFilter }: AdvanceFilter) {
    const [isToggle, setToggle] = useState(false);

    return (
        <div className="relative ml-5">
            <Tippy theme="ThemeRed" content="Advance Filter">
                <button
                    className="relative w-[25px] aspect-square hover:scale-[1.2] transition-all duration-200 ease-linear"
                    onClick={() => setToggle(!isToggle)}
                >
                    <Image
                        src="/Images/f_filter.png"
                        layout="fill"
                        alt="Advance Filter"
                    />
                </button>
            </Tippy>

            {isToggle && (
                <AdvFilterList
                    setAdvFilter={setAdvFilter}
                    isAdvFilter={isAdvFilter}
                    setToggle={setToggle}
                />
            )}
        </div>
    );
}

type AdvFilterList = {
    setToggle: Function;
    isAdvFilter: {
        name: string;
        subName: string;
    }[];
    setAdvFilter: Function;
};

const AdvFilterList = ({
    setToggle,
    isAdvFilter,
    setAdvFilter,
}: AdvFilterList) => {
    const AdvFilter: any = useRef();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!AdvFilter.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <aside
            className=" absolute top-[110%] bg-white shadow-md p-5 z-50 left-0 w-[300px]"
            ref={AdvFilter}
        >
            <h3 className="pb-1 font-NHU-medium text-ThemeRed border-b border-ThemeRed50 mb-2">
                Advance Filter
            </h3>
            <input
                type="text"
                className=" bg-Gray shadow-md w-full px-2 py-1 rounded-md mb-2"
                placeholder="search"
            />

            <ul>
                <li className=" text-Gray2 hover:text-ThemeRed hover:underline cursor-pointer text-[14px]">
                    Jomari Tiu - <span className=" text-Gray1">Developer</span>
                </li>
                <li className=" text-Gray2 hover:text-ThemeRed hover:underline cursor-pointer text-[14px]">
                    Jomari Tiu - <span className=" text-Gray1">Developer</span>
                </li>
                <li className=" text-Gray2 hover:text-ThemeRed hover:underline cursor-pointer text-[14px]">
                    Jomari Tiu - <span className=" text-Gray1">Developer</span>
                </li>
            </ul>
        </aside>
    );
};

type DisplayAdvFilter = {
    isAdvFilter: {
        name: string;
        subName: string;
    }[];
};

export function DisplayAdvFilter({ isAdvFilter }: DisplayAdvFilter) {
    return (
        <ul className="flex flex-wrap mb-5">
            {isAdvFilter.map((item, index) => (
                <li
                    key={index}
                    className="bg-[#d9d9d9] rounded-xl px-3 py-1 text-ThemeRed flex items-center shadow-md mr-2  text-[14px]"
                >
                    {item.name} -{" "}
                    <span className=" text-ThemeRed50 ml-1">
                        {item.subName}
                    </span>
                    <MdClose className="mt-1 ml-2 hover:text-ThemeRed50" />
                </li>
            ))}
        </ul>
    );
}
