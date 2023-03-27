import React from "react";
import { BiErrorCircle } from "react-icons/bi";

export default function TableErrorMessage() {
    return (
        <div className="w-full flex justify-center items-center">
            <aside className="text-center flex justify-center py-5">
                <h1 className="flex items-center">
                    Error, Server Problem!{" "}
                    <BiErrorCircle className="text-ThemeRed text-[24px] ml-2" />
                </h1>
            </aside>
        </div>
    );
}
