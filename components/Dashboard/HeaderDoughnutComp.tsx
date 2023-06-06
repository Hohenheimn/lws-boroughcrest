import React, { useState } from "react";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TextNumberDisplay } from "../Reusable/NumberFormat";
import DoughnutChartComp from "./DoughnutChartComp";

export default function HeaderDoughnutComp() {
    const [isUnitArea, setUnitArea] = useState("Unit");

    const [toggleDropdown, setToggleDropdown] = useState({
        value: "Ownership",
        toggle: false,
    });

    const [toggleDropdown2, setToggleDropdown2] = useState({
        value: "Owner & Developer Class",
        toggle: false,
    });

    const [filter, setFilter] = useState({
        value: "",
        toggle: false,
    });

    return (
        <section>
            <div className="flex justify-between flex-wrap">
                <div className="flex items-center 1280px:mb-2">
                    <h5 className=" text-[14px] mr-2">
                        Occupancy Demographic:
                    </h5>
                    <h5 className=" cursor-pointer flex items-center text-[13px] text-ThemeRed relative">
                        <span
                            className="flex items-center font-NHU-bold"
                            onClick={() =>
                                setToggleDropdown({
                                    ...toggleDropdown,
                                    toggle: true,
                                })
                            }
                        >
                            {toggleDropdown.value}
                            <IoMdArrowDropdown className=" text-[20px]" />
                        </span>

                        {toggleDropdown.toggle && (
                            <ul className="text-ThemeRed bg-white shadow-lg absolute top-full left-0">
                                <li
                                    onClick={() =>
                                        setToggleDropdown({
                                            toggle: false,
                                            value: "Ownership",
                                        })
                                    }
                                    className="font-NHU-bold  text-[12px] cursor-pointer hover:bg-ThemeRed hover:text-white  px-2 py-1"
                                >
                                    Ownership
                                </li>
                                <li
                                    onClick={() =>
                                        setToggleDropdown({
                                            toggle: false,
                                            value: "Occupancy",
                                        })
                                    }
                                    className="font-NHU-bold text-[12px] cursor-pointer hover:bg-ThemeRed hover:text-white  px-2 py-1"
                                >
                                    Occupancy
                                </li>
                            </ul>
                        )}
                    </h5>
                </div>
                <h5 className=" cursor-pointer flex items-center text-[13px] text-ThemeRed relative">
                    <span
                        className="flex items-center font-NHU-bold"
                        onClick={() =>
                            setToggleDropdown2({
                                ...toggleDropdown2,
                                toggle: true,
                            })
                        }
                    >
                        {toggleDropdown2.value}
                        <IoMdArrowDropdown className=" text-[20px]" />
                    </span>

                    {toggleDropdown2.toggle && (
                        <ul className="text-ThemeRed bg-white shadow-lg absolute top-full left-0">
                            <li
                                onClick={() =>
                                    setToggleDropdown2({
                                        toggle: false,
                                        value: "Owner & Developer Class",
                                    })
                                }
                                className="font-NHU-bold  text-[12px] cursor-pointer hover:bg-ThemeRed hover:text-white  px-2 py-1"
                            >
                                Owner & Developer Class
                            </li>
                            <li
                                onClick={() =>
                                    setToggleDropdown2({
                                        toggle: false,
                                        value: "Filipino & Foreigner Class",
                                    })
                                }
                                className="font-NHU-bold text-[12px] cursor-pointer hover:bg-ThemeRed hover:text-white  px-2 py-1"
                            >
                                Filipino & Foreigner Class
                            </li>
                        </ul>
                    )}
                </h5>
            </div>

            <ul className="w-full mt-2 flex justify-between">
                <li className="">
                    <h5 className=" font-NHU-bold text-[12px] flex items-center text-ThemeRed">
                        Total Properties:{" "}
                        <TextNumberDisplay
                            value={1000}
                            className={
                                " text-RegularColor font-NHU-bold text-[12px]"
                            }
                        />
                    </h5>
                </li>
                <li className="">
                    <div className="flex items-center">
                        <h5
                            className={` cursor-pointer rounded-md text-[12px] px-2 py-1 ${
                                isUnitArea === "Unit"
                                    ? "text-white bg-ThemeRed"
                                    : "text-ThemeRed"
                            } `}
                            onClick={() => setUnitArea("Unit")}
                        >
                            Unit
                        </h5>
                        <h5
                            className={` cursor-pointer rounded-md text-[12px] px-2 py-1 ${
                                isUnitArea === "Area"
                                    ? "text-white bg-ThemeRed"
                                    : "text-ThemeRed"
                            } `}
                            onClick={() => setUnitArea("Area")}
                        >
                            Area
                        </h5>
                    </div>
                </li>
            </ul>
            <div className="flex items-center mt-2">
                <div className="relative">
                    <Tippy content={"Filter"} theme="ThemeRed">
                        <div
                            onClick={() =>
                                setFilter({ ...filter, toggle: !filter.toggle })
                            }
                            className=" cursor-pointer hover:scale-110 mt-[-5px]"
                        >
                            <Image
                                src="/Images/d_filter_2.png"
                                width={15}
                                height={10}
                            />
                        </div>
                    </Tippy>
                    {filter.toggle && (
                        <ul className=" absolute top-full left-0 border bg-white border-gray-400">
                            <li
                                onClick={() =>
                                    setFilter({ value: "Tower", toggle: false })
                                }
                                className="text-[12px] px-2 py-1 text-RegularColor cursor-pointer hover:bg-ThemeRed hover:text-white"
                            >
                                Tower
                            </li>
                            <li
                                onClick={() =>
                                    setFilter({ value: "Floor", toggle: false })
                                }
                                className="text-[12px] px-2 py-1 text-RegularColor cursor-pointer hover:bg-ThemeRed hover:text-white"
                            >
                                Floor
                            </li>
                            <li
                                onClick={() =>
                                    setFilter({ value: "Class", toggle: false })
                                }
                                className="text-[12px] px-2 py-1 text-RegularColor cursor-pointer hover:bg-ThemeRed hover:text-white"
                            >
                                Class
                            </li>
                            <li
                                onClick={() =>
                                    setFilter({ value: "Type", toggle: false })
                                }
                                className="text-[12px] px-2 py-1 text-RegularColor cursor-pointer hover:bg-ThemeRed hover:text-white"
                            >
                                Type
                            </li>
                        </ul>
                    )}
                </div>
                {filter.value !== "" && (
                    <>
                        <h5 className=" text-ThemeRed ml-2 mr-2 text-[12px]">
                            {filter.value}
                        </h5>
                        <input
                            type="text"
                            className=" border border-gray-300 rounded-md outline-none text-[12px] px-2 py-1"
                        />
                    </>
                )}
            </div>
            <div className="w-full flex flex-wrap justify-center mt-2">
                <DoughnutChartComp />
            </div>
        </section>
    );
}
