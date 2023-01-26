import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../util/api";
import DynamicPopOver from "../../DynamicPopOver";
import { isTableItemObj } from "./SubTable";

type DropdownItem = {
    tempSearch: string;
    setTempSearch: Function;
    UpdateStateHandler: (key: string, e: any) => void;
    itemDetail: isTableItemObj;
};

export default function DropDownCharge({
    tempSearch,
    setTempSearch,
    UpdateStateHandler,
    itemDetail,
}: DropdownItem) {
    const [isToggle, setToggle] = useState(false);

    return (
        <>
            <DynamicPopOver
                toRef={
                    <input
                        type="text"
                        className=" w-full p-1 min-w-[200px] 820px:h-8 rounded-md outline-none shadow-md text-[#757575]"
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
                            <List
                                setToggle={setToggle}
                                tempSearch={tempSearch}
                                setTempSearch={setTempSearch}
                                UpdateStateHandler={UpdateStateHandler}
                                itemDetail={itemDetail}
                            />
                        )}
                    </>
                }
            />
        </>
    );
}

type List = {
    setToggle: Function;
    setTempSearch: Function;
    UpdateStateHandler: (key: string, e: any) => void;
    itemDetail: isTableItemObj;

    tempSearch: string;
};

const List = ({
    setToggle,
    tempSearch,
    setTempSearch,
    UpdateStateHandler,
    itemDetail,
}: List) => {
    const { data, isLoading, isError } = useQuery(
        ["charge-list", tempSearch],
        () => {
            return api.get(
                `/finance/customer-facility/charges?keywords=${tempSearch}`,
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
                setTempSearch(itemDetail.charge);
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
        <ul
            className="min-w-[200px] w-full max-h-[200px] overflow-y-auto"
            ref={PopOver}
        >
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    className={listStyle}
                    data-id={item.id}
                    onClick={(e) => {
                        UpdateStateHandler("charge", e);
                        setTempSearch(item.name);
                        setToggle(false);
                    }}
                >
                    {item.name}
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
                        <h1>Customer name cannot be found!</h1>
                    </li>
                ))}
        </ul>
    );
};
