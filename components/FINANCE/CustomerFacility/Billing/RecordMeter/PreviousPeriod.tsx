import React, { useEffect, useRef, useState } from "react";
import DynamicPopOver from "../../../../Reusable/DynamicPopOver";
import Image from "next/image";
import { eachYearOfInterval, format, startOfDay } from "date-fns";

type Props = {
    value: string;
    setValue: Function;
};

export default function PreviousPeriod({ value, setValue }: Props) {
    const [open, setOpen] = useState([false, false, false]);
    const date = new Date();
    // get date today
    let Years = eachYearOfInterval({
        start: new Date(1970, 6, 10),
        end: date,
    });
    const reverseYears = Years.reverse();

    return (
        <DynamicPopOver
            className=""
            rightPosition={true}
            samewidth={true}
            toRef={
                <div className="flex items-center">
                    <p className="labelField">PERIOD</p>
                    <div
                        className="p-1 px-2 text-[#545454] font-NHU-medium rounded-md outline-none shadow-md bg-white flex justify-between items-center"
                        onClick={() => setOpen([true, true, false])}
                    >
                        <input
                            value={value}
                            readOnly
                            className=" outline-none w-[200px] font-NHU-medium text-[#545454] 1550px:text-[14px]"
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
                    {open[0] && (
                        <DateSelection
                            Years={reverseYears}
                            setValue={setValue}
                            open={open}
                            setOpen={setOpen}
                        />
                    )}
                </>
            }
        />
    );
}

type DateSelectionPros = {
    Years: Date[];
    setValue: Function;
    open: boolean[];
    setOpen: Function;
};

const DateSelection = ({
    Years,
    open,
    setOpen,
    setValue,
}: DateSelectionPros) => {
    const modal = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setOpen([false, false, false]);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <div className="p-5  " ref={modal}>
            {open[1] && (
                <>
                    <h3 className=" text-ThemeRed">YEARS</h3>
                    <ul className="max-h-[200px] flex flex-wrap overflow-auto">
                        {Years.map((year, index: number) => (
                            <li
                                key={index}
                                className=" w-1/4 text-[15px] hover:text-ThemeRed text-center cursor-pointer py-2"
                                onClick={() => {
                                    setOpen([true, false, true]);
                                }}
                            >
                                {format(year, "yyyy")}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {open[2] && (
                <>
                    <h3 className=" text-ThemeRed mb-2 text-[14px]">
                        PREVIOUS READING
                    </h3>
                    <ul className="max-h-[200px] flex flex-wrap overflow-auto">
                        {Years.map((year, index: number) => (
                            <li
                                key={index}
                                className=" w-full border-b text-[15px] hover:text-ThemeRed text-center cursor-pointer py-1"
                                onClick={() => {
                                    setValue("Jan 15 - Feb 15");
                                    setOpen([false, false, false]);
                                }}
                            >
                                Jan 15 - Feb 15
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
