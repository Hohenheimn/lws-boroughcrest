import React from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";

export default function TableForm() {
    return (
        <>
            <table className={style.crudTable}>
                <thead>
                    <tr>
                        <th>CHART CODE</th>
                        <th>CATGORY</th>
                        <th>ACCOUNT NAME</th>
                        <th>DEBIT</th>
                        <th>CREDIT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={`${style.total} ${style.total1}`}>
                        <td>
                            <h2>0001</h2>
                        </td>
                        <td>
                            <h2>lorem ipsum</h2>
                        </td>
                        <td>
                            <h2>lorem ipsum</h2>
                        </td>
                        <td>
                            <input type="number" />
                        </td>
                        <td>
                            <input type="number" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-10 border-b border-ThemeRed"></div>
            <table className={style.crudTable}>
                <tbody>
                    <tr className={style.total}>
                        <td></td>
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
                                <p>-</p>
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
                                <p>-</p>
                            </div>
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
