import React from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";

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

                        <tr className={`${style.total} ${style.total1}`}>
                            <td>
                                <input type="date" />
                            </td>
                            <td>
                                <input type="text" />
                            </td>
                            <td>
                                <input type="text" />
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
