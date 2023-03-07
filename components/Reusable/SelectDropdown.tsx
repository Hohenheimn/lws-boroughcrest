import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DynamicPopOver from "./DynamicPopOver";

type Props = {
    listArray: string[];
    selectHandler: (value: string) => void;
    inputElement: React.ReactNode;
    className: string;
};

export default function SelectDropdown({
    listArray,
    selectHandler,
    inputElement,
    className,
}: Props) {
    const [isToggle, setToggle] = useState(false);

    // Close Calendar By Clicking outside
    const container = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!container.current?.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    }, [container.current]);
    return (
        <div className="select">
            <span>
                <MdOutlineKeyboardArrowDown />
            </span>
            <DynamicPopOver
                toRef={
                    <div className={className} onClick={() => setToggle(true)}>
                        {inputElement}
                    </div>
                }
                samewidth={true}
                toPop={
                    <>
                        {isToggle && (
                            <ul ref={container}>
                                {listArray.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            selectHandler(item);
                                            setToggle(false);
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                }
                className=""
            />
        </div>
    );
}
