import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../../util/api";
import { BarLoader, MoonLoader } from "react-spinners";
import PeriodCalendar from "../../../PeriodCalendar";
import { Advancefilter, AdvanceFilter } from "../../../AdvanceFilter";
import PeriodFNS from "../../../PeriodFNS";
import TableErrorMessage from "../../../TableErrorMessage";
import { GetJournal, MultipleUpdate } from "./Query";
import Pagination from "../../../Pagination";
import AppContext from "../../../Context/AppContext";

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
    let buttonClicked = "";
    const { setPrompt } = useContext(AppContext);
    const [isSearch, setSearch] = useState("");
    const [TablePage, setTablePage] = useState(1);
    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });
    // ADVANCE FILTER
    const [isAdvFilter, setAdvFilter] = useState<Advancefilter>([]);

    const [isFilterText, setFilterText] = useState<string[]>([]);

    useEffect(() => {
        const cloneArray = isAdvFilter.map((item) => {
            return `${item.key}:${item.value}`;
        });
        setFilterText(cloneArray);
    }, [isAdvFilter]);

    const removeItemFromFilter = (value: string) => {
        const cloneFilter = isAdvFilter.filter((item) => item.value !== value);
        setAdvFilter(cloneFilter);
    };

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const { data, isLoading, isError } = GetJournal(
        isSearch,
        type,
        TablePage,
        isFilterText
    );

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

    const onSuccess = () => {
        setPrompt({
            message: `Items successfully ${buttonClicked}!`,
            type: "success",
            toggle: true,
        });
        buttonClicked = "";
    };
    const onError = () => {
        setPrompt({
            message: `Something is wrong!`,
            type: "error",
            toggle: true,
        });
        buttonClicked = "";
    };
    const { isLoading: updateLoading, mutate: updateMutate } = MultipleUpdate(
        onSuccess,
        onError
    );

    const UpdateStatus = (button: string) => {
        buttonClicked = button;
        let journalIds: any[] = [];
        isTableItem.itemArray.map((item: isTableItemObj) => {
            if (item.select === true) {
                journalIds.push(item.id);
            }
        });
        const Payload = {
            journal_ids: "[" + journalIds.toString() + "]",
            status: button,
        };
        updateMutate(Payload);
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
                        endpoint={`/finance/general-ledger/journal/filter-options?list_type=${type}&date_from=${isPeriod.from}&date_to=${isPeriod.to}&keywords=`}
                        setAdvFilter={setAdvFilter}
                        isAdvFilter={isAdvFilter}
                    />
                </div>

                <ul className={style.navigation}>
                    {type === "unposted" ? (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Approve">
                                    <div
                                        className={`${style.noFill} mr-5`}
                                        onClick={() => UpdateStatus("Approved")}
                                    >
                                        <Image
                                            src="/Images/f_Check.png"
                                            height={25}
                                            width={30}
                                            alt="Approved"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="In Process">
                                    <div
                                        className={`${style.noFill} mr-5`}
                                        onClick={() =>
                                            UpdateStatus("In Progress")
                                        }
                                    >
                                        <Image
                                            src="/Images/f_Refresh.png"
                                            height={30}
                                            width={30}
                                            alt="In Process"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Return">
                                    <div
                                        className={`${style.noFill} mr-5`}
                                        onClick={() => UpdateStatus("Pending")}
                                    >
                                        <Image
                                            src="/Images/f_Back.png"
                                            height={25}
                                            width={35}
                                            alt="Return"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Reject">
                                    <div
                                        className={style.noFill}
                                        onClick={() => UpdateStatus("Rejected")}
                                    >
                                        {updateLoading ? (
                                            buttonClicked === "Rejected" ? (
                                                <MoonLoader
                                                    size={25}
                                                    color="#8f384d"
                                                />
                                            ) : (
                                                <Image
                                                    src="/Images/f_Remove.png"
                                                    height={25}
                                                    width={25}
                                                    alt="Reject"
                                                />
                                            )
                                        ) : (
                                            <Image
                                                src="/Images/f_Remove.png"
                                                height={25}
                                                width={25}
                                                alt="Reject"
                                            />
                                        )}
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
            {/* Advance filter */}
            <ul className=" flex flex-wrap">
                {isAdvFilter.map((item, index) => (
                    <li
                        key={index}
                        className="px-3 text-[14px] text-ThemeRed py-1 bg-[#d9d9d9] mb-5 mr-3 rounded-[50px] relative pr-[25px]"
                    >
                        {item.value} -{" "}
                        <span className="text-ThemeRed50">{item.key}</span>
                        <span
                            onClick={() => removeItemFromFilter(item.value)}
                            className="text-[28px] hover:text-ThemeRed50 cursor-pointer rotate-45 absolute right-1 top-[48%] translate-y-[-50%]"
                        >
                            +
                        </span>
                    </li>
                ))}
            </ul>

            {type === "posted" && (
                <>
                    <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
                        <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    </div>
                </>
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
                                        itemDetail.status === "In Progress"
                                            ? "InProcess"
                                            : itemDetail.status
                                    }`}
                                >
                                    <div>
                                        {itemDetail.status === "Pending" && (
                                            <Image
                                                src={`/Images/f_Pending.png`}
                                                width={15}
                                                height={15}
                                                alt={itemDetail.status}
                                            />
                                        )}
                                        {itemDetail.status ===
                                            "In Progress" && (
                                            <Image
                                                src={`/Images/f_inprocess.png`}
                                                width={15}
                                                height={15}
                                                alt={itemDetail.status}
                                            />
                                        )}
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
            {type !== "posted" && (
                <td className="icon">
                    {itemDetail.status !== "In Progress" && (
                        <Link
                            href={`/finance/general-ledger/journal/modify-journal/${itemDetail.id}`}
                        >
                            <a>
                                <Tippy theme="ThemeRed" content={"Modify"}>
                                    <div className="icon">
                                        <Image
                                            src="/Images/f_Modify.png"
                                            height={15}
                                            width={15}
                                            alt="Modify"
                                        />
                                    </div>
                                </Tippy>
                            </a>
                        </Link>
                    )}
                </td>
            )}
        </tr>
    );
};
