import React, { useState } from "react";
import Image from "next/image";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import PeriodCalendar from "../../../../PeriodCalendar";

export default function TableForm() {
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    return (
        <div>
            <ul className=" flex mb-5 flex-wrap">
                <li className="mr-5 820px:mb-5 flex items-center mb-5">
                    <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                        CHARGE
                    </p>
                    <input
                        type="text"
                        className=" rounded-md shadow-md 480px:text-[12px] outline-none px-2 py-1"
                    />
                </li>
                <li className="mr-5 820px:mb-5 flex items-center mb-5">
                    <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                        RATE
                    </p>
                    <input
                        type="text"
                        className=" rounded-md shadow-md 480px:text-[12px] outline-none px-2 py-1"
                    />
                </li>
                <li className=" 820px:mb-5 flex items-center mb-5">
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                </li>
            </ul>
            <div className="table_container">
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            <th>PROPERTY NAME</th>
                            <th>PREVIOUS READING</th>
                            <th>CURRENT READING</th>
                            <th>CONSUMPTION</th>
                            <th>MOVING AVERAGE CONSUMPTION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const List = () => {
    return (
        <tr>
            <td>
                <div className="item">
                    <h2>Unit 1</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <input type="text" />
                </div>
            </td>
            <td>
                <div className="item">
                    <input type="text" />
                </div>
            </td>
            <td>
                <div className="item">
                    <input type="text" />
                </div>
            </td>
            <td>
                <div className="item">
                    <h2 className="flex items-center">
                        150{" "}
                        <span className="flex items-center ml-3 text-Green">
                            <IoMdArrowDropdown />
                            15%
                        </span>
                        {/* <span className="flex items-center ml-3 text-ThemeRed">
                            <IoMdArrowDropup />
                            15%
                        </span> */}
                    </h2>
                </div>
            </td>
            <td>
                <div className="item w-[150px]">
                    <div className="finance_status">
                        <div className="status posted">
                            <div>
                                <Image
                                    src="/Images/f_posted.png"
                                    width={25}
                                    height={25}
                                    alt="Draft"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};
