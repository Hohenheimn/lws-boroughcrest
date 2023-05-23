import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppContext from "../../Context/AppContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import { GetUser } from "./Query";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../Reusable/TableErrorMessage";
import Pagination from "../../Reusable/Pagination";

type Props = {
    isSearch: string;
};
export type UserList = UserDetail[];

export type UserDetail = {
    id: number;
    employee_id: number;
    name: string;
    email: string;
    email_verified_at: string;
    password: string;
    remember_token: string | null;
    role_id: number;
    role_name: string;
    corporate_id: number;
    department_id: number | null;
    department_name: string;
    contact_no: number;
    position: string;
    image_photo: string;
    image_signature: null | string;
    status: string;
    created_date: string;
    updated_at: string;
    deleted_at: string;
    permissions: UserPermission[];
};

export type UserPermission = {
    menu: string;
    duration: number;
    expiration_date: string;
    access: string[];
};

export default function UserTable({ isSearch }: Props) {
    const { userTableColumn } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const { data, isLoading, isError } = GetUser(isSearch, TablePage);

    return (
        <div className=" w-full overflow-x-auto">
            <div className="table_container">
                <table className=" table_list user">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            {userTableColumn.map((item: any, index: number) => (
                                <th
                                    key={index}
                                    className={
                                        item === "Status" ? "center" : ""
                                    }
                                >
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map(
                            (item: UserDetail, index: number) => (
                                <List key={index} itemDetail={item} />
                            )
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
                PageNumber={data?.data.meta.last_page}
                CurrentPage={data?.data.meta.current_page}
            />
        </div>
    );
}

type ListProps = {
    itemDetail: UserDetail;
};

const List = ({ itemDetail }: ListProps) => {
    const DefaultImage = "/Images/sampleProfile.png";
    const { userTableColumn } = useContext(AppContext);

    let ImagePhoto = "/Images/sampleProfile.png";
    if (itemDetail?.image_photo !== null) {
        ImagePhoto =
            "https://boroughcrest-api.lws.codes/get-img?image=" +
            itemDetail?.image_photo;
    }
    return (
        <tr>
            <td>
                <Link href={`/project/user/${itemDetail.id}`}>
                    <a className="item flex items-center">
                        <aside>
                            <Image
                                src={ImagePhoto}
                                alt=""
                                layout="fill"
                                objectFit="cover"
                            />
                        </aside>
                        <div>
                            <h2>{itemDetail?.id}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href={`/project/user/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail.name}</h2>
                        </div>
                    </a>
                </Link>
            </td>

            {userTableColumn.map((item: any, index: number) => (
                <td key={index}>
                    {item === "Department" && (
                        <Link href={`/project/user/${itemDetail.id}`}>
                            <a className="item">
                                <div>
                                    <h2>{itemDetail.department_id}</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Employee ID" && (
                        <Link href={`/project/user/${itemDetail.id}`}>
                            <a className="item">
                                <div>
                                    <h2>{itemDetail.employee_id}</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Email" && (
                        <Link href={`/project/user/${itemDetail.id}`}>
                            <a className="item">
                                <div>
                                    <h2>{itemDetail.email}</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Mobile" && (
                        <Link href={`/project/user/${itemDetail.id}`}>
                            <a className="item">
                                <div>
                                    <h2>{itemDetail.contact_no}</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Role" && (
                        <Link href={`/project/user/${itemDetail.id}`}>
                            <a className="item">
                                <div>
                                    <h2>{itemDetail.role_id}</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Status" && (
                        <Tippy content={itemDetail.status} theme="ThemeRed">
                            <div className="w-full flex justify-center">
                                <div
                                    className={`statusCircle ${itemDetail.status}`}
                                ></div>
                            </div>
                        </Tippy>
                    )}
                </td>
            ))}
        </tr>
    );
};
