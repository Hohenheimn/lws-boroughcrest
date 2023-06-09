import React, { useContext, useEffect, useState } from "react";
import { CustomerReports } from "./CheckBoxes";
import CheckBoxNameAndID from "./CheckBoxNameAndID";
import { SelectedReportFilterType } from "./GeneralReportsCheckbox";
import { format, isValid, parse } from "date-fns";
import AppContext from "../../Context/AppContext";

type Props = {
    isReportType: string;
    Period: {
        from: string;
        to: string;
    };
    setPeriod: Function;
    setReportType: Function;
    setExportEndpoint: Function;
};

const checkBoxLabel = " text-RegularColor text-[16px] 1024px:text-[14px]";
const CheckBoxListLabel = "mb-2 text-ThemeRed 1550px:text-[14px]";
const checkboxContainer =
    "w-1/5 1024px:w-1/4 mb-3 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export default function CustomerReportsCheckboxes({
    isReportType,
    Period,
    setPeriod,
    setReportType,
    setExportEndpoint,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    // Customer
    const [isCustomer_Class, setCustomer_Class] = useState<
        SelectedReportFilterType[]
    >([]);
    const [isName, setName] = useState<string>("");
    // Property
    const [isType, setType] = useState<SelectedReportFilterType[]>([]);
    const [isClass, setClass] = useState<SelectedReportFilterType[]>([]);
    const [isTower, setTower] = useState<SelectedReportFilterType[]>([]);
    const [isProject, setProject] = useState<SelectedReportFilterType[]>([]);
    const [isFloor, setFloor] = useState<SelectedReportFilterType[]>([]);
    // Report
    const [isMemoType, setMemoType] = useState<SelectedReportFilterType[]>([]);
    const [isMode_of_payment, setMode_of_payment] = useState<
        SelectedReportFilterType[]
    >([]);
    const [isAccount, setAccount] = useState<SelectedReportFilterType[]>([]);
    const [isCharge, setCharge] = useState<SelectedReportFilterType[]>([]);
    const [isReceiptType, setReceiptType] = useState<
        SelectedReportFilterType[]
    >([]);

    const SelectHandler = (
        e: any,
        column: string,
        id: number,
        value: string
    ) => {
        if (e.target.checked === true) {
            if (column === "customer_class") {
                setCustomer_Class([
                    ...isCustomer_Class,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Account") {
                setAccount([
                    ...isAccount,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Type") {
                setType([
                    ...isType,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Class") {
                setClass([
                    ...isClass,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Tower") {
                setTower([
                    ...isTower,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Project") {
                setProject([
                    ...isProject,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Floor") {
                setFloor([
                    ...isFloor,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Memo_Type") {
                setMemoType([
                    ...isMemoType,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Mode_of_Payment") {
                setMode_of_payment([
                    ...isMode_of_payment,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Charge") {
                setCharge([
                    ...isCharge,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
            if (column === "Receipt_Type") {
                setReceiptType([
                    ...isReceiptType,
                    {
                        id: id,
                        name: value,
                    },
                ]);
            }
        }
        // remove
        if (e.target.checked === false) {
            if (column === "customer_class") {
                setCustomer_Class((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Account") {
                setAccount((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Type") {
                setType((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Class") {
                setClass((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Tower") {
                setTower((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Project") {
                setProject((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Floor") {
                setFloor((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Memo_Type") {
                setMemoType((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Mode_of_Payment") {
                setMode_of_payment((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Charge") {
                setCharge((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
            if (column === "Receipt_Type") {
                setReceiptType((current) =>
                    current.filter((filterItem) => filterItem.id !== id)
                );
            }
        }
    };

    const CancelHandler = () => {
        setPeriod({
            from: "",
            to: "",
        });
        setReportType("");
        setExportEndpoint("");
    };

    const ApplyHandler = () => {
        let dateFrom: any = parse(Period.from, "MMM dd yyyy", new Date());
        dateFrom = isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "";
        let dateTo: any = parse(Period.to, "MMM dd yyyy", new Date());
        dateTo = isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "";
        setExportEndpoint(
            `/finance/customer-facility/customer-reports?report_type=${isReportType}&customer_name=${isName}&customer_class=${isCustomer_Class.map(
                (item) => item.name
            )}&property_type=${isType.map(
                (item) => item.name
            )}&property_class=${isClass.map(
                (item) => item.name
            )}&property_tower=${isTower.map(
                (item) => item.name
            )}&property_floor=${isFloor.map(
                (item) => item.name
            )}&property_project=${isProject.map(
                (item) => item.name
            )}&report_mode_of_payment=${isMode_of_payment.map(
                (item) => item.name
            )}&report_charge=${isCharge.map(
                (item) => item.name
            )}&report_account=${isAccount.map(
                (item) => item.name
            )}&report_memo_type=${isMemoType.map(
                (item) => item.name
            )}&report_receipt_type=${isReceiptType.map(
                (item) => item.name
            )}&date_from=${dateFrom}&date_to=${dateTo}`
        );
        setPrompt({
            message: "Filter applied",
            type: "success",
            toggle: true,
        });
    };

    return (
        <>
            <ul className="flex flex-wrap">
                <li className="w-full mt-10">
                    <h3 className={CheckBoxListLabel}>CUSTOMER</h3>
                </li>
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Customer Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>CLASS</h3>
                        {CustomerReports.customerClass.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_${item.id}`}
                                    checked={isCustomer_Class.some(
                                        (someItem) => someItem.id === item.id
                                    )}
                                    className="checkbox"
                                    onChange={(e) =>
                                        SelectHandler(
                                            e,
                                            "customer_class",
                                            item.id,
                                            item.name
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`${item.name}_${item.id}`}
                                    className={checkBoxLabel}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </li>
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Customer Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>NAME</h3>
                        <input
                            type="text"
                            value={isName}
                            onChange={(e) => setName(e.target.value)}
                            className="field w-full"
                        />
                    </li>
                )}
                {/* -------------------------------------------------- */}
                <li className="w-full">
                    <h3 className={CheckBoxListLabel}>PROPERTY</h3>
                </li>
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>TYPE</h3>
                        {CustomerReports.type.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_${item.id}`}
                                    checked={isType.some(
                                        (someItem) => someItem.id === item.id
                                    )}
                                    className="checkbox"
                                    onChange={(e) =>
                                        SelectHandler(
                                            e,
                                            "Type",
                                            item.id,
                                            item.name
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`${item.name}_${item.id}`}
                                    className={checkBoxLabel}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </li>
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>CLASS</h3>
                        {CustomerReports.propertyClass.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_${item.id}`}
                                    checked={isClass.some(
                                        (someItem) => someItem.id === item.id
                                    )}
                                    className="checkbox"
                                    onChange={(e) =>
                                        SelectHandler(
                                            e,
                                            "Class",
                                            item.id,
                                            item.name
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`${item.name}_${item.id}`}
                                    className={checkBoxLabel}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </li>
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <CheckBoxNameAndID
                        name="Project"
                        endpoint="/admin/property/project"
                        SelectHandler={SelectHandler}
                        isCheckBox={isProject}
                    />
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <CheckBoxNameAndID
                        name="Tower"
                        endpoint="/admin/property/tower"
                        SelectHandler={SelectHandler}
                        isCheckBox={isTower}
                    />
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <CheckBoxNameAndID
                        name="Floor"
                        endpoint="/admin/property/floor"
                        SelectHandler={SelectHandler}
                        isCheckBox={isFloor}
                    />
                )}
                {/* -------------------------------------------------- */}
                <li className="w-full mt-10">
                    <h3 className={CheckBoxListLabel}>REPORT</h3>
                </li>
                {(isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <CheckBoxNameAndID
                        name="Account"
                        endpoint="/finance/general-ledger/chart-of-accounts"
                        SelectHandler={SelectHandler}
                        isCheckBox={isAccount}
                    />
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book" ||
                    isReportType === "Billing Summary" ||
                    isReportType === "Billing Register" ||
                    isReportType === "Customer Memo Register" ||
                    isReportType === "Account Subsidiary Ledger" ||
                    isReportType === "Aging Receivable Report" ||
                    isReportType === "Collection Efficiency Report" ||
                    "Outstanding Advances Report") && (
                    <CheckBoxNameAndID
                        name="Charge"
                        endpoint="/finance/customer-facility/charges"
                        SelectHandler={SelectHandler}
                        isCheckBox={isCharge}
                    />
                )}
                {isReportType === "Collection Summary" && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>MODE OF PAYMENT</h3>
                        {CustomerReports.reportClass.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_${item.id}`}
                                    checked={isMode_of_payment.some(
                                        (someItem) => someItem.id === item.id
                                    )}
                                    className="checkbox"
                                    onChange={(e) =>
                                        SelectHandler(
                                            e,
                                            "Mode_of_Payment",
                                            item.id,
                                            item.name
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`${item.name}_${item.id}`}
                                    className={checkBoxLabel}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </li>
                )}
                {(isReportType === "Collection Summary" ||
                    isReportType === "Cash Receipt Book") && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>RECEIPT TYPE</h3>
                        {CustomerReports.receipt_type.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_${item.id}`}
                                    checked={isReceiptType.some(
                                        (someItem) => someItem.id === item.id
                                    )}
                                    className="checkbox"
                                    onChange={(e) =>
                                        SelectHandler(
                                            e,
                                            "Receipt_Type",
                                            item.id,
                                            item.name
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`${item.name}_${item.id}`}
                                    className={checkBoxLabel}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </li>
                )}
                {isReportType === "Customer Memo Register" && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>MEMO TYPE</h3>
                        {CustomerReports.memo_type.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_${item.id}`}
                                    checked={isMemoType.some(
                                        (someItem) => someItem.id === item.id
                                    )}
                                    className="checkbox"
                                    onChange={(e) =>
                                        SelectHandler(
                                            e,
                                            "Memo_Type",
                                            item.id,
                                            item.name
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`${item.name}_${item.id}`}
                                    className={checkBoxLabel}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </li>
                )}
            </ul>
            <div className="flex justify-end items-center mt-10">
                <button className="button_cancel" onClick={CancelHandler}>
                    CANCEL
                </button>
                <button className="buttonRed" onClick={ApplyHandler}>
                    APPLY
                </button>
            </div>
        </>
    );
}
