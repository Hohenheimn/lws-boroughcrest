import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../DynamicPopOver";

type DropdownItem = {
    UpdateStateHandler: (key: string, e: any) => void;
    itemDetail: any;
};

export default function DropDownCharge({
    UpdateStateHandler,
    itemDetail,
}: DropdownItem) {
    const [isToggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState(itemDetail.charge);
    useEffect(() => {
        setTempSearch(itemDetail.charge);
    }, [itemDetail.charge]);
    return (
        <>
            <DynamicPopOver
                className="w-full"
                samewidth={true}
                toRef={
                    <input
                        type="text"
                        className="field w-full"
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
    itemDetail: any;
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
        ["charge-list-dd", tempSearch],
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
    return (
        <ul className="dropdown-list" ref={PopOver}>
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    data-id={item.id}
                    data-description={item.description}
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
                        <h1>Charge name cannot be found!</h1>
                    </li>
                ))}
        </ul>
    );
};
