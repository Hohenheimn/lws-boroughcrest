import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useContext, useEffect, useState } from "react";
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
import { GetBankCredit, MultipleUpdateBankCredit } from "./Query";
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
import AppContext from "../../../Context/AppContext";

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
    status: string;
    select: boolean;
    receipt_no: string;
    reference_no: string;
    rec_ref_amount: string | number;
    variance: number | string;
    childrenBC: childType[];
};

type childType = {
    receipt_id: string | number;
    receipt_no: string | number;
    reference_no: string | number;
    id: string | number;
    amount: number;
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
    const { setPrompt } = useContext(AppContext);
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
    const AddHandler = (id: string | number) => {
        const cloneToAdd = isBankCredit.itemArray.map(
            (item: isTableItemObjBC) => {
                if (item.id === id) {
                    return {
                        ...item,
                        childrenBC: [
                            ...item.childrenBC,
                            {
                                id: Math.random(),
                                receipt_no: "",
                                reference_no: "",
                                amount: "",
                                receipt_id: "",
                            },
                        ],
                    };
                }
                return item;
            }
        );
        setBankCredit({
            ...isBankCredit,
            itemArray: cloneToAdd,
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
    const DeleteHandlerChildren = (
        parentID: string | number,
        selectedID: string | number
    ) => {
        const cloneToDelete = isBankCredit.itemArray.map(
            (item: isTableItemObjBC) => {
                if (item.id === parentID) {
                    const clonetoFilter = item.childrenBC.filter(
                        (filterItem) => filterItem.id !== selectedID
                    );
                    return {
                        ...item,
                        childrenBC: clonetoFilter,
                    };
                }
                return item;
            }
        );

        setChangeData({
            dataThatChangeID: parentID,
            parentID: parentID,
            fromWhere: "bank credit",
        });

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
            const CloneArray = data?.data.data.map((item: any) => {
                let receiptno = "";
                let referenceno = "";
                let select = false;
                let childrenBC: childType[] = [];
                isBankCredit.itemArray.map((itemSelect) => {
                    if (itemSelect.id === item.id) {
                        receiptno = itemSelect.receipt_no;
                        referenceno = itemSelect.reference_no;
                        select = itemSelect.select;
                        childrenBC = itemSelect.childrenBC;
                    }
                });

                return {
                    id: item.id,
                    index: "",
                    bank_account_no: item.bank_account.bank_acc_no,
                    credit_date: item.date,
                    credit_amount: item.credit,
                    remarks: item.remarks,
                    variance: item.credit,
                    status: item.status,
                    receipt_no: item.receipt_book.receipt_no,
                    reference_no: item.receipt_book.reference_no,
                    select: select,
                    childrenBC: childrenBC,
                };
            });
            // Additional blank row field
            setBankCredit({
                itemArray: [
                    ...CloneArray,
                    {
                        id: 1,
                        index: "0001",
                        bank_account_no: "658651645",
                        credit_date: "1998-8-16",
                        credit_amount: 500,
                        remarks: "Sample remarks",
                        variance: 500,
                        status: "Pending",
                        receipt_no: "",
                        reference_no: "",
                        select: false,
                        childrenBC: [],
                    },
                    {
                        id: 2,
                        index: "0002",
                        bank_account_no: "231345",
                        credit_date: "2015-8-16",
                        credit_amount: 500,
                        remarks: "Sample remarks 2",
                        variance: 500,
                        status: "Posted",
                        receipt_no: "",
                        reference_no: "",
                        select: false,
                        childrenBC: [],
                    },
                    {
                        id: 3,
                        index: "0003",
                        bank_account_no: "231345",
                        credit_date: "2015-8-16",
                        credit_amount: 300,
                        remarks: "Sample remarks 2",
                        variance: 300,
                        status: "Posted",
                        receipt_no: "",
                        reference_no: "",
                        select: false,
                        childrenBC: [],
                    },
                ],
                selectAll: false,
            });
        }
    }, [data?.status, TablePage, isBank, isPeriod]);

    let buttonClicked = "";

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
    const { isLoading: updateLoading, mutate: updateMutate } =
        MultipleUpdateBankCredit(onSuccess, onError);

    const UpdateStatus = (status: string) => {
        buttonClicked = status;
        let bankCreditIDs: any[] = [];
        isBankCredit.itemArray.map((item: isTableItemObjBC) => {
            if (item.select === true) {
                bankCreditIDs.push(item.id);
            }
        });
        const Payload = {
            bank_credit_ids: "[" + bankCreditIDs.toString() + "]",
            status: status,
        };
        updateMutate(Payload);
    };
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
                                <div
                                    className={`${styleSearch.noFill} mr-5`}
                                    onClick={() => UpdateStatus("Return")}
                                >
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
                                <div
                                    className={`${styleSearch.noFill} mr-5`}
                                    onClick={() => UpdateStatus("Posted")}
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
                    </ul>
                )}
            </section>
            <div
                className={`table_container ${
                    type !== "bank-credit" && "max-half"
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
                                    DeleteHandlerChildren={
                                        DeleteHandlerChildren
                                    }
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
    AddHandler: (id: string | number) => void;
    DeleteHandler: (id: number | string) => void;
    DeleteHandlerChildren: (
        parentID: string | number,
        selectedID: string | number
    ) => void;
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
    DeleteHandlerChildren,
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
    const SelectHandler = (e: any) => {
        updateValue("rec_ref", e);
        setChangeData({
            dataThatChange: itemDetail.id,
            fromWhere: "bank credit",
            parentID: itemDetail.id,
            childreID: "",
        });
    };

    const SelectHandlerChildDD = (e: any) => {
        const ChildRowID = e.target.getAttribute("data-rowID");
        updateValue("rec_ref_Child", e);
        setChangeData({
            dataThatChangeID: itemDetail.id,
            fromWhere: "bank credit",
            parentID: itemDetail.id,
            childreID: ChildRowID,
        });
    };

    const updateValue = (key: string, e: any) => {
        const rec_ref_id = e.target.getAttribute("data-ref_ref_id");
        const receiptno = e.target.getAttribute("data-receiptno");
        const reference_no = e.target.getAttribute("data-referenceno");
        const amount = e.target.getAttribute("data-amount");
        const ChildRowID = e.target.getAttribute("data-rowid");

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
                        receipt_no: receiptno,
                        reference_no: reference_no,
                        rec_ref_amount: amount,
                    };
                }
                if (key === "rec_ref_Child") {
                    const childArray = item.childrenBC.map(
                        (childItem: childType) => {
                            if (Number(childItem.id) === Number(ChildRowID)) {
                                return {
                                    ...childItem,
                                    receipt_id: rec_ref_id,
                                    receipt_no: receiptno,
                                    reference_no: reference_no,
                                    id: rec_ref_id,
                                    amount: amount,
                                };
                            }
                            return childItem;
                        }
                    );
                    return {
                        ...item,
                        childrenBC: childArray,
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
        <>
            <tr className={`${itemDetail.childrenBC.length > 0 && "noBorder"}`}>
                {type === "bank-credit" && (
                    <td className="checkbox">
                        <div className="item">
                            <input
                                type="checkbox"
                                onChange={(e: any) => updateValue("select", e)}
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
                                                            SelectField(
                                                                "receipt"
                                                            )
                                                        }
                                                    >
                                                        Receipt No.
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            SelectField(
                                                                "reference"
                                                            )
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
                                rowID={1}
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
                            <HiMinus
                                onClick={() => DeleteHandler(itemDetail.id)}
                            />
                        </div>

                        {itemDetail.variance !== "0" &&
                            itemDetail.receipt_no !== "" &&
                            itemDetail.variance !== 0 &&
                            itemDetail.childrenBC.length <= 0 && (
                                <div className="ml-5 1024px:ml-2">
                                    <BsPlusLg
                                        onClick={() =>
                                            AddHandler(itemDetail.id)
                                        }
                                    />
                                </div>
                            )}

                        {itemDetail.variance !== 0 &&
                            itemDetail.childrenBC.length <= 0 && (
                                <div
                                    className={`ml-5 1024px:ml-2 ${
                                        itemDetail.variance !== "0" &&
                                        itemDetail.receipt_no === "" &&
                                        itemDetail.variance !== 0 &&
                                        itemDetail.childrenBC.length <= 0 &&
                                        "pointer-events-none opacity-[.5]"
                                    }`}
                                >
                                    <BsPlusLg
                                        onClick={() =>
                                            AddHandler(itemDetail.id)
                                        }
                                    />
                                </div>
                            )}
                    </td>
                )}
            </tr>

            {itemDetail.childrenBC.map((itemChildren, index) => (
                <ChildList
                    key={index}
                    itemChildren={itemChildren}
                    SelectHandlerChildDD={SelectHandlerChildDD}
                    itemDetail={itemDetail}
                    type={type}
                    index={index}
                    DeleteHandler={DeleteHandler}
                    AddHandler={AddHandler}
                    DeleteHandlerChildren={DeleteHandlerChildren}
                />
            ))}
        </>
    );
};

type ChildList = {
    itemChildren: childType;
    SelectHandlerChildDD: (e: any) => void;
    itemDetail: isTableItemObjBC;
    type: string;
    index: number;
    DeleteHandler: (id: string | number) => void;
    AddHandler: (id: string | number) => void;
    DeleteHandlerChildren: (
        parentID: string | number,
        selectedID: string | number
    ) => void;
};

const ChildList = ({
    itemChildren,
    SelectHandlerChildDD,
    itemDetail,
    DeleteHandlerChildren,
    AddHandler,
    type,
    index,
}: ChildList) => {
    const [isSelect, setSelect] = useState({
        rec_ref: "",
        toggle: false,
    });
    return (
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
                                                    setSelect({
                                                        rec_ref: "receipt",
                                                        toggle: false,
                                                    })
                                                }
                                            >
                                                Receipt No.
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setSelect({
                                                        rec_ref: "reference",
                                                        toggle: false,
                                                    })
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
                                ? itemChildren.receipt_no
                                : itemChildren.reference_no
                        }
                        selectHandler={SelectHandlerChildDD}
                        keyType={isSelect.rec_ref}
                        rowID={itemChildren.id}
                    />
                )}
            </td>
            <td>
                <InputNumberForTable
                    onChange={() => {}}
                    value={itemDetail.variance}
                    className={"field disabled w-full text-end"}
                    type={""}
                />
            </td>
            {type !== "bank-credit" && (
                <td className="actionIcon">
                    <div>
                        <HiMinus
                            onClick={() =>
                                DeleteHandlerChildren(
                                    itemDetail.id,
                                    itemChildren.id
                                )
                            }
                        />
                    </div>

                    {itemDetail.variance !== 0 && (
                        <div
                            className={`ml-5 1024px:ml-2 ${
                                itemDetail.variance !== "0" &&
                                itemChildren.receipt_no === "" &&
                                itemDetail.variance !== 0 &&
                                itemDetail.childrenBC.length - 1 === index &&
                                "pointer-events-none opacity-[.5]"
                            }`}
                        >
                            <BsPlusLg
                                onClick={() => AddHandler(itemDetail.id)}
                            />
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
};
