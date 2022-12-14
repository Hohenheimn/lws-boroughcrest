import {
    eachDayOfInterval,
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
import { eachYearOfInterval } from "date-fns/esm";
import React, { useState } from "react";

type Props = {
    Value: string;
    setValue: Function;
};

const todayStyle = "bg-ThemeRed text-white font-bold";
const sameMonth = "font-bold";
const selectedDay = "bg-black text-white font-bold";

export default function Calendar() {
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
        start: new Date(1989, 6, 10),
        end: today,
    });

    const SelectedDateHandler = (day: any) => {
        setSelect(day);
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
        <div className="flex items-center justify-center py-8 px-4">
            {/* Ask kung pano naka infinite ung year tas naka focus agad ung year sa current yr */}
            <div
                className="max-w-sm w-full shadow-lg"
                style={{ backgroundColor: "#f5f5f5" }}
            >
                <div className="md:p-8 p-5 bg-[#f5f5f5] rounded-t">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center w-full justify-between">
                            <button
                                aria-label="calendar backward"
                                onClick={prevMonthHandler}
                                className="focus:text-gray-400 focus:bg-ThemeRed hover:text-white hover:bg-ThemeRed ml-3 text-gray-800 dark:text-gray-100 border flex justify-center items-center bg-white rounded-full font-NHU-black w-10 h-10 "
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
                            <ul className="flex">
                                <li className="relative mr-2  w-[100px] cursor-pointer text-center bg-white rounded-lg font-bold">
                                    <span
                                        className=" py-2 px-3 inline-block"
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
                                                    className={`py-2 px-3 text-[14px] cursor-pointer hover:bg-ThemeRed50 ${
                                                        currentMonth ===
                                                            month &&
                                                        " bg-ThemeRed text-white"
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
                                <li className=" relative cursor-pointer bg-white rounded-lg font-bold">
                                    <span
                                        className=" py-2 px-3 inline-block"
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
                                                    className={`py-2 px-3 text-[14px] cursor-pointer hover:bg-ThemeRed50 ${
                                                        currenYear ===
                                                            format(
                                                                year,
                                                                "yyyy"
                                                            ) &&
                                                        " bg-ThemeRed text-white"
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
                                className="focus:text-gray-400 relative focus:bg-ThemeRed hover:text-white hover:bg-ThemeRed ml-3 text-gray-800 dark:text-gray-100 border flex justify-center items-center bg-white rounded-full font-NHU-black w-10 h-10 "
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
                        <div className=" text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Sun
                        </div>
                        <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Mon
                        </div>
                        <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Tue
                        </div>
                        <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Wed
                        </div>
                        <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Thu
                        </div>
                        <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Fri
                        </div>
                        <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100 w-[14.28%]">
                            Sat
                        </div>
                    </div>
                    <div className=" flex flex-wrap">
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={` ${
                                    isSameMonth(day, today) && "bg-white"
                                } cursor-pointer py-2 flex justify-center items-center text-base font-medium text-center text-gray-800 dark:text-gray-100 w-[14.28%]`}
                            >
                                <button
                                    onClick={() => SelectedDateHandler(day)}
                                    className={` hover:bg-gray-300 w-8 h-8 flex justify-center items-center m-0 aspect-square text-[14px] rounded-full ${
                                        isToday(day) && todayStyle
                                    } ${isSameMonth(day, today) && sameMonth} ${
                                        isEqual(day, isSelected) &&
                                        !isToday(day) &&
                                        selectedDay
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
