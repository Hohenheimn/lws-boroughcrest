import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import Pagination from "../../../Reusable/Pagination";
import AppContext from "../../../Context/AppContext";
import { format, isValid, parse, startOfDay } from "date-fns";
import ModalTemp from "../../../Reusable/ModalTemp";
import { CopyButtonTable } from "../../../Reusable/Icons";
import { GetInvoiceList, MultipleUpdateBillingList } from "./Query";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import Calendar from "../../../Reusable/Calendar";

type isTable = {
    itemArray: isTableItemObj[];
    selectAll: boolean;
};

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
    select: boolean;
};

export default function BillingList() {
    const [type, setType] = useState("unposted");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    const [ButtonClicked, setButtonClicked] = useState("");
    const { setPrompt } = useContext(AppContext);
    const [isSearch, setSearch] = useState("");
    const [TablePage, setTablePage] = useState(1);
    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });

    const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

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

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());
    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());
    const { data, isLoading, isError } = GetInvoiceList(
        isSearch,
        type,
        TablePage,
        isFilterText,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : ""
    );

    useEffect(() => {
        let selectAll = false;
        if (data?.data.data.length > 0) {
            let CloneArray = data?.data.data.map((item: isTableItemObj) => {
                let select = false;
                if (isSelectedIDs.includes(item.id)) {
                    select = true;
                }
                const due_date = parse(item.due_date, "yyyy-MM-dd", new Date());
                const billing_date = parse(
                    item.billing_date,
                    "yyyy-MM-dd",
                    new Date()
                );
                return {
                    id: item.id,
                    status: item.status,
                    invoice_no: item.invoice_no,
                    customer: {
                        name: item.customer.name,
                        properties: item.customer.properties.map(
                            (itemProperty: any) => {
                                return itemProperty.unit_code;
                            }
                        ),
                    },
                    due_amount: item.due_amount,
                    applied_advances: item.applied_advances,
                    billing_date: isValid(billing_date)
                        ? format(billing_date, "MMM dd yyyy")
                        : "",
                    due_date: isValid(due_date)
                        ? format(due_date, "MMM dd yyyy")
                        : "",
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
        } else {
            setTableItem({
                itemArray: [],
                selectAll: false,
            });
        }
    }, [data, type]);

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
            message: `Items successfully ${ButtonClicked}!`,
            type: "success",
            toggle: true,
        });
        setButtonClicked("");
        setUpdateDueDate({
            value: "",
            toggle: false,
        });
    };
    const onError = () => {
        setPrompt({
            message: `Something is wrong!`,
            type: "error",
            toggle: true,
        });
        setButtonClicked("");
    };
    const { isLoading: updateLoading, mutate: updateMutate } =
        MultipleUpdateBillingList(onSuccess, onError);

    const [isInProcesNoticeToggle, setInProcesNoticeToggle] = useState(false);

    const UpdateStatus = (button: string) => {
        setButtonClicked(button);

        if (isSelectedIDs.length > 0) {
            if (button === "In Process") {
                setInProcesNoticeToggle(true);
            } else {
                Confirm(button);
            }
        } else {
            setPrompt({
                message: "Select a Invoice!",
                type: "draft",
                toggle: true,
            });
        }
    };
    const Confirm = (button: string) => {
        const dueDate = parse(updateDueDate.value, "MMM dd yyyy", new Date());
        const Payload = {
            invoice_ids: "[" + isSelectedIDs + "]",
            status: button,
            due_date: isValid(dueDate) ? format(dueDate, "yyyy-MM-dd") : null,
        };
        updateMutate(Payload);
    };
    return (
        <>
            {isInProcesNoticeToggle && (
                <ModalTemp narrow={true}>
                    <h1 className="text-start mb-5">Enter Due Date</h1>
                    <div className="calendar w-full mb-5">
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
                            className="px-2 h-10 1550px:h-8 outline-none rounded-md shadow-md"
                        />
                        {updateDueDate.toggle && (
                            <Calendar
                                value={updateDueDate}
                                setValue={setUpdateDueDate}
                            />
                        )}
                    </div>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className="button_cancel"
                            onClick={() => setInProcesNoticeToggle(false)}
                        >
                            CANCEL
                        </button>
                        <button
                            className="buttonRed"
                            onClick={() => Confirm("In Process")}
                        >
                            {updateLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "PROCESS"
                            )}
                        </button>
                    </div>
                </ModalTemp>
            )}

            <ul className="SimpleTab">
                <li
                    className={`${type === "unposted" && "Active"}`}
                    onClick={() => {
                        setType("unposted");
                        setPeriod({ from: "", to: "" });
                    }}
                >
                    Unposted Invoices
                </li>
                <li
                    className={`${type === "posted" && "Active"}`}
                    onClick={() => {
                        setPeriod({ from: "", to: "" });
                        setType("posted");
                    }}
                >
                    Posted Invoices
                </li>
            </ul>

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
                        endpoint={`/finance/customer-facility/billing/filter-options?list_type=${type}&date_from=${isPeriod.from}&date_to=${isPeriod.to}&keywords=`}
                        setAdvFilter={setAdvFilter}
                        isAdvFilter={isAdvFilter}
                    />
                </div>

                <ul className={style.navigation}>
                    {type === "unposted" ? (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Posted">
                                    <div
                                        className={`${style.noFill} mr-5`}
                                        onClick={() => UpdateStatus("Posted")}
                                    >
                                        {updateLoading &&
                                        ButtonClicked === "Posted" ? (
                                            <MoonLoader
                                                className="text-ThemeRed mr-2"
                                                color="#8f384d"
                                                size={16}
                                            />
                                        ) : (
                                            <Image
                                                src="/Images/f_check.png"
                                                height={25}
                                                width={30}
                                                alt="Posted"
                                            />
                                        )}
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="In Process">
                                    <div
                                        className={`${style.noFill} mr-5`}
                                        onClick={() =>
                                            UpdateStatus("In Process")
                                        }
                                    >
                                        {updateLoading &&
                                        ButtonClicked === "In Process" ? (
                                            <MoonLoader
                                                className="text-ThemeRed mr-2"
                                                color="#8f384d"
                                                size={16}
                                            />
                                        ) : (
                                            <Image
                                                src="/Images/f_refresh.png"
                                                height={30}
                                                width={30}
                                                alt="In Process"
                                            />
                                        )}
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Return">
                                    <div
                                        className={`${style.noFill}`}
                                        onClick={() => UpdateStatus("Pending")}
                                    >
                                        {updateLoading &&
                                        ButtonClicked === "Pending" ? (
                                            <MoonLoader
                                                className="text-ThemeRed mr-2"
                                                color="#8f384d"
                                                size={16}
                                            />
                                        ) : (
                                            <Image
                                                src="/Images/f_back.png"
                                                height={25}
                                                width={30}
                                                alt="Return"
                                            />
                                        )}
                                    </div>
                                </Tippy>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Print">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/Print.png"
                                            height={30}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
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
                            <li className={style.new}>
                                <div>POST TO PORTAL</div>
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

            {type === "posted" && (
                <>
                    <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
                        <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    </div>
                </>
            )}

            <div className="table_container">
                <table className="table_list">
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
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Property</th>
                                    <th>Due Amount</th>
                                    <th>Applied Advances</th>
                                </>
                            ) : (
                                <>
                                    <th>Billing Date</th>
                                    <th>Invoice No.</th>
                                    <th>Customer</th>
                                    <th>Property</th>
                                    <th>Due Amount</th>
                                    <th>Due Date</th>
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
                                    setSelectedIDs={setSelectedIDs}
                                    isSelectedIDs={isSelectedIDs}
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
                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
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
                                        {itemDetail.status === "Pending" && (
                                            <Image
                                                src={`/Images/f_pending.png`}
                                                width={15}
                                                height={15}
                                                alt={itemDetail.status}
                                            />
                                        )}
                                        {itemDetail.status === "In Process" && (
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
                                <h2>{itemDetail.billing_date}</h2>
                            </div>
                        )}
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>
                                {type === "unposted"
                                    ? itemDetail.billing_date
                                    : itemDetail.invoice_no}
                            </h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.customer.name}</h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>
                                {itemDetail.customer.properties.map(
                                    (item, index) =>
                                        itemDetail.customer.properties.length -
                                            1 ===
                                        index
                                            ? item
                                            : item + ", "
                                )}
                            </h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>
                                <TextNumberDisplay
                                    value={itemDetail.due_amount}
                                    className="withPeso w-full text-end"
                                />
                            </h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>
                                {type === "unposted" ? (
                                    <TextNumberDisplay
                                        value={
                                            itemDetail.applied_advances === null
                                                ? ""
                                                : itemDetail.applied_advances
                                        }
                                        className="withPeso w-full text-end"
                                    />
                                ) : (
                                    itemDetail.due_date
                                )}
                            </h2>
                        </div>
                    </a>
                </Link>
            </td>

            {type !== "unposted" && (
                <td className="icon w-[100px]">
                    <div className="item w-[150px]">
                        <div className="finance_status">
                            <div className="status Sent">
                                <div>
                                    <Image
                                        src="/Images/f_sent.png"
                                        width={15}
                                        height={15}
                                        alt="Draft"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            )}
        </tr>
    );
};
