import React, { useContext, useState } from "react";
import { GeneralReports } from "./CheckBoxes";
import CheckBoxNameAndID from "./CheckBoxNameAndID";
import { format, isValid, parse } from "date-fns";
import AppContext from "../../Context/AppContext";
import RadioButtonNameAndID from "./RadioButtonNameAndID";

export type SelectedReportFilterType = { id: number; name: string };

type Props = {
    isReportType: string;
    Period: {
        from: string;
        to: string;
    };
    setPeriod: Function;
    setReportType: Function;
    setExportEndpoint: Function;
    FavoriteHandler: (
        report_type: string,
        document_type: string,
        report_account: string
    ) => void;
};

const checkBoxLabel = " text-RegularColor text-[16px] 1024px:text-[14px]";
const CheckBoxListLabel = "mb-2 text-ThemeRed 1550px:text-[14px]";
const checkboxContainer =
    "w-1/5 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export default function GeneralReportsCheckbox({
    isReportType,
    Period,
    setPeriod,
    setReportType,
    setExportEndpoint,
    FavoriteHandler,
}: Props) {
    const { setPrompt } = useContext(AppContext);

    const [isDocuments, setDocuments] = useState<SelectedReportFilterType[]>(
        []
    );

    const [isAccount, setAccount] = useState<SelectedReportFilterType[]>([]);

    const SelectHandler = (
        e: any,
        column: string,
        id: number,
        value: string
    ) => {
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
        setPeriod({
            from: "",
            to: "",
        });
        setAccount([]);
        setDocuments([]);
        setReportType("");
        setExportEndpoint("");
    };

    const ApplyHandler = () => {
        if (isReportType === "General Ledger" && isAccount.length <= 0) {
            setPrompt({
                message: "Select an Account",
                type: "draft",
                toggle: true,
            });
            return;
        }

        let dateFrom: any = parse(Period.from, "MMM dd yyyy", new Date());
        dateFrom = isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "";
        let dateTo: any = parse(Period.to, "MMM dd yyyy", new Date());
        dateTo = isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "";

        setExportEndpoint(
            `/finance/customer-facility/customer-reports?report_type=${isReportType}&account=${isAccount.map(
                (item) => item.name
            )}&document_type=${isDocuments.map(
                (item) => item.name
            )}&date_from=${dateFrom}&date_to=${dateTo}`
        );
        FavoriteHandler(
            isReportType,
            isDocuments.map((item) => item.name).toString(),
            isAccount.map((item) => item.id).toString()
        );
        setPrompt({
            message: "Filter applied",
            type: "success",
            toggle: true,
        });
    };

    return (
        <>
            <ul className="flex">
                {isReportType === "General Ledger" && (
                    <RadioButtonNameAndID
                        name="Account"
                        endpoint="/finance/general-ledger/chart-of-accounts"
                        SelectHandler={SelectHandler}
                        isCheckBox={isAccount}
                    />
                )}
                {(isReportType === "General Ledger" ||
                    isReportType === "General Journal") && (
                    <li className={checkboxContainer}>
                        <h3 className={CheckBoxListLabel}>DOCUMENT TYPE</h3>
                        {GeneralReports.document_type.map((item, index) => (
                            <div className="mb-1" key={index}>
                                <input
                                    type="checkbox"
                                    id={`docType_${item.id}`}
                                    checked={isDocuments.some(
                                        (someItem) => someItem.id === item.id
                                    )}
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
