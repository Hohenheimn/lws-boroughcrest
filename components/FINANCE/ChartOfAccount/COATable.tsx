import React, { useState } from "react";
import Link from "next/link";
import api from "../../../util/api";
import { useQuery } from "react-query";
import Pagination from "../../Pagination";
import BarLoader from "react-spinners/BarLoader";
import { getCookie } from "cookies-next";
import { HiPencil } from "react-icons/hi";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type Props = {
    isSearchTable: string;
    isFilterTable: boolean;
};

export default function COATable({ isSearchTable, isFilterTable }: Props) {
    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["COA-list", TablePage, isSearchTable],
        () => {
            return api.get(
                `/finance/general-ledger/chart-of-accounts?keywords=${isSearchTable}&paginate=10&page=${TablePage}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
    return (
        <>
            <div className="table_container">
                <table className="table_list corp">
                    <thead>
                        <tr>
                            {isFilterTable ? (
                                <>
                                    <th>Chart Code</th>
                                    <th>Primary</th>
                                    <th>Secondary</th>
                                    <th>Tertiary</th>
                                    <th>Account</th>
                                </>
                            ) : (
                                <>
                                    <th>Chart Code</th>
                                    <th>Account Name</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Default Account</th>
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
                        {data?.data.data.map((item: any, index: number) => (
                            <List
                                key={index}
                                itemDetail={item}
                                isFilterTable={isFilterTable}
                            />
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

            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.last_page}
                CurrentPage={data?.data.current_page}
            />
        </>
    );
}
type ListProps = {
    itemDetail: any;
    isFilterTable: boolean;
};
const List = ({ itemDetail, isFilterTable }: ListProps) => {
    const [isHover, setHover] = useState(false);
    const MouseEnter = () => {
        setHover(true);
    };
    const MouseLeave = () => {
        setHover(false);
    };
    return (
        <>
            <tr onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
                <td>
                    <Link
                        href={`/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`}
                    >
                        <a className="item">
                            <div>
                                <h2>{itemDetail?.chart_code}</h2>
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`}
                    >
                        <a className="item">
                            <div>
                                {!isFilterTable ? (
                                    <h2>{itemDetail?.account_name}</h2>
                                ) : itemDetail.header === "Primary" ? (
                                    <h2>{itemDetail.header}</h2>
                                ) : (
                                    <h2></h2>
                                )}
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`}
                    >
                        <a className="item">
                            <div>
                                {!isFilterTable ? (
                                    <h2>{itemDetail?.category}</h2>
                                ) : itemDetail.header === "Secondary" ? (
                                    <h2>{itemDetail.header}</h2>
                                ) : (
                                    <h2></h2>
                                )}
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`}
                    >
                        <a className="item">
                            <div>
                                {!isFilterTable ? (
                                    <h2>{itemDetail?.description}</h2>
                                ) : itemDetail.header === "Tertiary" ? (
                                    <h2>{itemDetail.header}</h2>
                                ) : (
                                    <h2></h2>
                                )}
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link
                        href={`/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`}
                    >
                        <a className="item">
                            <div>
                                <h2>{itemDetail?.default_account?.name}</h2>
                            </div>
                        </a>
                    </Link>
                </td>
                {!isFilterTable && (
                    <td>
                        {isHover && (
                            <Link
                                href={`/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`}
                            >
                                <a>
                                    <Tippy theme="ThemeRed" content={"Modify"}>
                                        <div className="pencil">
                                            <HiPencil />
                                        </div>
                                    </Tippy>
                                </a>
                            </Link>
                        )}
                    </td>
                )}
            </tr>
        </>
    );
};
