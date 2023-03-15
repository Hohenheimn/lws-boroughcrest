import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import DynamicPopOver from "./DynamicPopOver";
import React from "react";
import Image from "next/image";
import PeriodFNS from "./PeriodFNS";

export type PeriodCalendarProps = {
    value: {
        from: string;
        to: string;
    };
    setValue: Function;
};

export default function PeriodCalendar({
    value,
    setValue,
}: PeriodCalendarProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <DynamicPopOver
                className=""
                toRef={
                    <div className="flex items-center">
                        <p className="labelField">PERIOD</p>
                        <div
                            className="p-1 px-2 text-[#545454] font-NHU-medium 1550px:min-w-[100px] rounded-md outline-none shadow-md bg-white flex justify-between items-center"
                            onClick={() => setOpen((open) => !open)}
                        >
                            <input
                                value={value.from}
                                readOnly
                                className=" outline-none w-[120px] text-center font-NHU-medium text-[#545454] 1550px:text-[14px]"
                            />
                            <p className=" text-ThemeRed font-NHU-regular mx-2">
                                -
                            </p>
                            <input
                                value={value.to}
                                readOnly
                                className=" outline-none w-[120px] text-center font-NHU-medium text-[#545454] 1550px:text-[14px]"
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
                        {open && (
                            <PeriodFNS
                                setToggle={setOpen}
                                isValue={value}
                                setValue={setValue}
                            />
                        )}
                    </>
                }
            />
        </div>
    );
}
