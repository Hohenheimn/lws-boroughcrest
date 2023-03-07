import React, { useState, useContext, useRef, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";
import BarLoader from "react-spinners/BarLoader";
import type { customerItemDetail } from "../../../types/customerList";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import TableErrorMessage from "../../Reusable/TableErrorMessage";
import Pagination from "../../Reusable/Pagination";
export default function CustomerTable() {
    const { TableRows, cusTableColumn, isSearchBar, setPrint } =
        useContext(AppContext);
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
    // Set parameter for print
    useEffect(() => {
        setPrint({
            keyword: isSearchBar,
            page: TablePage,
            limit: TableRows,
            url: "/admin/customer/print",
        });
    }, [isSearchBar, TablePage, TableRows]);

    return (
        <>
            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            {cusTableColumn.map((item: any, index: number) => (
                                <th
                                    key={index}
                                    className={
                                        item === "Status" ? "center" : ""
                                    }
                                    colSpan={item === "Property" ? 2 : 1}
                                >
                                    {item === "Property" ? (
                                        <div className="flex">
                                            <div className="w-2/4">
                                                Property (Unit Code)
                                            </div>
                                            <div className="w-2/4">
                                                Property (Tower)
                                            </div>
                                        </div>
                                    ) : (
                                        item
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && !isError && (
                            <>
                                {data?.data.data.map(
                                    (item: any, index: number) => (
                                        <List key={index} itemDetail={item} />
                                    )
                                )}
                            </>
                        )}
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
                {isError && <TableErrorMessage />}
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

const List = ({ itemDetail }: customerItemDetail) => {
    const { cusTableColumn } = useContext(AppContext);
    const [isEdit, setEdit] = useState(false);
    const MouseEnter = () => {
        setEdit(true);
    };
    const MouseLeave = () => {
        setEdit(false);
    };

    let Logo = "/Images/sampleProfile.png";
    if (itemDetail?.image_photo !== null) {
        Logo =
            "https://boroughcrest-api.lws.codes/get-img?image=" +
            itemDetail?.image_photo;
    }

    return (
        <tr onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
            <td className={`normal ${itemDetail?.status}`}>
                <Link
                    href={`${
                        itemDetail?.status === "Draft"
                            ? `/admin/customer?draft=${itemDetail.id}`
                            : `/admin/customer/${itemDetail?.id}`
                    }`}
                >
                    <a className="flex items-center">
                        <aside>
                            <Image src={Logo} alt="profile" layout="fill" />
                        </aside>
                        <div>
                            <p>{itemDetail?.id}</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td className={`normal ${itemDetail?.status}`}>
                <Link
                    href={`${
                        itemDetail?.status === "Draft"
                            ? `/admin/customer?draft=${itemDetail.id}`
                            : `/admin/customer/${itemDetail?.id}`
                    }`}
                >
                    <a className="item">
                        <div>
                            <p>{itemDetail?.name}</p>
                        </div>
                    </a>
                </Link>
            </td>
            {cusTableColumn.map((item: string, index: number) => (
                <td
                    key={index}
                    className={`${item === "Property" ? "x2large" : "normal"}`}
                    colSpan={item === "Property" ? 2 : 1}
                >
                    {item === "Class" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>{itemDetail?.class}</p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Mobile" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>{itemDetail?.contact_no}</p>
                                </div>
                            </a>
                        </Link>
                    )}

                    {item === "Status" && (
                        <div className="w-full flex px-5 justify-center">
                            <Tippy
                                content={`${itemDetail?.status}`}
                                theme="ThemeRed"
                            >
                                <div
                                    className={`statusCircle ${itemDetail?.status}`}
                                ></div>
                            </Tippy>
                        </div>
                    )}
                    {item === "Type" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>{itemDetail?.type}</p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Email" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>{itemDetail?.preferred_email}</p>
                                </div>
                            </a>
                        </Link>
                    )}

                    {item === "Spouse" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>
                                        {itemDetail?.individual_co_owner
                                            ? itemDetail?.individual_co_owner
                                            : "N/A"}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Citizenship" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>
                                        {itemDetail?.individual_citizenship
                                            ? itemDetail?.individual_citizenship
                                            : "N/A"}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Birth Date" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>
                                        {itemDetail?.individual_birth_date
                                            ? itemDetail?.individual_birth_date
                                            : "N/A"}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Contact Person" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>
                                        {itemDetail?.company_contact_person
                                            ? itemDetail?.company_contact_person
                                            : "N/A"}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "TIN" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>{itemDetail?.tin}</p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Branch Code" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="item">
                                <div>
                                    <p>{itemDetail?.branch_code}</p>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Property" && (
                        <Link
                            href={`${
                                itemDetail?.status === "Draft"
                                    ? `/admin/customer?draft=${itemDetail.id}`
                                    : `/admin/customer/${itemDetail?.id}`
                            }`}
                        >
                            <a className="property">
                                {itemDetail?.properties.map(
                                    (item: any, index: number) => (
                                        <div
                                            className="property-container"
                                            key={index}
                                        >
                                            <div className="half">
                                                <div className="flex flex-wrap">
                                                    {item.map(
                                                        (
                                                            item1: any,
                                                            index: number
                                                        ) => (
                                                            <h2
                                                                key={index}
                                                                className="unitCode"
                                                            >
                                                                {
                                                                    item1.unit_code
                                                                }
                                                            </h2>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="half">
                                                <div
                                                    className="flex"
                                                    key={index}
                                                >
                                                    <h2 key={index}>
                                                        {item[0].tower.name}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </a>
                        </Link>
                    )}
                </td>
            ))}
        </tr>
    );
};
