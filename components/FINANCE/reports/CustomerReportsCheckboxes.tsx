import React from "react";
import { CustomerReports, GeneralReports } from "./CheckBoxes";
import CheckBoxNameAndID from "./CheckBoxNameAndID";

type Props = {
    isReportType: string;
};

const checkBoxLabel = " text-RegularColor text-[16px] 1024px:text-[14px]";
const CheckBoxListLabel = "mb-2 text-ThemeRed 1550px:text-[14px]";
const checkboxContainer =
    "w-1/5 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export default function CustomerReportsCheckboxes({ isReportType }: Props) {
    return (
        <>
            <ul className="flex flex-wrap">
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
                                    id={`${item.parent}_${item.grandParent}_${item.id}`}
                                    className="checkbox"
                                />
                                <label
                                    htmlFor={`${item.parent}_${item.grandParent}_${item.id}`}
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
                                    id={`${item.parent}_${item.grandParent}_${item.id}`}
                                    className="checkbox"
                                />
                                <label
                                    htmlFor={`${item.parent}_${item.grandParent}_${item.id}`}
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
                    />
                )}

                {/* -------------------------------------------------- */}

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
                                    id={`${item.parent}_${item.grandParent}_${item.id}`}
                                    className="checkbox"
                                />
                                <label
                                    htmlFor={`${item.parent}_${item.grandParent}_${item.id}`}
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
                        <input type="text" className="field w-full" />
                    </li>
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
                    />
                )}

                {isReportType === "Collection Summary" && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>MODE OF PAYMENT</h3>
                        {CustomerReports.reportClass.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`${item.parent}_${item.grandParent}_${item.id}`}
                                    className="checkbox"
                                />
                                <label
                                    htmlFor={`${item.parent}_${item.grandParent}_${item.id}`}
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
                                    id={`${item.parent}_${item.grandParent}_${item.id}`}
                                    className="checkbox"
                                />
                                <label
                                    htmlFor={`${item.parent}_${item.grandParent}_${item.id}`}
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
                                    id={`${item.parent}_${item.grandParent}_${item.id}`}
                                    className="checkbox"
                                />
                                <label
                                    htmlFor={`${item.parent}_${item.grandParent}_${item.id}`}
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
                <button className="button_cancel">CANCEL</button>
                <button className="buttonRed">APPLY</button>
            </div>
        </>
    );
}
