import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import styleSearch from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import { GoEye } from "react-icons/go";

import Link from "next/link";
import { useRouter } from "next/router";
import { GetReceiptsBook } from "./Query";

import { BarLoader } from "react-spinners";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import DepositDetail from "./DepositDetail";
import { HiMinus } from "react-icons/hi";
import { isTableBankCredit } from "./BankCreditComp";
import DropdownIndex from "./DropdownIndex";
import Pagination from "../../../Reusable/Pagination";
import {
    TextNumberDisplay,
    InputNumberForTable,
} from "../../../Reusable/NumberFormat";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";

export type isReceiptBookData = {
    itemArray: isTableItemObjRB[];
    selectAll: boolean;
};

export type isTableItemObjRB = {
    id: string | number;
    document_date: string;
    depositor: string;
    receipt_no: string;
    bank_and_account_no: number | string;
    reference_no: string;
    deposit_date: string;
    deposit_amount: number | string;
    index: string | number;
    select: boolean;
    variance: number | string;
    childrenID: number | string;
    children: boolean;
};

type Props = {
    type: string;
    isReceiptBookData: isReceiptBookData;
    setReceiptBookData: Function;
    isBankCredit: isTableBankCredit;
    setBankCredit: Function;
    setChangeData: Function;
};

export default function Receiptsbook({
    type,
    isReceiptBookData,
    setReceiptBookData,
    setChangeData,
}: Props) {
    const router = useRouter();
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const { data, isLoading, isError } = GetReceiptsBook(isSearch, TablePage);
    // APPLY DATA FROM API
    // useEffect(() => {
    //     if (data?.status === 200) {
    //         const CloneArray = data?.data.data.map((item: isTableItemObjRB) => {
    //             return {
    //                  id: 2,
    //                  document_date: "Sep 24 2022",
    //                  depositor: "Hulio Cadiente",
    //                  receipt_no: "0000000333",
    //                  bank_and_account_no: "BD0-549888",
    //                  reference_no: "RF48489754",
    //                  deposit_date: "Sept 28 2022",
    //                  deposit_amount: 1000,
    //                  index: "",
    //                  select: false,
    //                  variance: "",
    //                  children: false,
    //             };
    //         });
    //         // Additional blank row field
    //         setReceiptBookData({
    //             itemArray: CloneArray,
    //             selectAll: false,
    //         });
    //     }
    // }, [data?.status, isSearch, TablePage]);

    const selectAll = () => {
        const newItems = isReceiptBookData?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isReceiptBookData.selectAll,
            };
        });
        setReceiptBookData({
            itemArray: newItems,
            selectAll: !isReceiptBookData.selectAll,
        });
    };

    const AddHandler = (itemDetail: isTableItemObjRB, index: number) => {
        const LocationToStart = index + 1;
        const cloneToSplice = isReceiptBookData.itemArray;
        cloneToSplice.splice(LocationToStart, 0, {
            id: isReceiptBookData.itemArray.length + 1,
            document_date: itemDetail.document_date,
            depositor: itemDetail.depositor,
            receipt_no: itemDetail.receipt_no,
            bank_and_account_no: itemDetail.bank_and_account_no,
            reference_no: itemDetail.reference_no,
            deposit_date: "",
            deposit_amount: "",
            index: "",
            select: false,
            variance: itemDetail.variance,
            children: true,
            childrenID: itemDetail.id,
        });
        setReceiptBookData({
            ...isReceiptBookData,
            itemArray: cloneToSplice,
        });
    };

    const DeleteHandler = (id: string | number) => {
        const cloneToDelete = isReceiptBookData.itemArray.filter(
            (item) => item.id !== id
        );
        setReceiptBookData({
            ...isReceiptBookData,
            itemArray: cloneToDelete,
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
                                            src="/Images/f_Back.png"
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
                                            src="/Images/f_Check.png"
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
                        <h1 className=" text-[20px] 1366px:text-[20px] flex items-center">
                            Receipts Book{" "}
                            <Link href="/finance/customer-facility/deposit-counter/receipts-book">
                                <a>
                                    <GoEye className=" text-ThemeRed ml-2 text-[16px]" />
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
                                            checked={
                                                isReceiptBookData.selectAll
                                            }
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
                            {type !== "receipts-book" && <th>VARIANCE</th>}
                            {type !== "receipts-book" && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {isReceiptBookData?.itemArray.map(
                            (item: any, index: number) => (
                                <List
                                    key={index}
                                    itemDetail={item}
                                    isReceiptBookData={isReceiptBookData}
                                    setTableItem={setReceiptBookData}
                                    type={type}
                                    index={index}
                                    setChangeData={setChangeData}
                                    AddHandler={AddHandler}
                                    DeleteHandler={DeleteHandler}
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
    itemDetail: isTableItemObjRB;
    isReceiptBookData: isReceiptBookData;
    setTableItem: Function;
    type: string;
    index: number;
    setChangeData: Function;
    DeleteHandler: (id: string | number) => void;
    AddHandler: (itemDetail: isTableItemObjRB, index: number) => void;
};

const List = ({
    itemDetail,
    isReceiptBookData,
    setTableItem,
    type,
    index,
    setChangeData,
    DeleteHandler,
    AddHandler,
}: ListProps) => {
    const updateValue = (key: string, value: string) => {
        const newItems = isReceiptBookData?.itemArray.map((item: any) => {
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
                        index: value,
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

    const SelectHandler = (value: string) => {
        updateValue("index", value);
        setChangeData({
            dataThatChange: value,
            fromWhere: "receipt book",
            id: itemDetail.id,
            key: "",
        });
    };

    return (
        <tr>
            {type === "receipts-book" && (
                <td className="checkbox">
                    <div className="item">
                        <input
                            type="checkbox"
                            onChange={(e: any) => updateValue("select", "")}
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
                    className={
                        itemDetail.deposit_amount === "" ? "" : "withPeso"
                    }
                />
            </td>
            <td>
                {type === "receipts-book" ? (
                    itemDetail.index
                ) : (
                    <DropdownIndex
                        name="index"
                        value={itemDetail.index}
                        selectHandler={SelectHandler}
                        endpoint="/finance/customer-facility/charges"
                    />
                )}
            </td>
            {type !== "receipts-book" && (
                <td>
                    <InputNumberForTable
                        onChange={() => {}}
                        value={itemDetail.variance}
                        className={
                            "field disabled w-full max-w-[150px] text-end"
                        }
                        type={""}
                    />
                </td>
            )}
            {type !== "receipts-book" && (
                <td className="actionIcon">
                    <div>
                        <HiMinus onClick={() => DeleteHandler(itemDetail.id)} />
                    </div>

                    {itemDetail.variance !== "0" && (
                        <div className="ml-5 1024px:ml-2">
                            <BsPlusLg
                                onClick={() => AddHandler(itemDetail, index)}
                            />
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
};
