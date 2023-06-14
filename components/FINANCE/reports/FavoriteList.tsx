import React, { useEffect, useState } from "react";
import TableLoadingNError from "../../Reusable/TableLoadingNError";
import Pagination from "../../Reusable/Pagination";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetFavoriteList } from "./Query";

export default function FavoriteList() {
    const [isReportType, setReportType] = useState("");

    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = GetFavoriteList(
        isReportType,
        TablePage
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
                            <List key={index} itemDetail={item} />
                        ))}
                    </tbody>
                </table>
                <TableLoadingNError isLoading={isLoading} isError={isError} />
            </div>

            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.meta.last_page}
                CurrentPage={data?.data.meta.current_page}
            />
        </>
    );
}
type PropsList = {
    itemDetail: any;
};

const List = ({ itemDetail }: PropsList) => {
    const router = useRouter();

    const redirect = () => {
        router.push(`/finance/reports/favorite-list-reports/${itemDetail.id}`);
    };

    const Type = itemDetail.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_type"
    )[0]?.value;

    const Class = itemDetail.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_class"
    )[0]?.value;

    const Project = itemDetail.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_project"
    )[0]?.value;

    const Tower = itemDetail.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_tower"
    )[0]?.value;

    const Floor = itemDetail.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_floor"
    )[0]?.value;

    return (
        <tr onClick={redirect} className=" cursor-pointer">
            <td>
                {(Type?.length <= 0 || Type === undefined) && "N/A"}
                {Type?.map((itemMap: string, index: number) =>
                    index === Type.length - 1 ? itemMap : itemMap + ", "
                )}
            </td>
            <td>
                {(Class?.length <= 0 || Class === undefined) && "N/A"}
                {Class?.map((itemMap: string, index: number) =>
                    index === Class.length - 1 ? itemMap : itemMap + ", "
                )}
            </td>
            <td>
                {(Project?.length <= 0 || Project === undefined) && "N/A"}
                {Project?.map((itemMap: any, index: number) =>
                    index === Project.length - 1
                        ? itemMap.name
                        : itemMap.name + ", "
                )}
            </td>
            <td>
                {(Tower?.length <= 0 || Tower === undefined) && "N/A"}
                {Tower?.map((itemMap: any, index: number) =>
                    index === Tower.length - 1
                        ? itemMap.name
                        : itemMap.name + ", "
                )}
            </td>
            <td>
                {(Floor?.length <= 0 || Floor === undefined) && "N/A"}
                {Floor?.map((itemMap: any, index: number) =>
                    index === Floor.length - 1
                        ? itemMap.name
                        : itemMap.name + ", "
                )}
            </td>
        </tr>
    );
};
