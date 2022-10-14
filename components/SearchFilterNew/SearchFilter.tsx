import React, { useState } from "react";
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
import style from "../../styles/SearchFilter.module.scss";

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
            <h1 className={style.page_title}>{page}</h1>
            <section className={style.container}>
                <div className={style.searchBar}>
                    <input type="text" placeholder="Search anything here..." />
                    <BsSearch className={style.searchIcon} />
                </div>

                <ul className={style.navigation}>
                    {ValidatePathName === "customer" && (
                        <li className={style.importExportPrint}>
                            <Tippy theme="ThemeRed" content="Export">
                                <div className={style.icon}>
                                    <Image
                                        src="/Images/Export.png"
                                        width={30}
                                        height={30}
                                        alt="Export"
                                    />
                                </div>
                            </Tippy>
                            <Tippy theme="ThemeRed" content="Import">
                                <div className={style.icon}>
                                    <label htmlFor="import">
                                        <Image
                                            src="/Images/Import.png"
                                            width={30}
                                            height={30}
                                            alt="Import"
                                        />
                                    </label>
                                </div>
                            </Tippy>
                            <input type="file" id="import" className="hidden" />
                            <Tippy theme="ThemeRed" content="Print">
                                <div className={style.icon}>
                                    <Image
                                        src="/Images/Print.png"
                                        width={27}
                                        height={27}
                                        alt="Print"
                                    />
                                </div>
                            </Tippy>
                        </li>
                    )}

                    <li className={style.new}>
                        <Link href={`${router.pathname}?new`}>
                            <a>New {page}</a>
                        </Link>
                    </li>

                    <li className={style.filter}>
                        <Tippy content="Filter" theme="ThemeRed">
                            <button
                                onClick={() => setFilter(true)}
                                className={`${style.button} ${
                                    isFilter === true && "pointer-events-none"
                                }`}
                            >
                                <Image
                                    src="/Images/Filter.png"
                                    layout="fill"
                                    alt=""
                                />
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
