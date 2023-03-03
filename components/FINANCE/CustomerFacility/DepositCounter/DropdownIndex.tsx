import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { isError, useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../../util/api";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";

type Props = {
    endpoint: string;
    name: string;
    selectHandler: (value: string) => void;
    value: string | number;
};

export default function DropdownIndex({
    endpoint,
    name,
    selectHandler,
    value,
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
                                endpoint={endpoint}
                                name={name}
                                tempSearch={tempSearch}
                                setTempSearch={setTempSearch}
                                value={value}
                                selectHandler={selectHandler}
                                setToggle={setToggle}
                            />
                        )}
                    </>
                }
            />
        </>
    );
}

type ListItem = {
    endpoint: string;
    name: string;
    tempSearch: string | number;
    setTempSearch: Function;
    value: string | number;
    selectHandler: (value: string) => void;
    setToggle: Function;
};

const ListItem = ({
    endpoint,
    name,
    tempSearch,
    selectHandler,
    value,
    setTempSearch,
    setToggle,
}: ListItem) => {
    const { isLoading, data, isError } = useQuery(
        ["DC-DD", name, tempSearch],
        () => {
            return api.get(`${endpoint}?keywords=${tempSearch}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );

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
            <li
                onClick={() => {
                    selectHandler("0001");
                    setToggle(false);
                }}
            >
                0001
            </li>
            <li
                onClick={() => {
                    selectHandler("0002");
                    setToggle(false);
                }}
            >
                0002
            </li>
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

            {isError && <li>{name} cannot be found!</li>}
            {data?.data.length <= 0 && <li>{name} cannot be found!</li>}
        </ul>
    );
};
