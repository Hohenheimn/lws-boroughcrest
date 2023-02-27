import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import PeriodCalendar from "../../../PeriodCalendar";
import styleSearch from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import TableErrorMessage from "../../../TableErrorMessage";
import { BarLoader } from "react-spinners";
import { TextNumberDisplay } from "../../../NumberFormat";
import { GetBankCredit } from "./Query";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Pagination from "../../../Pagination";
import BankAccountDropDown from "../../../BankAccountDropDown";
import DynamicPopOver from "../../../DynamicPopOver";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import SelectBankAccount from "../../../SelectBankAccount";

export type isTableDC = {
    itemArray: isTableItemObjDC[];
    selectAll: boolean;
};

export type isTableItemObjDC = {
    id: string | number;
    index: number;
    bank_account_no: string;
    credit_date: string;
    credit_amount: number;
    remarks: string;
    receipt_reference_no: string;
    variance: string;
    select: boolean;
    status: string;
};

type Props = {
    type: string;
};

export default function BankCreditComp({ type }: Props) {
    const [isBank, setBank] = useState({
        id: "",
        value: "",
    });
    const [isSelectBank, setSelectBank] = useState([]);
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    const [TablePage, setTablePage] = useState(1);
    const [isTableItem, setTableItem] = useState<isTableDC>({
        itemArray: [],
        selectAll: false,
    });
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
    const { data, isLoading, isError } = GetBankCredit("", TablePage);
    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.data.map((item: isTableItemObjDC) => {
                return {
                    id: item.id,
                    index: "00001",
                    bank_account_no: "BDO-555534",
                    credit_date: "SEP 22 2022",
                    credit_amount: 5000,
                    remarks: "Bounce Check",
                    receipt_reference_no: "Receipt No.",
                    variance: "",
                    status: "Posted",
                };
            });
            // Additional blank row field
            setTableItem({
                itemArray: CloneArray,
                selectAll: false,
            });
        }
    }, [data?.status, TablePage]);
    return (
        <>
            <section className={`${styleSearch.container}`}>
                <div className={styleSearch.period}>
                    <h1 className=" text-[20px] 1366px:text-[20px] flex items-center">
                        Bank Credit{" "}
                        {type !== "bank-credit" && (
                            <Link href="/finance/customer-facility/deposit-counter/bank-credit">
                                <a>
                                    <GoEye className=" text-ThemeRed ml-2 text-[16px]" />
                                </a>
                            </Link>
                        )}
                    </h1>
                </div>
            </section>
            <section className={styleSearch.container}>
                <div className={styleSearch.period}>
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    <div className="flex items-center ml-5">
                        <p className="labelField">BANK & ACCOUNT NO.</p>
                        {type === "bank-credit" ? (
                            <BankAccountDropDown
                                isObject={isBank}
                                setObject={setBank}
                            />
                        ) : (
                            <SelectBankAccount
                                isArrayBA={isSelectBank}
                                setArrayBA={setSelectBank}
                            />
                        )}
                    </div>
                </div>

                {type === "bank-credit" && (
                    <ul className={styleSearch.navigation}>
                        <li className={styleSearch.importExportPrint}>
                            <Tippy theme="ThemeRed" content="Export">
                                <div className={`${styleSearch.noFill} mr-5`}>
                                    <Image
                                        src="/Images/Export.png"
                                        height={30}
                                        width={30}
                                        alt="Return"
                                    />
                                </div>
                            </Tippy>
                        </li>
                        <li className={styleSearch.importExportPrint}>
                            <Tippy theme="ThemeRed" content="Return">
                                <div className={`${styleSearch.noFill} mr-5`}>
                                    <Image
                                        src="/Images/f_back.png"
                                        height={25}
                                        width={30}
                                        alt="Return"
                                    />
                                </div>
                            </Tippy>
                        </li>
                        <li className={styleSearch.importExportPrint}>
                            <Tippy theme="ThemeRed" content="Approved">
                                <div className={`${styleSearch.noFill} mr-5`}>
                                    <Image
                                        src="/Images/f_check.png"
                                        height={25}
                                        width={30}
                                        alt="Approved"
                                    />
                                </div>
                            </Tippy>
                        </li>
                    </ul>
                )}
            </section>
            <div
                className={`table_container ${
                    type !== "bank-credit" && "hAuto"
                }`}
            >
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            {type === "bank-credit" && (
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
                            <th>INDEX</th>
                            <th>BANK & ACCOUNT NO.</th>
                            <th>CREDIT DATE</th>
                            <th>CREDIT AMOUNT</th>
                            <th>REMARKS</th>
                            <th>RECEIPT NO. / REFERENCE NO.</th>
                            <th>
                                {type === "bank-credit" ? "STATUS" : "VARIANCE"}
                            </th>
                            {type !== "bank-credit" && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {isTableItem?.itemArray.map(
                            (item: any, index: number) => (
                                <List
                                    key={index}
                                    index={index}
                                    itemDetail={item}
                                    isTableItem={isTableItem}
                                    setTableItem={setTableItem}
                                    type={type}
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
            {type === "bank-credit" && (
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
    const [isSelect, setSelect] = useState(false);
    const SelectField = (value: string) => {
        updateValue("", value, "rec_ref");
        setSelect(false);
    };
    const updateValue = (e: any, value: string, key: string) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "select") {
                    return {
                        ...item,
                        select: !item.select,
                    };
                }
                if (key === "rec_ref") {
                    return {
                        ...item,
                        receipt_reference_no: value,
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
            {type === "bank-credit" && (
                <td className="checkbox">
                    <div className="item">
                        <input
                            type="checkbox"
                            onChange={(e: any) => updateValue(e, "select", "")}
                            checked={itemDetail.select}
                        />
                    </div>
                </td>
            )}
            <td>
                <p className="field disabled">{itemDetail.index}</p>
            </td>
            <td>{itemDetail.bank_account_no}</td>
            <td>{itemDetail.credit_date}</td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.credit_amount}
                    className="withPeso"
                />
            </td>
            <td>{itemDetail.remarks}</td>
            <td>
                <div className="select">
                    <span>
                        <MdOutlineKeyboardArrowDown />
                    </span>
                    <DynamicPopOver
                        toRef={
                            <input
                                type="text"
                                autoComplete="off"
                                className="field w-full"
                                readOnly
                                onClick={() => setSelect(true)}
                                value={itemDetail.receipt_reference_no}
                            />
                        }
                        samewidth={true}
                        toPop={
                            <>
                                {isSelect && (
                                    <ul>
                                        <li
                                            onClick={() =>
                                                SelectField("Receipt No.")
                                            }
                                        >
                                            Receipt No.
                                        </li>
                                        <li
                                            onClick={() =>
                                                SelectField("Reference No.")
                                            }
                                        >
                                            Reference No.
                                        </li>
                                    </ul>
                                )}
                            </>
                        }
                        className=""
                    />
                </div>
            </td>
            <td>
                {type === "bank-credit" ? (
                    <div className="item w-[100px]">
                        <div className="finance_status">
                            <div
                                className={`status ${
                                    itemDetail.status === "Pending"
                                        ? "PendingDC"
                                        : itemDetail.status
                                }`}
                            >
                                <div>
                                    {itemDetail.status === "Pending" && (
                                        <Image
                                            src="/Images/f_Pending.png"
                                            width={15}
                                            height={15}
                                            alt="Draft"
                                        />
                                    )}
                                    {itemDetail.status === "Posted" && (
                                        <Image
                                            src="/Images/f_Posted.png"
                                            width={25}
                                            height={25}
                                            alt="Draft"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="field disabled">{itemDetail.variance}</p>
                )}
            </td>
            {type !== "bank-credit" && (
                <td className="actionIcon">
                    <div>
                        <HiMinus />
                    </div>

                    <div className="ml-5 1024px:ml-2">
                        <BsPlusLg />
                    </div>
                </td>
            )}
        </tr>
    );
};
