import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";

type DropdownItem = {
    className: string;
    value: string;
    setValue: Function;
};

export default function DropdownFieldCOA({
    className,
    value,
    setValue,
}: DropdownItem) {
    const [isToggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState(value);
    useEffect(() => {
        setTempSearch(value);
    }, [value]);
    return (
        <>
            <DynamicPopOver
                className={"w-full "}
                samewidth={true}
                toRef={
                    <input
                        type="text"
                        className={"field w-full " + className}
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
                                setValue={setValue}
                                value={value}
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
    tempSearch: string;
    value: string;
    setValue: Function;
};

const List = ({
    setToggle,
    tempSearch,
    setTempSearch,
    value,
    setValue,
}: List) => {
    const { data, isLoading, isError } = useQuery(
        ["coa-list-dd", tempSearch],
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
                setTempSearch(value);
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
                    onClick={(e) => {
                        setValue({
                            id: item.id,
                            value: item.account_name,
                        });
                        setTempSearch(item.name);
                        setToggle(false);
                    }}
                >
                    {item.account_name}
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
                        <h1>Chart of account cannot be found!</h1>
                    </li>
                ))}
        </ul>
    );
};
