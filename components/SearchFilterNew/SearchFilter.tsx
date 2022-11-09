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
import { MoonLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";

type SearchFilter = {
    page: string;
    setSearchTable: Function;
};

export default function SearchFilter({ page, setSearchTable }: SearchFilter) {
    const [isFilter, setFilter] = useState(false);
    const router = useRouter();
    const ValidatePathName = router.pathname.split("/")[2];

    const CustomerImportSuccess = () => {
        alert("Successfully imported!");
    };

    const { isLoading: CusLoading, mutate: CusMutate } = CustomerImport(
        CustomerImportSuccess
    );
    //file download to excel
    const handleExport = (endPoint: string) => {
        axios({
            url: `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
            method: "get",
            responseType: "blob",
        }).then((response) => {
            const href = URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = href;
            link.setAttribute("download", "customers.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    };

    const importHandler = (e: any) => {
        if (e.target.files.length > 0) {
            const fileArray = e.target.files[0].name.split(".");
            const extension = fileArray[fileArray.length - 1];
            if (extension === "xlsx" || extension === "csv") {
                let selectedFile = e.target.files[0];
                const formData = new FormData();
                formData.append("file", selectedFile);
                if (router.pathname.includes("admin/customer")) {
                    CusMutate(formData);
                }
            } else {
                alert("Invalid file, must be XLSX or CSV only!");
            }
        }
    };
    const exportHandler = () => {
        if (router.pathname.includes("admin/customer")) {
            const endPoint = "/admin/customer/export?type={'csv' or 'xlsx'}";
            handleExport(endPoint);
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
                                    {CusLoading ? (
                                        <MoonLoader size={20} color="#8f384d" />
                                    ) : (
                                        <label htmlFor="import">
                                            <Image
                                                src="/Images/Import.png"
                                                width={30}
                                                height={30}
                                                alt="Import"
                                            />
                                        </label>
                                    )}
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
                                    src="/Images/New_Filter.png"
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
