import Tippy from "@tippy.js/react";
import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MoonLoader } from "react-spinners";
import style from "../../../../styles/SearchFilter.module.scss";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import Image from "next/image";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import AppContext from "../../../Context/AppContext";
import { DynamicExportHandler } from "../../../Reusable/DynamicExport";

type Props = {
    isSearch: string;
    setSearch: Function;
    FilterEndpoint: string;
    setFilterText: Function;
    page: string;
    isPeriod: {
        from: string;
        to: string;
    };
    setPeriod: Function;
    ExportEndpoint: string;
};

export default function HeaderCollection({
    isSearch,
    setSearch,
    FilterEndpoint,
    setFilterText,
    page,
    isPeriod,
    setPeriod,
    ExportEndpoint,
}: Props) {
    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const [isAdvFilter, setAdvFilter] = useState<Advancefilter>([]);

    useEffect(() => {
        const cloneArray = isAdvFilter.map((item) => {
            return `${item.key}:${item.value}`;
        });
        setFilterText(cloneArray);
    }, [isAdvFilter]);

    const removeItemFromFilter = (value: string) => {
        const cloneFilter = isAdvFilter.filter((item) => item.value !== value);
        setAdvFilter(cloneFilter);
    };

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());

    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());

    const [isExportLoading, setExportLoading] = useState(false);

    const ExportHandler = () => {
        DynamicExportHandler(
            ExportEndpoint,
            "Collection-Payment-Register",
            setPrompt,
            setExportLoading
        );
    };

    return (
        <>
            <section className={style.container}>
                <div className={style.searchBarAdvF}>
                    {page !== "receive-payment" && (
                        <>
                            {page === "archive" && (
                                <Link href="/finance/customer-facility/collection/payment-queueing">
                                    <a>
                                        <MdArrowForwardIos className=" rotate-180 mr-2 text-[20px] text-ThemeRed" />
                                    </a>
                                </Link>
                            )}
                            <div className={style.searchBar}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={isSearch}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <BsSearch className={style.searchIcon} />
                            </div>
                            <AdvanceFilter
                                endpoint={`${FilterEndpoint}?date_from=${
                                    isValid(dateFrom)
                                        ? format(dateFrom, "yyyy-MM-dd")
                                        : ""
                                }&date_to=${
                                    isValid(dateTo)
                                        ? format(dateTo, "yyyy-MM-dd")
                                        : ""
                                }${
                                    router.pathname.includes(
                                        "/collection/payment-queueing"
                                    )
                                        ? "&status=Queued"
                                        : ""
                                }&keywords=`}
                                setAdvFilter={setAdvFilter}
                                isAdvFilter={isAdvFilter}
                            />
                        </>
                    )}
                </div>

                <ul className={style.navigation}>
                    {page !== "receive-payment" &&
                        page !== "payment-queueing" &&
                        page !== "archive" && (
                            <li className={style.importExportPrint}>
                                {isExportLoading ? (
                                    <div className={style.icon}>
                                        <MoonLoader color="#8f384d" size={20} />
                                    </div>
                                ) : (
                                    <div>
                                        <Tippy
                                            theme="ThemeRed"
                                            content="Export"
                                        >
                                            <div
                                                className={style.icon}
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
                        )}
                    {page !== "payment-queueing" && page !== "archive" && (
                        <li className={style.importExportPrint}>
                            <Tippy theme="ThemeRed" content="Print">
                                <div className={style.icon}>
                                    <Link href="/finance/customer-facility/collection/payment-register/print">
                                        <a target="_blank">
                                            <Image
                                                src="/Images/Print.png"
                                                layout="fill"
                                                alt="Export"
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </Tippy>
                        </li>
                    )}
                    {page === "payment-queueing" && (
                        <li className={style.importExportPrint}>
                            <Tippy
                                theme="ThemeRed"
                                content="Archive & Rejected"
                            >
                                <div className={style.icon}>
                                    <Link href="/finance/customer-facility/collection/payment-queueing/archive">
                                        <a>
                                            <Image
                                                src="/Images/Archive.png"
                                                layout="fill"
                                                alt="Archive"
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </Tippy>
                        </li>
                    )}
                </ul>
            </section>
            {/* Advance filter */}
            <ul className=" flex flex-wrap">
                {isAdvFilter.map((item, index) => (
                    <li
                        key={index}
                        className="px-3 text-[14px] text-ThemeRed py-1 bg-[#d9d9d9] mb-5 mr-3 rounded-[50px] relative pr-[25px]"
                    >
                        {item.value} -{" "}
                        <span className="text-ThemeRed50">{item.display}</span>
                        <span
                            onClick={() => removeItemFromFilter(item.value)}
                            className="text-[28px] hover:text-ThemeRed50 cursor-pointer rotate-45 absolute right-1 top-[48%] translate-y-[-50%]"
                        >
                            +
                        </span>
                    </li>
                ))}
            </ul>
            {page !== "receive-payment" &&
                page !== "payment-queueing" &&
                page !== "archive" && (
                    <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
                        <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    </div>
                )}
        </>
    );
}
