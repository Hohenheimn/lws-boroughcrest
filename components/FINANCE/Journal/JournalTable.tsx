import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../util/api";
import { BarLoader } from "react-spinners";
import PeriodCalendar from "../../PeriodCalendar";
import { AdvanceFilter } from "../../AdvanceFilter";
import PeriodFNS from "../../PeriodFNS";
import TableErrorMessage from "../../TableErrorMessage";
import { GetJournal } from "./Query";
import Pagination from "../../Pagination";

type Props = {
    type: string;
};

type isTable = {
    itemArray: isTableItemObj[];
    selectAll: boolean;
};

type isTableItemObj = {
    id: string | number;
    date: string;
    particulars: string;
    status: string;
    journal_no: string | number;
    select: boolean;
};

export default function JournalTable({ type }: Props) {
    const [isSearch, setSearch] = useState("");
    const [TablePage, setTablePage] = useState(1);
    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });
    const [isAdvFilter, setAdvFilter] = useState([
        {
            name: "Jomari Tiu",
            subName: "Developer",
        },
    ]);
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const { data, isLoading, isError } = GetJournal(isSearch, type, TablePage);
    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.data.map((item: isTableItemObj) => {
                return {
                    id: item.id,
                    date: item.date,
                    particulars: item.particulars,
                    status: item.status,
                    journal_no: item.journal_no,
                    select: false,
                };
            });
            // Additional blank row field
            setTableItem({
                itemArray: CloneArray,
                selectAll: false,
            });
        }
    }, [data?.status, type, isSearch, TablePage]);

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
            <section className={style.container}>
                <div className={style.searchBarAdvF}>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={isSearch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <BsSearch className={style.searchIcon} />
                    </div>
                    <AdvanceFilter
                        setAdvFilter={setAdvFilter}
                        isAdvFilter={isAdvFilter}
                    />
                </div>

                <ul className={style.navigation}>
                    {type === "unposted" ? (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Approve">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_check.png"
                                            height={25}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="In Process">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_refresh.png"
                                            height={30}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Return">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_back.png"
                                            height={25}
                                            width={35}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Pending">
                                    <div className={style.noFill}>
                                        <Image
                                            src="/Images/f_remove.png"
                                            height={25}
                                            width={25}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Export">
                                    <div className={style.icon}>
                                        <Image
                                            src="/Images/Export.png"
                                            layout="fill"
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                        </>
                    )}
                </ul>
            </section>
            {type === "posted" && (
                <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                </div>
            )}

            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            {type === "unposted" ? (
                                <>
                                    <th className="checkbox">
                                        <div className="item">
                                            <input
                                                type="checkbox"
                                                checked={isTableItem.selectAll}
                                                onChange={selectAll}
                                            />
                                        </div>
                                    </th>
                                    <th>Date</th>
                                    <th>Particulars</th>
                                    <th>Status</th>
                                    <th></th>
                                </>
                            ) : (
                                <>
                                    <th>Date</th>
                                    <th>Journal No.</th>
                                    <th>Particulars</th>
                                    <th></th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isTableItem?.itemArray.map(
                            (item: any, index: number) => (
                                <List
                                    key={index}
                                    itemDetail={item}
                                    type={type}
                                    isTableItem={isTableItem}
                                    setTableItem={setTableItem}
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
            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.last_page}
                CurrentPage={data?.data.current_page}
            />
        </>
    );
}

type ListProps = {
    itemDetail: isTableItemObj;
    isTableItem: isTable;
    type: string;
    setTableItem: Function;
};

const List = ({ itemDetail, type, isTableItem, setTableItem }: ListProps) => {
    const updateValue = (e: any) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                return {
                    ...item,
                    select: !item.select,
                };
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
            {type === "unposted" && (
                <td className="checkbox">
                    <div className="item">
                        <input
                            type="checkbox"
                            onChange={(e: any) => updateValue(e)}
                            checked={itemDetail.select}
                        />
                    </div>
                </td>
            )}
            <td>
                <Link
                    href={`/finance/general-ledger/journal/journal-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.date}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link
                    href={`/finance/general-ledger/journal/journal-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.particulars}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link
                    href={`/finance/general-ledger/journal/journal-list/${itemDetail.id}`}
                >
                    <a className="item">
                        {type !== "posted" ? (
                            <div className="finance_status">
                                <div
                                    className={`status ${
                                        itemDetail.status === "In Process"
                                            ? "InProcess"
                                            : itemDetail.status
                                    }`}
                                >
                                    <div>
                                        <Image
                                            src="/Images/f_draft.png"
                                            width={10}
                                            height={10}
                                            alt="Draft"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2>{itemDetail.journal_no}</h2>
                            </div>
                        )}
                    </a>
                </Link>
            </td>

            <td className="icon">
                <Link
                    href={`/finance/general-ledger/journal/modify-journal/${itemDetail.id}`}
                >
                    <a>
                        <Tippy theme="ThemeRed" content={"Modify"}>
                            <div className="icon">
                                <Image
                                    src="/Images/f_modify.png"
                                    height={15}
                                    width={15}
                                    alt="Modify"
                                />
                            </div>
                        </Tippy>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
