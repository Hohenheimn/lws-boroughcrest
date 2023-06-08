import React, { useState } from "react";
import { GeneralReports } from "./CheckBoxes";
import CheckBoxNameAndID from "./CheckBoxNameAndID";

type Props = {
    isReportType: string;
};

const checkBoxLabel = " text-RegularColor text-[16px] 1024px:text-[14px]";
const CheckBoxListLabel = "mb-2 text-ThemeRed 1550px:text-[14px]";
const checkboxContainer =
    "w-1/5 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export default function GeneralReportsCheckbox({ isReportType }: Props) {
    const [isDocuments, setDocuments] = useState<
        { id: number; name: string }[]
    >([]);

    const [isAccount, setAccount] = useState<{ id: number; name: string }[]>(
        []
    );

    const SelectHandler = (
        e: any,
        column: string,
        id: number,
        value: string
    ) => {
        console.log(e.target.checked);
        if (e.target.checked === true) {
            if (column === "document_type") {
                setDocuments([
                    ...isDocuments,
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
        }
        if (e.target.checked === false) {
            if (column === "document_type") {
                const clone = isDocuments.filter(
                    (filterItem) => filterItem.id !== id
                );
                setDocuments(clone);
            }
            if (column === "Account") {
                const clone = isAccount.filter(
                    (filterItem) => filterItem.id !== id
                );
                setAccount(clone);
            }
        }
    };

    const CancelHandler = () => {
        setAccount([]);
        setDocuments([]);
    };

    const ApplyHandler = () => {
        console.log(isAccount);
        console.log(isDocuments);
    };

    return (
        <>
            <ul className="flex">
                {isReportType === "General Ledger" && (
                    <CheckBoxNameAndID
                        name="Account"
                        endpoint="/finance/general-ledger/chart-of-accounts"
                    />
                )}
                <li className={checkboxContainer}>
                    <h3 className={CheckBoxListLabel}>DOCUMENT TYPE</h3>
                    {GeneralReports.document_type.map((item, index) => (
                        <div className="mb-1" key={index}>
                            <input
                                type="checkbox"
                                id={`docType_${item.id}`}
                                className="checkbox"
                                onChange={(e) =>
                                    SelectHandler(
                                        e,
                                        "document_type",
                                        item.id,
                                        item.name
                                    )
                                }
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
