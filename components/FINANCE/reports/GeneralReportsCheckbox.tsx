import React from "react";
import { GeneralReports } from "./CheckBoxes";

type Props = {
    isReportType: string;
};

const checkBoxLabel = " text-RegularColor text-[16px] 1024px:text-[14px]";
const CheckBoxListLabel = "mb-2 text-ThemeRed 1550px:text-[14px]";
const checkboxContainer =
    "w-1/5 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export default function GeneralReportsCheckbox({ isReportType }: Props) {
    return (
        <ul className="flex">
            {isReportType === "General Ledger" && (
                <li className={checkboxContainer}>
                    <h3 className={CheckBoxListLabel}>ACCOUNT NAME</h3>
                    {GeneralReports.AccountName.map((item, index) => (
                        <div className="mb-1" key={index}>
                            <input
                                type="checkbox"
                                id={`account_${item.id}`}
                                className="checkbox"
                            />
                            <label
                                htmlFor={`account_${item.id}`}
                                className={checkBoxLabel}
                            >
                                {item.name}
                            </label>
                        </div>
                    ))}
                </li>
            )}
            <li className={checkboxContainer}>
                <h3 className={CheckBoxListLabel}>DOCUMENT TYPE</h3>
                {GeneralReports.document_type.map((item, index) => (
                    <div className="mb-1" key={index}>
                        <input
                            type="checkbox"
                            id={`docType_${item.id}`}
                            className="checkbox"
                        />
                        <label
                            htmlFor={`docType_${item.id}`}
                            className={checkBoxLabel}
                        >
                            {item.name}
                        </label>
                    </div>
                ))}
            </li>
        </ul>
    );
}
