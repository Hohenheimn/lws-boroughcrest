import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import styleModal from "../../../../../styles/Popup_Modal.module.scss";
import DropdownSearch from "../../../../Reusable/DropdownSearch";
import Image from "next/image";
import PeriodCalendar from "../../../../Reusable/PeriodCalendar";

type Props = {
    toggle: Function;
};

export default function Readingform({ toggle }: Props) {
    const [formActive, setFormActive] = useState([true, false]);
    const [periodProperty, setPeriodProperty] = useState({
        from: "",
        to: "",
    });
    return (
        <div className={styleModal.container}>
            <section className={styleModal.wide}>
                <div className={formActive[0] ? "" : "hidden"}>
                    <h3 className="mb-5 text-ThemeRed">Select Property</h3>
                    <ul className="mb-5 flex justify-between 640px:flex-col 640px:items-end">
                        <li className=" flex items-center 640px:order-2 640px:w-full">
                            <p className="labelField">FILTER BY:</p>
                            <DropdownSearch />
                        </li>
                        <li className="640px:mb-5">
                            <input
                                type="file"
                                className=" absolute opacity-0"
                                id="import"
                            />
                            <Tippy theme="ThemeRed" content="Import">
                                <label className="iconNav" htmlFor="import">
                                    <Image
                                        src="/Images/Import.png"
                                        layout="fill"
                                        alt="Import"
                                    />
                                </label>
                            </Tippy>
                        </li>
                    </ul>
                    <div className="mb-5 flex items-center shadow-lg px-2 h-8 1550px:h-8 bg-white flex-1 max-w-[300px] 640px:max-w-[unset] rounded-lg">
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 outline-none text-[12px] shadow-none"
                            style={{ boxShadow: "none" }}
                        />
                        <BiSearch className="text-[16px] text-gray-400" />
                    </div>
                    <div className="w-full overflow-auto max-h-[50vh]">
                        <table className="table_list miniTable">
                            <thead>
                                <tr>
                                    <th className="text-start">ID</th>
                                    <th>Unit Code</th>
                                    <th>Project</th>
                                    <th>Developer</th>
                                    <th>Tower</th>
                                    <th>Floor</th>
                                    <th>Class</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableList />
                                <TableList />
                                <TableList />
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end py-5 mt-10">
                        <button
                            className="button_cancel"
                            onClick={() => toggle(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="buttonRed"
                            onClick={() => {
                                setFormActive([false, true]);
                            }}
                        >
                            NEXT
                        </button>
                    </div>
                </div>
                {/* Next Form */}
                <div className={formActive[1] ? "" : "hidden"}>
                    <h3 className="mb-5 text-ThemeRed">New Reading</h3>
                    <button
                        className="buttonRed mb-5"
                        onClick={() => {
                            setFormActive([true, false]);
                        }}
                    >
                        PROPERTY
                    </button>
                    <ul className="flex flex-wrap mb-5">
                        <li className=" flex items-center mr-5 mb-5 1024px:mb-2">
                            <p className=" labelField">CHARGE:</p>
                            <input type="text" className="field" />
                        </li>
                        <li className=" flex items-center mr-5 mb-5 1024px:mb-2">
                            <p className=" labelField">RATE:</p>
                            <input type="text" className="field" />
                        </li>
                        <li className=" flex items-center mb-5 1024px:mb-2">
                            <PeriodCalendar
                                value={periodProperty}
                                setValue={setPeriodProperty}
                            />
                        </li>
                    </ul>
                    <div className="w-full overflow-auto max-h-[50vh]">
                        <table className="table_list forCrud miniTable">
                            <thead className="textRed">
                                <tr>
                                    <th>PROPERTY</th>
                                    <th>PREVIOUS READING</th>
                                    <th>CURRENT READING</th>
                                    <th>CONSUMPTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" className="field" />
                                    </td>
                                    <td>
                                        <input type="text" className="field" />
                                    </td>
                                    <td>
                                        <input type="text" className="field" />
                                    </td>
                                    <td>
                                        <input type="text" className="field" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end py-5 mt-10">
                        <button
                            className="button_cancel"
                            onClick={() => toggle(false)}
                        >
                            CANCEL
                        </button>
                        <button
                            className="buttonRed"
                            onClick={() => {
                                setFormActive([false, true]);
                            }}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
const TableList = () => {
    return (
        <tr>
            <td>123</td>
            <td>205</td>
            <td>Finance</td>
            <td>Builder</td>
            <td>Y tower</td>
            <td>2nd</td>
            <td>1</td>
            <td>Lorem ipsum</td>
        </tr>
    );
};
