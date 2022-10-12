import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";

export default function UserTable() {
    return (
        <div className=" w-full overflow-x-auto">
            <table className=" w-full min-w-[800px] 820px:min-w-[1200px]">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className=" text-start px-4 py-6">ID</th>
                        <th className=" text-start px-4 py-6">Name</th>
                        <th className=" text-start px-4 py-6">Department</th>
                        <th className=" text-start px-4 py-6">Employee ID</th>
                        <th className=" text-start px-4 py-6">Email</th>
                        <th className=" text-start px-4 py-6">Mobile</th>
                        <th className=" text-start px-4 py-6">Role</th>
                        <th className="px-4 py-6 text-center">Status</th>
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
        <tr
            className="border-b border-gray-300 cursor-pointer relative"
            onMouseEnter={MouseEnter}
            onMouseLeave={MouseLeave}
        >
            <td>
                {isEdit && (
                    <Link href="/project/corporate/123">
                        <a className="text-white flex items-center text-[18px]">
                            <aside className=" absolute z-0 w-full h-[60%] bg-[#7f7f7f5a] top-[20%] left-0 flex justify-center items-center">
                                <GoPencil className="mr-2" /> Edit
                            </aside>
                        </a>
                    </Link>
                )}
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <aside className=" w-10 h-10 rounded-full overflow-hidden relative shadow-lg mr-3">
                            <Image
                                src="/Images/sampleProfile.png"
                                alt=""
                                layout="fill"
                            />
                        </aside>
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                1234
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                JUan Dela Cruz
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                Quezon City
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                1234567890
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                099999999
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                juandelacruz@no.com
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/user/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                Lorem ipsum
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <div className="w-full flex justify-center">
                    <div
                        className=" h-5 w-5 rounded-full border-4 border-[#19d142]"
                        style={{ boxShadow: "0 0 15px 0 #19d142" }}
                    ></div>
                </div>
            </td>
        </tr>
    );
};
