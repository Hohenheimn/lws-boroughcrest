import React, { useEffect, useRef, useState } from "react";
import DynamicPopOver from "./DynamicPopOver";

export default function DropdownSearch() {
    const [isToggle, setToggle] = useState(false);

    return (
        <>
            <DynamicPopOver
                className="w-full"
                toRef={
                    <input
                        type="text"
                        className=" w-full p-1 h-10 1550px:h-8 min-w-[200px] 820px:h-8 rounded-md outline-none shadow-md text-[#757575]"
                        onClick={() => setToggle(true)}
                    />
                }
                toPop={<>{isToggle && <List setToggle={setToggle} />}</>}
            />
        </>
    );
}

type Props = {
    setToggle: Function;
};

const List = ({ setToggle }: Props) => {
    const PopOver = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!PopOver.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <ul className="w-[200px]" ref={PopOver}>
            <li className="px-4 py-2 1550px:px-2 1550px:py-1 border-b border-ThemeRed hover:bg-ThemeRed hover:text-white transition-all duration-75">
                Sample
            </li>
            <li className="px-4 py-2 1550px:px-2 1550px:py-1 border-b border-ThemeRed hover:bg-ThemeRed hover:text-white transition-all duration-75">
                Sample
            </li>
            <li className="px-4 py-2 1550px:px-2 1550px:py-1 border-b border-ThemeRed hover:bg-ThemeRed hover:text-white transition-all duration-75">
                Sample
            </li>
        </ul>
    );
};
