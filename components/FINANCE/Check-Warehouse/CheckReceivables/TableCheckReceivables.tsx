import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BarLoader } from "react-spinners";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import Pagination from "../../../Reusable/Pagination";

import { format, isValid, parse } from "date-fns";
import ModalTemp from "../../../Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import Calendar from "../../../Reusable/Calendar";

import { BookedCheck } from "../../../Reusable/Icons";
import { GetInvoiceList } from "../../CustomerFacility/Billing/Query";
import { useRouter } from "next/router";

type isTableItemObj = {
    id: number;
    status: string;
    invoice_no: number;
    customer: {
        name: string;
        properties: string[];
    };
    due_amount: number;
    applied_advances: number | null;
    billing_date: string;
    due_date: string;
    date: string;
    select: boolean;
};

export default function TableCheckReceivables() {
    const router = useRouter();

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [isSearch, setSearch] = useState("");

    const [TablePage, setTablePage] = useState(1);

    const [updateDueDate, setUpdateDueDate] = useState({
        value: "",
        toggle: false,
    });

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

    let dateFrom: any = parse(isPeriod.from, "MMM dd yyyy", new Date());
    let dateTo: any = parse(isPeriod.to, "MMM dd yyyy", new Date());
    dateFrom = isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "";
    dateTo = isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "";
    const { data, isLoading, isError } = GetInvoiceList(
        isSearch,
        "",
        TablePage,
        isFilterText,
        dateFrom,
        dateTo
    );

    const onSuccess = () => {};

    const onError = () => {};

    return (
        <>
            {router.query.book !== undefined && (
                <ModalTemp narrow={true}>
                    <h1 className="text-start text-ThemeRed mb-5">
                        Booked Check
                    </h1>
                    <ul className="flex justify-between flex-wrap">
                        <li className="w-[48%]">
                            <h1 className="text-[12px] text-ThemeRed">
                                DEPOSIT DATE
                            </h1>
                            <div className="calendar w-full mb-5 border">
                                <span className="cal">
                                    <Image
                                        src="/Images/CalendarMini.png"
                                        width={15}
                                        height={15}
                                        alt=""
                                    />
                                </span>
                                <input
                                    type="text"
                                    value={updateDueDate.value}
                                    onChange={() => {}}
                                    placeholder="mm dd yyyy"
                                    onClick={() =>
                                        setUpdateDueDate({
                                            ...updateDueDate,
                                            toggle: true,
                                        })
                                    }
                                    className="px-2 h-10 1550px:h-8 outline-none w-full rounded-md shadow-md"
                                />
                                {updateDueDate.toggle && (
                                    <Calendar
                                        value={updateDueDate}
                                        setValue={setUpdateDueDate}
                                    />
                                )}
                            </div>
                        </li>
                        <li className="w-[48%]">
                            <h1 className="text-[12px] text-ThemeRed">
                                REFERENCE NO.
                            </h1>
                            <input type="text" className="field w-full" />
                        </li>
                        <li className="w-full mb-5">
                            <h1 className="text-[12px] text-ThemeRed">
                                REMARKS
                            </h1>
                            <textarea
                                name=""
                                className="field w-full"
                                id=""
                            ></textarea>
                        </li>
                    </ul>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className="button_cancel"
                            onClick={() => router.push("")}
                        >
                            CANCEL
                        </button>
                        <button className="buttonBorder mr-2">REJECT</button>
                        <button className="buttonRed">
                            SAVE
                            {/* {updateLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "PROCESS"
                            )} */}
                        </button>
                    </div>
                </ModalTemp>
            )}

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
                        endpoint={`/finance/customer-facility/billing/filter-options?date_from=${dateFrom}&date_to=${dateTo}&keywords=`}
                        setAdvFilter={setAdvFilter}
                        isAdvFilter={isAdvFilter}
                    />
                </div>

                <ul className={style.navigation}>
                    <li className={style.importExportPrint}>
                        <Tippy theme="ThemeRed" content="Post">
                            <div className={`${style.noFill} mr-5`}>
                                <Image
                                    src="/Images/Export.png"
                                    height={35}
                                    width={35}
                                    alt="Posted"
                                />
                            </div>
                        </Tippy>
                    </li>
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
                        <span className="text-ThemeRed50">{item.display}</span>
                        <span
                            onClick={() => removeItemFromFilter(item.value)}
                            className="text-[28px] hover:text-ThemeRed50 cursor-pointer rotate-45 absolute right-1 top-[48%] translate-y-[-50%]"
                        >
                            +
                        </span>
                    </li>
                ))}
            </ul>

            <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
                <PeriodCalendar value={isPeriod} setValue={setPeriod} />
            </div>

            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Status</th>
                            <th>Receipt No.</th>
                            <th>Payor</th>
                            <th>Check Date</th>
                            <th>Check No.</th>
                            <th>Bank & Branch</th>
                            <th>Check Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map((item: any, index: number) => (
                            <List key={index} itemDetail={item} />
                        ))}
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
};

const List = ({ itemDetail }: ListProps) => {
    const router = useRouter();

    return (
        <tr className="hoverEffect">
            <td className="icon">
                <div
                    className=" cursor-pointer"
                    onClick={() => router.push(`?book=${itemDetail.id}`)}
                >
                    <BookedCheck />
                </div>
            </td>
            <td>
                <div className="finance_status">
                    <div className={`status cw ${itemDetail.status}`}>
                        <div>
                            {itemDetail.status === "Matured" && (
                                <Image
                                    src={`/Images/f_matured.png`}
                                    width={4}
                                    height={15}
                                    alt={itemDetail.status}
                                />
                            )}
                            {itemDetail.status === "Pending" && (
                                <Image
                                    src={`/Images/f_cw_pending.png`}
                                    width={15}
                                    height={4}
                                    alt={itemDetail.status}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </td>
            <td>00001</td>
            <td>Juan Dela Cruz</td>
            <td>Sep 28 2023</td>
            <td>549879874</td>
            <td>BDO Manila</td>
            <td>
                <div>
                    <h2>
                        <TextNumberDisplay
                            value={5000}
                            className="withPeso w-full text-end"
                        />
                    </h2>
                </div>
            </td>
        </tr>
    );
};
