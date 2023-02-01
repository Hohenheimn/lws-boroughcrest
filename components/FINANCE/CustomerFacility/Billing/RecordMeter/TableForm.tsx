import React, { useState, useContext } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import PeriodCalendar from "../../../../PeriodCalendar";
import DropdownSearch from "../../../../DropdownSearch";
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
import DynamicPopOver from "../../../../DynamicPopOver";
import ReadingCrud from "./ReadingCrud";
import DropDownCharge from "../../../OpeningBalance/DropDownCharge";

export default function TableForm() {
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
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
    // Reading
    const [isReading, setReading] = useState({
        toggle: false,
        value: "",
        id: "",
        firstVal: "",
        firstID: "",
    });
    // Charge
    const [isCharge, setCharge] = useState({
        id: "",
        charge: "",
    });
    return (
        <>
            <section className={`${style.container} 1280px:flex-wrap`}>
                <div className=" flex items-center 1280px:w-2/4 640px:w-full 1280px:mb-5">
                    <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                        READING:
                    </p>
                    <DynamicPopOver
                        className="w-full"
                        toRef={
                            <>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="w-full p-1 h-10 1550px:h-8 min-w-[200px] 820px:h-8 rounded-md outline-none shadow-md text-[#757575]"
                                    onClick={() =>
                                        setReading({
                                            ...isReading,
                                            toggle: true,
                                        })
                                    }
                                    value={isReading.value}
                                    onChange={(e: any) =>
                                        setReading({
                                            ...isReading,
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </>
                        }
                        toPop={
                            <>
                                {isReading.toggle && (
                                    <ReadingCrud
                                        isObject={isReading}
                                        setObject={setReading}
                                    />
                                )}
                            </>
                        }
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
            <div>
                <ul className=" flex mb-5 flex-wrap">
                    <li className="mr-5 820px:mb-5 flex items-center mb-5">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                            CHARGE
                        </p>
                        <DropDownCharge
                            UpdateStateHandler={(key, e) => {
                                setCharge({
                                    charge: e.target.innerHTML,
                                    id: e.target.getAttribute("data-id"),
                                });
                            }}
                            itemDetail={isCharge}
                        />
                    </li>
                    <li className="mr-5 820px:mb-5 flex items-center mb-5">
                        <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                            RATE
                        </p>
                        <input
                            type="text"
                            className=" w-full p-1 h-10 1550px:h-8 min-w-[200px] 820px:h-8 rounded-md outline-none shadow-md text-[#757575]"
                        />
                    </li>
                    <li className=" 820px:mb-5 flex items-center mb-5">
                        <PeriodCalendar value={isPeriod} setValue={setPeriod} />
                    </li>
                </ul>
                <div className="table_container">
                    <table className="table_list">
                        <thead className="textRed">
                            <tr>
                                <th className="checkbox">
                                    <div className="item">
                                        <input type="checkbox" />
                                    </div>
                                </th>
                                <th>PROPERTY NAME</th>
                                <th>PREVIOUS READING</th>
                                <th>CURRENT READING</th>
                                <th>CONSUMPTION</th>
                                <th>MOVING AVERAGE CONSUMPTION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <List />
                            <List />
                            <List />
                            <List />
                            <List />
                            <List />
                            <List />
                            <List />
                            <List />
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-end">
                    <button className="buttonRed">APPLY</button>
                </div>
            </div>
        </>
    );
}

const List = () => {
    return (
        <tr>
            <td className="checkbox">
                <div className="item">
                    <input type="checkbox" />
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>Unit 1</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>100.00</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>250.00</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>150.00</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <h2 className="flex items-center">
                        150{" "}
                        <span className="flex items-center ml-3 text-Green">
                            <IoMdArrowDropdown />
                            15%
                        </span>
                        {/* <span className="flex items-center ml-3 text-ThemeRed">
                            <IoMdArrowDropup />
                            15%
                        </span> */}
                    </h2>
                </div>
            </td>
            <td>
                <div className="item w-[150px]">
                    <div className="finance_status">
                        <div className="status posted">
                            <div>
                                <Image
                                    src="/Images/f_posted.png"
                                    width={25}
                                    height={25}
                                    alt="Draft"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};
