import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";

export default function UserTable() {
    return (
        <div className=" w-full overflow-x-auto">
            <table className=" table_list min-w-[800px] 820px:min-w-[1200px]">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Employee ID</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th className=" status">Status</th>
                    </tr>
                </thead>
                <tbody>
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
                    <Link href="/project/user/123">
                        <a className="edit">
                            <aside>
                                <GoPencil className="mr-2" /> Edit
                            </aside>
                        </a>
                    </Link>
                )}
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
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>JUan Dela Cruz</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>Quezon City</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>1234567890</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>099999999</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>juandelacruz@no.com</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="item">
                        <div>
                            <h2>Lorem ipsum</h2>
                            <p>Lorem Ipsum</p>
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
