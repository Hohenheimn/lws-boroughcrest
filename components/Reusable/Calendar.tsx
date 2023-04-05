import {
    eachDayOfInterval,
    eachYearOfInterval,
    endOfMonth,
    format,
    startOfDay,
    isToday,
    isSameMonth,
    isEqual,
    endOfWeek,
    startOfWeek,
    parse,
    add,
    compareDesc,
} from "date-fns";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    value: {
        value: string;
        toggle: boolean;
    };
    setValue: Function;
    period?: {
        from: Date;
        to: Date;
    };
};

const todayStyle = "bg-ThemeRed text-white font-bold";
const sameMonth = "font-bold";
const selectedDay = "bg-[#545454] text-white font-bold";

export default function Calendar({ value, setValue, period }: Props) {
    const modal = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setValue({
                    ...value,
                    toggle: false,
                });
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    const Months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [toggleButton, setToggleButton] = useState({
        month: false,
        year: false,
    });
    const date = new Date();
    // get date today
    let today = startOfDay(date);
    const [isSelected, setSelect] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM"));
    const [currenYear, setCurrentYear] = useState(format(today, "yyyy"));
    let wholeYear = currentMonth + "-" + currenYear;

    let firstDayofMonthYear = parse(wholeYear, "MMMM-yyyy", new Date());

    let days = eachDayOfInterval({
        start: startOfWeek(firstDayofMonthYear),
        end: endOfWeek(endOfMonth(firstDayofMonthYear)),
    });

    let Years = eachYearOfInterval({
        start: new Date(1970, 6, 10),
        end: new Date(5000, 6, 10),
    });

    const SelectedDateHandler = (day: any) => {
        setSelect(day);
        setValue({
            value: format(day, "MMM dd yyyy"),
            toggle: false,
        });
    };

    const PrevNext = (button: string) => {
        // Get Current Month and Year
        let firstDayCurrentMonth = parse(currentMonth, "MMMM", new Date());
        let firstDayCurrentYear = parse(currenYear, "yyyy", new Date());

        let firstdayNextMonth = add(firstDayCurrentMonth, {
            months: button === "next" ? 1 : -1,
        });
        setCurrentMonth(format(firstdayNextMonth, "MMMM"));

        const validateMonth = format(firstdayNextMonth, "MM");
        if (validateMonth === "01" && button === "next") {
            let firstdayNextYear = add(firstDayCurrentYear, {
                years: 1,
            });
            setCurrentYear(format(firstdayNextYear, "yyyy"));
        }
        if (validateMonth === "12" && button === "prev") {
            let firstdayNextYear = add(firstDayCurrentYear, {
                years: -1,
            });
            setCurrentYear(format(firstdayNextYear, "yyyy"));
        }
    };

    const nextMonthHandler = () => {
        PrevNext("next");
    };

    const prevMonthHandler = () => {
        PrevNext("prev");
    };

    return (
        <div className=" fixed mt-2 z-[60]" ref={modal}>
            {/* Ask kung pano naka infinite ung year tas naka focus agad ung year sa current yr */}
            <div
                className="max-w-[250px] w-full shadow-lg"
                style={{ backgroundColor: "#f5f5f5" }}
            >
                <div className="p-3 bg-[#f5f5f5] rounded-t">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center w-full justify-between">
                            <button
                                aria-label="calendar backward"
                                onClick={prevMonthHandler}
                                disabled={
                                    currenYear === "1970" &&
                                    currentMonth === "January"
                                        ? true
                                        : false
                                }
                                className=" text-[#757575] border flex justify-center items-center bg-white rounded-full font-NHU-black w-5 h-5 "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-left"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                            </button>
                            <div className="flex">
                                <div className="relative mr-2  w-[100px] cursor-pointer text-center bg-white rounded-lg font-bold">
                                    <span
                                        className=" py-1 px-2 inline-block text-[14px] text-[#757575]"
                                        onClick={() =>
                                            setToggleButton({
                                                ...toggleButton,
                                                month: !toggleButton.month,
                                            })
                                        }
                                    >
                                        {currentMonth}
                                    </span>
                                    {toggleButton.month && (
                                        <ul className="absolute top-full left-0 w-full bg-white shadow-md max-h-[200px] overflow-auto">
                                            {Months.map((month, index) => (
                                                <li
                                                    key={index}
                                                    className={`py-1 px-2 text-[12px] cursor-pointer hover:bg-ThemeRed50 ${
                                                        currentMonth === month
                                                            ? " bg-ThemeRed text-white"
                                                            : "text-[#757575]"
                                                    }`}
                                                    onClick={() => {
                                                        setCurrentMonth(month);
                                                        setToggleButton({
                                                            ...toggleButton,
                                                            month: false,
                                                        });
                                                    }}
                                                >
                                                    {month}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className=" relative cursor-pointer bg-white rounded-lg font-bold">
                                    <span
                                        className=" py-1 px-2 text-[14px] inline-block text-[#757575]"
                                        onClick={() =>
                                            setToggleButton({
                                                ...toggleButton,
                                                year: !toggleButton.year,
                                            })
                                        }
                                    >
                                        {currenYear}
                                    </span>
                                    {toggleButton.year && (
                                        <ul className="absolute top-full left-0 w-full bg-white shadow-md max-h-[200px] overflow-auto">
                                            {Years.map((year, index) => (
                                                <li
                                                    key={index}
                                                    className={`py-1 px-2 text-[12px] cursor-pointer hover:bg-ThemeRed50 ${
                                                        currenYear ===
                                                        format(year, "yyyy")
                                                            ? " bg-ThemeRed text-white"
                                                            : "text-[#757575]"
                                                    }`}
                                                    onClick={() => {
                                                        setCurrentYear(
                                                            format(year, "yyyy")
                                                        );
                                                        setToggleButton({
                                                            ...toggleButton,
                                                            year: false,
                                                        });
                                                    }}
                                                >
                                                    {format(year, "yyyy")}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <button
                                aria-label="calendar forward"
                                onClick={nextMonthHandler}
                                disabled={
                                    currenYear === "5000" &&
                                    currentMonth === "December"
                                        ? true
                                        : false
                                }
                                className=" ml-3 border flex justify-center items-center bg-white rounded-full font-NHU-black w-5 h-5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler  icon-tabler-chevron-right"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className=" flex flex-wrap mb-2">
                        <div className=" text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
                            S
                        </div>
                        <div className="text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
                            M
                        </div>
                        <div className="text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
                            T
                        </div>
                        <div className="text-[14px] font-medium text-center text-[#757575]  w-[14.28%]">
                            W
                        </div>
                        <div className="text-[14px] font-medium text-center text-[#757575] w-[14.28%]">
                            T
                        </div>
                        <div className="text-[14px] font-medium text-center text-[#757575] w-[14.28%]">
                            F
                        </div>
                        <div className="text-[14px] font-medium text-center text-[#757575] w-[14.28%]">
                            S
                        </div>
                    </div>
                    <div className=" flex flex-wrap">
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={` cursor-pointer aspect-square flex justify-center items-center text-base font-medium text-center text-gray-800 w-[14.28%]`}
                            >
                                <button
                                    onClick={() => SelectedDateHandler(day)}
                                    className={` hover:bg-gray-300 w-[90%] flex justify-center items-center m-0 aspect-square text-[14px] rounded-lg ${
                                        isToday(day)
                                            ? todayStyle
                                            : "text-[#757575]"
                                    } ${isSameMonth(day, today) && sameMonth} ${
                                        isEqual(day, isSelected) &&
                                        !isToday(day) &&
                                        selectedDay
                                    } ${
                                        isSameMonth(day, today) &&
                                        !isToday(day) &&
                                        "bg-white"
                                    } ${
                                        period !== undefined &&
                                        ` ${
                                            (compareDesc(period.from, day) ===
                                                1 ||
                                                compareDesc(
                                                    period.from,
                                                    day
                                                ) === 0) &&
                                            (compareDesc(period.to, day) ===
                                                0 ||
                                                compareDesc(period.to, day) ===
                                                    -1)
                                                ? ""
                                                : " pointer-events-none"
                                        }`
                                    }`}
                                >
                                    <time dateTime={format(day, "yyyy-MM-dd")}>
                                        {format(day, "d")}
                                    </time>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
