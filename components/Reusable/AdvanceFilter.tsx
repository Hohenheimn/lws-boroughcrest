import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useQuery } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";
import { BarLoader } from "react-spinners";

type AdvanceFilter = {
    isAdvFilter: isAdvFilter[];
    setAdvFilter: Function;
    endpoint: string;
};

export type Advancefilter = isAdvFilter[];

type isAdvFilter = {
    key: string;
    value: string;
};

export function AdvanceFilter({
    isAdvFilter,
    setAdvFilter,
    endpoint,
}: AdvanceFilter) {
    const [isToggle, setToggle] = useState(false);

    return (
        <div className="relative ml-5">
            <Tippy theme="ThemeRed" content="Advance Filter">
                <button
                    className="relative w-[25px] aspect-square hover:scale-[1.2] transition-all duration-200 ease-linear"
                    onClick={() => setToggle(!isToggle)}
                >
                    <Image
                        src="/Images/f_Filter.png"
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
                    endpoint={endpoint}
                />
            )}
        </div>
    );
}

type AdvFilterList = {
    setToggle: Function;
    isAdvFilter: isAdvFilter[];
    setAdvFilter: Function;
    endpoint: string;
};

const AdvFilterList = ({
    setToggle,
    isAdvFilter,
    setAdvFilter,
    endpoint,
}: AdvFilterList) => {
    const AdvFilter: any = useRef();
    const [isSearch, setSearch] = useState("");

    const { isLoading, data, isError } = useQuery(
        ["advance-filter", isSearch, endpoint],
        () => {
            return api.get(`${endpoint}${isSearch}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );

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

    const AddToFilter = (key: string, value: string) => {
        setAdvFilter([
            ...isAdvFilter,
            {
                key: key,
                value: value,
            },
        ]);
    };

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
                className=" bg-Gray shadow-md w-full px-2 py-1 rounded-md mb-2 outline-none"
                placeholder="search"
                value={isSearch}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {data?.data.map((item: isAdvFilter, index: number) => (
                    <li
                        className=" text-Gray2 hover:text-ThemeRed hover:underline cursor-pointer text-[14px]"
                        key={index}
                        onClick={() => AddToFilter(item.key, item.value)}
                    >
                        {item.value} -{" "}
                        <span className=" text-Gray1">{item.key}</span>
                    </li>
                ))}
            </ul>
            {isLoading && (
                <div className="w-full flex justify-center items-center">
                    <aside className="text-center flex justify-center py-5">
                        <BarLoader
                            color={"#8f384d"}
                            height="10px"
                            width="200px"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </aside>
                </div>
            )}
            {isError && (
                <div className="w-full flex justify-center items-center">
                    <aside className="text-center flex justify-center py-5">
                        <h1>Something is wrong!</h1>
                    </aside>
                </div>
            )}
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
