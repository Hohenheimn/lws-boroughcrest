import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { BarLoader, MoonLoader } from "react-spinners";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import Pagination from "../../../Reusable/Pagination";
import AppContext from "../../../Context/AppContext";
import { format, isValid, parse } from "date-fns";
import { GetJournal, MultipleUpdate } from "../../General-Ledger/Journal/Query";
import { useRouter } from "next/router";
import { GetAdjustmentList, MultipleUpdateAdjustment } from "./Query";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { AdjustmentDetailType } from "./AdjusmentDetail";
import ModalTemp from "../../../Reusable/ModalTemp";

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
    memo_no: string;
    status: string;
    date: string;
    customer_name: string;
    properties: string[];
    description: string;
    select: boolean;
};

export default function AdjustmentTable({ type, isPeriod, setPeriod }: Props) {
    let buttonClicked = "";
    const [buttonLoading, setButtonLoading] = useState("");
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

    let dateFrom: any = parse(isPeriod.from, "MMM dd yyyy", new Date());
    let dateTo: any = parse(isPeriod.to, "MMM dd yyyy", new Date());
    dateFrom = isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "";
    dateTo = isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "";
    const { data, isLoading, isError } = GetAdjustmentList(
        isSearch,
        type,
        TablePage,
        isFilterText,
        dateFrom,
        dateTo
    );

    useEffect(() => {
        if (data?.status === 200) {
            let empty = false;

            let selectAll = false;

            let CloneArray = data?.data?.data.map(
                (item: AdjustmentDetailType) => {
                    if (item.id === null) {
                        empty = true;
                        return;
                    }
                    let select = false;
                    if (isSelectedIDs.includes(item.id)) {
                        select = true;
                    }
                    const date = parse(item.date, "yyyy-MM-dd", new Date());
                    return {
                        id: item.id,
                        status: item?.status,
                        memo_no: item?.memo_no,
                        date: isValid(date) ? format(date, "MMM dd yyyy") : "",
                        customer_name: item?.customer?.name,
                        properties: item?.customer?.properties.map(
                            (prop) => prop.unit_code
                        ),
                        description: item?.description,
                        select: select,
                    };
                }
            );

            if (CloneArray.length === isSelectedIDs.length) {
                selectAll = true;
            }

            setTableItem({
                itemArray: empty ? [] : CloneArray,
                selectAll: selectAll,
            });
        }
    }, [data?.data]);

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
            message: `Items successfully ${buttonLoading}!`,
            type: "success",
            toggle: true,
        });

        buttonClicked = "";

        setButtonLoading("");
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
        buttonClicked = "";
        setButtonLoading("");
    };

    const [isRejectNoticeToggle, setRejectNoticeToggle] = useState(false);

    const { isLoading: updateLoading, mutate: updateMutate } =
        MultipleUpdateAdjustment(onSuccess, onError);

    const UpdateStatus = (button: string) => {
        buttonClicked = button;

        setButtonLoading(button);

        if (isSelectedIDs.length > 0) {
            if (button === "Rejected") {
                setRejectNoticeToggle(true);
            } else {
                Confirm(button);
            }
        } else {
            setPrompt({
                message: "Select a Adjustment!",
                type: "draft",
                toggle: true,
            });
        }
    };

    const Confirm = (button: string) => {
        const Payload = {
            adjustment_ids: isSelectedIDs,
            status: button,
        };
        updateMutate(Payload);
    };

    return (
        <>
            {isRejectNoticeToggle && (
                <ModalTemp narrow={true}>
                    <h1 className="text-center mb-5">
                        Adjustment will be deleted and changes is not
                        reversible. Are you sure of this action?
                    </h1>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className="button_cancel"
                            onClick={() => setRejectNoticeToggle(false)}
                        >
                            CANCEL
                        </button>
                        <button
                            className="buttonRed"
                            onClick={() => Confirm("Rejected")}
                        >
                            CONFIRM
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
                        endpoint={`/finance/customer-facility/adjustment/filter-options?status=${type}&date_from=${dateFrom}&date_to=${dateTo}&keywords=`}
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
                                        onClick={() => UpdateStatus("Posted")}
                                    >
                                        {updateLoading &&
                                        buttonLoading === "Posted" ? (
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
                                        buttonLoading === "In Progress" ? (
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
                                        className={`${style.noFill} mr-5`}
                                        onClick={() => UpdateStatus("Pending")}
                                    >
                                        {updateLoading &&
                                        buttonLoading === "Pending" ? (
                                            <MoonLoader
                                                className="text-ThemeRed mr-2"
                                                color="#8f384d"
                                                size={16}
                                            />
                                        ) : (
                                            <Image
                                                src="/Images/f_back.png"
                                                height={25}
                                                width={35}
                                                alt="Return"
                                            />
                                        )}
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Reject">
                                    <div
                                        className={style.noFill}
                                        onClick={() => UpdateStatus("Rejected")}
                                    >
                                        {updateLoading &&
                                        buttonLoading === "Rejected" ? (
                                            <MoonLoader
                                                className="text-ThemeRed mr-2"
                                                color="#8f384d"
                                                size={16}
                                            />
                                        ) : (
                                            <Image
                                                src="/Images/f_remove.png"
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
                        {data?.data?.data?.length > 0 ? (
                            <>
                                {isTableItem?.itemArray.map(
                                    (item: isTableItemObj, index: number) => (
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
    const redirectHandler = () => {
        router.push(
            `/finance/customer-facility/adjustment/adjustment-list/${itemDetail.id}`
        );
    };
    return (
        <tr className=" cursor-pointer">
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
            <td onClick={redirectHandler}>
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
                                {itemDetail.status === "Draft" && (
                                    <Image
                                        src={`/Images/f_draft.png`}
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
                        <h2>{itemDetail.memo_no}</h2>
                    </div>
                )}
            </td>
            <td onClick={redirectHandler}>
                <div>
                    <h2>{itemDetail.date}</h2>
                </div>
            </td>
            <td onClick={redirectHandler}>
                <div>
                    <h2>{itemDetail.customer_name}</h2>
                </div>
            </td>
            <td onClick={redirectHandler}>
                <div>
                    <h2>
                        {itemDetail?.properties?.map(
                            (item: any, index: number) =>
                                itemDetail?.properties?.length - 1 === index
                                    ? item
                                    : item + ", "
                        )}
                    </h2>
                </div>
            </td>
            <td onClick={redirectHandler}>
                <div>
                    <h2>{itemDetail.description}</h2>
                </div>
            </td>
        </tr>
    );
};
