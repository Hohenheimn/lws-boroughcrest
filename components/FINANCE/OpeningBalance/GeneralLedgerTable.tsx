import React, { useEffect, useRef, useState } from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import DropdownSearch from "../../DropdownSearch";
import DynamicPopOver from "../../DynamicPopOver";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";
import { BarLoader } from "react-spinners";
import { ChartofAccountList } from "../../../types/COAList";

type isTableItem = {
    id: number | string;
    account_id: number | string;
    chart_code: string;
    category: string;
    account_name: string;
    debit: number;
    credit: number;
}[];

type isTableItemObj = {
    id: number | string;
    account_id: number | string;
    chart_code: string;
    category: string;
    account_name: string;
    debit: number;
    credit: number;
};

export default function GeneralLedgerTable() {
    const { data, isLoading, isError } = useQuery(["COA-list-ob"], () => {
        return api.get(`/finance/general-ledger/chart-of-accounts`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
    const [isTableItem, setTableItem] = useState<isTableItem>([
        {
            id: 0,
            account_id: "",
            chart_code: "",
            category: "",
            account_name: "",
            debit: 0,
            credit: 0,
        },
    ]);

    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: any, index: number) => {
                return {
                    id: index,
                    account_id: item.id,
                    chart_code: item.chart_code,
                    category: item.category,
                    account_name: item.account_name,
                    debit: 0,
                    credit: 0,
                };
            });
            setTableItem(CloneArray);
        }
    }, [data]);

    useEffect(() => {
        if (data?.status === 200) {
            setTotalDebit(0);
            setTotalCredit(0);
            isTableItem.map((item: isTableItemObj) => {
                setTotalDebit((temp) => Number(temp) + Number(item.debit));
                setTotalCredit((temp) => Number(temp) + Number(item.credit));
            });
        }
    }, [isTableItem]);

    return (
        <>
            <div className="table_container">
                <table className={style.crudTable}>
                    <thead>
                        <tr>
                            <th>CHART CODE</th>
                            <th>CATEGORY</th>
                            <th>ACCOUNT NAME</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && !isError && (
                            <>
                                {isTableItem.map(
                                    (item: isTableItemObj, index) => (
                                        <List
                                            itemDetail={item}
                                            setTableItem={setTableItem}
                                            isTableItem={isTableItem}
                                            key={index}
                                        />
                                    )
                                )}
                            </>
                        )}
                    </tbody>
                </table>
                {isLoading && (
                    <div className="w-full h-full flex justify-center items-center">
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
            </div>
            <div className="mt-10 border-b border-ThemeRed"></div>
            <div className="flex flex-wrap justify-end py-5 480px:justify-start">
                <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                    SUBTOTAL
                </h1>
                <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] mr-5">
                    <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                        <Image
                            src="/Images/peso.png"
                            height={13}
                            width={10}
                            alt=""
                        />
                    </aside>
                    <p className=" text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]">
                        {totalDebit}-
                    </p>
                </div>
                <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] ">
                    <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                        <Image
                            src="/Images/peso.png"
                            height={13}
                            width={10}
                            alt=""
                        />
                    </aside>
                    <p className=" text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]">
                        {totalCredit}-
                    </p>
                </div>
            </div>

            <div className="flex justify-end py-5 mt-5">
                <button className="button_cancel">Cancel</button>
                <button
                    className="buttonRed"
                    onClick={() => console.log(isTableItem)}
                >
                    SAVE
                </button>
            </div>
        </>
    );
}

type List = {
    itemDetail: isTableItemObj;
    setTableItem: Function;
    isTableItem: isTableItem;
};

const List = ({ itemDetail, setTableItem, isTableItem }: List) => {
    const UpdateStateHandler = (key: string, event: any) => {
        const newItems = isTableItem.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        debit: event.target.value,
                        credit: 0,
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: event.target.value,
                        debit: 0,
                    };
                }
            }
            return item;
        });
        setTableItem(newItems);
    };

    return (
        <tr>
            <td>
                <h2 className="w-[70px]">{itemDetail.chart_code}</h2>
            </td>
            <td>
                <h2 className="min-w-[250px] w-full">{itemDetail.category}</h2>
            </td>
            <td>
                <h2 className="min-w-[250px] w-full">
                    {itemDetail.account_name}
                </h2>
            </td>
            <td>
                <input
                    type="number"
                    value={itemDetail.debit}
                    onChange={(e) => UpdateStateHandler("debit", e)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemDetail.credit}
                    onChange={(e) => UpdateStateHandler("credit", e)}
                />
            </td>
        </tr>
    );
};
