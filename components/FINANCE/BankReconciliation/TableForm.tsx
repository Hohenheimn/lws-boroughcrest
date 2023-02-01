import React, { useContext, useState } from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import Calendar from "../../Calendar";
import DynamicPopOver from "../../DynamicPopOver";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import styleSearch from "../../../styles/SearchFilter.module.scss";
import { MoonLoader } from "react-spinners";
import AppContext from "../../../components/Context/AppContext";
import { CustomerImport } from "../../../components/ReactQuery/CustomerMethod";
import PeriodCalendar from "../../PeriodCalendar";
import DropdownSearch from "../../DropdownSearch";
import BankAccountDropDown from "./BankAccountDropDown";

export default function TableForm() {
    const { setPrompt } = useContext(AppContext);
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    const [isBankAccount, setBankAccount] = useState({
        id: "",
        value: "",
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
            <section className={styleSearch.container}>
                <div className={styleSearch.period}>
                    <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    <div className="flex items-center ml-5 1280px:ml-0 1280px:mt-5">
                        <p className="labelField">BANK ACCOUNT</p>
                        <BankAccountDropDown
                            isObject={isBankAccount}
                            setObject={setBankAccount}
                        />
                    </div>
                </div>

                <ul className={styleSearch.navigation}>
                    <li className={styleSearch.importExportPrint}>
                        <Tippy theme="ThemeRed" content="Export">
                            <div
                                className={styleSearch.icon}
                                onClick={exportHandler}
                            >
                                <Image
                                    src="/Images/Export.png"
                                    layout="fill"
                                    alt="Export"
                                />
                            </div>
                        </Tippy>
                        <Tippy theme="ThemeRed" content="Import">
                            <div className={styleSearch.icon}>
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
            <div className="table_container">
                <table className={style.crudTable}>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                            <th>BALANCE</th>
                            <th>REMARKS</th>
                            <th>DOCUMENT NO.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={style.label}>
                                <h1>TOTAL</h1>
                            </td>
                            <td>
                                <p className="withPeso">1000.00</p>
                            </td>
                            <td>
                                <p className="withPeso">1000.00</p>
                            </td>
                            <td>
                                <p className="withPeso">1000.00</p>
                            </td>
                            <td>
                                <div className={style.peso}>
                                    <p></p>
                                </div>
                            </td>
                            <td>
                                <div className={style.peso}>
                                    <p></p>
                                </div>
                            </td>
                        </tr>

                        <List />
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end py-5 mt-20">
                <button className="button_cancel">Cancel</button>
                <button className="buttonRed">SAVE</button>
            </div>
        </>
    );
}

const List = () => {
    const [isDate, setDate] = useState({
        value: "",
        toggle: false,
    });
    return (
        <tr className={`${style.total} ${style.total1}`}>
            <td>
                <DynamicPopOver
                    className="w-[200px]"
                    samewidth={false}
                    toRef={
                        <aside className="calendar relative w-full">
                            <span className="cal ">
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
                                placeholder="dd/mm/yyyy"
                                onClick={() =>
                                    setDate({ ...isDate, toggle: true })
                                }
                                className="p-2 outline-none rounded-md shadow-md"
                            />
                        </aside>
                    }
                    toPop={
                        <>
                            {isDate.toggle && (
                                <Calendar value={isDate} setValue={setDate} />
                            )}
                        </>
                    }
                />
            </td>
            <td>
                <input type="number" />
            </td>
            <td>
                <input type="number" />
            </td>
            <td>
                <p className="withPeso">1000.00</p>
            </td>
            <td>
                <input type="text" />
            </td>
            <td>
                <input type="text" />
            </td>
        </tr>
    );
};
