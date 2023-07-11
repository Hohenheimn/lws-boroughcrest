import React, { useContext, useEffect, useState } from "react";
import SelectDropdown from "../../../components/Reusable/SelectDropdown";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import Link from "next/link";
import GeneralReportsCheckbox from "./GeneralReportsCheckbox";
import { useRouter } from "next/router";
import CustomerReportsCheckboxes from "./CustomerReportsCheckboxes";
import PeriodCalendar from "../../Reusable/PeriodCalendar";
import { DynamicExportHandler } from "../../Reusable/DynamicExport";
import AppContext from "../../Context/AppContext";
import { MoonLoader } from "react-spinners";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import { SaveFavorite } from "./Query";

export default function ReportComponent() {
    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const [isReportType, setReportType] = useState("");

    const [isFavorite, setFavorite] = useState(false);

    const reportPage = router.pathname?.includes("/reports/general-reports")
        ? "general_reports"
        : "customer_reports";

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [isExportEndpoint, setExportEndpoint] = useState(``);

    const [isExportLoading, setExportLoading] = useState(false);

    const ExportHandler = () => {
        if (isReportType !== "" && isExportEndpoint !== "") {
            DynamicExportHandler(
                `${isExportEndpoint}&is_favorite=${isFavorite}`,
                isReportType,
                setPrompt,
                setExportLoading
            );
        } else {
            setPrompt({
                message: "Apply a Report Type",
                toggle: true,
                type: "draft",
            });
        }
    };

    const onSuccess = () => {
        setPrompt({
            message: "Favorite successfully saved",
            type: "success",
            toggle: true,
        });
        setFavorite(true);
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading, mutate } = SaveFavorite(onSuccess, onError);

    const [isFavoritePayload, setFavoritePayload] = useState<any>(null);

    useEffect(() => {
        if (router.pathname.includes("/customer-reports")) {
            setFavoritePayload({
                report_type: "",
                customer_name: "",
                customer_class: "",
                property_type: "",
                property_class: "",
                property_tower: "",
                property_floor: "",
                property_project: "",
                report_mode_of_payment: "",
                report_charge: "",
                report_account: "",
                report_memo_type: "",
                report_receipt_type: "",
            });
        }
        if (router.pathname.includes("/general-reports")) {
            setFavoritePayload({
                report_type: "",
                document_type: "",
                report_account: "",
            });
        }
    }, [isReportType]);

    const FavoriteCustomerHandler = (
        report_type: string,
        customer_name: string,
        customer_class: string,
        property_type: string,
        property_class: string,
        property_tower: string,
        property_floor: string,
        property_project: string,
        report_mode_of_payment: string,
        report_charge: string,
        report_account: string,
        report_memo_type: string,
        report_receipt_type: string
    ) => {
        if (isFavorite === false) {
            setFavoritePayload({
                report_type: report_type,
                customer_name: customer_name,
                customer_class: customer_class,
                property_type: property_type,
                property_class: property_class,
                property_tower: property_tower,
                property_floor: property_floor,
                property_project: property_project,
                report_mode_of_payment: report_mode_of_payment,
                report_charge: report_charge,
                report_account: report_account,
                report_memo_type: report_memo_type,
                report_receipt_type: report_receipt_type,
            });
        }
    };

    const FavoriteCustomerGeneral = (
        report_type: string,
        document_type: string,
        report_account: string
    ) => {
        if (isFavorite === false) {
            setFavoritePayload({
                report_type: report_type,
                document_type: document_type,
                report_account: report_account,
            });
        }
    };

    const SaveFavoriteHandler = () => {
        if (router.pathname.includes("/reports/general-reports")) {
            setPrompt({
                message: "Save Favorites is not available for General Reports",
                toggle: true,
                type: "draft",
            });
            return;
        }
        if (
            isFavoritePayload.property_type === "" &&
            isFavoritePayload.property_class === "" &&
            isFavoritePayload.property_tower === "" &&
            isFavoritePayload.property_floor === "" &&
            isFavoritePayload.property_project === ""
        ) {
            setPrompt({
                message: "Atleast select any property filter",
                toggle: true,
                type: "draft",
            });
            return;
        }
        if (isFavorite === false) {
            if (
                isFavoritePayload !== null &&
                isFavoritePayload.report_type !== ""
            ) {
                mutate(isFavoritePayload);
            } else {
                setPrompt({
                    message: "Apply a Report Type",
                    toggle: true,
                    type: "draft",
                });
            }
        }
    };

    return (
        <>
            <ul className="w-full border-b border-gray-300 pb-10 mb-10 1280px:pb-5 1280px:mb-5">
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
                                              "Outstanding Advances Report",
                                              "Aging Receivable Report",
                                              "Collection Efficiency Report",
                                          ]
                                }
                            />
                        </div>
                        <div className="flex">
                            <PeriodCalendar
                                value={isPeriod}
                                setValue={setPeriod}
                            />
                        </div>
                    </div>
                    <div className="640px:flex 640px:mt-5">
                        <div className="flex ml-5 640px:ml-0 items-center mb-3 640px:mb-0">
                            {isLoading ? (
                                <MoonLoader color="#8f384d" size={20} />
                            ) : (
                                <div>
                                    <Tippy theme="ThemeRed" content="Favorite">
                                        <div
                                            className=" hover:scale-125 duration-100"
                                            onClick={SaveFavoriteHandler}
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
                                </div>
                            )}

                            <Link href="/finance/reports/favorite-list-reports">
                                <a className="text-ThemeRed font-NHU-bold mr-5 mt-[-7px] 1024px:text-[14px] ml-3">
                                    Favorite List
                                </a>
                            </Link>
                        </div>
                        <div className="flex ml-5 640px:ml-0 items-center">
                            {isExportLoading ? (
                                <MoonLoader color="#8f384d" size={20} />
                            ) : (
                                <div>
                                    <Tippy theme="ThemeRed" content="Export">
                                        <div
                                            className=" hover:scale-125 duration-100 cursor-pointer"
                                            onClick={ExportHandler}
                                        >
                                            <Image
                                                src="/Images/Export.png"
                                                height={33}
                                                width={33}
                                            />
                                        </div>
                                    </Tippy>
                                </div>
                            )}
                        </div>
                    </div>
                </li>
            </ul>

            <h3 className="text-[20px] mb-5">Advance Filter</h3>
            {reportPage === "general_reports" && (
                <GeneralReportsCheckbox
                    isReportType={isReportType}
                    Period={isPeriod}
                    setPeriod={setPeriod}
                    setReportType={setReportType}
                    setExportEndpoint={setExportEndpoint}
                    FavoriteHandler={FavoriteCustomerGeneral}
                />
            )}

            {reportPage === "customer_reports" && isReportType !== "" && (
                <CustomerReportsCheckboxes
                    isReportType={isReportType}
                    Period={isPeriod}
                    setPeriod={setPeriod}
                    setReportType={setReportType}
                    setExportEndpoint={setExportEndpoint}
                    FavoriteHandler={FavoriteCustomerHandler}
                />
            )}
        </>
    );
}
