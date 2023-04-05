import React, { useState, useContext, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import AppContext from "../../../../Context/AppContext";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import style from "../../../../../styles/SearchFilter.module.scss";
import { BarLoader, ScaleLoader } from "react-spinners";
import ReadingCrud from "./ReadingCrud";
import Readingform from "./Readingform";
import PreviousPeriod from "./PreviousPeriod";
import { PencilButton } from "../../../../Reusable/Icons";
import { TextNumberDisplay } from "../../../../Reusable/NumberFormat";
import Pagination from "../../../../Reusable/Pagination";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import { format, isValid, parse } from "date-fns";
import { ApplyRecordMeter, GetRecordMeterList } from "./Query";
import Modify from "./Modify";
import { useQueryClient } from "react-query";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";

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
    const queryClient = useQueryClient();
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
        reading_id: "",
        reading_name: "",
        reading_serial: "",
        charge_name: "",
        charge_id: "",
        base_rate: 0,
    });
    const [periodReadingID, setPeriodReadingID] = useState(0);

    const [toggleReading, setToggleReading] = useState(false);

    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });
    const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

    useEffect(() => {
        if (
            isSelectedIDs.length === isTableItem.itemArray.length &&
            isTableItem.itemArray.length > 0
        ) {
            setTableItem({
                ...isTableItem,
                selectAll: true,
            });
        } else {
            setTableItem({
                ...isTableItem,
                selectAll: false,
            });
        }
    }, [isSelectedIDs]);

    const dateFrom = parse(
        `${isPreviousPeriod.from}`,
        "MMM dd yyyy",
        new Date()
    );
    const dateTo = parse(`${isPreviousPeriod.to}`, "MMM dd yyyy", new Date());

    const { data, isLoading, isError } = GetRecordMeterList(
        isReading.reading_id,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        TablePage
    );

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;
            if (
                isReading.charge_id !== "" &&
                isPreviousPeriod.from !== "" &&
                isPreviousPeriod.to !== ""
            ) {
                let CloneArray = data?.data?.records?.data.map(
                    (item: isTableItemObj) => {
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
                    }
                );
                if (
                    CloneArray?.length === isSelectedIDs.length &&
                    CloneArray?.length !== 0
                ) {
                    selectAll = true;
                }
                setTableItem({
                    itemArray: CloneArray,
                    selectAll: selectAll,
                });
                setReading({
                    ...isReading,
                    reading_serial: data?.data?.reading?.reading_serial,
                });
                setPeriodReadingID(data?.data?.reading?.id);
            }
        }
    }, [data, isPreviousPeriod]);

    const selectAll = () => {
        if (isTableItem.selectAll) {
            // get ids need to remove
            const toRemove = isTableItem.itemArray.map((mapItem) => {
                return mapItem.id;
            });
            // remove those ids from selectedIDS
            const remove = isSelectedIDs.filter((filter) => {
                return !toRemove.includes(filter);
            });
            setSelectedIDs(remove);
        } else {
            // get those ids that not in the selectedIDS
            const cloneToUpdateValue = isTableItem.itemArray.filter(
                (item) => !isSelectedIDs.includes(item.id)
            );
            // convert to ids array
            const newSelectAll = cloneToUpdateValue.map((item) => {
                return item.id;
            });
            // add selectedids
            setSelectedIDs([...newSelectAll, ...isSelectedIDs]);
        }
        const newItems = isTableItem?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isTableItem.selectAll,
            };
        });
        setTableItem({
            ...isTableItem,
            itemArray: newItems,
            selectAll: !isTableItem.selectAll,
        });
    };

    const ToggleNewReading = () => {
        if (isReading.reading_id !== "") {
            setToggleReading(true);
        } else {
            setPrompt({
                message: "Select a reading!",
                type: "draft",
                toggle: true,
            });
        }
    };

    const ToggleModify = () => {
        if (
            isPreviousPeriod.from !== "" &&
            isPreviousPeriod.to !== "" &&
            periodReadingID !== 0
        ) {
            router.push(
                `/finance/customer-facility/billing/record-meter-reading?modify=${periodReadingID}`
            );
        } else {
            setPrompt({
                message: "Select a Previous Reading and Reading!",
                type: "draft",
                toggle: true,
            });
        }
    };

    const onSuccess = () => {
        setPreviousPeriod({
            from: "",
            to: "",
            year: "",
        });
        setReading({
            reading_id: "",
            reading_name: "",
            reading_serial: "",
            charge_name: "",
            charge_id: "",
            base_rate: 0,
        });
        queryClient.invalidateQueries(["record-meter-list"]);
        setPrompt({
            message: `Record meter reading successfully applied!`,
            type: "success",
            toggle: true,
        });
        router.push("/finance/customer-facility/billing/invoice-list");
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: applyLoading, mutate: applyMutate } = ApplyRecordMeter(
        onSuccess,
        onError
    );

    const ApplyHandler = () => {
        const Payload = {
            reading_ids: isSelectedIDs,
        };
        if (isSelectedIDs.length <= 0) {
            setPrompt({
                message: "Please select a reading!",
                type: "draft",
                toggle: true,
            });
            return;
        }
        applyMutate(Payload);
    };
    return (
        <>
            {toggleReading && (
                <Readingform
                    formType="create"
                    toggle={setToggleReading}
                    externalDefaultValue={{
                        reading_id: Number(isReading.reading_id),
                        charge: {
                            charge: isReading.charge_name,
                            rate: Number(isReading.base_rate),
                            id: isReading.charge_id,
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

                    <ReadingCrud
                        value={isReading.reading_name}
                        setvalue={setReading}
                    />
                </div>
                <aside className="1280px:w-2/4 640px:w-full">
                    <p className=" labelField">
                        READING SERIAL:
                        <span className=" text-[#2e4364] font-NHU-medium">
                            {isReading.reading_serial}
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
                        <div onClick={ToggleNewReading}>NEW READING</div>
                    </li>
                    <li className={style.importExportPrint}>
                        <PencilButton
                            FunctionOnClick={ToggleModify}
                            title="Modify"
                        />
                    </li>
                </ul>
            </section>
            <div>
                <ul className=" flex mb-5 flex-wrap">
                    <li className="mr-5 820px:mb-5 flex items-center mb-5">
                        <p className=" labelField">CHARGE</p>
                        <input
                            type="text"
                            readOnly
                            value={isReading.charge_name}
                            className="field disabled min-w-[150px]"
                        />
                    </li>
                    <li className="mr-5 820px:mb-5 flex items-center mb-5">
                        <p className=" labelField">RATE</p>
                        <TextNumberDisplay
                            className="min-w-[150px] text-end field disabled"
                            suffix="%"
                            value={Number(isReading.base_rate)}
                        />
                    </li>
                    <li className=" 820px:mb-5 flex items-center mb-5">
                        <PreviousPeriod
                            value={isPreviousPeriod}
                            setValue={setPreviousPeriod}
                            year={isPreviousPeriod.year}
                            reading_id={Number(isReading.reading_id)}
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
                            {isTableItem?.itemArray?.map(
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
                    PageNumber={data?.data?.records?.last_page}
                    CurrentPage={data?.data?.records?.current_page}
                />
                <div className="w-full flex justify-end mt-5">
                    <button className="buttonRed" onClick={ApplyHandler}>
                        {applyLoading ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "APPLY"
                        )}
                    </button>
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
            <td className="flex">
                {itemDetail.status === "Posted" && (
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
                )}
                {itemDetail.status === "In Process" && (
                    <div className="finance_status">
                        <div className="status PostedInProcess ">
                            <div className=" ">
                                <Image
                                    src="/Images/f_inprocess_sent.png"
                                    width={25}
                                    height={25}
                                    alt="Draft"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
};
