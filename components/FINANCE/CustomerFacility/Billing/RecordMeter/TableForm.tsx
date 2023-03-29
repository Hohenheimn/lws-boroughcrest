import React, { useState, useContext, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import AppContext from "../../../../Context/AppContext";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../../../../styles/SearchFilter.module.scss";
import { CustomerImport } from "../../../../ReactQuery/CustomerMethod";
import { BarLoader, MoonLoader } from "react-spinners";
import { DynamicExportHandler } from "../../../../Reusable/DynamicExport";
import { DynamicImport } from "../../../../Reusable/DynamicImport";
import DynamicPopOver from "../../../../Reusable/DynamicPopOver";
import ReadingCrud from "./ReadingCrud";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import { HiPencil } from "react-icons/hi";
import Readingform from "./Readingform";
import PreviousPeriod from "./PreviousPeriod";
import { CopyButtonTable, PencilButton } from "../../../../Reusable/Icons";
import { TextNumberDisplay } from "../../../../Reusable/NumberFormat";
import Pagination from "../../../../Reusable/Pagination";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import Link from "next/link";
import { format, isValid, parse } from "date-fns";
import { GetRecordMeterList } from "./Query";
import Modify from "./Modify";

type isTable = {
    itemArray: isTableItemObj[];
    selectAll: boolean;
};

type isTableItemObj = {
    id: number;
    property: {
        id: string | number;
        unit_code: string;
    };
    previous_reading: number;
    current_reading: number;
    consumption: number;
    moving_average_consumption: number;
    status: string;
    percentage: number;
    select: boolean;
};

export default function TableForm() {
    const [isPreviousPeriod, setPreviousPeriod] = useState({
        year: "",
        from: "",
        to: "",
    });
    const { setPrompt } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const router = useRouter();

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
        rate: "",
    });
    const [toggleReading, setToggleReading] = useState(false);

    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });
    const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

    const dateFrom = parse(
        `${isPreviousPeriod.from} ${isPreviousPeriod.year}`,
        "MMM dd yyyy",
        new Date()
    );
    const dateTo = parse(
        `${isPreviousPeriod.to} ${isPreviousPeriod.year}`,
        "MMM dd yyyy",
        new Date()
    );
    const { data, isLoading, isError } = GetRecordMeterList(
        isCharge.id,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        TablePage
    );

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;
            if (isCharge.id !== "") {
                let CloneArray = data?.data.data.map((item: isTableItemObj) => {
                    let select = false;
                    if (isSelectedIDs.includes(item.id)) {
                        select = true;
                    }

                    return {
                        id: item.id,
                        select: select,
                        property: {
                            id: item.property.id,
                            unit_code: item.property.unit_code,
                        },
                        previous_reading: item.previous_reading,
                        current_reading: item.current_reading,
                        consumption: item.consumption,
                        moving_average_consumption:
                            item.moving_average_consumption,
                        status: item.status,
                        percentage: item.percentage,
                    };
                });
                if (
                    CloneArray.length === isSelectedIDs.length &&
                    CloneArray.length !== 0
                ) {
                    selectAll = true;
                }

                setTableItem({
                    itemArray: CloneArray,
                    selectAll: selectAll,
                });
            }
        }
    }, [data]);

    const selectAll = () => {
        if (isTableItem.selectAll) {
            // remove
            setSelectedIDs([]);
        } else {
            // add
            const ReceiptBookIDs = isTableItem.itemArray.map((item) => {
                return Number(item.id);
            });
            setSelectedIDs(ReceiptBookIDs);
        }
        const newItems = isTableItem?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isTableItem.selectAll,
            };
        });
        setTableItem({
            itemArray: newItems,
            selectAll: !isTableItem.selectAll,
        });
    };
    return (
        <>
            {toggleReading && (
                <Readingform
                    formType="create"
                    toggle={setToggleReading}
                    externalDefaultValue={{
                        charge: {
                            charge: "",
                            rate: 0,
                            id: 0,
                        },
                        period: {
                            from: "",
                            to: "",
                        },
                        properties: [],
                    }}
                />
            )}
            {router.query.modify !== undefined &&
                router.query.modify !== "" && <Modify />}
            <section className={`${style.container} 1280px:flex-wrap`}>
                <div className=" flex items-center 1280px:w-2/4 640px:w-full 1280px:mb-5">
                    <p className="labelField">READING:</p>
                    <DynamicPopOver
                        className="w-full"
                        toRef={
                            <>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onClick={() =>
                                        setReading({
                                            ...isReading,
                                            toggle: true,
                                        })
                                    }
                                    className="field"
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
                    <p className=" labelField">
                        READING SERIAL:{" "}
                        <span className=" text-[#2e4364] font-NHU-medium">
                            0001011
                        </span>
                    </p>
                </aside>
                <ul className={`${style.navigation}`}>
                    <li className={style.importExportPrint}>
                        <Tippy theme="ThemeRed" content="Export">
                            <div className={style.icon}>
                                <Image
                                    src="/Images/Export.png"
                                    layout="fill"
                                    alt="Export"
                                />
                            </div>
                        </Tippy>

                        <input type="file" id="import" className="hidden" />
                    </li>

                    <li className={`${style.new} mr-0`}>
                        <div onClick={() => setToggleReading(!toggleReading)}>
                            NEW READING
                        </div>
                    </li>
                    <li className={style.importExportPrint}>
                        <Link
                            href={`/finance/customer-facility/billing/record-meter-reading?modify=${1}`}
                        >
                            <a>
                                <PencilButton
                                    FunctionOnClick={() => {}}
                                    title="Modify"
                                />
                            </a>
                        </Link>
                    </li>
                </ul>
            </section>
            <div>
                <ul className=" flex mb-5 flex-wrap">
                    <li className="mr-5 820px:mb-5 flex items-center mb-5">
                        <p className=" labelField">CHARGE</p>
                        <DropDownCharge
                            UpdateStateHandler={(key, e) => {
                                setCharge({
                                    charge: e.target.innerHTML,
                                    id: e.target.getAttribute("data-id"),
                                    rate: e.target.getAttribute("data-rate"),
                                });
                            }}
                            filter={true}
                            itemDetail={isCharge}
                        />
                    </li>
                    <li className="mr-5 820px:mb-5 flex items-center mb-5">
                        <p className=" labelField">RATE</p>
                        <TextNumberDisplay
                            className="min-w-[150px] text-end field disabled"
                            suffix="%"
                            value={Number(isCharge.rate)}
                        />
                    </li>
                    <li className=" 820px:mb-5 flex items-center mb-5">
                        <PreviousPeriod
                            value={isPreviousPeriod}
                            setValue={setPreviousPeriod}
                        />
                    </li>
                </ul>
                <div className="table_container">
                    <table className="table_list journal">
                        <thead>
                            <tr>
                                <th className="checkbox">
                                    <div className="item">
                                        <input
                                            type="checkbox"
                                            checked={isTableItem.selectAll}
                                            onChange={selectAll}
                                        />
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
                            {isTableItem?.itemArray.map(
                                (item: any, index: number) => (
                                    <List
                                        key={index}
                                        itemDetail={item}
                                        isTableItem={isTableItem}
                                        setTableItem={setTableItem}
                                        setSelectedIDs={setSelectedIDs}
                                        isSelectedIDs={isSelectedIDs}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                    {isLoading && (
                        <div className="w-full flex justify-center items-center">
                            <aside className="text-center flex justify-center py-5">
                                <BarLoader
                                    color={"#8f384d"}
                                    height="10px"
                                    width="200px"
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </aside>
                        </div>
                    )}
                    {isError && <TableErrorMessage />}
                </div>
                <Pagination
                    setTablePage={setTablePage}
                    TablePage={TablePage}
                    PageNumber={data?.data.last_page}
                    CurrentPage={data?.data.current_page}
                />
                <div className="w-full flex justify-end mt-5">
                    <button className="buttonRed">APPLY</button>
                </div>
            </div>
        </>
    );
}

type ListProps = {
    itemDetail: isTableItemObj;
    isTableItem: isTable;
    setTableItem: Function;
    isSelectedIDs: number[];
    setSelectedIDs: Function;
};

const List = ({
    itemDetail,
    isTableItem,
    setTableItem,
    isSelectedIDs,
    setSelectedIDs,
}: ListProps) => {
    const updateValue = (e: any) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (item.select) {
                    // remove
                    const filterSelected = isSelectedIDs.filter(
                        (itemFilt) => Number(item.id) !== itemFilt
                    );
                    setSelectedIDs(filterSelected);
                } else {
                    // add
                    setSelectedIDs([...isSelectedIDs, item.id]);
                }
                return {
                    ...item,
                    select: !item.select,
                };
            }
            return item;
        });
        setTableItem({
            itemArray: newItems,
            selectAll: false,
        });
    };
    return (
        <tr>
            <td className="checkbox">
                <div className="item">
                    <input
                        type="checkbox"
                        onChange={(e: any) => updateValue(e)}
                        checked={itemDetail.select}
                    />
                </div>
            </td>

            <td>{itemDetail.property.unit_code}</td>

            <td>
                <TextNumberDisplay
                    className="withPeso w-full text-end"
                    value={itemDetail.previous_reading}
                />
            </td>

            <td>
                <TextNumberDisplay
                    className="withPeso w-full text-end"
                    value={itemDetail.current_reading}
                />
            </td>

            <td>
                <TextNumberDisplay
                    className="withPeso w-full text-end"
                    value={itemDetail.consumption}
                />
            </td>

            <td>
                <div className="item">
                    <h2 className="flex items-center">
                        <TextNumberDisplay
                            className=""
                            value={itemDetail.moving_average_consumption}
                        />
                        {itemDetail.percentage <= 0 ? (
                            <span className="flex items-center ml-3 text-ThemeRed">
                                <IoMdArrowDropup />
                                {itemDetail.percentage}%
                            </span>
                        ) : (
                            <span className="flex items-center ml-3 text-Green">
                                <IoMdArrowDropdown />
                                {itemDetail.percentage}%
                            </span>
                        )}
                    </h2>
                </div>
            </td>
            <td>
                {itemDetail.status === "Posted" && (
                    <div className="item w-[100px]">
                        <div className="finance_status">
                            <div className="status Posted">
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
                )}
            </td>
        </tr>
    );
};
