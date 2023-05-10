import React, { useEffect, useState } from "react";
import style from "../../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Image from "next/image";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { format, isValid, parse } from "date-fns";
import { PencilButton } from "../../../Reusable/Icons";
import { GetCustomer } from "../../../ReactQuery/CustomerMethod";
import { customer } from "../../../../types/customerList";
import {
    GetFilteredAccountEntriesList,
    GetInvoiceByCustomerAndCharge,
} from "./Query";
import TableLoadingNError from "../../../Reusable/TableLoadingNError";

type AdjustmentDetail = {
    Detail: {
        id: string;
        charge: string;
        charge_id: number;
        created_at: string;
        customer_id: number;
        date: string;
        description: string;
        memo_type: string;
        transaction: string;
        updated_at: string;
    };
};

export type account_entries_list = {};

export default function AdjustmentDetail({ Detail }: AdjustmentDetail) {
    const [totalDebit, setTotalDebit] = useState(0);

    const [totalCredit, setTotalCredit] = useState(0);

    const {
        data: AccountEntries,
        isLoading,
        isError,
    } = GetFilteredAccountEntriesList(Detail.charge_id, Detail.transaction);

    const { data } = GetCustomer(Detail?.customer_id);

    const CustomerDetail: customer = data?.data;

    useEffect(() => {
        setTotalCredit(0);
        setTotalDebit(0);
        AccountEntries?.data.map((item: any) => {
            setTotalDebit((value) => value + Number(item.debit));
            setTotalCredit((value) => value + Number(item.credit));
        });
        console.log(AccountEntries);
    }, [AccountEntries?.data]);

    const date = parse(Detail.date, "yyyy-MM-dd", new Date());

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="pageTitle mb-5">Adjustment Details</h1>
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
                        <h1 className="main_text">{CustomerDetail?.name}</h1>
                    </div>
                    <div>
                        <p className="label_text">CLASS</p>
                        <h1 className="main_text">{CustomerDetail?.class}</h1>
                    </div>
                    <div>
                        <p className="label_text">PROPERTY</p>
                        <h4 className="main_text">
                            {CustomerDetail?.properties.map(
                                (item: any, index: number) =>
                                    CustomerDetail?.properties.length - 1 ===
                                    index
                                        ? item.unit_code
                                        : item.unit_code + ", "
                            )}
                        </h4>
                    </div>
                </li>
                <li className="bg-white flex flex-wrap shadow-lg w-[70%] 640px:w-[48%] 480px:w-full  p-10 rounded-2xl relative">
                    <Link href={`${Detail.id}`}>
                        <a className="absolute right-4 top-4">
                            <PencilButton
                                FunctionOnClick={() => {}}
                                title={"Modify"}
                            />
                        </a>
                    </Link>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">DATE</p>
                        <h1 className="main_text">
                            {isValid(date) ? format(date, "MMM dd yyyy") : ""}
                        </h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">MEMO NO</p>
                        <h1 className="main_text">Owner</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">DESCRIPTION</p>
                        <h1 className="main_text noMB">Owner</h1>
                    </div>
                </li>
            </ul>
            <ul className={`${style.OneRow} ${style.narrow}`}>
                <li className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">CHART CODE</th>
                                <th className="label_text">ACCOUNT NAME</th>
                                <th className="label_text">DEBIT</th>
                                <th className="label_text">CREDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Detail?.journal_list.map(
                                (item: journal_list, index: number) => (
                                    <List journal_list={item} key={index} />
                                )
                            )} */}

                            <tr>
                                <td colSpan={2} className={style.total}>
                                    <p className="label_text">TOTAL:</p>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        value={totalDebit}
                                        className="main_text font-NHU-bold withPeso"
                                    />
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        value={totalCredit}
                                        className="main_text font-NHU-bold withPeso"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <TableLoadingNError
                        isLoading={isLoading}
                        isError={isError}
                    />
                </li>
            </ul>
            <ul className={`${style.Occupants} ${style.narrow}`}>
                <li className={style.noMb}>
                    <p className="label_text">TRAIL</p>
                    <h1 className="main_text noMB">
                        Created at: {Detail.created_at}
                    </h1>
                    <h1 className="main_text">
                        Updated at: {Detail.updated_at}
                    </h1>
                </li>
            </ul>
        </div>
    );
}

type ListProps = {
    account_entry: account_entries_list;
};
const List = ({ account_entry }: ListProps) => {
    return (
        <tr>
            <td>
                <h4 className="main_text"></h4>
            </td>
            <td>
                <h4 className="main_text"></h4>
            </td>
            <td>
                <TextNumberDisplay
                    value={0}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={0}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
        </tr>
    );
};
