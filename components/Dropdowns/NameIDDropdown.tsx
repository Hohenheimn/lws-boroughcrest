import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";

type DropdownItem = {
    value: string;
    setValue: Function;
    className?: string;
    width: string;
    placeholder: string;
    endpoint: string;
    onClickFunction?: () => void;
};

export default function NameIDDropdown({
    value,
    setValue,
    className,
    width,
    placeholder,
    endpoint,
    onClickFunction,
}: DropdownItem) {
    const [isToggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState(value);
    useEffect(() => {
        setTempSearch(value);
    }, [value]);
    return (
        <>
            <DynamicPopOver
                className={"w-full " + width}
                samewidth={true}
                toRef={
                    <input
                        type="text"
                        className={`field w-full ` + className}
                        placeholder={placeholder}
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
                                value={value}
                                endpoint={endpoint}
                                setValue={setValue}
                                name={placeholder}
                                onClickFunction={onClickFunction}
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
    value: string;
    setValue: Function;
    tempSearch: string;
    endpoint: string;
    name: string;
    onClickFunction?: () => void;
};

const List = ({
    setToggle,
    tempSearch,
    setTempSearch,
    value,
    setValue,
    endpoint,
    name,
    onClickFunction,
}: List) => {
    const { data, isLoading, isError } = useQuery(
        ["get-dropdown", name, tempSearch],
        () => {
            return api.get(`${endpoint}?keywords=${tempSearch}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
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
                            value: item.name,
                        });
                        setTempSearch(item.name);
                        setToggle(false);
                        onClickFunction !== undefined && onClickFunction();
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
                        <h1>{name} cannot be found!</h1>
                    </li>
                ))}
        </ul>
    );
};
