import React, { useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import FilterCorporate from "./FilterCorporate";
import FilterUser from "./FilterUser";
import FilterCustomer from "./FilterCustomer";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "../../styles/SearchFilter.module.scss";
import FilterProperty from "./FilterProperty";
import { CustomerImport, CustomerExport } from "../ReactQuery/CustomerMethod";

type SearchFilter = {
    page: string;
    setSearchTable: Function;
};

export default function SearchFilter({ page, setSearchTable }: SearchFilter) {
    const [isFilter, setFilter] = useState(false);
    const router = useRouter();
    const ValidatePathName = router.pathname.split("/")[2];

    const CustomerSuccess = () => {
        alert("Success");
    };

    const { isLoading: CusLoading, mutate: CusMutate } =
        CustomerImport(CustomerSuccess);

    const importHandler = (e: any) => {
        if (e.target.files.length > 0) {
            let selectedFile = e.target.files[0];
            if (
                [
                    "XLSX",
                    "XLSM",
                    "XLS",
                    "XLTX",
                    "XLTM",
                    "xlsx",
                    "xlsm",
                    "xls",
                    "xltx",
                    "xltm",
                ].includes(selectedFile.type)
            ) {
                if (router.pathname.includes("admin/customer")) {
                    console.log(selectedFile);
                }
            } else {
                alert("Invalid File");
            }
        } else {
            alert("Please Select a File");
        }
    };
    const exportHandler = () => {
        if (router.pathname.includes("admin/customer")) {
        }
    };

    return (
        <div>
            <h1 className={style.page_title}>{page}</h1>
            <section className={style.container}>
                <div className={style.searchBar}>
                    <input
                        type="text"
                        placeholder="Search anything here..."
                        onChange={(e) => setSearchTable(e.target.value)}
                    />
                    <BsSearch className={style.searchIcon} />
                </div>

                <ul className={style.navigation}>
                    {(ValidatePathName === "customer" ||
                        ValidatePathName === "property") && (
                        <li className={style.importExportPrint}>
                            <Tippy theme="ThemeRed" content="Export">
                                <div
                                    className={style.icon}
                                    onClick={exportHandler}
                                >
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
                            <input
                                type="file"
                                id="import"
                                onChange={importHandler}
                                className="hidden"
                            />
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
                        <Link href="?new">
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
                            {isFilter && page === "property unit" && (
                                <FilterProperty
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
