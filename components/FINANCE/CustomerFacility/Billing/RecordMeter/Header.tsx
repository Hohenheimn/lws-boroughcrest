import React, { useContext } from "react";
import AppContext from "../../../../Context/AppContext";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../../../../styles/SearchFilter.module.scss";
import { CustomerImport } from "../../../../ReactQuery/CustomerMethod";
import { MoonLoader } from "react-spinners";
import { DynamicExportHandler } from "../../../../DynamicExport";
import { DynamicImport } from "../../../../DynamicImport";

export default function Header() {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();

    const ImportSuccess = () => {
        setPrompt({
            type: "success",
            message: "Successfully imported!",
            toggle: true,
        });
    };
    const ImportError = () => {
        setPrompt({
            type: "error",
            message: "The given data was invalid",
            toggle: true,
        });
    };

    // Imports
    const { isLoading: CusLoading, mutate: CusMutate } = CustomerImport(
        ImportSuccess,
        ImportError
    );
    const ImportMutate = (PayLoad: any) => {
        CusMutate(PayLoad);
    };
    const importHandler = (e: any) => {
        // DynamicImport(e, setPrompt, ImportMutate);
    };

    //Exports
    const exportHandler = () => {
        if (router.pathname.includes("/general-ledger/chart-of-account")) {
            const endPoint =
                "/finance/general-ledger/chart-of-accounts/export-list";
            DynamicExportHandler(endPoint, "record-meter-reading");
        }
    };

    return (
        <>
            <section className={style.container}>
                <div className=" flex items-center">
                    <h1 className=" text-[24px]">Water</h1>
                    <h1 className=" text-[24px] ml-5">Electric</h1>
                    <span className=" font-NHU-bold text-[24px] text-ThemeRed ml-5 cursor-pointer">
                        +
                    </span>
                </div>
                <ul className={`${style.navigation}`}>
                    <li className={style.importExportPrint}>
                        <Tippy theme="ThemeRed" content="Export">
                            <div className={style.icon} onClick={exportHandler}>
                                <Image
                                    src="/Images/Export.png"
                                    layout="fill"
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
                    </li>

                    <li className={`${style.new} mr-0`}>
                        <div>NEW READING</div>
                    </li>
                    <li className={`${style.new} mr-0`}>
                        <div>PROPERTY</div>
                    </li>
                </ul>
            </section>
        </>
    );
}
