import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";

type DropdownItem = {
    UpdateStateHandler: (key: string, e: any) => void;
    itemDetail: any;
    className?: string;
    forCrudTableDD?: boolean;
    displayID?: boolean;
    filter?: boolean;
    forTable?: boolean;
    type?: string;
};

export default function DropDownCharge({
    UpdateStateHandler,
    itemDetail,
    className,
    forCrudTableDD,
    displayID,
    filter,
    forTable,
    type,
}: DropdownItem) {
    const [isToggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState(itemDetail?.charge);
    useEffect(() => {
        displayID !== undefined && displayID !== false
            ? setTempSearch(itemDetail?.charge_id)
            : setTempSearch(itemDetail?.charge);
    }, [itemDetail?.charge]);
    return (
        <>
            <DynamicPopOver
                rightPosition={true}
                className={"w-full"}
                forTable={forTable}
                samewidth={true}
                toRef={
                    <input
                        type="text"
                        className={
                            `${!forCrudTableDD && "field"} w-full ` + className
                        }
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
                                filter={filter}
                                type={type}
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
    itemDetail: any;
    tempSearch: string;
    filter?: boolean;
    type?: string;
};

const List = ({
    setToggle,
    tempSearch,
    setTempSearch,
    UpdateStateHandler,
    itemDetail,
    filter,
    type,
}: List) => {
    // Reset show item when open
    const [showItemAll, setshowItemAll] = useState(true);
    const keywordSearch = showItemAll ? "" : tempSearch;
    useEffect(() => {
        if (itemDetail.charge !== tempSearch) {
            setshowItemAll(false);
        }
    }, [tempSearch]);
    // end
    const { data, isLoading, isError } = useQuery(
        ["charge-list-dd", keywordSearch, filter, type],
        () => {
            return api.get(
                `/finance/customer-facility/charges?keywords=${keywordSearch}${
                    filter ? "&meter_reading=1" : ""
                }${type !== undefined ? `&type=${type}` : ""}`,
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
                setTempSearch(itemDetail?.charge);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <ul className="dropdown-list" ref={PopOver}>
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    data-id={item?.id}
                    data-description={item?.description}
                    data-uom={item?.uom?.name}
                    data-vat={item?.vat_percent}
                    data-rate={item?.base_rate}
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
                <li>
                    <div>
                        <BarLoader
                            color={"#8f384d"}
                            height="5px"
                            width="100px"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </li>
            )}
            {isError ||
                (data?.data.length <= 0 && (
                    <li>
                        <h1 className="text-center">No Charge found!</h1>
                    </li>
                ))}
        </ul>
    );
};
