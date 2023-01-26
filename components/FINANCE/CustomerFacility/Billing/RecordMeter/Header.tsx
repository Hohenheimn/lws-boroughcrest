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
            <section className={`${style.container} 1280px:flex-wrap`}>
                <div className=" flex items-center 1280px:w-2/4 640px:w-full 1280px:mb-5">
                    <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                        READING:
                    </p>
                    <input
                        type="text"
                        className=" rounded-md shadow-md 480px:text-[12px] outline-none px-2 py-1"
                    />
                </div>
                <aside className="1280px:w-2/4 640px:w-full">
                    <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                        READING SERIAL:{" "}
                        <span className=" text-[#2e4364] font-NHU-medium">
                            0001011
                        </span>
                    </p>
                </aside>
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
