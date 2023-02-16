import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../../util/api";
import { BarLoader } from "react-spinners";
import PeriodCalendar from "../../../PeriodCalendar";
import { FaRegEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { AdvanceFilter, DisplayAdvFilter } from "../../../AdvanceFilter";

export default function BillingList() {
    const [isType, setType] = useState("Unposted");
    const [isAdvFilter, setAdvFilter] = useState([
        {
            name: "Jomari Tiu",
            subName: "Developer",
        },
    ]);
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const { data, isLoading, isError } = useQuery(
        ["get-corporate-list"],
        () => {
            return api.get(`/project/corporate`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );

    return (
        <>
            <ul className="SimpleTab">
                <li
                    className={`${isType === "Unposted" && "Active"}`}
                    onClick={() => setType("Unposted")}
                >
                    Unposted Invoices
                </li>
                <li
                    className={`${isType === "Posted" && "Active"}`}
                    onClick={() => setType("Posted")}
                >
                    Posted Invoices
                </li>
            </ul>
            <section className={style.container}>
                <div className={style.searchBarAdvF}>
                    <div className={style.searchBar}>
                        <input type="text" placeholder="Search" />
                        <BsSearch className={style.searchIcon} />
                    </div>
                    <AdvanceFilter
                        setAdvFilter={setAdvFilter}
                        isAdvFilter={isAdvFilter}
                    />
                </div>

                <ul className={style.navigation}>
                    {isType === "Unposted" && (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Approved">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_check.png"
                                            height={25}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Reject">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_remove.png"
                                            height={25}
                                            width={25}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Process">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_refresh.png"
                                            height={30}
                                            width={30}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Return">
                                    <div className={`${style.noFill} mr-5`}>
                                        <Image
                                            src="/Images/f_back.png"
                                            height={25}
                                            width={35}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                        </>
                    )}
                    <li className={style.importExportPrint}>
                        <Tippy theme="ThemeRed" content="Print">
                            <div className={`${style.noFill} mr-5`}>
                                <Image
                                    src="/Images/Print.png"
                                    height={25}
                                    width={30}
                                    alt="Export"
                                />
                            </div>
                        </Tippy>
                    </li>
                    {isType !== "Unposted" && (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Export">
                                    <div className={style.icon}>
                                        <Image
                                            src="/Images/Export.png"
                                            layout="fill"
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                            <li className={style.new}>
                                <div>POST TO PORTAL</div>
                            </li>
                        </>
                    )}
                </ul>
            </section>
            {/* {isAdvFilter.length > 0 && (
                <DisplayAdvFilter isAdvFilter={isAdvFilter} />
            )} */}

            {isType === "Posted" && (
                <div className="w-full mb-5">
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                </div>
            )}

            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            {isType === "Unposted" ? (
                                <>
                                    <th className="checkbox">
                                        <input type="checkbox" />
                                    </th>

                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Property</th>
                                    <th>Due Amount</th>
                                    <th>Applied Advances</th>
                                    <th>Status</th>
                                    <th></th>
                                </>
                            ) : (
                                <>
                                    <th>Billing Date</th>
                                    <th>Invoice No.</th>
                                    <th>Customer</th>
                                    <th>Property</th>
                                    <th>Due Amount</th>
                                    <th>Due Date</th>
                                    <th></th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isError && (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Error...
                                </td>
                            </tr>
                        )}
                        {data?.data.map((item: any, index: number) => (
                            <List key={index} itemDetail={item} type={isType} />
                        ))}
                    </tbody>
                </table>
                {isLoading && (
                    <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
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
            </div>
        </>
    );
}

type ListProps = {
    itemDetail: any;
    type: string;
};

const List = ({ itemDetail, type }: ListProps) => {
    return (
        <tr>
            {type === "Unposted" && (
                <td className="checkbox">
                    <div className="item">
                        <input type="checkbox" />
                    </div>
                </td>
            )}
            {type === "Unposted" && (
                <td className="checkbox">
                    <div className="item">
                        <div>
                            <h2>Date</h2>
                        </div>
                    </div>
                </td>
            )}

            {type !== "Unposted" && (
                <td>
                    <div className="item">
                        <div>
                            <h2>Billing Date</h2>
                        </div>
                    </div>
                </td>
            )}
            {type !== "Unposted" && (
                <td>
                    <div className="item">
                        <div>
                            <h2>Invoice No.</h2>
                        </div>
                    </div>
                </td>
            )}
            <td>
                <div className="item">
                    <div>
                        <h2>Customer</h2>
                    </div>
                </div>
            </td>
            <td>
                <div className="item">
                    <div>
                        <h2>Property</h2>
                    </div>
                </div>
            </td>
            <td>
                <div className="item">
                    <div>
                        <h2>Due Amount</h2>
                    </div>
                </div>
            </td>
            {type === "Unposted" && (
                <td>
                    <div className="item">
                        <div>
                            <h2>Applied Advances</h2>
                        </div>
                    </div>
                </td>
            )}
            <td>
                {type !== "Posted" ? (
                    <div className="finance_status">
                        <div className="status draft">
                            <div>
                                <Image
                                    src="/Images/f_draft.png"
                                    width={10}
                                    height={10}
                                    alt="Draft"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Due Date</h2>
                    </div>
                )}
            </td>

            {type === "Unposted" ? (
                <td className="icon pr-5">
                    <div className="flex h-full">
                        <Tippy theme="ThemeRed" content={"View"}>
                            <div className="icon mr-5">
                                <Link
                                    href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
                                >
                                    <a>
                                        <FaRegEye />
                                    </a>
                                </Link>
                            </div>
                        </Tippy>
                        <Tippy theme="ThemeRed" content={"Modify"}>
                            <div className="icon">
                                <Link
                                    href={`/finance/customer-facility/billing/modify/${itemDetail.id}`}
                                >
                                    <a>
                                        <HiPencil />
                                    </a>
                                </Link>
                            </div>
                        </Tippy>
                    </div>
                </td>
            ) : (
                <td className="icon w-[100px]">
                    <div className="item w-[150px]">
                        <div className="finance_status">
                            <div className="status sent">
                                <div>
                                    <Image
                                        src="/Images/f_sent.png"
                                        width={15}
                                        height={15}
                                        alt="Draft"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            )}
        </tr>
    );
};
