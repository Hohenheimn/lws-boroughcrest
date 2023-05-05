import React, { useEffect, useState } from "react";
import style from "../../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Image from "next/image";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { format, isValid, parse } from "date-fns";
import { PencilButton } from "../../../Reusable/Icons";

type JournalDetail = {
    Detail: {
        id: string;
        corporate_id: string;
        date: string;
        particulars: string;
        journal_no: string | null;
        status: string;
        trail: trail[];
        journal_list: journal_list[];
    };
};
type trail = {
    event: string;
    user: string;
    date: string;
    time: string;
    datetime: string;
};

export type journal_list = {
    debit: string;
    credit: string;
    chart_of_account: {
        chart_code: string;
        account_name: string;
    };
};

export default function AdjustmentDetail({ Detail }: JournalDetail) {
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        setTotalCredit(0);
        setTotalDebit(0);
        Detail.journal_list.map((item: journal_list) => {
            setTotalDebit((value) => value + Number(item.debit));
            setTotalCredit((value) => value + Number(item.credit));
        });
    }, []);

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
                        <h1 className="main_text">Juan Dela Cruz</h1>
                    </div>
                    <div>
                        <p className="label_text">CLASS</p>
                        <h1 className="main_text">Owner</h1>
                    </div>
                    <div>
                        <p className="label_text">CLASS</p>
                        <h1 className="main_text noMB">Owner</h1>
                    </div>
                </li>
                <li className="bg-white flex flex-wrap shadow-lg w-[70%] 640px:w-[48%] 480px:w-full  p-10 rounded-2xl relative">
                    <Link
                        href={`/finance/general-ledger/journal/modify-journal/${Detail.id}`}
                    >
                        <a className="absolute right-4 top-4">
                            <PencilButton
                                FunctionOnClick={() => {}}
                                title={"Modify"}
                            />
                        </a>
                    </Link>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">CUSTOMER</p>
                        <h1 className="main_text">Juan Dela Cruz</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">CLASS</p>
                        <h1 className="main_text">Owner</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">CLASS</p>
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
                            {Detail?.journal_list.map(
                                (item: journal_list, index: number) => (
                                    <List journal_list={item} key={index} />
                                )
                            )}

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
                </li>
            </ul>
            <ul className={`${style.Occupants} ${style.narrow}`}>
                <li className={style.noMb}>
                    <p className="label_text">TRAIL</p>
                    {Detail?.trail.map((item: trail, index) => (
                        <h4 className="text-[#6b7280] mb-2" key={index}>
                            {item?.event} by {item?.user} on {item?.date} |
                            {item?.time}
                        </h4>
                    ))}
                </li>
            </ul>
        </div>
    );
}

type ListProps = {
    journal_list: journal_list;
};
const List = ({ journal_list }: ListProps) => {
    return (
        <tr>
            <td>
                <h4 className="main_text">
                    {journal_list?.chart_of_account?.chart_code}
                </h4>
            </td>
            <td>
                <h4 className="main_text">
                    {journal_list?.chart_of_account?.account_name}
                </h4>
            </td>
            <td>
                <TextNumberDisplay
                    value={journal_list?.debit}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={journal_list?.credit}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
        </tr>
    );
};
