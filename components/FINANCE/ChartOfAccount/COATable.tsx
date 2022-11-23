import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import api from "../../../util/api";
import { useQuery } from "react-query";
import Pagination from "../../Pagination";
import BarLoader from "react-spinners/BarLoader";
import { getCookie } from "cookies-next";

type Props = {
    isSearchTable: string;
};

export default function COATable({ isSearchTable }: Props) {
    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["get-corporate-list", TablePage, isSearchTable],
        () => {
            return api.get(
                `/project/corporate?keywords=${isSearchTable}&paginate=20&page=${TablePage}`,
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
                            <th>Chart Code</th>
                            <th>Account Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Default Account</th>
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
                            <List key={index} itemDetail={item} />
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

const List = ({ itemDetail }: any) => {
    return (
        <>
            <tr>
                <td>
                    <Link href={`/project/corporate/${itemDetail.id}`}>
                        <a className="item">
                            <div>
                                <h2>Lorem, ipsum.</h2>
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link href={`/project/corporate/${itemDetail.id}`}>
                        <a className="item">
                            <div>
                                <h2>Lorem, ipsum.</h2>
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link href={`/project/corporate/${itemDetail.id}`}>
                        <a className="item">
                            <div>
                                <h2>Lorem, ipsum.</h2>
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link href={`/project/corporate/${itemDetail.id}`}>
                        <a className="item">
                            <div>
                                <h2>Lorem, ipsum.</h2>
                            </div>
                        </a>
                    </Link>
                </td>
                <td>
                    <Link href={`/project/corporate/${itemDetail.id}`}>
                        <a className="item">
                            <div>
                                <h2>Lorem, ipsum.</h2>
                            </div>
                        </a>
                    </Link>
                </td>
            </tr>
        </>
    );
};
