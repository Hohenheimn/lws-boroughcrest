import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../../util/api";
import { IDstate } from "./Type";

type Props = {
    endpoint: string;
    name: string;
    searchValue: string;
    setFunction: Function;
    fieldObject: IDstate;
};

export default function Dropdown({
    endpoint,
    name,
    searchValue,
    setFunction,
    fieldObject,
}: Props) {
    const modal = useRef<any>();

    const { isLoading, data, isError } = useQuery([name, searchValue], () => {
        return api.get(`${endpoint}?keywords=${searchValue}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal?.current?.contains(e.target)) {
                setFunction({
                    ...fieldObject,
                    toggle: false,
                    value: fieldObject.firstVal,
                    id: fieldObject.firstID,
                });
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const onClickHandler = (e: any) => {
        const id = e.target.getAttribute("data-id");
        const value = e.target.innerHTML;
        setFunction({
            ...fieldObject,
            toggle: false,
            value: value,
            id: id,
            firstVal: value,
            firstID: id,
        });
    };

    if (isLoading) {
        return (
            <ul ref={modal} className="w-full flex justify-center py-3">
                <BarLoader
                    color={"#8f384d"}
                    height="5px"
                    width="100px"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </ul>
        );
    }
    if (isError) {
        return (
            <ul ref={modal} className="w-full flex justify-center py-3">
                <li>Something is wrong!</li>
            </ul>
        );
    }
    if (data?.data.length <= 0) {
        return (
            <ul ref={modal}>
                <p className="py-2 px-3 text-center text-[12px]">
                    Discount cannot be found!
                </p>
            </ul>
        );
    }

    return (
        <ul ref={modal} className="dropdown">
            {data?.data.map((item: any, index: number) => (
                <li key={index} onClick={onClickHandler} data-id={item.id}>
                    {item.account_name}
                </li>
            ))}
        </ul>
    );
}
