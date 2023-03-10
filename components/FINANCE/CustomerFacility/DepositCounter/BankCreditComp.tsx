import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import styleSearch from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import { BarLoader } from "react-spinners";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import { GetBankCredit } from "./Query";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Pagination from "../../../Reusable/Pagination";
import BankAccountDropDown from "../../../Reusable/BankAccountDropDown";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import SelectBankAccount from "../../../Reusable/SelectBankAccount";
import { isReceiptBookData } from "./Receiptsbook";
import DropdownReceipt_Reference from "./DropdownReceipt_Reference";
import { format, isValid, parse } from "date-fns";

export type isTableBankCredit = {
    itemArray: isTableItemObjBC[];
    selectAll: boolean;
};

export type isTableItemObjBC = {
    id: string | number;
    index: string;
    bank_account_no: string;
    credit_date: string;
    credit_amount: number | string;
    remarks: string;
    variance: string;
    status: string;
    select: boolean;
    receipt_no: string;
    reference_no: string;
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

export default function BankCreditComp({
    type,
    isBankCredit,
    setBankCredit,
    setChangeData,
}: Props) {
    const [isSearch, setSearch] = useState("");
    const [isBank, setBank] = useState({
        id: "",
        value: "",
    });
    const [isSelectBank, setSelectBank] = useState<any>([]);
    const [isSelectBankIDS, setSelectBankIDS] = useState<any[]>([]);
    useEffect(() => {
        const selectbandIDS = isSelectBank.map((item: any) => {
            return item.id;
        });
        setSelectBankIDS(selectbandIDS);
    }, [isSelectBank]);
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    const [TablePage, setTablePage] = useState(1);
    const selectAll = () => {
        const newItems = isBankCredit?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isBankCredit.selectAll,
            };
        });
        setBankCredit({
            itemArray: newItems,
            selectAll: !isBankCredit.selectAll,
        });
    };
    const AddHandler = (itemDetail: isTableItemObjBC, index: number) => {
        const LocationToStart = index + 1;
        const cloneToSplice = isBankCredit.itemArray;
        cloneToSplice.splice(LocationToStart, 0, {
            id: isBankCredit.itemArray.length + 1,
            index: itemDetail.index,
            bank_account_no: itemDetail.bank_account_no,
            credit_date: "",
            credit_amount: "",
            remarks: itemDetail.remarks,
            variance: itemDetail.variance,
            status: itemDetail.status,
            select: false,
            receipt_no: itemDetail.receipt_no,
            reference_no: itemDetail.reference_no,
            children: true,
        });
        setBankCredit({
            ...isBankCredit,
            itemArray: cloneToSplice,
        });
    };

    const DeleteHandler = (id: string | number) => {
        const cloneToDelete = isBankCredit.itemArray.filter(
            (item) => item.id !== id
        );
        setBankCredit({
            ...isBankCredit,
            itemArray: cloneToDelete,
        });
    };

    const status = type === "bank-credit" ? "matched" : "unmatched";

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());
    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());
    const { data, isLoading, isError } = GetBankCredit(
        status,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        isSelectBankIDS,
        TablePage,
        isSearch
    );
    // APPLY DATA FROM API
    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.data.map((item: isTableItemObjBC) => {
                return {
                    id: item.id,
                    index: "",
                    bank_account_no: "BDO-555534",
                    credit_date: "SEP 22 2022",
                    credit_amount: 5000,
                    remarks: "Bounce Check",
                    variance: "",
                    status: "Posted",
                };
            });
            // Additional blank row field
            setBankCredit({
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
                {type === "bank-credit" && (
                    <div className={styleSearch.searchBar}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={isSearch}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <BsSearch className={styleSearch.searchIcon} />
                    </div>
                )}

                <div className={styleSearch.period}>
                    {type !== "bank-credit" && (
                        <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    )}

                    <div className="flex items-center ml-5">
                        <p className="labelField">BANK & ACCOUNT NO.</p>

                        <SelectBankAccount
                            isArrayBA={isSelectBank}
                            setArrayBA={setSelectBank}
                        />
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
                                            checked={isBankCredit.selectAll}
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
                        {isBankCredit?.itemArray.map(
                            (item: isTableItemObjBC, index: number) => (
                                <List
                                    key={index}
                                    index={index}
                                    itemDetail={item}
                                    isTableItem={isBankCredit}
                                    setTableItem={setBankCredit}
                                    type={type}
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
    itemDetail: isTableItemObjBC;
    isTableItem: isTableBankCredit;
    setTableItem: Function;
    type: string;
    index: number;
    setChangeData: Function;
    AddHandler: (itemDetail: isTableItemObjBC, index: number) => void;
    DeleteHandler: (id: number | string) => void;
};

const List = ({
    itemDetail,
    isTableItem,
    setTableItem,
    type,
    index,
    setChangeData,
    AddHandler,
    DeleteHandler,
}: ListProps) => {
    const [isSelect, setSelect] = useState({
        toggle: false,
        rec_ref: "",
    });

    const SelectField = (value: string) => {
        setSelect({
            rec_ref: value,
            toggle: false,
        });
    };
    const SelectHandler = (value: string) => {
        updateValue("", isSelect.rec_ref, value);
        setChangeData({
            dataThatChange: value,
            fromWhere: "bank credit",
            id: itemDetail.id,
            key: isSelect.rec_ref,
        });
    };
    const updateValue = (e: any, key: string, value: string) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "select") {
                    return {
                        ...item,
                        select: !item.select,
                    };
                }
                if (key === "receipt") {
                    return {
                        ...item,
                        receipt_no: value,
                    };
                }
                if (key === "reference") {
                    return {
                        ...item,
                        reference_no: value,
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
                <h4 className="field disabled ">{itemDetail.index}</h4>
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
            {type === "bank-credit" ? (
                <td>{itemDetail.receipt_no}</td>
            ) : (
                <td className="maxlarge">
                    {isSelect.rec_ref === "" ? (
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
                                        onClick={() =>
                                            setSelect({
                                                ...isSelect,
                                                toggle: true,
                                            })
                                        }
                                    />
                                }
                                samewidth={true}
                                toPop={
                                    <>
                                        {isSelect.toggle && (
                                            <ul>
                                                <li
                                                    onClick={() =>
                                                        SelectField("receipt")
                                                    }
                                                >
                                                    Receipt No.
                                                </li>
                                                <li
                                                    onClick={() =>
                                                        SelectField("reference")
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
                    ) : (
                        <DropdownReceipt_Reference
                            name="index"
                            value={
                                isSelect.rec_ref === "receipt"
                                    ? itemDetail.receipt_no
                                    : itemDetail.reference_no
                            }
                            selectHandler={SelectHandler}
                            keyType={isSelect.rec_ref}
                            endpoint="/finance/customer-facility/charges"
                        />
                    )}
                </td>
            )}
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
                                            src="/Images/f_pending.png"
                                            width={15}
                                            height={15}
                                            alt="Pending"
                                        />
                                    )}
                                    {itemDetail.status === "Posted" && (
                                        <Image
                                            src="/Images/f_posted.png"
                                            width={25}
                                            height={25}
                                            alt="Posted"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <InputNumberForTable
                        onChange={() => {}}
                        value={itemDetail.variance}
                        className={"field disabled w-full text-end"}
                        type={""}
                    />
                )}
            </td>
            {type !== "bank-credit" && (
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
