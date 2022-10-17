import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import api from "../../../util/api";
import { useQuery } from "react-query";
import axios from "axios";

export default function Table() {
    const { data, isLoading, isError } = useQuery("get-corporate-list", () => {
        return api.get("/project/corporate?paginate=1");
    });

    return (
        <div className=" w-full overflow-x-auto">
            <table className="table_list 1024px:min-w-[1200px]">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>TIN</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <List />
                    <List />
                    <List />
                </tbody>
            </table>
        </div>
    );
}

const List = () => {
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
                    <Link href="/project/corporate/123">
                        <a className="edit">
                            <aside>
                                <GoPencil className="mr-2" /> Edit
                            </aside>
                        </a>
                    </Link>
                )}

                <Link href="/project/corporate/123">
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
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="item">
                        <div>
                            <h2>JUan Dela Cruz</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="item">
                        <div>
                            <h2>847 Bear Hill Drive Alameda, CA 94501</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="item">
                        <div>
                            <h2>1234567890</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="item">
                        <div>
                            <h2>099999999</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="item">
                        <div>
                            <h2>juandelacruz@no.com</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
