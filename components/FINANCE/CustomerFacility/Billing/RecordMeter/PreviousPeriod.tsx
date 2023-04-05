import React, { useContext, useEffect, useRef, useState } from "react";
import DynamicPopOver from "../../../../Reusable/DynamicPopOver";
import Image from "next/image";
import { eachYearOfInterval, format, parse, startOfDay } from "date-fns";
import { GetPreviousPeriod } from "./Query";
import AppContext from "../../../../Context/AppContext";
import { BarLoader } from "react-spinners";

type Props = {
    value: value;
    setValue: Function;
    reading_id: number;
    year: string;
};

type value = {
    from: string;
    to: string;
    year: string;
};

export default function PreviousPeriod({
    value,
    setValue,
    reading_id,
    year,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [open, setOpen] = useState([false, false, false]);
    const date = new Date();
    // get date today
    let Years = eachYearOfInterval({
        start: new Date(1970, 6, 10),
        end: date,
    });
    const reverseYears = Years.reverse();

    const OpenHandler = () => {
        if (Number(reading_id) === 0) {
            setPrompt({
                message: "Select a Reading!",
                type: "draft",
                toggle: true,
            });
            return;
        }
        setOpen([true, true, false]);
    };

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
                        onClick={OpenHandler}
                    >
                        <input
                            value={
                                value.from === ""
                                    ? ""
                                    : value.from + " - " + value.to
                            }
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
                            value={value}
                            reading_id={reading_id}
                            year={year}
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
    value: {
        from: string;
        to: string;
        year: string;
    };
    year: string;
    reading_id: number;
};

type period = {
    period_from: string;
    period_to: string;
    year: string;
};

const DateSelection = ({
    Years,
    open,
    setOpen,
    setValue,
    value,
    reading_id,
    year,
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

    const { data, isLoading, isError } = GetPreviousPeriod(
        reading_id,
        value.year
    );
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
                                    setValue({
                                        ...value,
                                        year: format(year, "yyyy"),
                                    });
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
                        {isLoading && (
                            <li className=" w-full border-b text-[15px] hover:text-ThemeRed text-center cursor-pointer py-1">
                                <li className=" w-full flex justify-center text-[15px] hover:text-ThemeRed text-center cursor-pointer py-1">
                                    <BarLoader
                                        color={"#8f384d"}
                                        height="5px"
                                        width="100px"
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </li>
                            </li>
                        )}
                        {data?.data.map((item: period, index: number) => (
                            <List
                                item={item}
                                key={index}
                                setValue={setValue}
                                setOpen={setOpen}
                                value={value}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
type PropsList = {
    item: period;
    setValue: Function;
    setOpen: Function;
    value: value;
};

const List = ({ item, setValue, setOpen, value }: PropsList) => {
    const from = parse(item.period_from, "yyyy-MM-dd", new Date());
    const to = parse(item.period_to, "yyyy-MM-dd", new Date());
    return (
        <li
            className=" w-full border-t text-[15px] hover:text-ThemeRed text-center cursor-pointer py-1"
            onClick={() => {
                setValue({
                    ...value,
                    from: format(from, "MMM dd yyyy"),
                    to: format(to, "MMM dd yyyy"),
                });
                setOpen([false, false, false]);
            }}
        >
            {format(from, "MMM dd")} - {format(to, "MMM dd")}
        </li>
    );
};
