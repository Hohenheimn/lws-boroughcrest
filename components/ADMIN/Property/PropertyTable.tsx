import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";

export default function PropertyTable() {
    return (
        <div className=" w-full overflow-x-auto">
            <table className="table_list 1024px:min-w-[1200px]">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Unit Code</th>
                        <th>Project</th>
                        <th>Developer</th>
                        <th>Tower</th>
                        <th>Floor</th>
                        <th>Class</th>
                        <th>Type</th>
                        <th>Turn Over</th>
                        <th>Owner</th>
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
                    <Link href="/admin/property/123">
                        <a className="edit">
                            <aside>
                                <GoPencil className="mr-2" /> Edit
                            </aside>
                        </a>
                    </Link>
                )}

                <Link href="/admin/property/123">
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
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>205</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>Finance</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>Builder</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>Y Tower</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>2nd</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>1</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>Lorem</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>07/20/2016</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/admin/property/123">
                    <a className="item">
                        <div>
                            <h2>Jane Doe</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
