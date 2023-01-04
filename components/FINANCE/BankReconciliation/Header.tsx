import React, { useContext } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../../styles/SearchFilter.module.scss";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";
import AppContext from "../../../components/Context/AppContext";
import { CustomerImport } from "../../../components/ReactQuery/CustomerMethod";

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

    //Exports
    const handleExport = (endPoint: string, name: string) => {
        // axios({
        //     url: `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
        //     headers: {
        //         Authorization: "Bearer " + getCookie("user"),
        //     },
        //     method: "get",
        //     responseType: "blob",
        // }).then((response) => {
        //     const href = URL.createObjectURL(response.data);
        //     const link = document.createElement("a");
        //     link.href = href;
        //     link.setAttribute("download", `${name}.xlsx`);
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //     URL.revokeObjectURL(href);
        // });
    };
    const exportHandler = () => {
        const endPoint =
            "/finance/general-ledger/chart-of-accounts/export-list";
        handleExport(endPoint, "chart-of-accounts-list");
    };

    const importHandler = (e: any) => {
        // if (e.target.files.length > 0) {
        //     const fileArray = e.target.files[0].name.split(".");
        //     const extension = fileArray[fileArray.length - 1];
        //     if (extension === "xlsx") {
        //         let selectedFile = e.target.files[0];
        //         const formData = new FormData();
        //         formData.append("file", selectedFile);
        //         // Mutation
        //         CusMutate(formData);
        //     } else {
        //         setPrompt({
        //             type: "error",
        //             message: "Invalid file, must be XLSX only!",
        //             toggle: true,
        //         });
        //     }
        // }
    };
    return (
        <>
            <section className={style.container}>
                <div className={style.period}>
                    <p>PERIOD</p>
                    <div className="calendar">
                        <span className="cal">
                            <Image
                                src="/Images/calendar.png"
                                width={15}
                                height={15}
                            />
                        </span>
                        <input
                            type="date"
                            className="p-2 outline-none rounded-md shadow-md"
                        />
                    </div>
                    <div className="calendar">
                        <span className="cal">
                            <Image
                                src="/Images/calendar.png"
                                width={15}
                                height={15}
                            />
                        </span>
                        <input
                            type="date"
                            className="p-2 outline-none rounded-md shadow-md"
                        />
                    </div>
                </div>

                <ul className={style.navigation}>
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
                </ul>
            </section>
        </>
    );
}
