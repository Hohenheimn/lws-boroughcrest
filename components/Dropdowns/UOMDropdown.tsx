import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";

type Props = {
    endpoint: string;
    name: string;
    value: string;
    setFunction: Function;
};

export default function UOMDropdown({
    endpoint,
    name,
    value,
    setFunction,
}: Props) {
    const modal = useRef<any>();

    const [isSearchTemp, setSearchTemp] = useState("");

    useEffect(() => {
        setSearchTemp(value);
    }, [value]);

    const { isLoading, data, isError } = useQuery([name, isSearchTemp], () => {
        return api.get(`${endpoint}?keywords=${value}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal?.current?.contains(e.target)) {
                setSearchTemp(value);
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
            id: id,
            value: value,
        });
    };

    return (
        <ul ref={modal} className="dropdown-list">
            {data?.data.map((item: any, index: number) => (
                <li key={index} onClick={onClickHandler} data-id={item.id}>
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

            {isError && <li>Something is wrong!</li>}
            {data?.data.length <= 0 && <li>no {name} found!</li>}
        </ul>
    );
}
