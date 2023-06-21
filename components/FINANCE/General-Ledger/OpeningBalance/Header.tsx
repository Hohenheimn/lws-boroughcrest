import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../../../styles/SearchFilter.module.scss";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";
import AppContext from "../../../Context/AppContext";
import { CustomerImport } from "../../../ReactQuery/CustomerMethod";
import Calendar from "../../../Reusable/Calendar";
import { DynamicImport } from "../../../Reusable/DynamicImport";
import { OpeningBalanceImport } from "./Query";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { useQueryClient } from "react-query";

type HeaderProps = {
    isDate: {
        value: string;
        toggle: boolean;
    };
    setDate: Function;
    importEndpoint: string;
};

export default function Header({
    isDate,
    setDate,
    importEndpoint,
}: HeaderProps) {
    const [isImport, setImport] = useState<any>(null);

    const queryClient = useQueryClient();

    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const ImportSuccess = () => {
        setPrompt({
            type: "success",
            message: "Successfully imported!",
            toggle: true,
        });
        setImport(null);
        queryClient.invalidateQueries(["generalLedger-list"]);
        queryClient.invalidateQueries(["subledger-list"]);
    };

    const ImportError = (e: any) => {
        setImport(null);
        ErrorSubmit(e, setPrompt);
    };

    // Imports
    const { isLoading: ImportLoading, mutate: ImportMutate } =
        OpeningBalanceImport(ImportSuccess, ImportError, importEndpoint);

    const importHandler = (e: any) => {
        DynamicImport(e, setPrompt, ImportMutate);
    };
    return (
        <>
            <section className={style.container}>
                <div className={style.period}>
                    {!router.asPath.includes("subledger") && (
                        <>
                            <p className="labelField">DATE</p>
                            <div className="calendar">
                                <span className="cal">
                                    <Image
                                        src="/Images/CalendarMini.png"
                                        width={15}
                                        height={15}
                                        alt=""
                                    />
                                </span>
                                <input
                                    type="text"
                                    value={isDate.value}
                                    onChange={() => {}}
                                    placeholder="MMM dd yyyy"
                                    onClick={() =>
                                        setDate({ ...isDate, toggle: true })
                                    }
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
                                {ImportLoading ? (
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
                            value={isImport}
                            onChange={importHandler}
                            className="hidden"
                        />
                    </li>
                </ul>
            </section>
        </>
    );
}
