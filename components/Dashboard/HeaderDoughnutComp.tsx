import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TextNumberDisplay } from "../Reusable/NumberFormat";
import DoughnutChartComp from "./DoughnutChartComp";
import { GetDashboardProperty } from "./Query";
import SelectDropdown from "../Reusable/SelectDropdown";
import NameIDDropdown from "../Dropdowns/NameIDDropdown";

export default function HeaderDoughnutComp() {
    const [isUnitArea, setUnitArea] = useState("Unit");

    const [OccupancyDemographic, setOccupancyDemographic] = useState({
        value: "Ownership",
        toggle: false,
    });

    const [CitizenType, setCitizenType] = useState({
        value: "Owner and Developer",
        toggle: false,
    });

    const [filter, setFilter] = useState({
        value: "",
        toggle: false,
    });

    const [isTower, setTower] = useState({
        id: "",
        value: "",
    });
    const [isFloor, setFloor] = useState({
        id: "",
        value: "",
    });

    const [isType, setType] = useState({
        value: "",
        toggle: false,
    });

    const [isClass, setClass] = useState({
        value: "",
        toggle: false,
    });

    const { data, isLoading } = GetDashboardProperty(
        isTower.id,
        isFloor.id,
        isType.value,
        OccupancyDemographic.value,
        CitizenType.value,
        isClass.value
    );

    // left - owner, right developer
    const [dataSetUnit, setDataSetUnit] = useState([
        {
            label: "",
            dataSet: 0,
            color: "",
        },
    ]);

    const [dataSetArea, setDataSetArea] = useState([
        {
            label: "",
            dataSet: 0,
            color: "",
        },
    ]);

    useEffect(() => {
        if (data?.data !== undefined) {
            const recordPerUnit = data?.data?.recordsPerUnit.map(
                (itemMap: any, index: number) => {
                    let color = "#8f384d";
                    if (index % 2 === 0) {
                        color = "#d4a8a8";
                    }
                    if (index % 3 === 0) {
                        color = "#fa8b00";
                    }
                    if (index % 4 === 0) {
                        color = "#2e4364";
                    }
                    return {
                        label: itemMap.label,
                        dataSet: itemMap.percentage,
                        color: color,
                    };
                }
            );
            setDataSetUnit(recordPerUnit);
            // ----------------------------------------------------------------------------------------
            const recordPerArea = data?.data?.recordsPerArea.map(
                (itemMap: any, index: number) => {
                    let color = "#8f384d";
                    if (index % 2 === 0) {
                        color = "#d4a8a8";
                    }
                    if (index % 3 === 0) {
                        color = "#fa8b00";
                    }
                    if (index % 4 === 0) {
                        color = "#2e4364";
                    }
                    return {
                        label: itemMap.label,
                        dataSet: itemMap.count,
                        color: color,
                    };
                }
            );
            setDataSetArea(recordPerArea);
        }
    }, [data?.data]);

    useEffect(() => {
        setTower({
            id: "",
            value: "",
        });
        setFloor({
            id: "",
            value: "",
        });
        setType({
            value: "",
            toggle: false,
        });
        setClass({
            value: "",
            toggle: false,
        });
    }, [filter.value]);

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
                                setOccupancyDemographic({
                                    ...OccupancyDemographic,
                                    toggle: true,
                                })
                            }
                        >
                            {OccupancyDemographic.value}
                            <IoMdArrowDropdown className=" text-[20px]" />
                        </span>

                        {OccupancyDemographic.toggle && (
                            <ul className="text-ThemeRed bg-white shadow-lg absolute top-full left-0">
                                <li
                                    onClick={() =>
                                        setOccupancyDemographic({
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
                                        setOccupancyDemographic({
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
                            setCitizenType({
                                ...CitizenType,
                                toggle: true,
                            })
                        }
                    >
                        {CitizenType.value}
                        <IoMdArrowDropdown className=" text-[20px]" />
                    </span>

                    {CitizenType.toggle && (
                        <ul className="text-ThemeRed bg-white shadow-lg absolute top-full left-0">
                            <li
                                onClick={() =>
                                    setCitizenType({
                                        toggle: false,
                                        value: "Owner and Developer",
                                    })
                                }
                                className="font-NHU-bold  text-[12px] cursor-pointer hover:bg-ThemeRed hover:text-white  px-2 py-1"
                            >
                                Owner & Developer Class
                            </li>
                            <li
                                onClick={() =>
                                    setCitizenType({
                                        toggle: false,
                                        value: "Filipino and Foreigner",
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
                            value={
                                isUnitArea === "Unit"
                                    ? data?.data?.totalPerUnit
                                    : data?.data?.totalPerArea
                            }
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
                                alt="filter"
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
                        {filter.value === "Class" && (
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setClass({
                                        ...isClass,
                                        value: value,
                                    });
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field mini"
                                        value={isClass.value}
                                        readOnly
                                        autoComplete="off"
                                    />
                                }
                                listArray={["Saleable", "Leaseable", "Common"]}
                            />
                        )}
                        {filter.value === "Type" && (
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setType({
                                        ...isType,
                                        value: value,
                                    });
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field mini"
                                        value={isType.value}
                                        readOnly
                                        autoComplete="off"
                                    />
                                }
                                listArray={["Parking", "Unit", "Commercial"]}
                            />
                        )}
                        {filter.value === "Tower" && (
                            <div className="w-[200px]">
                                <NameIDDropdown
                                    value={isTower.value}
                                    setValue={setTower}
                                    width={""}
                                    placeholder={""}
                                    endpoint={"/admin/property/tower"}
                                />
                            </div>
                        )}
                        {filter.value === "Floor" && (
                            <div className="w-[200px]">
                                <NameIDDropdown
                                    value={isFloor.value}
                                    setValue={setFloor}
                                    width={""}
                                    placeholder={""}
                                    endpoint={"/admin/property/floor"}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="w-full flex flex-wrap justify-center mt-2">
                <DoughnutChartComp
                    dataSet={isUnitArea === "Unit" ? dataSetUnit : dataSetArea}
                />
            </div>
        </section>
    );
}
