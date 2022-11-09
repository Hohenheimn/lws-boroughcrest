import React, { useState, useContext, useRef, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../../Pagination";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";
import BarLoader from "react-spinners/BarLoader";
import type { customerItemDetail } from "../../../types/customerList";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

export default function CustomerTable() {
    const { TableRows, cusTableColumn, isSearchBar } = useContext(AppContext);
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

    return (
        <div className="w-full">
            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            {cusTableColumn.map((item: any, index: number) => (
                                <>
                                    {item === "Property" ? (
                                        <>
                                            <th>Property (Unit Code)</th>
                                            <th>Property (Tower)</th>
                                        </>
                                    ) : (
                                        <th key={index}>{item}</th>
                                    )}
                                </>
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
            </div>

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
    const { TableRows, cusTableColumn, isSearchBar } = useContext(AppContext);
    const [isEdit, setEdit] = useState(false);
    const MouseEnter = () => {
        setEdit(true);
    };
    const MouseLeave = () => {
        setEdit(false);
    };

    const Logo =
        "https://boroughcrest-api.lws.codes/get-img?image=" +
        itemDetail?.image_photo;
    return (
        <tr onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
            <td className="normal">
                <Link href={`/admin/customer/${itemDetail?.id}`}>
                    <a className="item">
                        <aside>
                            <Image src={Logo} alt="profile" layout="fill" />
                        </aside>
                        <div>
                            <h2>{itemDetail?.id}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td className="normal">
                <Link href={`/admin/customer/${itemDetail?.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail?.name}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            {cusTableColumn.map((item: string, index: number) => (
                <>
                    {item === "Class" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail?.class}</h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Mobile" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail?.contact_no}</h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}

                    {item === "Status" && (
                        <td className="normal">
                            <div className="w-full flex px-5">
                                <Tippy
                                    content={`${
                                        itemDetail?.status
                                            ? "Active"
                                            : "Inactive"
                                    }`}
                                    theme="ThemeRed"
                                >
                                    <div
                                        className={`statusCircle ${
                                            itemDetail?.status
                                                ? "active"
                                                : "inactive"
                                        }`}
                                    ></div>
                                </Tippy>
                            </div>
                        </td>
                    )}
                    {item === "Type" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail?.type}</h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Email" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail?.preferred_email}</h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}

                    {item === "Spouse" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>
                                            {itemDetail?.individual_co_owner
                                                ? itemDetail?.individual_co_owner
                                                : "N/A"}
                                        </h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Citizenship" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>
                                            {itemDetail?.individual_citizenship
                                                ? itemDetail?.individual_citizenship
                                                : "N/A"}
                                        </h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Birth Date" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>
                                            {itemDetail?.individual_birth_date
                                                ? itemDetail?.individual_birth_date
                                                : "N/A"}
                                        </h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Contact Person" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>
                                            {itemDetail?.company_contact_person
                                                ? itemDetail?.company_contact_person
                                                : "N/A"}
                                        </h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "TIN" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail?.tin}</h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Branch Code" && (
                        <td className="normal">
                            <Link href={`/admin/customer/${itemDetail?.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail?.branch_code}</h2>
                                    </div>
                                </a>
                            </Link>
                        </td>
                    )}
                    {item === "Property" && (
                        <>
                            <td className="large">
                                <Link
                                    href={`/admin/customer/${itemDetail?.id}`}
                                >
                                    <a className="item">
                                        <div>
                                            {itemDetail?.properties?.map(
                                                (item: any, index: number) => (
                                                    <h2 key={index}>
                                                        {item.unit_code}
                                                    </h2>
                                                )
                                            )}
                                        </div>
                                    </a>
                                </Link>
                            </td>
                            <td className="large">
                                <Link
                                    href={`/admin/customer/${itemDetail?.id}`}
                                >
                                    <a className="item">
                                        <div>
                                            {itemDetail?.properties?.map(
                                                (item: any, index: number) => (
                                                    <h2 key={index}>
                                                        {item.tower.name}
                                                    </h2>
                                                )
                                            )}
                                        </div>
                                    </a>
                                </Link>
                            </td>
                        </>
                    )}
                </>
            ))}
        </tr>
    );
};
