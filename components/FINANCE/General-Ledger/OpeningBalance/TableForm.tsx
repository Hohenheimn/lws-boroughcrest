import React, { useEffect, useRef, useState } from "react";
import style from "../../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../../util/api";
import { BarLoader } from "react-spinners";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";

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

export default function TableForm() {
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
        setTotalDebit(0);
        setTotalCredit(0);
        isTableItem.map((item: isTableItemObj) => {
            setTotalDebit((temp) => Number(temp) + Number(item.debit));
            setTotalCredit((temp) => Number(temp) + Number(item.credit));
        });
    }, [isTableItem]);

    return (
        <>
            <div className="w-full overflow-auto">
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
                        {isTableItem.map((item: isTableItemObj, index) => (
                            <List
                                itemDetail={item}
                                setTableItem={setTableItem}
                                isTableItem={isTableItem}
                                key={index}
                            />
                        ))}
                    </tbody>
                </table>
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

            <div className="flex justify-end py-5 mt-20">
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
    const [isToggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState("");

    const AddJournal = () => {
        const random = Math.random();
        setTableItem((temp: any) => [
            ...temp,
            {
                id: random,
                account_id: "",
                chart_code: "",
                category: "",
                account_name: "",
                debit: 0,
                credit: 0,
            },
        ]);
    };

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
                if (key === "accountName") {
                    return {
                        ...item,
                        category: event.target.getAttribute("data-category"),
                        chart_code: event.target.getAttribute("data-chartcode"),
                        account_name: event.target.innerHTML,
                        account_id: event.target.getAttribute("data-id"),
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
                <DynamicPopOver
                    className="w-full"
                    toRef={
                        <input
                            type="text"
                            className=" w-full p-1 h-10 min-w-[200px] 820px:h-8 rounded-md outline-none shadow-md text-[#757575]"
                            onClick={() => setToggle(true)}
                            value={tempSearch}
                            onChange={(e) => {
                                setTempSearch(e.target.value);
                            }}
                        />
                    }
                    toPop={
                        <>
                            {isToggle && (
                                <DropdownItem
                                    setToggle={setToggle}
                                    tempSearch={tempSearch}
                                    UpdateStateHandler={UpdateStateHandler}
                                    setTempSearch={setTempSearch}
                                    itemDetail={itemDetail}
                                />
                            )}
                        </>
                    }
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemDetail.debit}
                    onChange={(e) => UpdateStateHandler("debit", e)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            AddJournal();
                        }
                    }}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={itemDetail.credit}
                    onChange={(e) => UpdateStateHandler("credit", e)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            AddJournal();
                        }
                    }}
                />
            </td>
        </tr>
    );
};

type DropdownItem = {
    setToggle: Function;
    tempSearch: string;
    setTempSearch: Function;
    UpdateStateHandler: (key: string, e: any) => void;
    itemDetail: isTableItemObj;
};

const DropdownItem = ({
    setToggle,
    tempSearch,
    setTempSearch,
    UpdateStateHandler,
    itemDetail,
}: DropdownItem) => {
    const { data, isLoading, isError } = useQuery(
        ["COA-list", tempSearch],
        () => {
            return api.get(
                `/finance/general-ledger/chart-of-accounts?keywords=${tempSearch}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const PopOver = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!PopOver.current.contains(e.target)) {
                setToggle(false);
                setTempSearch(itemDetail.account_name);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    const listStyle =
        "px-4 py-2 1550px:px-2 1550px:py-1 border-b border-ThemeRed hover:bg-ThemeRed hover:text-white transition-all duration-75";

    return (
        <>
            <ul
                className="min-w-[200px] w-full max-h-[200px] overflow-y-auto"
                ref={PopOver}
            >
                {data?.data.map((item: any, index: number) => (
                    <li
                        key={index}
                        className={listStyle}
                        data-id={item.id}
                        data-chartcode={item.chart_code}
                        data-category={item.category}
                        onClick={(e) => {
                            UpdateStateHandler("accountName", e);
                            setTempSearch(item.account_name);
                            setToggle(false);
                        }}
                    >
                        {item.account_name}
                    </li>
                ))}
                {isLoading && (
                    <li className={listStyle}>
                        <BarLoader
                            color={"#8f384d"}
                            height="5px"
                            width="100px"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </li>
                )}
                {isError ||
                    (data?.data.length <= 0 && (
                        <li className={listStyle}>
                            <h1>Account name cannot be found!</h1>
                        </li>
                    ))}
            </ul>
        </>
    );
};
