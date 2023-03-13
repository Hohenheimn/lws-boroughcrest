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
    selectedIndex: number[];
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
    selectedIndex: number[];
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
        ["DC-DD", name, tempSearch],
        () => {
            return api.get(
                `/finance/customer-facility/bank-credit?status=unmatched?keywords=${tempSearch}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const [isIndex, setIndex] = useState([
        {
            index: "0001",
            id: 1,
            amount: 500,
        },
        {
            index: "0002",
            id: 2,
            amount: 500,
        },
        {
            index: "0003",
            id: 3,
            amount: 300,
        },
    ]);

    useEffect(() => {
        const filterIndex = isIndex.filter((item) => {
            return !selectedIndex.includes(item.id);
        });
        setIndex(filterIndex);
    }, []);

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

            {/* {data?.data.map((item: any, index: number) => (
                <li key={index} onClick={selectHandler} data-id={item.id}>
                    {item.name}
                </li>
            ))} */}

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

            {isError && <li>Index cannot be found!</li>}
        </ul>
    );
};
