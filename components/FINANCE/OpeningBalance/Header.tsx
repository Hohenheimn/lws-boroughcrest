import React, { useContext, useState } from "react";
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
import Calendar from "../../Calendar";

export default function Header() {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });

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
                    {!router.asPath.includes("subledger") && (
                        <>
                            <p>DATE</p>
                            <div className="calendar">
                                <span className="cal">
                                    <Image
                                        src="/Images/calendar.png"
                                        width={15}
                                        height={15}
                                    />
                                </span>
                                <input
                                    type="text"
                                    value={isDate.value}
                                    onChange={() => {}}
                                    onClick={() =>
                                        setDate({ ...isDate, toggle: true })
                                    }
                                    className="p-2 outline-none rounded-md shadow-md"
                                />
                                {isDate.toggle && (
                                    <Calendar
                                        value={isDate}
                                        setValue={setDate}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>

                <ul className={style.navigation}>
                    <li className={style.importExportPrint}>
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
