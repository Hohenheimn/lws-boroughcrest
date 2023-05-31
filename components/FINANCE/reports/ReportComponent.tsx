import React, { useState } from "react";
import SelectDropdown from "../../../components/Reusable/SelectDropdown";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import Link from "next/link";
import GeneralReportsCheckbox from "./GeneralReportsCheckbox";
import { useRouter } from "next/router";
import CustomerReportsCheckboxes from "./CustomerReportsCheckboxes";
import PreviousPeriod from "../CustomerFacility/Billing/RecordMeter/PreviousPeriod";

export default function ReportComponent() {
    const router = useRouter();

    const [isReportType, setReportType] = useState("");

    const [isFavorite, setFavorite] = useState(false);

    const reportPage = router.pathname?.includes("/reports/general-reports")
        ? "general_reports"
        : "customer_reports";

    const [isPreviousPeriod, setPreviousPeriod] = useState({
        year: "",
        from: "",
        to: "",
    });
    return (
        <>
            <ul className="w-full border-b border-gray-300 pb-10 mb-10 640px:pb-5 640px:mb-5">
                <li className="flex pr-5 640px:p-0 640px:w-full 640px:mb-5 640px:flex-col">
                    <div>
                        <div className="flex mb-5">
                            <h2 className="text-ThemeRed mr-5 1550px:text-[14px] 640px:text-[12px]">
                                REPORT&nbsp;TYPE
                            </h2>
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setReportType(value);
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-[300px] 480px:w-full field"
                                        value={isReportType}
                                        readOnly
                                        autoComplete="off"
                                    />
                                }
                                listArray={
                                    reportPage === "general_reports"
                                        ? [
                                              "General Ledger",
                                              "General Journal",
                                              "Trial Balance",
                                          ]
                                        : [
                                              "Collection Summary",
                                              "Cash Receipt Book",
                                              "Billing Summary",
                                              "Billing Register",
                                              "Customer Memo Register",
                                              "Account Subsidiary Ledger",
                                              "Customer Subsidiary Ledger",
                                              "Outstanding Balance Report",
                                              "Aging Receivable Report",
                                              "Collection Efficiency Report",
                                          ]
                                }
                            />
                        </div>
                        <div className="flex">
                            <PreviousPeriod
                                value={isPreviousPeriod}
                                setValue={setPreviousPeriod}
                                year={isPreviousPeriod.year}
                                reading_id={1}
                                endPoint="/finance/customer-facility/billing/record-meter-reading/period-options?billing_readings_name_id="
                            />
                        </div>
                    </div>
                    <div className="640px:flex 640px:mt-5">
                        <div className="flex ml-5 640px:ml-0 items-center mb-3 640px:mb-0">
                            <Tippy theme="ThemeRed" content="Favorite">
                                <div
                                    className=" hover:scale-125 duration-100"
                                    onClick={() => setFavorite(!isFavorite)}
                                >
                                    <Image
                                        src={`/Images/f_favorite${
                                            isFavorite ? "Active" : ""
                                        }.png`}
                                        height={33}
                                        width={33}
                                        alt=""
                                    />
                                </div>
                            </Tippy>

                            <Link href="/finance/reports/favorite-list-reports">
                                <a className="text-ThemeRed font-NHU-bold mr-5 mt-[-7px] 1024px:text-[14px] ml-3">
                                    Favorite List
                                </a>
                            </Link>
                        </div>
                        <div className="flex ml-5 640px:ml-0 items-center">
                            <Tippy theme="ThemeRed" content="Export">
                                <div className=" hover:scale-125 duration-100">
                                    <Image
                                        src="/Images/Export.png"
                                        height={33}
                                        width={33}
                                    />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </li>
            </ul>

            <h3 className="text-[20px] mb-5">Advance Filter</h3>
            {reportPage === "general_reports" && (
                <GeneralReportsCheckbox isReportType={isReportType} />
            )}

            {reportPage === "customer_reports" && isReportType !== "" && (
                <CustomerReportsCheckboxes isReportType={isReportType} />
            )}

            <div className="flex justify-end items-center mt-10">
                <button className="button_cancel">CANCEL</button>
                <button className="buttonRed">APPLY</button>
            </div>
        </>
    );
}
