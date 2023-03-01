import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { isError, useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../../util/api";
import DynamicPopOver from "../../../DynamicPopOver";

type Props = {
    endpoint: string;
    name: string;
    selectHandler: (value: string) => void;
    value: string | number;
    keyType: string;
};

export default function DropdownReceipt_Reference({
    endpoint,
    name,
    selectHandler,
    value,
    keyType,
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
                            className="field"
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
                                keyType={keyType}
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
    keyType: string;
};

const ListItem = ({
    endpoint,
    name,
    tempSearch,
    selectHandler,
    value,
    setTempSearch,
    setToggle,
    keyType,
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
            {keyType === "receipt" ? (
                <>
                    <li
                        onClick={() => {
                            selectHandler("0000000303");
                            setToggle(false);
                        }}
                    >
                        0000000303
                    </li>
                    <li
                        onClick={() => {
                            selectHandler("0000000333");
                            setToggle(false);
                        }}
                    >
                        0000000333
                    </li>
                </>
            ) : (
                <>
                    <li
                        onClick={() => {
                            selectHandler("RF54897321");
                            setToggle(false);
                        }}
                    >
                        RF54897321
                    </li>
                    <li
                        onClick={() => {
                            selectHandler("RF48489754");
                            setToggle(false);
                        }}
                    >
                        RF48489754
                    </li>
                </>
            )}
            {/* {data?.data.map((item: any, index: number) => (
                <li key={index} onClick={selectHandler} data-id={item.id}>
                    {
                        key === 'receipt' ? item.receipt_no : item.reference_no
                    }
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
