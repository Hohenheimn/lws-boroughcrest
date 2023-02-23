import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import PeriodCalendar from "../../../PeriodCalendar";
import styleSearch from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import { GoEye } from "react-icons/go";
import { InputNumberForTable, TextNumberDisplay } from "../../../NumberFormat";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetReceiptsBook } from "./Query";
import TableErrorMessage from "../../../TableErrorMessage";
import Pagination from "../../../Pagination";
import { BarLoader } from "react-spinners";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import DepositDetail from "./DepositDetail";
import { HiMinus } from "react-icons/hi";
import index from "../../../../pages/project";

export type isTableDC = {
    itemArray: isTableItemObjDC[];
    selectAll: boolean;
};

export type isTableItemObjDC = {
    id: string | number;
    document_date: string;
    depositor: string;
    receipt_no: string;
    bank_and_account_no: number | string;
    reference_no: string;
    deposit_date: string;
    deposit_amount: number;
    index: string | number;
    select: boolean;
};

type Props = {
    type: string;
};

export default function Receiptsbook({ type }: Props) {
    const router = useRouter();
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const [isTableItem, setTableItem] = useState<isTableDC>({
        itemArray: [],
        selectAll: false,
    });
    const { data, isLoading, isError } = GetReceiptsBook(isSearch, TablePage);
    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.data.map((item: isTableItemObjDC) => {
                return {
                    id: item.id,
                    document_date: "Sep 28 2022",
                    depositor: "Juan Carlos",
                    receipt_no: "0000000202",
                    bank_and_account_no: "BD0-549845",
                    reference_no: "RF48489754",
                    deposit_date: "Sept 28 2022",
                    deposit_amount: 1000,
                    index: "00001",
                    select: false,
                };
            });
            // Additional blank row field
            setTableItem({
                itemArray: CloneArray,
                selectAll: false,
            });
        }
    }, [data?.status, isSearch, TablePage]);

    const selectAll = () => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isTableItem.selectAll,
            };
        });
        setTableItem({
            itemArray: newItems,
            selectAll: !isTableItem.selectAll,
        });
    };
    return (
        <>
            {router.query.detail !== undefined && (
                <DepositDetail id={router.query.detail} />
            )}
            {type === "receipts-book" && (
                <>
                    <h1 className=" text-[24px] 1366px:text-[20px] mb-5 480px:mb-2 flex items-center">
                        Receipts Book
                    </h1>
                    <section className={`${styleSearch.container}`}>
                        <div className={styleSearch.searchBarAdvF}>
                            <div className={styleSearch.searchBar}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={isSearch}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <BsSearch className={styleSearch.searchIcon} />
                            </div>
                        </div>

                        <ul className={styleSearch.navigation}>
                            <li className={styleSearch.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Return">
                                    <div
                                        className={`${styleSearch.noFill} mr-5`}
                                    >
                                        <Image
                                            src="/Images/f_back.png"
                                            height={25}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={styleSearch.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Approve">
                                    <div
                                        className={`${styleSearch.noFill} mr-5`}
                                    >
                                        <Image
                                            src="/Images/f_check.png"
                                            height={25}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                        </ul>
                    </section>
                </>
            )}
            {type !== "receipts-book" && (
                <section className={`${styleSearch.container}`}>
                    <div className={styleSearch.period}>
                        <h1 className=" text-[24px] 1366px:text-[20px] flex items-center">
                            Receipts Book{" "}
                            <Link href="/finance/customer-facility/deposit-counter/receipts-book">
                                <a>
                                    <GoEye className=" text-ThemeRed ml-2 text-[20px]" />
                                </a>
                            </Link>
                        </h1>
                    </div>

                    <ul className={styleSearch.navigation}>
                        <li className={styleSearch.importExportPrint}>
                            <Link href="/finance/customer-facility/deposit-counter/create-deposit">
                                <a className="buttonRed mr-5">CREATE DEPOSIT</a>
                            </Link>
                            <button className="buttonRed">SAVE</button>
                        </li>
                    </ul>
                </section>
            )}

            <div
                className={`table_container ${
                    type !== "receipts-book" && "hAuto"
                }`}
            >
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            {type === "receipts-book" && (
                                <th className="checkbox">
                                    <div className="item">
                                        <input
                                            type="checkbox"
                                            checked={isTableItem.selectAll}
                                            onChange={selectAll}
                                        />
                                    </div>
                                </th>
                            )}
                            <th>DOC. DATE</th>
                            <th>DEPOSITOR</th>
                            <th>RECEIPT NO.</th>
                            <th>BANK & ACCOUNT NO.</th>
                            <th>REFERENCE NO.</th>
                            <th>DEPOSIT DATE</th>
                            <th>DEPOSIT AMOUNT</th>
                            <th>INDEX</th>
                            {type !== "receipts-book" && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {isTableItem?.itemArray.map(
                            (item: any, index: number) => (
                                <List
                                    key={index}
                                    itemDetail={item}
                                    isTableItem={isTableItem}
                                    setTableItem={setTableItem}
                                    type={type}
                                    index={index}
                                />
                            )
                        )}
                    </tbody>
                </table>
                {isLoading && (
                    <div className="w-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="10px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                {isError && <TableErrorMessage />}
            </div>
            {type === "receipts-book" && (
                <Pagination
                    setTablePage={setTablePage}
                    TablePage={TablePage}
                    PageNumber={data?.data.last_page}
                    CurrentPage={data?.data.current_page}
                />
            )}
        </>
    );
}

type ListProps = {
    itemDetail: isTableItemObjDC;
    isTableItem: isTableDC;
    setTableItem: Function;
    type: string;
    index: number;
};

const List = ({
    itemDetail,
    isTableItem,
    setTableItem,
    type,
    index,
}: ListProps) => {
    const updateValue = (e: any, key: string) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "select") {
                    return {
                        ...item,
                        select: !item.select,
                    };
                }
                if (key === "index") {
                    return {
                        ...item,
                        index: e.target.value,
                    };
                }
            }
            return item;
        });
        setTableItem({
            itemArray: newItems,
            selectAll: false,
        });
    };

    return (
        <tr>
            {type === "receipts-book" && (
                <td className="checkbox">
                    <div className="item">
                        <input
                            type="checkbox"
                            onChange={(e: any) => updateValue(e, "select")}
                            checked={itemDetail.select}
                        />
                    </div>
                </td>
            )}

            <td>{itemDetail.document_date}</td>
            <td>{itemDetail.depositor}</td>
            <td>{itemDetail.receipt_no}</td>
            <td>{itemDetail.bank_and_account_no}</td>
            <td>
                {type === "receipts-book" ? (
                    itemDetail.reference_no
                ) : (
                    <>
                        <Link
                            href={`/finance/customer-facility/deposit-counter?detail=${itemDetail.id}`}
                        >
                            <a>{itemDetail.reference_no}</a>
                        </Link>
                    </>
                )}
            </td>
            <td>{itemDetail.deposit_date}</td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.deposit_amount}
                    className={"withPeso"}
                />
            </td>
            <td>
                {type === "receipts-book" ? (
                    itemDetail.index
                ) : (
                    <input
                        type="text"
                        className="field"
                        value={itemDetail.index}
                        onChange={(e: any) => updateValue(e, "index")}
                    />
                )}
            </td>
            {type !== "receipts-book" && (
                <td className="actionIcon">
                    {isTableItem.itemArray.length > 1 && (
                        <div>
                            <HiMinus />
                        </div>
                    )}
                    {isTableItem.itemArray.length - 1 === index && (
                        <div className="ml-5 1024px:ml-2">
                            <BsPlusLg />
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
};
