import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { isError, useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../../util/api";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";

type Props = {
    name: string;
    selectHandler: (e: any) => void;
    value: string | number;
    selectedIndex?: string[];
    rowID: string | number;
};

export default function DropdownIndex({
    name,
    selectHandler,
    value,
    rowID,
    selectedIndex,
}: Props) {
    const [toggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState<string | number>("");
    useEffect(() => {
        setTempSearch(value);
        console.log("dropdown");
        console.log(selectedIndex);
    }, [value]);

    return (
        <>
            <DynamicPopOver
                samewidth={true}
                className="inline"
                toRef={
                    <>
                        <input
                            type="text"
                            className="field max-w-[150px]"
                            value={tempSearch}
                            onChange={(e) => setTempSearch(e.target.value)}
                            onClick={() => setToggle(true)}
                        />
                    </>
                }
                toPop={
                    <>
                        {toggle && (
                            <ListItem
                                rowID={rowID}
                                name={name}
                                tempSearch={tempSearch}
                                setTempSearch={setTempSearch}
                                value={value}
                                selectHandler={selectHandler}
                                setToggle={setToggle}
                                selectedIndex={selectedIndex}
                            />
                        )}
                    </>
                }
            />
        </>
    );
}

type ListItem = {
    name: string;
    tempSearch: string | number;
    setTempSearch: Function;
    value: string | number;
    selectHandler: (e: any) => void;
    setToggle: Function;
    rowID: string | number;
    selectedIndex?: string[];
};

type Index = {
    index: number | string;
    id: number | string;
    amount: number | string;
};

const ListItem = ({
    name,
    tempSearch,
    selectHandler,
    value,
    setTempSearch,
    setToggle,
    rowID,
    selectedIndex,
}: ListItem) => {
    const { isLoading, data, isError } = useQuery(
        ["DD-BC", name, tempSearch, "unmatched"],
        () => {
            return api.get(
                `/finance/customer-facility/bank-credit?status=unmatched&keywords=${tempSearch}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const [isIndex, setIndex] = useState<Index[]>([]);

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: any) => {
                return {
                    index: item.index,
                    id: item.id,
                    amount: item.credit,
                };
            });
            const filterIndex = CloneArray.filter((item: any) => {
                return !selectedIndex?.includes(item.index);
            });
            setIndex(filterIndex);
        }
    }, [data?.status, tempSearch]);

    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal?.current?.contains(e.target)) {
                setToggle(false);
                setTempSearch(value);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <ul ref={modal} className="dropdown-list w-full">
            {isIndex.map((item, index) => (
                <li
                    key={index}
                    data-index={item.index}
                    data-indexid={item.id}
                    data-indexamount={item.amount}
                    data-rowid={rowID}
                    onClick={(e) => {
                        selectHandler(e);
                        setToggle(false);
                    }}
                >
                    {item.index}
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

            {isError && <li>Something is wrong!</li>}
            {isIndex.length <= 0 && !isLoading && (
                <li>No index unmatched found!</li>
            )}
        </ul>
    );
};
