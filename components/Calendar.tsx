import {
    eachDayOfInterval,
    endOfMonth,
    format,
    startOfDay,
    startOfMonth,
    isToday,
    isSameMonth,
    isEqual,
    endOfWeek,
    startOfWeek,
    parse,
    add,
    startOfYear,
} from "date-fns";
import React, { useState } from "react";

type Props = {
    Value: string;
    setValue: Function;
};

const todayStyle = "bg-ThemeRed text-white font-bold";
const sameMonth = "font-bold";
const selectedDay = "bg-black text-white font-bold";

export default function Calendar({ Value, setValue }: Props) {
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

    const SelectedDateHandler = (day: any) => {
        setValue(format(day, "MM-d-yyyy"));
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
            <div
                className="max-w-sm w-full shadow-lg"
                style={{ backgroundColor: "#f5f5f5" }}
            >
                <div className="md:p-8 p-5 bg-[#f5f5f5] rounded-t">
                    <div className="mb-5 flex items-center justify-between">
                        {/* <span
                            tabIndex={0}
                            className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
                        ></span> */}
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
                                <li className="mr-2 py-2 px-3 bg-white rounded-lg font-bold">
                                    {currentMonth}
                                </li>
                                <li className=" py-2 px-3 bg-white rounded-lg font-bold">
                                    {currenYear}
                                </li>
                            </ul>
                            <button
                                aria-label="calendar forward"
                                onClick={nextMonthHandler}
                                className="focus:text-gray-400 focus:bg-ThemeRed hover:text-white hover:bg-ThemeRed ml-3 text-gray-800 dark:text-gray-100 border flex justify-center items-center bg-white rounded-full font-NHU-black w-10 h-10 "
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
                                } cursor-pointe py-2 flex justify-center items-center text-base font-medium text-center text-gray-800 dark:text-gray-100 w-[14.28%]`}
                            >
                                <button
                                    onClick={() => SelectedDateHandler(day)}
                                    className={` hover:bg-black w-8 m-0 pb-5 text-[14px] aspect-square rounded-full ${
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
