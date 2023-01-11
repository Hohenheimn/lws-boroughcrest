import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../util/api";
import { BarLoader } from "react-spinners";
import Calendar from "../../Calendar";

type Props = {
    type: string;
};

export default function JournalTable({ type }: Props) {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });
    const [isDate2, setDate2] = useState({
        value: "",
        toggle: false,
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
            <section className={style.container}>
                <div className={style.searchBar}>
                    <input type="text" placeholder="Search" />
                    <BsSearch className={style.searchIcon} />
                </div>

                <ul className={style.navigation}>
                    {type === "Unposted" ? (
                        <>
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Check">
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
                                <Tippy theme="ThemeRed" content="Refresh">
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
                                <Tippy theme="ThemeRed" content="Back">
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
                            <li className={style.importExportPrint}>
                                <Tippy theme="ThemeRed" content="Remove">
                                    <div className={style.noFill}>
                                        <Image
                                            src="/Images/f_remove.png"
                                            height={25}
                                            width={25}
                                            alt="Export"
                                        />
                                    </div>
                                </Tippy>
                            </li>
                        </>
                    ) : (
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
                                <div>GENERATE</div>
                            </li>
                        </>
                    )}
                </ul>
            </section>
            {type === "Posted" && (
                <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
                    <p className=" text-ThemeRed mr-3 font-NHU-bold 480px:w-full 480px:mb-1">
                        DATE
                    </p>
                    <div className="calendar mr-5 480px:mb-1">
                        <span className="cal">
                            <Image
                                src="/Images/calendar.png"
                                width={15}
                                height={15}
                                alt="Calendar"
                            />
                        </span>
                        <input
                            type="text"
                            value={isDate.value}
                            onChange={() => {}}
                            placeholder="dd/mm/yyyy"
                            onClick={() => setDate({ ...isDate, toggle: true })}
                            className="p-2 outline-none rounded-md shadow-md"
                        />
                        {isDate.toggle && (
                            <Calendar value={isDate} setValue={setDate} />
                        )}
                    </div>
                    <div className="calendar">
                        <span className="cal">
                            <Image
                                src="/Images/calendar.png"
                                width={15}
                                height={15}
                                alt="Calendar"
                            />
                        </span>
                        <input
                            type="text"
                            value={isDate2.value}
                            onChange={() => {}}
                            placeholder="dd/mm/yyyy"
                            onClick={() =>
                                setDate2({ ...isDate2, toggle: true })
                            }
                            className="p-2 outline-none rounded-md shadow-md"
                        />
                        {isDate2.toggle && (
                            <Calendar value={isDate2} setValue={setDate2} />
                        )}
                    </div>
                </div>
            )}
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            {type === "Unposted" ? (
                                <>
                                    <th></th>
                                    <th>Date</th>
                                    <th>Particulars</th>
                                    <th>Status</th>
                                    <th></th>
                                </>
                            ) : (
                                <>
                                    <th>Date</th>
                                    <th>Journal No.</th>
                                    <th>Particulars</th>
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
                            <List key={index} itemDetail={item} type={type} />
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
            <td>
                <Link
                    href={`/finance/general-ledger/journal/journal-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link
                    href={`/finance/general-ledger/journal/journal-list/${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link
                    href={`/finance/general-ledger/journal/journal-list/${itemDetail.id}`}
                >
                    <a className="item">
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
                                <h2>Lorem, ipsum.</h2>
                            </div>
                        )}
                    </a>
                </Link>
            </td>

            <td className="icon">
                <Link
                    href={`/finance/general-ledger/journal/modify-journal/${itemDetail.id}`}
                >
                    <a>
                        <Tippy theme="ThemeRed" content={"Modify"}>
                            <div className="icon">
                                <Image
                                    src="/Images/f_modify.png"
                                    height={15}
                                    width={15}
                                    alt="Modify"
                                />
                            </div>
                        </Tippy>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
