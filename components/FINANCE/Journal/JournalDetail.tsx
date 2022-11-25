import React from "react";
import { HiPencil } from "react-icons/hi";
import style from "../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Image from "next/image";

export default function JournalDetail() {
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="pageTitle mb-5">Journal Details</h1>
                <ul className="flex">
                    <li className="mr-5">
                        <Tippy theme="ThemeRed" content="Print">
                            <div className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]">
                                <Image
                                    src="/Images/Print.png"
                                    layout="fill"
                                    alt="Print"
                                />
                            </div>
                        </Tippy>
                    </li>
                    <li>
                        <Tippy theme="ThemeRed" content="Modify">
                            <div>
                                <Link href="/finance/general-ledger/journal/modify-journal/1">
                                    <a>
                                        <div className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]">
                                            <Image
                                                src="/Images/f_modify.png"
                                                layout="fill"
                                                alt="Print"
                                            />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </Tippy>
                    </li>
                </ul>
            </div>
            <ul className={`${style.FourRows} ${style.narrow}`}>
                <aside>
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">Modify</span>}
                    >
                        <div>
                            <Link href="/finance/general-ledger/journal/modify-journal/1">
                                <a>
                                    <HiPencil className={style.pencil} />
                                </a>
                            </Link>
                        </div>
                    </Tippy>
                </aside>
                <li className={style.noMb}>
                    <div className={style.row}>
                        <p className="label_text">DATE</p>
                        <h4 className="main_text">Lorem, ipsum.</h4>
                    </div>
                    <div className={style.row}>
                        <p className="label_text">JOURNAL NO.</p>
                        <h4 className="main_text">00001</h4>
                    </div>
                </li>
                <li className={style.noMb}>
                    <p className="label_text">PARTICULARS</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
            </ul>
            <ul className={`${style.OneRow} ${style.narrow}`}>
                <li className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">CODE</th>
                                <th className="label_text">ACCOUNT NAME</th>
                                <th className="label_text">DEBIT</th>
                                <th className="label_text">CREDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <List />
                            <List />
                            <List />
                            <List />
                            <tr>
                                <td colSpan={2} className={style.total}>
                                    <p className="label_text">TOTAL:</p>
                                </td>
                                <td>
                                    <h4 className="main_text">4000</h4>
                                </td>
                                <td>
                                    <h4 className="main_text">400</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <ul className={`${style.Occupants} ${style.narrow}`}>
                <li className={style.noMb}>
                    <p className="label_text">TRAIL</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
            </ul>
        </div>
    );
}
const List = () => {
    return (
        <tr>
            <td className="main_text">
                <h4>000001</h4>
            </td>
            <td className="main_text">
                <h4>Juan Dela Cruz</h4>
            </td>
            <td className="main_text">
                <h4>1000</h4>
            </td>
            <td className="main_text">
                <h4>100</h4>
            </td>
        </tr>
    );
};
