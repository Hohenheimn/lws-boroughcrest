import React, { useState } from "react";
import TableLoadingNError from "../../Reusable/TableLoadingNError";
import Pagination from "../../Reusable/Pagination";
import { useQuery } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FavoriteList() {
    const [isReportType, setReportType] = useState("");

    const [isSearchTable, setSearchTable] = useState("");

    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["COA-list", TablePage, isSearchTable],
        () => {
            return api.get(
                `/finance/general-ledger/chart-of-accounts?keywords=${isSearchTable}&paginate=10&page=${
                    isSearchTable === "" ? TablePage : 1
                }`,
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
            <div className="flex items-center mb-5">
                <Link href="/finance/reports/customer-reports">
                    <a>
                        <MdArrowForwardIos className=" rotate-180 mr-2 text-[20px] text-ThemeRed" />
                    </a>
                </Link>
                <h1 className="pageTitle noMB">Favorite</h1>
            </div>
            <div className="flex mb-5">
                <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                    REPORT&nbsp;TYPE
                </h2>
                <SelectDropdown
                    selectHandler={(value: string) => {
                        setReportType(value);
                    }}
                    className=""
                    inputElement={
                        <input
                            className="w-[300px] field"
                            value={isReportType}
                            readOnly
                            autoComplete="off"
                        />
                    }
                    listArray={[
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
                    ]}
                />
            </div>
            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Class</th>
                            <th>Project</th>
                            <th>Tower</th>
                            <th>Floor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map((item: any, index: number) => (
                            <List key={index} />
                        ))}
                    </tbody>
                </table>
                <TableLoadingNError isLoading={isLoading} isError={isError} />
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

const List = () => {
    const router = useRouter();
    const redirect = () => {
        router.push(`/finance/reports/favorite-list-reports/1`);
    };

    return (
        <tr onClick={redirect} className=" cursor-pointer">
            <td>Parking</td>
            <td>Common</td>
            <td>Lorem Ipsum</td>
            <td>Tower 1</td>
            <td>3rd Floor</td>
        </tr>
    );
};
