import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import DynamicPopOver from "./DynamicPopOver";
import React from "react";
import Image from "next/image";
import PeriodFNS from "./PeriodFNS";
import ModalTemp from "./ModalTemp";

export type PeriodCalendarProps = {
    value: {
        from: string;
        to: string;
    };
    setValue: Function;
    disabled?: boolean;
    noLabel?: boolean;
    modalType?: boolean;
};

export default function PeriodCalendar({
    value,
    setValue,
    disabled,
    noLabel,
    modalType,
}: PeriodCalendarProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <DynamicPopOver
                className=""
                toRef={
                    <div className="flex items-center ">
                        {(noLabel === undefined || noLabel === false) && (
                            <p className="labelField">PERIOD</p>
                        )}

                        <div
                            className={`${
                                disabled && "disabled"
                            } p-1 px-2 text-[#545454] font-NHU-medium 1550px:min-w-[100px] rounded-md outline-none shadow-md bg-white flex justify-between items-center`}
                            onClick={() => setOpen((open) => !open)}
                        >
                            <input
                                value={value.from}
                                readOnly
                                className={`${
                                    disabled && "disabled"
                                } outline-none w-[120px] 820px:w-[100px] text-center font-NHU-medium text-[#545454] 1550px:text-[14px]`}
                            />
                            <p className=" text-ThemeRed font-NHU-regular mx-2">
                                -
                            </p>
                            <input
                                value={value.to}
                                readOnly
                                className={`${
                                    disabled && "disabled"
                                } outline-none w-[120px] 820px:w-[100px] text-center font-NHU-medium text-[#545454] 1550px:text-[14px]`}
                            />
                            <Image
                                src="/Images/CalendarMini.png"
                                height={15}
                                width={15}
                                alt=""
                            />
                        </div>
                    </div>
                }
                toPop={
                    <>
                        {open && modalType !== true && (
                            <PeriodFNS
                                setToggle={setOpen}
                                isValue={value}
                                setValue={setValue}
                            />
                        )}
                    </>
                }
            />
            {open && modalType === true && (
                <div className="fixed left-0 top-0 z-[99] w-full h-full flex justify-center items-center bg-[#00000040] ">
                    <PeriodFNS
                        setToggle={setOpen}
                        isValue={value}
                        setValue={setValue}
                        modalType={modalType}
                    />
                </div>
            )}
        </div>
    );
}
