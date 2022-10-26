import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import Pagination from "../../Pagination";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";
import BarLoader from "react-spinners/BarLoader";
import type { customerItemDetail } from "../../../types/customerList";

export default function CustomerTable() {
    const { TableRows, cusColumn, isSearchBar } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["get-customer-list", TablePage, isSearchBar, TableRows],
        () => {
            return api.get(
                `/admin/customer?keywords=${isSearchBar}&paginate=${TableRows}&page=${TablePage}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    console.log(data?.data.data);
    return (
        <div className="w-full overflow-x-auto">
            <table className="table_list min-w-[800px] 820px:min-w-[1000px]">
                <thead>
                    <tr>
                        {cusColumn.map((item: any, index: number) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.data.data.map((item: any, index: number) => (
                        <List key={index} itemDetail={item} />
                    ))}
                </tbody>
            </table>
            {isLoading && (
                <div>
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
            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.last_page}
                CurrentPage={data?.data.current_page}
            />
        </div>
    );
}

const List = ({ itemDetail }: customerItemDetail) => {
    const [isEdit, setEdit] = useState(false);
    const MouseEnter = () => {
        setEdit(true);
    };
    const MouseLeave = () => {
        setEdit(false);
    };
    return (
        <tr onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
            <td>
                {isEdit && (
                    <Link href="/admin/customer/123">
                        <a className="edit">
                            <aside>
                                <GoPencil className="mr-2" /> Edit
                            </aside>
                        </a>
                    </Link>
                )}
                <Link href="/admin/customer/123">
                    <a className="item">
                        <aside>
                            <Image
                                src="/Images/sampleProfile.png"
                                alt="profile"
                                layout="fill"
                            />
                        </aside>
                        <div>
                            <h2>{itemDetail?.id}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/customer/123">
                    <a className="item">
                        <div>
                            <h2>{itemDetail?.class}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/customer/123">
                    <a className="item">
                        <div>
                            <h2>{itemDetail?.name}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/customer/123">
                    <a className="item">
                        <div>
                            <h2>{itemDetail?.contact_no}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/customer/123">
                    <a className="item">
                        <div>
                            <h2>{itemDetail?.preferred_email}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <div className="w-full flex justify-center">
                    <div className="statusCircle active"></div>
                </div>
            </td>
        </tr>
    );
};
