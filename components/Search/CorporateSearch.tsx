import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

export default function CorporateSearch() {
    return (
        <div className=" w-full">
            <div className=" w-full p-5 pb-0">
                <aside className=" text-ThemeRed flex items-center mb-5 p-3 pb-0 w-full">
                    <Link href="/project/corporate">
                        <a>
                            <MdArrowForwardIos className=" text-[24px] mr-3 rotate-180" />
                        </a>
                    </Link>

                    <h1 className=" text-[20px]">Corporate</h1>
                </aside>
                <aside className="p-3 w-full">
                    <div
                        className=" w-full flex items-center px-4 py-2 border border-ThemeRed flex-1 rounded-lg shadow-lg 640px:px-4 640px:py-2
                            "
                    >
                        <input
                            type="text"
                            className="flex-1 outline-none text-[12px] w-full bg-transparent"
                            placeholder="Search anything here..."
                        />
                        <BsSearch className=" mr-2 text-gray-500 text-[12px]" />
                    </div>
                </aside>
            </div>
            <Link href="?details=345">
                <a className="w-full">
                    <ul className="w-full flex p-5 border-b border-gray-300 flex-wrap">
                        <li className=" w-2/4">
                            <h4 className=" text-[14px] text-gray-500">
                                Juan Dela Cruz
                            </h4>
                            <p className=" text-[14px] text-gray-400">
                                Quezon City
                            </p>
                        </li>
                        <li>
                            <p className=" text-[14px] text-gray-400">
                                ID: 1234
                            </p>
                            <p className=" text-[14px] text-gray-400">
                                TIN: 123456489
                            </p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="?details=789">
                <a className="w-full">
                    <ul className="w-full flex p-5 border-b border-gray-300 flex-wrap">
                        <li className=" w-2/4">
                            <h4 className=" text-[14px] text-gray-500">
                                Juan Dela Cruz
                            </h4>
                            <p className=" text-[14px] text-gray-400">
                                Quezon City
                            </p>
                        </li>
                        <li>
                            <p className=" text-[14px] text-gray-400">
                                ID: 1234
                            </p>
                            <p className=" text-[14px] text-gray-400">
                                TIN: 123456489
                            </p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="?details=258">
                <a className="w-full">
                    <ul className="w-full flex p-5 border-b border-gray-300 flex-wrap">
                        <li className=" w-2/4">
                            <h4 className=" text-[14px] text-gray-500">
                                Juan Dela Cruz
                            </h4>
                            <p className=" text-[14px] text-gray-400">
                                Quezon City
                            </p>
                        </li>
                        <li>
                            <p className=" text-[14px] text-gray-400">
                                ID: 1234
                            </p>
                            <p className=" text-[14px] text-gray-400">
                                TIN: 123456489
                            </p>
                        </li>
                    </ul>
                </a>
            </Link>
        </div>
    );
}
