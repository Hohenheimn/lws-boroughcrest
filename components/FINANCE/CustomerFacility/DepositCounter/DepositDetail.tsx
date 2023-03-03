import React, { useState } from "react";
import styleModal from "../../../../styles/Popup_Modal.module.scss";
import Link from "next/link";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { HiPencil } from "react-icons/hi";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type Props = {
    id?: any;
};

export default function DepositDetail({ id }: Props) {
    return (
        <div className={styleModal.container}>
            <section>
                <div>
                    <div className="mb-5 flex justify-between items-center">
                        <h3 className="text-ThemeRed">Deposit Details</h3>
                        <Tippy content="Modify" theme="ThemeRed">
                            <div>
                                <Link
                                    href={`/finance/customer-facility/deposit-counter/modify?deposit_id=${id}`}
                                >
                                    <a>
                                        <HiPencil className="text-[20px] cursor-pointer" />
                                    </a>
                                </Link>
                            </div>
                        </Tippy>
                    </div>
                    <ul className="flex flex-wrap mb-5">
                        <li className="text-[13px] mr-2">
                            <span className="text-[#545454]">
                                Deposit Date:
                            </span>{" "}
                            Sep 28 2022
                        </li>
                        <li className="text-[13px] mr-2">
                            <span className="text-[#545454]">
                                Reference No:
                            </span>{" "}
                            RF56489751635
                        </li>
                        <li className="text-[13px] mr-2">
                            <span className="text-[#545454]">
                                Bank & Account No:
                            </span>{" "}
                            bdo-354658351534
                        </li>
                    </ul>
                    <div className="w-full overflow-auto max-h-[50vh]">
                        <table className="table_list miniTable">
                            <thead className="textRed">
                                <tr>
                                    <th className="text-start">Doc Date</th>
                                    <th>Depositor</th>
                                    <th>Receipt No.</th>
                                    <th>Deposit Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableList />
                                <TableList />
                                <TableList />
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-center mt-5">
                        <h3 className="text-[14px] mr-2">Total Amount: </h3>
                        <TextNumberDisplay
                            className="withPeso text-[14px] text-[#545454]"
                            value={55500}
                        />
                    </div>
                    <div className="flex justify-end py-5 mt-10">
                        <Link href="">
                            <a className="buttonRed">DONE</a>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
const TableList = () => {
    return (
        <tr>
            <td>Sept 22 2023</td>
            <td>Juan Delacruz</td>
            <td>000003</td>
            <td>
                <TextNumberDisplay className="withPeso" value={5000} />
            </td>
        </tr>
    );
};
