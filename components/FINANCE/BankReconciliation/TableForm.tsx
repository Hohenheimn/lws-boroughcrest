import React from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";

export default function TableForm() {
    return (
        <>
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
                    <tr className={`${style.total} ${style.total1}`}>
                        <td className={style.label}>
                            <h1>TOTAL</h1>
                        </td>
                        <td>
                            <div className={style.peso}>
                                <aside>
                                    <Image
                                        src="/Images/peso.png"
                                        height={13}
                                        width={10}
                                    />
                                </aside>
                                <p>1000.00</p>
                            </div>
                        </td>
                        <td>
                            <div className={style.peso}>
                                <aside>
                                    <Image
                                        src="/Images/peso.png"
                                        height={13}
                                        width={10}
                                    />
                                </aside>
                                <p>1000.00</p>
                            </div>
                        </td>
                        <td>
                            <div className={style.peso}>
                                <aside>
                                    <Image
                                        src="/Images/peso.png"
                                        height={13}
                                        width={10}
                                    />
                                </aside>
                                <p>1000.00</p>
                            </div>
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
                            <input type="number" />
                        </td>
                        <td>
                            <input type="text" />
                        </td>
                        <td>
                            <input type="text" />
                        </td>
                        <td>
                            <div className={style.peso}>
                                <aside>
                                    <Image
                                        src="/Images/peso.png"
                                        height={13}
                                        width={10}
                                    />
                                </aside>
                                <p>1000.00</p>
                            </div>
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
            <div className="flex justify-end py-5 mt-20">
                <button className="buttonRed">SUM OF SELECTED</button>
            </div>
        </>
    );
}
