import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import DynamicPopOver from "./DynamicPopOver";
import React from "react";
import Image from "next/image";

type PeriodCalendarProps = {
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
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [open, setOpen] = useState(false);
    // change Value of field
    useEffect(() => {
        if (
            format(range[0].startDate, "yyyy-MM-dd") ===
            format(range[0].endDate, "yyyy-MM-dd")
        )
            return;
        setValue({
            from: format(range[0].startDate, "yyyy-MM-dd"),
            to: format(range[0].endDate, "yyyy-MM-dd"),
        });
    }, [range[0].startDate, range[0].endDate]);

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
                                className=" outline-none w-[90px] font-NHU-medium text-[#545454] 1550px:text-[14px]"
                            />
                            <p className=" text-ThemeRed font-NHU-regular mr-2">
                                -
                            </p>
                            <input
                                value={value.to}
                                readOnly
                                className=" outline-none w-[100px] font-NHU-medium text-[#545454] 1550px:text-[14px]"
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
                            <DatePickerContainer
                                setValue={setValue}
                                setRange={setRange}
                                range={range}
                                setOpen={setOpen}
                            />
                        )}
                    </>
                }
            />
        </div>
    );
}

type Props = {
    setRange: Function;
    range: any;
    setOpen: Function;
    setValue: Function;
};

const DatePickerContainer = ({ setRange, range, setOpen, setValue }: Props) => {
    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <div ref={modal}>
            <DateRangePicker
                onChange={(item: any) => {
                    if (
                        format(item.selection.startDate, "yyyy-MM-dd") ===
                        format(item.selection.endDate, "yyyy-MM-dd")
                    ) {
                        setValue({
                            from: "",
                            to: "",
                        });
                        setRange([item.selection]);
                    } else {
                        setRange([item.selection]);
                    }
                }}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={2}
                direction="horizontal"
            />
        </div>
    );
};
