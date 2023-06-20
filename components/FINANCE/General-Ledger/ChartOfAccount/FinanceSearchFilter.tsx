import React, { useContext, useState } from "react";
import AppContext from "../../../Context/AppContext";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../../../styles/SearchFilter.module.scss";
import { CustomerImport } from "../../../ReactQuery/CustomerMethod";
import { MoonLoader } from "react-spinners";
import { DynamicExportHandler } from "../../../Reusable/DynamicExport";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";
import { DynamicImport } from "../../../Reusable/DynamicImport";
import { ChartOfAccountImport } from "./Query";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";

type SearchFilter = {
    page: string;
    setSearchTable: Function;
    setCreate: Function;
    isFilterTable: boolean;
    setFilterTable: Function;
};

export default function FinanceSearchFilter({
    page,
    setSearchTable,
    setCreate,
    isFilterTable,
    setFilterTable,
}: SearchFilter) {
    const Permission_Create_coa = AccessActionValidation(
        "Chart of Accounts",
        "create"
    );

    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const openNew = () => {
        setCreate(true);
    };

    const ImportSuccess = () => {
        setPrompt({
            type: "success",
            message: "Successfully imported!",
            toggle: true,
        });
    };

    const ImportError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    // Imports
    // used as example
    const { isLoading: CusLoading, mutate: COAMutate } = ChartOfAccountImport(
        ImportSuccess,
        ImportError
    );
    const ImportMutate = (PayLoad: any) => {
        COAMutate(PayLoad);
    };
    const importHandler = (e: any) => {
        DynamicImport(e, setPrompt, ImportMutate);
    };
    // Export
    const [isExportLoading, setExportLoading] = useState(false);
    const exportHandler = () => {
        if (router.pathname.includes("/general-ledger/chart-of-account")) {
            const endPoint =
                "/finance/general-ledger/chart-of-accounts/export-list";
            DynamicExportHandler(
                endPoint,
                "chart-of-accounts-list",
                setPrompt,
                setExportLoading
            );
        }
    };

    const FilterFunc = () => {
        setFilterTable(!isFilterTable);
    };

    return (
        <>
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
                    <li className={style.importExportPrint}>
                        {isExportLoading ? (
                            <div className={style.icon} onClick={exportHandler}>
                                <MoonLoader color="#8f384d" size={20} />
                            </div>
                        ) : (
                            <div>
                                <Tippy theme="ThemeRed" content="Export">
                                    <div
                                        className={style.icon}
                                        onClick={exportHandler}
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
                                {CusLoading ? (
                                    <MoonLoader size={20} color="#8f384d" />
                                ) : (
                                    <label htmlFor="import">
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
                            onChange={importHandler}
                            className="hidden"
                        />
                        <Tippy theme="ThemeRed" content="Change View">
                            <div className={style.filter2} onClick={FilterFunc}>
                                <Image
                                    src="/Images/Filter2.png"
                                    layout="fill"
                                    alt="filters"
                                />
                            </div>
                        </Tippy>
                    </li>

                    {router.pathname.includes(
                        "general-ledger/chart-of-account"
                    ) &&
                        Permission_Create_coa && (
                            <li className={`${style.new} mr-0`}>
                                <div onClick={openNew}>Create {page}</div>
                            </li>
                        )}
                </ul>
            </section>
        </>
    );
}
