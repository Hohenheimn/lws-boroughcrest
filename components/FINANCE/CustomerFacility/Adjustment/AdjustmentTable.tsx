import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import Pagination from "../../../Reusable/Pagination";
import AppContext from "../../../Context/AppContext";
import { format, isValid, parse } from "date-fns";
import { GetJournal, MultipleUpdate } from "../../General-Ledger/Journal/Query";
import { useRouter } from "next/router";
import { GetAdjustmentList, MultipleUpdateAdjustment } from "./Query";

type Props = {
    type: string;
    isPeriod: {
        from: string;
        to: string;
    };
    setPeriod: Function;
};

type isTable = {
    itemArray: isTableItemObj[];
    selectAll: boolean;
};

type isTableItemObj = {
    id: number;
    date: string;
    particulars: string;
    status: string;
    journal_no: string | number;
    select: boolean;
};

export default function AdjustmentTable({ type, isPeriod, setPeriod }: Props) {
    let buttonClicked = "";
    const { setPrompt } = useContext(AppContext);
    const [isSearch, setSearch] = useState("");
    const [TablePage, setTablePage] = useState(1);
    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });

    const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

    // ADVANCE FILTER
    const [isAdvFilter, setAdvFilter] = useState<Advancefilter>([]);

    const [isFilterText, setFilterText] = useState<string>("");

    useEffect(() => {
        const cloneArray = isAdvFilter.map((item) => {
            return `${item.key}:${item.value}`;
        });
        setFilterText(cloneArray.toString());
    }, [isAdvFilter]);

    const removeItemFromFilter = (value: string) => {
        const cloneFilter = isAdvFilter.filter((item) => item.value !== value);
        setAdvFilter(cloneFilter);
    };

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());
    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());
    const { data, isLoading, isError } = GetAdjustmentList(
        isSearch,
        type,
        TablePage,
        isFilterText,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : ""
    );

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;
            if (data.data.length > 0) {
                let CloneArray = data?.data.map((item: isTableItemObj) => {
                    let select = false;
                    if (isSelectedIDs.includes(item.id)) {
                        select = true;
                    }
                    const date = parse(item.date, "yyyy-MM-dd", new Date());
                    return {
                        id: item.id,
                        date: isValid(date) ? format(date, "MMM dd yyyy") : "",
                        particulars: item.particulars,
                        status: item.status,
                        journal_no: item.journal_no,
                        select: select,
                    };
                });
                if (CloneArray.length === isSelectedIDs.length) {
                    selectAll = true;
                }

                setTableItem({
                    itemArray: CloneArray,
                    selectAll: selectAll,
                });
            }
        }
    }, [data]);

    const selectAll = () => {
        if (isTableItem.selectAll) {
            // remove
            setSelectedIDs([]);
        } else {
            // add
            const ReceiptBookIDs = isTableItem.itemArray.map((item) => {
                return Number(item.id);
            });
            setSelectedIDs(ReceiptBookIDs);
        }
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
        const tableArray = isTableItem.itemArray.map((item) => {
            return {
                ...item,
                select: false,
            };
        });
        setTableItem({
            itemArray: tableArray,
            selectAll: false,
        });
        setSelectedIDs([]);
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
    const { isLoading: updateLoading, mutate: updateMutate } =
        MultipleUpdateAdjustment(onSuccess, onError);

    const UpdateStatus = (button: string) => {
        buttonClicked = button;
        // const Payload = {
        //     journal_ids: "[" + isSelectedIDs + "]",
        //     status: button,
        // };
        // if (isSelectedIDs.length > 0) {
        //     updateMutate(Payload);
        // } else {
        //     setPrompt({
        //         message: "Select a Journal!",
        //         type: "draft",
        //         toggle: true,
        //     });
        // }
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
                        endpoint={`/finance/customer-facility/adjustment/filter-options?list_type=${type}&date_from=${isPeriod.from}&date_to=${isPeriod.to}&keywords=`}
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
                                            src="/Images/f_check.png"
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
                                            src="/Images/f_refresh.png"
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
                                            src="/Images/f_back.png"
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
                                        <Image
                                            src="/Images/f_remove.png"
                                            height={25}
                                            width={25}
                                            alt="Reject"
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
                            {type === "unposted" && (
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
                            <th>
                                {type === "unposted" ? "Status" : "Memo No."}
                            </th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Property</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.length > 0 ? (
                            <>
                                {isTableItem?.itemArray.map(
                                    (item: any, index: number) => (
                                        <List
                                            key={index}
                                            itemDetail={item}
                                            type={type}
                                            isTableItem={isTableItem}
                                            setTableItem={setTableItem}
                                            setSelectedIDs={setSelectedIDs}
                                            isSelectedIDs={isSelectedIDs}
                                        />
                                    )
                                )}
                            </>
                        ) : (
                            <></>
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
    isSelectedIDs: number[];
    setSelectedIDs: Function;
};

const List = ({
    itemDetail,
    type,
    isTableItem,
    setTableItem,
    isSelectedIDs,
    setSelectedIDs,
}: ListProps) => {
    const updateValue = (e: any) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (item.select) {
                    // remove
                    const filterSelected = isSelectedIDs.filter(
                        (itemFilt) => Number(item.id) !== itemFilt
                    );
                    setSelectedIDs(filterSelected);
                } else {
                    // add
                    setSelectedIDs([...isSelectedIDs, item.id]);
                }
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
    const router = useRouter();
    return (
        <tr
            className=" cursor-pointer"
            onClick={() => {
                router.push(
                    `/finance/customer-facility/adjustment/adjustment-list/${itemDetail.id}`
                );
            }}
        >
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
                                        src={`/Images/f_pending.png`}
                                        width={15}
                                        height={15}
                                        alt={itemDetail.status}
                                    />
                                )}
                                {itemDetail.status === "In Progress" && (
                                    <Image
                                        src={`/Images/f_InProcess.png`}
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
            </td>
            <td>
                <div>
                    <h2>{itemDetail.date}</h2>
                </div>
            </td>
            <td>
                <div>
                    <h2>Customer</h2>
                </div>
            </td>
            <td>
                <div>
                    <h2>Property</h2>
                </div>
            </td>
            <td>
                <div>
                    <h2>Description</h2>
                </div>
            </td>
        </tr>
    );
};
