import Link from "next/link";
import React from "react";
import ModalTemp from "../../../Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";

export default function Details() {
    return (
        <ModalTemp>
            <h1 className=" text-ThemeRed mb-3 text-[20px]">
                Bank Reconciliation Details
            </h1>
            <ul className=" flex mb-5 flex-wrap">
                <li className=" text-RegularColor w-2/4 480px:w-full 480px:mb-2">
                    Date: <span className=" text-ThemeRed">Mar 1 2023</span>
                </li>
                <li className=" text-RegularColor w-2/4 480px:w-full">
                    Reference No.:{" "}
                    <span className=" text-ThemeRed">RF12659874531</span>
                </li>
            </ul>
            <div className="table_container noMin">
                <table className="table_list">
                    <thead className="modalColor textRed">
                        <tr>
                            <th>Depositor</th>
                            <th>Receipt No.</th>
                            <th>Deposit Amount</th>
                        </tr>
                    </thead>
                    <tbody className="textBlack">
                        <tr>
                            <td>Juan Dela Cruz</td>
                            <td>00000005</td>
                            <td>
                                <TextNumberDisplay
                                    value={50000}
                                    className="withPeso"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end items-center mb-5">
                <h1 className="mr-3 text-ThemeRed">Total Amount: </h1>
                <TextNumberDisplay
                    value={156489}
                    className="withPeso text-RegularColor"
                />
            </div>
            <div className="flex justify-end">
                <Link href="">
                    <a className="buttonRed">DONE</a>
                </Link>
            </div>
        </ModalTemp>
    );
}
