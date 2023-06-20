import React, { useEffect, useRef } from "react";
import { BarLoader } from "react-spinners";
import { GetDeveloper } from "../../ReactQuery/PropertyMethod";
import style from "../../../styles/Popup_Modal.module.scss";

export default function Developer({
    set,
    update,
    isValID,
    isObject,
    setObject,
}: any) {
    const modal = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                set(false);
                setObject({
                    ...isObject,
                    value: isObject.firstVal,
                    id: isObject.firstID,
                });
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    const { data, isLoading, isError } = GetDeveloper(
        isObject.value === null || isObject.value === undefined
            ? ""
            : isObject.value
    );
    const updateVal = (e: any) => {
        const id = e.target.getAttribute("data-id");
        const value = e.target.getAttribute("data-value");
        update(value, id);
        set(false);
    };
    return (
        <>
            <ul className="dropdown-list" ref={modal}>
                {data?.data.map((item: any, index: number) => (
                    <li
                        data-id={item.id}
                        key={index}
                        data-value={item.name}
                        onClick={updateVal}
                        className={`${isValID == item.id ? style.active : ""}`}
                    >
                        {item.name}
                    </li>
                ))}
                {isLoading && (
                    <li>
                        <div className="w-full flex justify-center py-3">
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
                            <h1>Developer cannot be found!</h1>
                        </li>
                    ))}
            </ul>
        </>
    );
}
