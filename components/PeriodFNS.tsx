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
} from "date-fns";
import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "./Context/AppContext";

type Props = {
    value: {
        value: string;
        toggle: boolean;
    };
    setValue: Function;
};

export default function PeriodFNS() {
    const modal = useRef<any>();
    const date = new Date();
    let today = startOfDay(date);
    const [currentMonth1, setCurrentMonth1] = useState(format(today, "MMMM"));
    const [currentMonth2, setCurrentMonth2] = useState(format(today, "MMMM"));
    return (
        <div className="absolute top-full left-0 z-[60]" ref={modal}>
            {/* Ask kung pano naka infinite ung year tas naka focus agad ung year sa current yr */}
            <div className="shadow-lg" style={{ backgroundColor: "#f5f5f5" }}>
                <div className="flex">
                    <CalendarPeriod
                        currentMonth={currentMonth1}
                        setCurrentMonth={setCurrentMonth1}
                    />
                    <CalendarPeriod
                        currentMonth={currentMonth2}
                        setCurrentMonth={setCurrentMonth2}
                    />
                </div>
                <ul className="p-3 flex justify-between">
                    <li className="flex items-center">
                        <p className="text-[#757575] px-2 py-1 text-[14px] border border-ThemeRed rounded-md">
                            {currentMonth1}
                        </p>
                        <div className="h-[2px] w-[7px] bg-ThemeRed mx-2"></div>
                        <p className="text-[#757575] px-2 py-1 text-[14px] border border-ThemeRed rounded-md">
                            {currentMonth2}
                        </p>
                    </li>
                    <li>
                        <button className="button_cancel">CANCEL</button>
                        <button className="buttonRed">APPLY</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

type CalendarPeriod = {
    currentMonth: string;
    setCurrentMonth: Function;
};

const CalendarPeriod = ({ currentMonth, setCurrentMonth }: CalendarPeriod) => {
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
        // setValue({
        //     value: format(day, "yyyy-MM-dd"),
        //     toggle: false,
        // });
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
        <div className="p-3 bg-[#f5f5f5] rounded-t w-[250px]">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center w-full justify-between">
                    <button
                        aria-label="calendar backward"
                        onClick={prevMonthHandler}
                        disabled={
                            currenYear === "1970" && currentMonth === "January"
                                ? true
                                : false
                        }
                        className=" text-ThemeRed"
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                    </button>
                    <ul className="flex">
                        <li className="relative mr-2  w-[75px] cursor-pointer text-center rounded-lg font-bold">
                            <span
                                className=" py-1 px-2 inline-block text-[14px] text-ThemeRed"
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
                        </li>
                        <li className=" relative cursor-pointer rounded-lg font-bold">
                            <span
                                className=" py-1 px-2 text-[14px] inline-block text-ThemeRed"
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
                        </li>
                    </ul>
                    <button
                        aria-label="calendar forward"
                        onClick={nextMonthHandler}
                        disabled={
                            currenYear === "5000" && currentMonth === "December"
                                ? true
                                : false
                        }
                        className="text-ThemeRed"
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className=" flex flex-wrap mb-2">
                <div className=" text-[14px] font-NHU-bold text-center text-[#545454]  w-[14.28%]">
                    Su
                </div>
                <div className="text-[14px] font-NHU-bold text-center text-[#545454]  w-[14.28%]">
                    Mo
                </div>
                <div className="text-[14px] font-NHU-bold text-center text-[#545454]  w-[14.28%]">
                    Tu
                </div>
                <div className="text-[14px] font-NHU-bold text-center text-[#545454]  w-[14.28%]">
                    We
                </div>
                <div className="text-[14px] font-NHU-bold text-center text-[#545454] w-[14.28%]">
                    Th
                </div>
                <div className="text-[14px] font-NHU-bold text-center text-[#545454] w-[14.28%]">
                    Fr
                </div>
                <div className="text-[14px] font-NHU-bold text-center text-[#545454] w-[14.28%]">
                    Sa
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
                            className={` relative w-[100%] m-0 aspect-square text-[14px] ${
                                isSameMonth(day, today)
                                    ? "text-[#545454]"
                                    : "text-[#a2a2a2]"
                            }`}
                        >
                            <time
                                dateTime={format(day, "yyyy-MM-dd")}
                                className={`relative z-10 h-full w-full flex justify-center items-center ${
                                    isToday(day)
                                        ? " rounded-full border border-ThemeRed"
                                        : ""
                                } ${
                                    isEqual(day, isSelected) &&
                                    "rounded-full bg-ThemeRed text-white"
                                }`}
                            >
                                {format(day, "d")}
                            </time>
                            {/* magiging half pag start and end of date, left-0 if start right-0 if end */}
                            {/* <div className=" absolute top-0 left-0 w-full h-full bg-gray-300"></div> */}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
