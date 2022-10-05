import React, { useState } from "react";
import { imgIcons } from "../../public/Images/Image";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import FilterCorporate from "./FilterCorporate";
import Link from "next/link";
import FilterUser from "./FilterUser";

type SearchFilter = {
    page: string;
};

export default function SearchFilter({ page }: SearchFilter) {
    const [isFilter, setFilter] = useState(false);
    return (
        <div>
            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5 capitalize">
                {page}
            </h1>
            <section className=" flex justify-between items-center mb-10 480px:flex-wrap 480px:justify-end">
                <div className=" flex items-center shadow-lg px-4 py-2 bg-white flex-1 max-w-[500px] rounded-lg 480px:order-2">
                    <input
                        type="text"
                        className="flex-1 outline-none text-14px "
                        placeholder="Search anything here..."
                    />
                    <BsSearch className=" mr-2 text-gray-500 text-[18px]" />
                </div>
                <ul className=" flex items-center ml-5  480px:my-5">
                    <li className=" relative mr-5 cursor-pointer">
                        <Link href="?new">
                            <a className=" capitalize px-5 text-[14px] py-3 rounded-lg bg-ThemeRed text-white leading-none duration-75 hover:bg-ThemeRed50">
                                New {page}
                            </a>
                        </Link>
                    </li>
                    <li className=" flex items-center cursor-pointer relative">
                        <button onClick={() => setFilter(true)}>
                            <Image src={imgIcons.Filter} />
                        </button>
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
                        </AnimatePresence>
                    </li>
                </ul>
            </section>
        </div>
    );
}
