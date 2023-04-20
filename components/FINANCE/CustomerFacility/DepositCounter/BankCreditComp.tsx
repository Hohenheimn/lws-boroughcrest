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
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import SelectBankAccount from "../../../Reusable/SelectBankAccount";
import { isReceiptBookData } from "./Receiptsbook";
import DropdownReceipt_Reference from "./DropdownReceipt_Reference";
import { format, isValid, parse } from "date-fns";
import AppContext from "../../../Context/AppContext";
import { MinusButtonTable, PlusButtonTable } from "../../../Reusable/Icons";

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
    rec_ref_id: string;
    reference_no: string;
    rec_ref_amount: string | number;
    variance: number | string;
    childrenBC: childType[];
    receipt_book: receipt_book[];
};

type receipt_book = {
    receipt_no: number | null | Text;
    reference_no: number | null | Text;
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
    const [isSelectedBankCreditIDs, setSelectedBankCreditIDs] = useState<
        number[]
    >([]);

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

    // GET SELECTED Reference no and receipt no FOR FILTERING DROPDOWN
    const [
        OverallSelectedReceiptReference,
        setOverallSelectedReceiptReference,
    ] = useState<string[]>([]);
    useEffect(() => {
        let ReceiptReferenceParent: string[] = [];
        let ReceiptReferenceChildren: string[] = [];
        isBankCredit.itemArray.map((item: isTableItemObjBC) => {
            ReceiptReferenceParent = [
                ...ReceiptReferenceParent,
                item.receipt_no,
                item.reference_no,
            ];
        });
        isBankCredit.itemArray.map((item: isTableItemObjBC) => {
            item.childrenBC.map((item2) => {
                ReceiptReferenceChildren = [
                    ...ReceiptReferenceChildren,
                    `${item2.receipt_no}`,
                    `${item2.reference_no}`,
                ];
            });
        });
        const OverallSelectedReceiptReference = [
            ...ReceiptReferenceParent,
            ...ReceiptReferenceChildren,
        ].filter((filterItem) => filterItem !== "");
        setOverallSelectedReceiptReference(OverallSelectedReceiptReference);
    }, [isBankCredit.itemArray]);

    const selectAll = () => {
        if (isBankCredit.selectAll) {
            // remove
            setSelectedBankCreditIDs([]);
        } else {
            // add
            const BankCreditIDs = isBankCredit.itemArray.map((item) => {
                return Number(item.id);
            });
            setSelectedBankCreditIDs(BankCreditIDs);
        }
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

    const displayStatus = type === "bank-credit" ? "matched" : "unmatched";

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());
    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());
    const { data, isLoading, isError } = GetBankCredit(
        displayStatus,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        isSelectBankIDS,
        TablePage,
        isSearch
    );
    // APPLY DATA FROM API
    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;
            const CloneArray = data?.data.data.map((item: any) => {
                let select = false;
                if (isSelectedBankCreditIDs.includes(item.id)) {
                    select = true;
                }
                return {
                    id: item.id,
                    index: item?.index,
                    bank_account_no: item?.bank_account?.bank_acc_no,
                    credit_date: item?.date,
                    credit_amount: item?.credit,
                    remarks: item?.remarks,
                    variance: item?.credit,
                    status: item?.status,
                    receipt_no: item?.receipt_no,
                    rec_ref_id: "",
                    reference_no: item?.reference_no,
                    select: select,
                    childrenBC:
                        type === "bank-credit"
                            ? item?.receipt_book.map((receiptBookItem: any) => {
                                  return {
                                      receipt_no: receiptBookItem?.receipt_no,
                                      reference_no:
                                          receiptBookItem?.reference_no,
                                      amount: receiptBookItem?.amount_paid,
                                  };
                              })
                            : [],
                };
            });

            if (
                CloneArray.length !== 0 &&
                CloneArray.every((val: any) =>
                    isSelectedBankCreditIDs.includes(val.id)
                )
            ) {
                selectAll = true;
            } else {
                selectAll = false;
            }

            setBankCredit({
                itemArray: CloneArray,
                selectAll: selectAll,
            });
        }
    }, [data, isSelectedBankCreditIDs]);

    let buttonClicked = "";

    const onSuccess = () => {
        setPrompt({
            message: `Items successfully updated status`,
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
        const Payload = {
            deposit_ids: isSelectedBankCreditIDs,
            status: status,
        };
        if (isSelectedBankCreditIDs.length > 0) {
            updateMutate(Payload);
        } else {
            setPrompt({
                message: "Select a Bank Credit!",
                type: "draft",
                toggle: true,
            });
        }
    };
    return (
        <>
            <section className={`${styleSearch.container}`}>
                <div className={styleSearch.period}>
                    <h1 className="SectionTitle">
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
                                    onClick={() => UpdateStatus("In Process")}
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
                                    isSelectedBankCreditIDs={
                                        isSelectedBankCreditIDs
                                    }
                                    setSelectedBankCreditIDs={
                                        setSelectedBankCreditIDs
                                    }
                                    SelectedReceiptReference={
                                        OverallSelectedReceiptReference
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
    isSelectedBankCreditIDs: number[];
    setSelectedBankCreditIDs: Function;
    SelectedReceiptReference: string[];
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
    isSelectedBankCreditIDs,
    setSelectedBankCreditIDs,
    SelectedReceiptReference,
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
                    if (item.select) {
                        // remove
                        const filterSelectedBCIDs =
                            isSelectedBankCreditIDs.filter(
                                (itemFilt) => Number(item.id) !== itemFilt
                            );
                        setSelectedBankCreditIDs(filterSelectedBCIDs);
                    } else {
                        // add
                        setSelectedBankCreditIDs([
                            ...isSelectedBankCreditIDs,
                            item.id,
                        ]);
                    }
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
                        rec_ref_id: rec_ref_id,
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

    let credit_date: any = parse(
        itemDetail.credit_date,
        "yyyy-MM-dd",
        new Date()
    );
    credit_date = isValid(credit_date)
        ? format(credit_date, "MMM dd yyyy")
        : "";
    return (
        <>
            <tr className={`${itemDetail.childrenBC.length > 0 && "noBorder"}`}>
                {type === "bank-credit" && (
                    <td className="checkbox">
                        <div className="item">
                            {itemDetail.status !== "Posted" && (
                                <input
                                    type="checkbox"
                                    onChange={(e: any) =>
                                        updateValue("select", e)
                                    }
                                    checked={itemDetail.select}
                                />
                            )}
                        </div>
                    </td>
                )}
                <td>
                    <h4 className="field disabled ">{itemDetail.index}</h4>
                </td>
                <td>{itemDetail.bank_account_no}</td>
                <td>{credit_date}</td>
                <td>
                    <TextNumberDisplay
                        value={itemDetail.credit_amount}
                        className="withPeso"
                    />
                </td>
                <td>{itemDetail.remarks}</td>
                {type === "bank-credit" ? (
                    <td>
                        {itemDetail.receipt_book?.map(
                            (item: any, index: number) => (
                                <span key={index}>
                                    {item.receipt_no === null
                                        ? item.reference_no
                                        : item.receipt_no}{" "}
                                    {itemDetail?.receipt_book?.length - 1 ===
                                    index
                                        ? ""
                                        : ", "}
                                </span>
                            )
                        )}
                    </td>
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
                                                    toggle: !isSelect.toggle,
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
                                selecteRefRec={SelectedReceiptReference}
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
                        {itemDetail?.variance !== 0 &&
                            itemDetail?.childrenBC.length <= 0 && (
                                <div>
                                    <div
                                        className={`ml-5 1024px:ml-2 ${
                                            itemDetail?.variance !== "0" &&
                                            itemDetail?.variance !== 0 &&
                                            itemDetail?.childrenBC?.length <=
                                                0 &&
                                            "pointer-events-none opacity-[.5]"
                                        }`}
                                        onClick={() =>
                                            AddHandler(itemDetail.id)
                                        }
                                    >
                                        <PlusButtonTable />
                                    </div>
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
                    SelectedReceiptReference={SelectedReceiptReference}
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
    SelectedReceiptReference: string[];
};

const ChildList = ({
    itemChildren,
    SelectHandlerChildDD,
    itemDetail,
    DeleteHandlerChildren,
    AddHandler,
    type,
    index,
    SelectedReceiptReference,
}: ChildList) => {
    const [isSelect, setSelect] = useState({
        rec_ref: "",
        toggle: false,
    });
    return (
        <tr
            className={`${
                itemDetail.childrenBC.length - 1 !== index && "noBorder"
            }`}
        >
            <td></td>
            <td></td>
            <td></td>
            <td>
                <TextNumberDisplay
                    value={itemChildren.amount}
                    className="withPeso"
                />
            </td>

            <td>
                {/* {itemChildren.receipt_no === null
                    ? itemChildren.reference_no
                    : itemChildren.receipt_no} */}
            </td>
            {type !== "bank-credit" && (
                <>
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
                                                    toggle: !isSelect.toggle,
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
                                                                rec_ref:
                                                                    "receipt",
                                                                toggle: false,
                                                            })
                                                        }
                                                    >
                                                        Receipt No.
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            setSelect({
                                                                rec_ref:
                                                                    "reference",
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
                                selecteRefRec={SelectedReceiptReference}
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
                    <td className="actionIcon">
                        <div
                            onClick={() =>
                                DeleteHandlerChildren(
                                    itemDetail.id,
                                    itemChildren.id
                                )
                            }
                        >
                            <MinusButtonTable />
                        </div>

                        {itemDetail.variance !== 0 &&
                            itemDetail.childrenBC.length - 1 === index && (
                                <div
                                    className={`ml-5 1024px:ml-2 ${
                                        itemDetail.variance !== "0" &&
                                        itemChildren.reference_no === "" &&
                                        itemDetail.variance !== 0 &&
                                        itemDetail.childrenBC.length - 1 ===
                                            index &&
                                        "pointer-events-none opacity-[.5]"
                                    }`}
                                >
                                    <div
                                        onClick={() =>
                                            AddHandler(itemDetail.id)
                                        }
                                    >
                                        <PlusButtonTable />
                                    </div>
                                </div>
                            )}
                    </td>
                </>
            )}
        </tr>
    );
};
