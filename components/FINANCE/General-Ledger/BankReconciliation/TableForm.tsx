import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Calendar from "../../../Reusable/Calendar";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import styleSearch from "../../../../styles/SearchFilter.module.scss";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";
import AppContext from "../../../Context/AppContext";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import BankAccountDropDown from "../../../Reusable/BankAccountDropDown";
import { BankReconImport, CreateUpdateBR, GetBR } from "./Query";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import { validateCreditDebitField } from "../OpeningBalance/ValidateCreditDebitField";
import { format, isValid, parse } from "date-fns";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Link from "next/link";
import Details from "./Details";
import { useRouter } from "next/router";
import {
    MinusButtonTable,
    PencilButton,
    PlusButtonTable,
} from "../../../Reusable/Icons";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { TextFieldValidation } from "../../../Reusable/InputField";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";
import { DynamicExportHandler } from "../../../Reusable/DynamicExport";
import { DynamicImport } from "../../../Reusable/DynamicImport";
import { useQueryClient } from "react-query";

type isTableitemArray = isTableitemObj[];

type isTableitemObj = {
    id: string | number;
    date: string;
    debit: string;
    credit: string;
    balance: string;
    remarks: string;
    receipt_book: {
        receipt_no: string;
    }[];
    document_no: string;
    status: string;
};

export default function TableForm() {
    const Permission_create = AccessActionValidation(
        "Bank Reconciliation",
        "create"
    );

    const Permission_modify = AccessActionValidation(
        "Bank Reconciliation",
        "create"
    );

    const Permission_view = AccessActionValidation(
        "Bank Reconciliation",
        "create"
    );

    const router = useRouter();

    const [isEdit, setEdit] = useState(false);

    const { setPrompt } = useContext(AppContext);

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [isBankAccount, setBankAccount] = useState({
        id: "",
        value: "",
    });

    const [isTableItem, setTableItem] = useState<isTableitemArray>([]);

    const queryClient = useQueryClient();
    // Imports
    const ImportSuccess = () => {
        setPrompt({
            type: "success",
            message: "Successfully imported!",
            toggle: true,
        });
        queryClient.invalidateQueries([
            "bank-recon-list",
            isBankAccount.id,
            isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
            isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        ]);
    };

    const ImportError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: BankReconImportLoading, mutate: BankReconImportMutate } =
        BankReconImport(ImportSuccess, ImportError);

    const ImportMutate = (e: any) => {
        DynamicImport(e, setPrompt, BankReconImportMutate);
    };

    const [isExportLoading, setExportLoading] = useState(false);

    const ExportHandler = () => {
        if (
            isPeriod.from === "" ||
            isPeriod.to === "" ||
            isBankAccount.id === ""
        ) {
            setPrompt({
                message: "Set a period and Bank account",
                type: "draft",
                toggle: true,
            });
            return;
        }
        DynamicExportHandler(
            `/finance/general-ledger/bank-reconciliation/export?bank_account_id=${
                isBankAccount.id
            }&date_from=${
                isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : ""
            }&date_to=${isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : ""}`,
            "bank-reconciliation",
            setPrompt,
            setExportLoading
        );
    };

    const onSucces = () => {
        setEdit(false);
        setPrompt({
            toggle: true,
            message: "Bank reconciliation successfully saved!",
            type: "success",
        });
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: mutateLoading, mutate } = CreateUpdateBR(
        onSucces,
        onError
    );

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());

    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());

    const { isLoading, isError, data } = GetBR(
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        isBankAccount.id
    );

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: any, index: number) => {
                const date = parse(item.date, "yyyy-MM-dd", new Date());
                return {
                    id: item.id,
                    date: isValid(date) ? format(date, "MMM dd yyyy") : "",
                    balance: item?.balance,
                    remarks: item?.remarks,
                    document_no: "",
                    debit:
                        item?.debit === 0 || item?.debit === "0"
                            ? ""
                            : item.debit,
                    credit:
                        item?.credit === 0 || item?.credit === "0"
                            ? ""
                            : item?.credit,
                    status: item?.status,
                    receipt_book: item?.receipt_book,
                };
            });
            // Additional blank row field
            if (data?.data.length <= 0 || !Permission_view) {
                setTableItem([
                    {
                        id: "",
                        date: "",
                        balance: "",
                        remarks: "",
                        document_no: "",
                        debit: "",
                        credit: "",
                        status: "",
                        receipt_book: [],
                    },
                ]);
            } else {
                setTableItem(CloneArray);
            }
        }
    }, [data?.data, isBankAccount, isPeriod, isEdit]);

    const CancelHandler = () => {
        setEdit(false);
    };

    const [totalDebit, setTotalDebit] = useState<number>(0);

    const [totalCredit, setTotalCredit] = useState<number>(0);

    const [prevBalance, setPrevBalance] = useState<number>(0);

    const [totalBalance, setTotalBalance] = useState<number>(0);

    useEffect(() => {
        if (data?.status === 200) {
            setTotalDebit(0);
            setTotalCredit(0);
            setTotalBalance(0);
            isTableItem.map((item: isTableitemObj) => {
                setTotalDebit((temp) => Number(temp) + Number(item.debit));
                setTotalCredit((temp) => Number(temp) + Number(item.credit));
            });
            const totalBalance = Number(totalCredit) - Number(totalDebit);
            setTotalBalance(totalBalance);
        }
    }, [isTableItem]);

    const SubmitHandler = () => {
        let validate = true;
        const bank_recon = isTableItem.map((item: isTableitemObj) => {
            if (item.date === "") {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields!",
                    type: "draft",
                });
                validate = false;
                return;
            }
            if (item.debit === "" && item.credit === "") {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields!",
                    type: "draft",
                });
                validate = false;
                return;
            }
            const date = parse(item.date, "MMM dd yyyy", new Date());
            return {
                date: isValid(date) ? format(date, "yyyy-MM-dd") : "",
                debit: `${item.debit}`,
                credit: `${item.credit}`,
                remarks: item.remarks,
                document_no: item.document_no,
            };
        });
        const Payload = {
            bank_recon: bank_recon,
            bank_account_id: `${isBankAccount.id}`,
        };

        if (validate) mutate(Payload);
    };

    return (
        <>
            {router.query.view !== undefined && <Details />}
            <section className={styleSearch.container}>
                <div className={styleSearch.period}>
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    <div className="flex items-center ml-5 1280px:ml-0 1280px:mt-5">
                        <p className="labelField">BANK&nbsp;ACCOUNT</p>
                        <BankAccountDropDown
                            isObject={isBankAccount}
                            setObject={setBankAccount}
                        />
                    </div>
                </div>

                <ul className={styleSearch.navigation}>
                    <li className={styleSearch.importExportPrint}>
                        {(Permission_create || Permission_modify) && (
                            <div className="mr-5">
                                {!isEdit && (
                                    <PencilButton
                                        FunctionOnClick={() => {
                                            if (isBankAccount.id !== "") {
                                                setEdit(true);
                                            }
                                        }}
                                        title={"Edit"}
                                    />
                                )}
                            </div>
                        )}
                        {BankReconImportLoading ? (
                            <div className={styleSearch.icon}>
                                <MoonLoader color="#8f384d" size={20} />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Tippy theme="ThemeRed" content="Import">
                                        <label
                                            className={styleSearch.icon}
                                            htmlFor="import"
                                        >
                                            <Image
                                                src="/Images/Import.png"
                                                layout="fill"
                                                alt="Export"
                                            />
                                        </label>
                                    </Tippy>
                                </div>
                                <input
                                    type="file"
                                    id="import"
                                    className="hidden"
                                    onChange={ImportMutate}
                                />
                            </>
                        )}
                        {isExportLoading ? (
                            <div className={styleSearch.icon}>
                                <MoonLoader color="#8f384d" size={20} />
                            </div>
                        ) : (
                            <div>
                                <Tippy theme="ThemeRed" content="Export">
                                    <div
                                        className={styleSearch.icon}
                                        onClick={ExportHandler}
                                    >
                                        <Image
                                            src="/Images/Export.png"
                                            layout="fill"
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </div>
                        )}
                    </li>
                </ul>
            </section>
            <div className="table_container">
                <table className="table_list forCrud">
                    <thead className="textRed">
                        <tr>
                            <th>DATE</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                            <th>BALANCE</th>
                            <th>REMARKS</th>
                            <th>DOCUMENT NO.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h1 className="text-end text-ThemeRed">
                                    TOTAL
                                </h1>
                            </td>
                            <td>
                                <TextNumberDisplay
                                    value={totalDebit}
                                    className="withPeso text-end inline-block w-full"
                                />
                            </td>
                            <td>
                                <TextNumberDisplay
                                    value={totalCredit}
                                    className="withPeso text-end inline-block w-full"
                                />
                            </td>
                            <td>
                                <TextNumberDisplay
                                    value={totalBalance}
                                    className="withPeso text-end inline-block w-full"
                                />
                            </td>
                            <td>
                                <div>
                                    <p></p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p></p>
                                </div>
                            </td>
                        </tr>
                        {isBankAccount.id !== "" &&
                            isPeriod.from !== "" &&
                            isPeriod.to !== "" && (
                                <>
                                    {isTableItem.map(
                                        (item: any, index: number) => (
                                            <List
                                                itemDetail={item}
                                                key={index}
                                                isTableItem={isTableItem}
                                                setTableItem={setTableItem}
                                                rowNumber={index}
                                                setPrevBalance={setPrevBalance}
                                                prevBalance={prevBalance}
                                                dateFrom={dateFrom}
                                                dateTo={dateTo}
                                                isEdit={isEdit}
                                                Permission_create={
                                                    Permission_create
                                                }
                                                Permission_modify={
                                                    Permission_modify
                                                }
                                                Permission_view={
                                                    Permission_view
                                                }
                                            />
                                        )
                                    )}
                                </>
                            )}
                    </tbody>
                </table>

                {isLoading && isBankAccount.id !== "" && (
                    <div className="w-full h-full flex justify-center items-center">
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
            {isEdit && isBankAccount.id !== "" && (
                <div className="flex justify-end py-5 mt-20">
                    <button className="button_cancel" onClick={CancelHandler}>
                        Cancel
                    </button>
                    <button
                        className="buttonRed disabled:bg-ThemeRed50 disabled:pointer-events-none"
                        onClick={SubmitHandler}
                    >
                        {mutateLoading ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "SAVE"
                        )}
                    </button>
                </div>
            )}
        </>
    );
}

type ListProps = {
    itemDetail: isTableitemObj;
    isTableItem: isTableitemArray;
    setTableItem: Function;
    rowNumber: number;
    setPrevBalance: Function;
    prevBalance: number | string;
    dateFrom: Date;
    dateTo: Date;
    isEdit: boolean;

    Permission_create: boolean;
    Permission_modify: boolean;
    Permission_view: boolean;
};

const List = ({
    itemDetail,
    isTableItem,
    setTableItem,
    rowNumber,
    setPrevBalance,
    prevBalance,
    dateFrom,
    dateTo,
    isEdit,
    Permission_create,
    Permission_modify,
    Permission_view,
}: ListProps) => {
    const { setPrompt } = useContext(AppContext);
    const itemData: isTableitemObj = itemDetail;
    const [isDate, setDate] = useState({
        value: itemData.date,
        toggle: false,
    });

    useEffect(() => {
        const e = "";
        UpdateStateHandler("date", e);
    }, [isDate]);

    useEffect(() => {
        setPrevBalance(itemData.balance);
    }, []);

    const UpdateStateHandler = (key: string, value: any) => {
        const newItems = isTableItem.map((item: any) => {
            if (itemData.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        debit: Number(value),
                        credit: "",
                        balance:
                            Number(prevBalance) -
                            Number(value) +
                            Number(itemData.credit),
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: Number(value),
                        debit: "",
                        balance:
                            Number(prevBalance) -
                            Number(value) +
                            Number(itemData.debit),
                    };
                }
                if (key === "date") {
                    return {
                        ...item,
                        date:
                            isDate.value === "" ? itemData.date : isDate.value,
                    };
                }
                if (key === "remarks") {
                    return {
                        ...item,
                        remarks: value,
                    };
                }
                if (key === "document_no") {
                    return {
                        ...item,
                        document_no: value,
                    };
                }
            }
            return item;
        });
        setTableItem(newItems);
    };
    const [debitValidate, setDebitValidate] = useState("");
    const [creditValidate, setcreditValidate] = useState("");

    useEffect(() => {
        validateCreditDebitField(
            itemData.debit,
            itemData.credit,
            setDebitValidate,
            setcreditValidate
        );
    }, [itemData.debit, itemData.credit]);

    const AddRowHandler = (e: any) => {
        if (isTableItem.length !== rowNumber + 1) {
            return;
        }
        const random = Math.random();
        if (itemData.date === "") {
            setPrompt({
                toggle: true,
                message: "Fill out the fields!",
                type: "draft",
            });
            return;
        }
        if (itemData.debit === "" && itemData.credit === "") {
            setPrompt({
                toggle: true,
                message: "Fill out the fields!",
                type: "draft",
            });
            return;
        }
        setTableItem([
            ...isTableItem,
            {
                id: random,
                date: "",
                balance: prevBalance,
                remarks: "",
                document_no: "",
                debit: "",
                credit: "",
            },
        ]);
    };
    const RemoveRowHandler = () => {
        setTableItem((item: any[]) =>
            item.filter((x: any) => x.id !== itemData.id)
        );
    };

    return (
        <tr>
            <td>
                <article className="calendar relative w-full">
                    <span
                        className={`cal ${
                            itemData.receipt_book.length > 0 && " disabled"
                        }`}
                    >
                        <Image
                            src="/Images/CalendarMini.png"
                            width={15}
                            height={15}
                            alt=""
                        />
                    </span>

                    <input
                        type="text"
                        value={itemData.date}
                        onChange={() => {}}
                        placeholder="dd/mm/yyyy"
                        className={`field ${!isEdit && "disabled "} ${
                            itemData.receipt_book.length > 0 && " disabled"
                        }`}
                        onClick={() => setDate({ ...isDate, toggle: true })}
                    />
                    {isDate.toggle && (
                        <Calendar
                            forTable={true}
                            value={isDate}
                            setValue={setDate}
                            period={{
                                from: dateFrom,
                                to: dateTo,
                            }}
                        />
                    )}
                </article>
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${
                        !isEdit && "disabled "
                    } ${debitValidate} ${
                        itemData.receipt_book.length > 0 && " disabled"
                    }`}
                    value={itemData.debit}
                    onChange={UpdateStateHandler}
                    type={"debit"}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`number field inline-block w-full bg-white ${
                        !isEdit && "disabled "
                    } ${creditValidate} ${
                        itemData.receipt_book.length > 0 && " disabled"
                    }`}
                    value={itemData.credit}
                    onChange={UpdateStateHandler}
                    type={"credit"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={itemData.balance}
                    className="withPeso text-end inline-block w-full"
                />
            </td>
            <td>
                <input
                    type="text"
                    className={`field ${!isEdit && "disabled "} w-full ${
                        itemData.receipt_book.length > 0 && " disabled"
                    }`}
                    onChange={(e) => {
                        if (!TextFieldValidation(e, 50)) return;
                        UpdateStateHandler("remarks", e.target.value);
                    }}
                    value={itemData.remarks}
                />
            </td>
            <td>
                <div className="field disabled w-full">
                    {itemData.receipt_book.map((itemMap, index) =>
                        itemData.receipt_book.length - 1 === index
                            ? itemMap.receipt_no
                            : itemMap.receipt_no + ", "
                    )}
                </div>
            </td>
            {isEdit && (
                <td className="actionIcon">
                    {itemData.receipt_book.length > 0 ? (
                        <Link
                            href={`/finance/general-ledger/bank-reconciliation?view=${itemData.id}`}
                        >
                            <a>
                                <Tippy theme="ThemeRed" content={"View"}>
                                    <div>
                                        <AiOutlineInfoCircle className=" text-[16px]" />
                                    </div>
                                </Tippy>
                            </a>
                        </Link>
                    ) : (
                        <>
                            {Permission_modify && itemData.status !== "" && (
                                <>
                                    {isTableItem.length > 1 && (
                                        <div
                                            className=" cursor-pointer"
                                            onClick={RemoveRowHandler}
                                        >
                                            <MinusButtonTable />
                                        </div>
                                    )}
                                </>
                            )}
                            {itemData.status === "" && (
                                <>
                                    {isTableItem.length > 1 && (
                                        <div
                                            className=" cursor-pointer"
                                            onClick={RemoveRowHandler}
                                        >
                                            <MinusButtonTable />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {isTableItem.length - 1 === rowNumber &&
                        Permission_create && (
                            <div
                                className="ml-5 1024px:ml-2 cursor-pointer"
                                onClick={(e) => AddRowHandler(e)}
                            >
                                <PlusButtonTable />
                            </div>
                        )}
                </td>
            )}
        </tr>
    );
};
