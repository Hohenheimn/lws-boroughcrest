import Tippy from "@tippy.js/react";
import React from "react";
import Image from "next/image";
import style from "../../../../../styles/Project/PropertyDetails.module.scss";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";

export default function CheckPaymentDetail() {
    return (
        <div>
            <div className="flex justify-between flex-wrap">
                <h1 className="pageTitle mb-5">Payment Details</h1>
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
                </ul>
            </div>
            <ul className="rounded-lg mb-10 flex flex-wrap w-full justify-between">
                <li className="bg-white shadow-lg w-[28%] 640px:w-[48%] 480px:w-full 480px:mb-5 p-10 rounded-2xl">
                    <div>
                        <p className="label_text">CUSTOMER</p>
                        <h1 className="main_text">Juan Dela Cruz</h1>
                    </div>
                    <div>
                        <p className="label_text">CLASS</p>
                        <h1 className="main_text">sAMPLE</h1>
                    </div>
                    <div>
                        <p className="label_text">PROPERTY</p>
                        <h4 className="main_text">
                            LWWS, SSW,SQS
                            {/* {Detail?.customer?.properties.map(
                                (item: any, index: number) =>
                                    Detail?.customer?.properties.length - 1 ===
                                    index
                                        ? item.unit_code
                                        : item.unit_code + ", "
                            )} */}
                        </h4>
                    </div>
                </li>
                <li className="bg-white flex flex-wrap shadow-lg w-[70%] 640px:w-[48%] 480px:w-full  p-10 rounded-2xl relative">
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">RECEIPT DATE</p>
                        <h1 className="main_text">May 17 2023</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">RECEIPT NO</p>
                        <h1 className="main_text">0552144</h1>
                    </div>
                    <div className="w-full 640px:w-full">
                        <p className="label_text">DESCRIPTION</p>
                        <h1 className="main_text noMB">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Sint, ratione?
                        </h1>
                    </div>
                </li>
            </ul>
            <ul className={`${style.OneRow} ${style.narrow}`}>
                <li className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">CHECK DATE</th>
                                <th className="label_text">DESCRIPTION</th>
                                <th className="label_text">CHECK NO.</th>
                                <th className="label_text">BANK & BRANCH</th>
                                <th className="label_text">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <List />

                            <tr>
                                <td></td> <td></td>
                                <td colSpan={2} className={style.total}>
                                    <p className="label_text">TOTAL:</p>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        value={1000}
                                        className="main_text font-NHU-bold withPeso"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <ul className={`${style.Occupants} ${style.narrow}`}>
                <li className={style.noMb}>
                    <p className="label_text">TRAIL</p>
                    <h4 className="text-[#6b7280] mb-2">
                        Issued by User 0001 on Sep 28 2022 | 01:00pm
                    </h4>

                    {/* {Detail?.trail.map((item: trail, index) => (
                        <h4 className="text-[#6b7280] mb-2" key={index}>
                            {item?.event} by {item?.user} on {item?.date} |
                            {item?.time}
                        </h4>
                    ))} */}
                </li>
            </ul>
        </div>
    );
}

const List = () => {
    return (
        <tr>
            <td>
                <h4 className="main_text">Lorem, ipsum.</h4>
            </td>
            <td>
                <h4 className="main_text">Lorem, ipsum.</h4>
            </td>
            <td>
                <h4 className="main_text">00002</h4>
            </td>
            <td>
                <h4 className="main_text">BDO Manila</h4>
            </td>
            <td>
                <TextNumberDisplay
                    value={1000}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
        </tr>
    );
};
