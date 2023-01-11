import React from "react";
import { HiPencil } from "react-icons/hi";
import style from "../../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Image from "next/image";

export default function BillingDetail() {
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="pageTitle mb-5">Billing Details</h1>
            </div>
            <ul className={`${style.ThreeRows} ${style.narrow}`}>
                <li>
                    <p className="label_text">Customer</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
                <li>
                    <p className="label_text">Class</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
                <li>
                    <p className="label_text">Property</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
                <li>
                    <p className="label_text">Invoice No.</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
                <li>
                    <p className="label_text">Billing Date</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
                <li>
                    <p className="label_text">Due Date</p>
                    <h4 className="main_text">Lorem, ipsum.</h4>
                </li>
            </ul>
            <ul className={`${style.OneRow} ${style.wide}`}>
                <li className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">CHARGE</th>
                                <th className="label_text">DESCRIPTION</th>
                                <th className="label_text">UNIT PRICE</th>
                                <th className="label_text">QUANTITY</th>
                                <th className="label_text">UOM</th>
                                <th className="label_text">VAT</th>
                                <th className="label_text">DUE AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <List />
                            <List />
                            <List />
                            <List />
                            <tr>
                                <td colSpan={5} className={style.total}>
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
            <ul className={`${style.Occupants} ${style.wide}`}>
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
                <h4 className="main_text">lorem ipsum</h4>
            </td>
            <td className="main_text">
                <h4 className="main_text">lorem ipsum</h4>
            </td>
            <td className="main_text">
                <h4 className="main_text">1000</h4>
            </td>
            <td className="main_text">
                <h4 className="main_text">100</h4>
            </td>
            <td className="main_text">
                <h4 className="main_text">Kwph</h4>
            </td>
            <td className="main_text">
                <h4 className="main_text">100.000</h4>
            </td>
            <td className="main_text">
                <h4 className="main_text">1,000.000</h4>
            </td>
        </tr>
    );
};
