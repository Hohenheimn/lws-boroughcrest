import React, { useState } from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import Calendar from "../../Calendar";
import DropdownSearch from "../../DropdownSearch";

export default function SubTable() {
    return (
        <>
            <div className="w-full overflow-auto">
                <table className={style.crudTable}>
                    <thead>
                        <tr>
                            <th>CUSTOMER ID</th>
                            <th>CUSTOMER NAME</th>
                            <th>DATE</th>
                            <th>REFERENCE NO.</th>
                            <th>CHARGE</th>
                            <th>ACCOUNT</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                    </tbody>
                </table>
            </div>
            <div className="mt-10 border-b border-ThemeRed"></div>
            <table className={style.crudTable}>
                <tbody>
                    <tr className={style.total}>
                        <td></td>
                        <td></td>
                        <td className={style.label}>
                            <h1>SUBTOTAL</h1>
                        </td>

                        <td>
                            <div className={style.peso}>
                                <aside>
                                    <Image
                                        src="/Images/peso.png"
                                        height={13}
                                        width={10}
                                        alt=""
                                    />
                                </aside>
                                <p>-</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-end py-5 mt-20">
                <button className="button_cancel">Cancel</button>
                <button className="buttonRed">SAVE</button>
            </div>
        </>
    );
}

const List = () => {
    // true is advnace false is received
    const [isTab, setTab] = useState(true);
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });
    return (
        <tr className={`${style.total} ${style.total1}`}>
            <td>
                <h2>09</h2>
            </td>
            <td>
                <DropdownSearch />
            </td>
            <td>
                <aside className="calendar relative w-[200px]">
                    <span className="cal ">
                        <Image
                            src="/Images/CalendarMini.png"
                            width={15}
                            height={15}
                            alt=""
                        />
                    </span>
                    <input
                        type="text"
                        value={isDate.value}
                        onChange={() => {}}
                        placeholder="dd/mm/yyyy"
                        onClick={() => setDate({ ...isDate, toggle: true })}
                        className="p-2 outline-none rounded-md shadow-md"
                    />

                    {isDate.toggle && (
                        <Calendar value={isDate} setValue={setDate} />
                    )}
                </aside>
            </td>
            <td>
                <input type="text" />
            </td>
            <td>
                <DropdownSearch />
            </td>
            <td>
                <aside
                    className={`ToggleAccount ${
                        isTab ? "Advance" : "received"
                    }`}
                >
                    <ul
                        className="min-w-[180px] flex relative"
                        onClick={() => setTab(!isTab)}
                    >
                        <li className="item ad">Advance</li>
                        <li className="item re">Received</li>
                        <li className="moving"></li>
                    </ul>
                </aside>
            </td>
            <td>
                <input type="text" />
            </td>
        </tr>
    );
};
