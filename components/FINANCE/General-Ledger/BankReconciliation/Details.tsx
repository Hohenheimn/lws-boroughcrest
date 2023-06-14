import { format, isValid, parse } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import ModalTemp from "../../../Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { ShowBankRecon } from "./Query";

type childrenCashReceipt = {
    deposit_date: string;
    depositor: {
        id: string | number;
        name: string;
    };
    receipt_no: number | string;
    reference_no: number | string;
    amount_paid: number;
};

export default function Details() {
    const router = useRouter();
    const id: any = router.query.view;
    const { isLoading, data } = ShowBankRecon(id);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(0);
        data?.data.receipt_book.map((item: any) => {
            setTotal((prev) => Number(prev) + item.amount_paid);
        });
    }, [data]);
    const date = parse(data?.data.date, "yyyy-MM-dd", new Date());
    return (
        <ModalTemp>
            <h1 className=" text-ThemeRed mb-3 text-[20px]">
                Bank Reconciliation Details
            </h1>
            {isLoading ? (
                <div className="flex justify-center py-5">
                    <BeatLoader
                        color={"#8f384d"}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
                    <ul className=" flex mb-5 flex-wrap">
                        <li className=" text-RegularColor w-2/4 480px:w-full 480px:mb-2">
                            Date:{" "}
                            <span className=" text-ThemeRed">
                                {isValid(date)
                                    ? format(date, "MMM dd yyyy")
                                    : ""}
                            </span>
                        </li>
                        <li className=" text-RegularColor w-2/4 480px:w-full">
                            Index:
                            <span className=" text-ThemeRed">
                                {data?.data.index}
                            </span>
                        </li>
                    </ul>
                    <div className="table_container noMin">
                        <table className="table_list">
                            <thead className="modalColor textRed">
                                <tr>
                                    <th>Date</th>
                                    <th>Depositor</th>
                                    <th>Reference No.</th>
                                    <th>Deposit Amount</th>
                                </tr>
                            </thead>
                            <tbody className="textBlack">
                                {data?.data?.receipt_book.map(
                                    (
                                        item: childrenCashReceipt,
                                        index: number
                                    ) => (
                                        <TableList key={index} item={item} />
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-center mb-5">
                        <h1 className="mr-3 text-ThemeRed">Total Amount: </h1>
                        <TextNumberDisplay
                            className="withPeso text-[14px] text-[#545454]"
                            value={total}
                        />
                    </div>
                </>
            )}

            <div className="flex justify-end">
                <Link href="">
                    <a className="buttonRed">DONE</a>
                </Link>
            </div>
        </ModalTemp>
    );
}
type TableList = {
    item: childrenCashReceipt;
};
const TableList = ({ item }: TableList) => {
    const date = parse(item?.deposit_date, "yyyy-MM-dd", new Date());
    return (
        <tr>
            <td> {isValid(date) ? format(date, "MMM dd yyyy") : ""}</td>
            <td>{item?.depositor?.name}</td>
            <td>{item?.reference_no}</td>
            <td>
                <TextNumberDisplay
                    className="withPeso"
                    value={item?.amount_paid}
                />
            </td>
        </tr>
    );
};
