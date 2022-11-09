import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppContext from "../../Context/AppContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Pagination from "../../Pagination";

export default function UserTable() {
    const { userTableColumn } = useContext(AppContext);
    return (
        <div className=" w-full overflow-x-auto">
            <div className="table_container">
                <table className=" table_list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            {userTableColumn.map((item: any, index: number) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                    </tbody>
                </table>
            </div>
            {/* <Pagination /> */}
        </div>
    );
}

const List = () => {
    const { userTableColumn } = useContext(AppContext);
    return (
        <tr>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <aside>
                            <Image
                                src="/Images/sampleProfile.png"
                                alt=""
                                layout="fill"
                            />
                        </aside>
                        <div>
                            <h2>1234</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>Juan Dela Cruz</h2>
                        </div>
                    </a>
                </Link>
            </td>

            {userTableColumn.map((item: any, index: number) => (
                <td key={index}>
                    {item === "Department" && (
                        <Link href="/project/user/123">
                            <a className="item">
                                <div>
                                    <h2>Sample</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Employee ID" && (
                        <Link href="/project/user/123">
                            <a className="item">
                                <div>
                                    <h2>1234567890</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Email" && (
                        <Link href="/project/user/123">
                            <a className="item">
                                <div>
                                    <h2>sample@gmail.com</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Mobile" && (
                        <Link href="/project/user/123">
                            <a className="item">
                                <div>
                                    <h2>09515151524</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Role" && (
                        <Link href="/project/user/123">
                            <a className="item">
                                <div>
                                    <h2>Finance</h2>
                                </div>
                            </a>
                        </Link>
                    )}
                    {item === "Status" && (
                        <td>
                            <Tippy content="Active" theme="ThemeRed">
                                <div className="w-full flex justify-center">
                                    <div className="statusCircle active"></div>
                                </div>
                            </Tippy>
                        </td>
                    )}
                </td>
            ))}
        </tr>
    );
};
