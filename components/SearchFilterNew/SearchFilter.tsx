import React, { useState } from "react";
import { imgIcons } from "../../public/Images/Image";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import FilterCorporate from "./FilterCorporate";
import FilterUser from "./FilterUser";
import FilterCustomer from "./FilterCustomer";
import { BiExport, BiImport } from "react-icons/bi";
import { BsFillPrinterFill } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import Link from "next/link";

type SearchFilter = {
    page: string;
};

export default function SearchFilter({ page }: SearchFilter) {
    const [isFilter, setFilter] = useState(false);
    const router = useRouter();
    const ValidatePathName = router.pathname.split("/")[2];
    console.log(ValidatePathName);
    return (
        <div>
            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5 capitalize">
                {page}
            </h1>
            <section className=" flex justify-between items-center mb-10 640px:flex-wrap 640px:justify-end">
                <div className=" flex items-center shadow-lg px-4 py-2 bg-white flex-1 max-w-[500px] 640px:max-w-[unset] rounded-lg">
                    <input
                        type="text"
                        className="flex-1 outline-none text-14px "
                        placeholder="Search anything here..."
                    />
                    <BsSearch className=" mr-2 text-gray-500 text-[18px]" />
                </div>
                <ul className=" flex items-center ml-5  640px:my-5 640px:w-full">
                    {ValidatePathName === "customer" && (
                        <li className=" flex items-center">
                            <Tippy theme="ThemeRed" content="Export">
                                <div>
                                    <BiExport className=" mr-5 text-ThemeRed text-[30px] font-bold cursor-pointer hover:text-ThemeRed50" />
                                </div>
                            </Tippy>
                            <Tippy theme="ThemeRed" content="Import">
                                <div>
                                    <BiImport className=" mr-5 text-ThemeRed text-[30px] font-bold cursor-pointer hover:text-ThemeRed50" />
                                </div>
                            </Tippy>
                            <Tippy theme="ThemeRed" content="Print">
                                <div>
                                    <BsFillPrinterFill className=" mr-5 text-ThemeRed text-[30px] font-bold cursor-pointer hover:text-ThemeRed50" />
                                </div>
                            </Tippy>
                        </li>
                    )}

                    <li className=" relative mr-5 cursor-pointer">
                        <Link href={`${router.pathname}?new`}>
                            <a className=" capitalize px-5 480px:text-[12px] 480px:px-2 text-[14px] py-3 rounded-lg bg-ThemeRed text-white leading-none duration-75 hover:bg-ThemeRed50">
                                New {page}
                            </a>
                        </Link>
                    </li>
                    <li className=" flex items-center cursor-pointer relative">
                        <Tippy content="Filter" theme="ThemeRed">
                            <button onClick={() => setFilter(true)}>
                                <Image src={imgIcons.Filter} />
                            </button>
                        </Tippy>
                        <AnimatePresence>
                            {isFilter && page === "corporate" && (
                                <FilterCorporate
                                    setFilter={setFilter}
                                    isFilter={isFilter}
                                />
                            )}
                            {isFilter && page === "user" && (
                                <FilterUser
                                    setFilter={setFilter}
                                    isFilter={isFilter}
                                />
                            )}
                            {isFilter && page === "customer" && (
                                <FilterCustomer
                                    setFilter={setFilter}
                                    isFilter={isFilter}
                                />
                            )}
                        </AnimatePresence>
                    </li>
                </ul>
            </section>
        </div>
    );
}
