import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";

type Props = {
    endpoint: string;
    name: string;
    value: {
        value: string;
        id: string;
        toggle: boolean;
    };
    setFunction: Function;
};

export default function UOMDropdown({
    endpoint,
    name,
    value,
    setFunction,
}: Props) {
    const modal = useRef<any>();

    const [isSearchTemp, setSearchTemp] = useState(value.value);

    useEffect(() => {
        setSearchTemp(value.value);
    }, [value]);

    // Reset show item when open
    const [showItemAll, setshowItemAll] = useState(true);
    const keywordSearch = showItemAll ? "" : isSearchTemp;
    useEffect(() => {
        if (value.value !== isSearchTemp) {
            setshowItemAll(false);
        }
    }, [isSearchTemp]);
    // end
    const { isLoading, data, isError } = useQuery([name, keywordSearch], () => {
        return api.get(`${endpoint}?keywords=${keywordSearch}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal?.current?.contains(e.target)) {
                if (value.value === "") {
                    setSearchTemp(value.value);
                    setFunction({
                        value: "",
                        id: "",
                        toggle: false,
                    });
                    return;
                }
                setSearchTemp(value.value);
                setFunction({
                    ...value,

                    toggle: false,
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
