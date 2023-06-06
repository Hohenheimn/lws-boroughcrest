import React, { useEffect, useState } from "react";
import style from "../../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Image from "next/image";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { format, isValid, parse } from "date-fns";
import { PencilButton } from "../../../Reusable/Icons";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";

export type AdjustmentDetailType = {
    id: number;
    charge: string;
    charge_id: number;
    memo_type: string;
    memo_no: string;
    date: string;
    description: string;
    transaction: string;
    status: string;
    customer: {
        id: number;
        class: string;
        name: string;
        properties: {
            id: number;
            unit_code: string;
        }[];
    };
    adjustment_accounts: adjustment_accounts[];
    adjustment_invoice: adjustment_invoice[];
    customer_id: number;
    trail: trail[];
};

export type adjustment_invoice = {
    adjustment_amount: string;
    balance: string;
    billing_invoice_list: Invoice_list;
    billing_invoice_list_id: number;
    id: number;
};

export type Billing_Invoice = {
    applied_advances: number;
    billing_date: string;
    corporate_id: number;
    created_at: string;
    customer_id: number;
    deleted_at: null;
    due_amount: number;
    due_date: string;
    id: number;
    invoice_list: Invoice_list[];
    invoice_no: string;
    payment_amount: string;
    post_to_portal: number;
    queuing_amount: number;
    status: string;
};

export type Invoice_list = {
    amount: number;
    billing_invoice_id: number;
    description: string;
    id: number;
    invoice: {
        applied_advances: number;
        billing_date: string;
        due_amount: number;
        due_date: string;
        id: number;
        invoice_no: string;
        payment_amount: number;
        queuing_amount: string;
        status: string;
    };
    quantity: number;
    unit_price: number;
    vat: number;
};

type trail = {
    date: string;
    datetime: string;
    event: string;
    time: string;
    user: string;
};
export type adjustment_accounts = {
    account: {
        chart_code: string;
        account_name: string;
        id: number;
    };
    debit: number;
    credit: number;
};

type props = {
    Detail: AdjustmentDetailType;
};

export type account_entries_list = {};

export default function AdjustmentDetail({ Detail }: props) {
    const Permission_modify = AccessActionValidation("Adjustment", "modify");

    const Permission_print = AccessActionValidation("Adjustment", "print");

    const [totalDebit, setTotalDebit] = useState(0);

    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        setTotalCredit(0);
        setTotalDebit(0);
        Detail?.adjustment_accounts.map((item: any) => {
            setTotalDebit((value) => value + Number(item.debit));
            setTotalCredit((value) => value + Number(item.credit));
        });
    }, [Detail]);

    const date = parse(Detail?.date, "yyyy-MM-dd", new Date());

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="pageTitle mb-5">Adjustment Details</h1>
                {Permission_print && (
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
                )}
            </div>
            <ul className="rounded-lg mb-10 flex flex-wrap w-full justify-between">
                <li className="bg-white shadow-lg w-[28%] 640px:w-[48%] 480px:w-full 480px:mb-5 p-10 rounded-2xl">
                    <div>
                        <p className="label_text">CUSTOMER</p>
                        <h1 className="main_text">{Detail?.customer?.name}</h1>
                    </div>
                    <div>
                        <p className="label_text">CLASS</p>
                        <h1 className="main_text">{Detail?.customer?.class}</h1>
                    </div>
                    <div>
                        <p className="label_text">PROPERTY</p>
                        <h4 className="main_text">
                            {Detail?.customer?.properties.map(
                                (item: any, index: number) =>
                                    Detail?.customer?.properties.length - 1 ===
                                    index
                                        ? item.unit_code
                                        : item.unit_code + ", "
                            )}
                        </h4>
                    </div>
                </li>
                <li className="bg-white flex flex-wrap shadow-lg w-[70%] 640px:w-[48%] 480px:w-full  p-10 rounded-2xl relative">
                    {Permission_modify && (
                        <Link
                            href={`/finance/customer-facility/adjustment//modify/${Detail.id}`}
                        >
                            <a className="absolute right-4 top-4">
                                <PencilButton
                                    FunctionOnClick={() => {}}
                                    title={"Modify"}
                                />
                            </a>
                        </Link>
                    )}

                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">DATE</p>
                        <h1 className="main_text">
                            {isValid(date) ? format(date, "MMM dd yyyy") : ""}
                        </h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">MEMO NO</p>
                        <h1 className="main_text">{Detail?.memo_no}</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">DESCRIPTION</p>
                        <h1 className="main_text noMB">
                            {Detail?.description}
                        </h1>
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
                            {Detail.adjustment_accounts.map(
                                (item: adjustment_accounts, index: number) => (
                                    <List itemDetail={item} key={index} />
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
    itemDetail: adjustment_accounts;
};
const List = ({ itemDetail }: ListProps) => {
    return (
        <tr>
            <td>
                <h4 className="main_text">{itemDetail.account.chart_code}</h4>
            </td>
            <td>
                <h4 className="main_text">{itemDetail.account.account_name}</h4>
            </td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.debit}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.credit}
                    className={"withPeso main_text font-NHU-bold"}
                />
            </td>
        </tr>
    );
};
