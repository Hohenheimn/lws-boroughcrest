import React, { useState } from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import Calendar from "../../Calendar";
import DynamicPopOver from "../../DynamicPopOver";

export default function TableForm() {
    return (
        <>
            <div className="w-full overflow-auto">
                <table className={style.crudTable}>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                            <th>BALANCE</th>
                            <th>REMARKS</th>
                            <th>DOCUMENT NO.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={style.label}>
                                <h1>TOTAL</h1>
                            </td>
                            <td>
                                <p className="withPeso">1000.00</p>
                            </td>
                            <td>
                                <p className="withPeso">1000.00</p>
                            </td>
                            <td>
                                <p className="withPeso">1000.00</p>
                            </td>
                            <td>
                                <div className={style.peso}>
                                    <p></p>
                                </div>
                            </td>
                            <td>
                                <div className={style.peso}>
                                    <p></p>
                                </div>
                            </td>
                        </tr>

                        <List />
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end py-5 mt-20">
                <button className="button_cancel">Cancel</button>
                <button className="buttonRed">SAVE</button>
            </div>
        </>
    );
}

const List = () => {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });
    return (
        <tr className={`${style.total} ${style.total1}`}>
            <td>
                <DynamicPopOver
                    toRef={
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
                                onClick={() =>
                                    setDate({ ...isDate, toggle: true })
                                }
                                className="p-2 outline-none rounded-md shadow-md"
                            />
                        </aside>
                    }
                    toPop={
                        <>
                            {isDate.toggle && (
                                <Calendar value={isDate} setValue={setDate} />
                            )}
                        </>
                    }
                />
            </td>
            <td>
                <input type="number" />
            </td>
            <td>
                <input type="number" />
            </td>
            <td>
                <p className="withPeso">1000.00</p>
            </td>
            <td>
                <input type="text" />
            </td>
            <td>
                <input type="text" />
            </td>
        </tr>
    );
};
