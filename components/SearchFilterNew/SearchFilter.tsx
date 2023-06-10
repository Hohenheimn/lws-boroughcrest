import React, { useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import FilterCorporate from "./FilterCorporate";
import FilterDynamic from "./FilterDynamic";
import FilterCustomer from "./FilterCustomer";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../styles/SearchFilter.module.scss";
import { CustomerImport } from "../ReactQuery/CustomerMethod";
import { MoonLoader } from "react-spinners";
import { PropertyImport } from "../ReactQuery/PropertyMethod";
import { DynamicExportHandler } from "../Reusable/DynamicExport";
import { DynamicImport } from "../Reusable/DynamicImport";
import Link from "next/link";
import { useQueryClient } from "react-query";
import { AccessActionValidation } from "../Reusable/PermissionValidation/ActionAccessValidation";

type SearchFilter = {
    page: string;
    setSearchTable: Function;
};

export default function SearchFilter({ page, setSearchTable }: SearchFilter) {
    const PermissionValidationCreate = AccessActionValidation(page, "create");

    const PermissionValidationPrint = AccessActionValidation(page, "print");

    const {
        setCorpToggle,
        setCusToggle,
        setPrompt,
        // user
        userTableRows,
        usersetTableRows,
        userTableColumn,
        setUserTableColumn,
        userColumnList,
        // Property
        propTableRows,
        setPropTableRows,
        propTableColumn,
        setPropTableColumn,
        propList,
        setNewUserToggle,
        setNewPropToggle,
        // Print,
        isPrint,
    } = useContext(AppContext);

    const [isFilter, setFilter] = useState(false);

    const router = useRouter();

    const ValidatePathName = router.pathname.split("/")[2];

    // Print Columns

    const openNew = () => {
        if (router.pathname.includes("project/corporate")) {
            setCorpToggle(true);
        }
        if (router.pathname.includes("project/user")) {
            setNewUserToggle(true);
        }
        if (router.pathname.includes("admin/customer")) {
            setCusToggle(true);
        }
        if (router.pathname.includes("admin/property")) {
            setNewPropToggle(true);
        }
    };

    const [isImport, setImport] = useState<any>();
    const queryClient = useQueryClient();
    const ImportSuccess = () => {
        setPrompt({
            type: "success",
            message: "Successfully imported!",
            toggle: true,
        });
        queryClient.invalidateQueries(["Property-List"]);
        queryClient.invalidateQueries(["get-customer-list"]);
        setImport("");
    };
    const ImportError = () => {
        setPrompt({
            type: "error",
            message: "The given data was invalid",
            toggle: true,
        });
        setImport("");
    };
    // Imports
    const { isLoading: CusLoading, mutate: CusMutate } = CustomerImport(
        ImportSuccess,
        ImportError
    );
    const { isLoading: PropLoading, mutate: PropMutate } = PropertyImport(
        ImportSuccess,
        ImportError
    );
    const ImportMutate = (PayLoad: any) => {
        if (router.pathname.includes("admin/customer")) {
            CusMutate(PayLoad);
        }
        if (router.pathname.includes("admin/property")) {
            PropMutate(PayLoad);
        }
    };
    const importHandler = (e: any) => {
        DynamicImport(e, setPrompt, ImportMutate);
        // setImport(e);
    };

    //Exports
    const [isExportLoading, setExportLoading] = useState(false);
    const ExportHandler = () => {
        if (router.pathname.includes("admin/customer")) {
            const endPoint = "/admin/customer/export";
            DynamicExportHandler(
                endPoint,
                "customer",
                setPrompt,
                setExportLoading
            );
        }
        if (router.pathname.includes("admin/property")) {
            const endPoint = "/admin/property/unit/export";
            DynamicExportHandler(
                endPoint,
                "property",
                setPrompt,
                setExportLoading
            );
        }
    };

    return (
        <>
            <h1 className={style.page_title}>{page}</h1>
            <section className={style.container}>
                <div className={style.searchBar}>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchTable(e.target.value)}
                    />
                    <BsSearch className={style.searchIcon} />
                </div>

                <ul className={style.navigation}>
                    {(ValidatePathName === "customer" ||
                        ValidatePathName === "property") && (
                        <li className={style.importExportPrint}>
                            {isExportLoading ? (
                                <MoonLoader color="#8f384d" size={20} />
                            ) : (
                                <div>
                                    <Tippy theme="ThemeRed" content="Export">
                                        <div
                                            className={style.icon}
                                            onClick={ExportHandler}
                                        >
                                            <Image
                                                src="/Images/Export.png"
                                                layout="fill"
                                                alt="Export"
                                            />
                                        </div>
                                    </Tippy>
                                </div>
                            )}
                            <Tippy theme="ThemeRed" content="Import">
                                <div className={style.icon}>
                                    {CusLoading || PropLoading ? (
                                        <MoonLoader size={20} color="#8f384d" />
                                    ) : (
                                        <label
                                            htmlFor="import"
                                            className="relative h-full w-full"
                                        >
                                            <Image
                                                src="/Images/Import.png"
                                                layout="fill"
                                                alt="Import"
                                            />
                                        </label>
                                    )}
                                </div>
                            </Tippy>
                            <input
                                type="file"
                                id="import"
                                value={isImport}
                                onChange={importHandler}
                                className="hidden"
                            />

                            {PermissionValidationPrint &&
                                router.pathname.includes("/admin") && (
                                    <Tippy theme="ThemeRed" content="Print">
                                        <div>
                                            <Link
                                                href={`${isPrint.url}?keyword=${isPrint.keyword}&limit=${isPrint.limit}&page=${isPrint.page}&columns=${isPrint.columns}`}
                                            >
                                                <a target="_blank">
                                                    <div className={style.icon}>
                                                        <Image
                                                            src="/Images/Print.png"
                                                            layout="fill"
                                                            alt="Print"
                                                        />
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </Tippy>
                                )}
                        </li>
                    )}

                    {page !== "request" && (
                        <>
                            {PermissionValidationCreate &&
                                router.pathname.includes("/admin") && (
                                    <li className={style.new}>
                                        <div onClick={openNew}>New {page}</div>
                                    </li>
                                )}

                            {router.pathname.includes("/project") && (
                                <li className={style.new}>
                                    <div onClick={openNew}>New {page}</div>
                                </li>
                            )}

                            <li className={style.filter}>
                                <Tippy content="Filter" theme="ThemeRed">
                                    <button
                                        onClick={() => setFilter(true)}
                                        className={`${style.button} ${
                                            isFilter === true &&
                                            "pointer-events-none"
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
                                        <FilterDynamic
                                            setFilter={setFilter}
                                            TableRows={userTableRows}
                                            setTableRows={usersetTableRows}
                                            TableColumn={userTableColumn}
                                            setTableColumn={setUserTableColumn}
                                            ColumnList={userColumnList}
                                        />
                                    )}
                                    {isFilter && page === "customer" && (
                                        <FilterCustomer
                                            setFilter={setFilter}
                                            isFilter={isFilter}
                                        />
                                    )}
                                    {isFilter && page === "property unit" && (
                                        <FilterDynamic
                                            setFilter={setFilter}
                                            TableRows={propTableRows}
                                            setTableRows={setPropTableRows}
                                            TableColumn={propTableColumn}
                                            setTableColumn={setPropTableColumn}
                                            ColumnList={propList}
                                        />
                                    )}
                                </AnimatePresence>
                            </li>
                        </>
                    )}
                </ul>
            </section>
        </>
    );
}
