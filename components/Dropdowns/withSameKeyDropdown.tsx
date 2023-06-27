import { getCookie } from "cookies-next";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import { IDstate } from "../FINANCE/CustomerFacility/Charge/Type";

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

    // Reset show item when open
    const [showItemAll, setshowItemAll] = useState(true);
    const keywordSearch = showItemAll ? "" : searchValue;
    useEffect(() => {
        if (fieldObject.firstVal !== fieldObject.value) {
            setshowItemAll(false);
        }
    }, [searchValue]);
    // end

    const { isLoading, data, isError } = useQuery([name, keywordSearch], () => {
        return api.get(
            `${endpoint}?keywords=${
                keywordSearch === null || keywordSearch === undefined
                    ? ""
                    : keywordSearch
            }`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
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

    return (
        <ul ref={modal} className="dropdown-list">
            {data?.data.map((item: any, index: number) => (
                <li key={index} onClick={onClickHandler} data-id={item.id}>
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

            {isError && <li>Something is wrong!</li>}
            {data?.data.length <= 0 && <li>no {name} found!</li>}
        </ul>
    );
}
