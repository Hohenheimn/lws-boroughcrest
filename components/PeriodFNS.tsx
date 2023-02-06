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
    intervalToDuration,
    formatDistance,
} from "date-fns";
import React, { useEffect, useRef, useState } from "react";

type PeriodFNS = {
    setToggle: Function;
    isValue: {
        from: string;
        to: string;
    };
    setValue: Function;
};

export default function PeriodFNS({ setToggle, isValue, setValue }: PeriodFNS) {
    // Close Calendar By Clicking outside
    const CalendarContainer = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!CalendarContainer.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    // End

    const date = new Date();
    let today = startOfDay(date);
    // Start
    let nextMonth = add(today, {
        months: 1,
    });
    const [calendar, setCalendar] = useState({
        firstCalMonth: today,
        firstCalYear: today,
        secondCalMonth: nextMonth,
        secondCalYear: nextMonth,
    });
    const [isDateRange, setDateRange] = useState({
        from: {
            value: today,
            validate: false,
        },
        to: {
            value: today,
            validate: false,
        },
    });
    // End

    const setDatehandler = () => {
        setValue({
            from: format(isDateRange.from.value, "dd/MM/yyyy"),
            to: format(isDateRange.to.value, "dd/MM/yyyy"),
        });
        setToggle(false);
    };
    return (
        <div
            className="absolute top-full left-0 z-[60]"
            ref={CalendarContainer}
        >
            {/* Ask kung pano naka infinite ung year tas naka focus agad ung year sa current yr */}
            <div className="shadow-lg" style={{ backgroundColor: "#f5f5f5" }}>
                <div className="flex">
                    <CalendarPeriod
                        calendar={calendar}
                        setCalendar={setCalendar}
                        type="First"
                        isDateRange={isDateRange}
                        setDateRange={setDateRange}
                    />
                    <CalendarPeriod
                        calendar={calendar}
                        setCalendar={setCalendar}
                        type="Second"
                        isDateRange={isDateRange}
                        setDateRange={setDateRange}
                    />
                </div>
                <ul className="p-3 flex justify-between">
                    <li className="flex items-center">
                        <p className="text-[#757575] px-2 py-1 text-[14px] border border-ThemeRed rounded-md">
                            {isDateRange.from.validate
                                ? format(isDateRange.from.value, "MMM dd yyyy")
                                : "----"}
                        </p>
                        <div className="h-[2px] w-[7px] bg-ThemeRed mx-2"></div>
                        <p className="text-[#757575] px-2 py-1 text-[14px] border border-ThemeRed rounded-md">
                            {isDateRange.to.validate
                                ? format(isDateRange.to.value, "MMM dd yyyy")
                                : "----"}
                        </p>
                    </li>
                    <li>
                        <button
                            className="button_cancel"
                            onClick={() => setToggle(false)}
                        >
                            CANCEL
                        </button>
                        <button className="buttonRed" onClick={setDatehandler}>
                            APPLY
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

type CalendarPeriod = {
    calendar: {
        firstCalMonth: Date;
        firstCalYear: Date;
        secondCalMonth: Date;
        secondCalYear: Date;
    };
    setCalendar: Function;
    type: string;
    isDateRange: {
        from: {
            value: Date;
            validate: boolean;
        };
        to: {
            value: Date;
            validate: boolean;
        };
    };
    setDateRange: Function;
};

const CalendarPeriod = ({
    calendar,
    setCalendar,
    type,
    isDateRange,
    setDateRange,
}: CalendarPeriod) => {
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

    const currentYear =
        type === "First"
            ? format(calendar.firstCalYear, "yyyy")
            : format(calendar.secondCalYear, "yyyy");

    const currentMonth =
        type === "First"
            ? format(calendar.firstCalMonth, "MMMM")
            : format(calendar.secondCalMonth, "MMMM");

    let wholeYear =
        format(
            type === "First" ? calendar.firstCalMonth : calendar.secondCalMonth,
            "MMMM"
        ) +
        "-" +
        format(
            type === "First" ? calendar.firstCalYear : calendar.secondCalYear,
            "yyyy"
        );

    let firstDayofMonthYear = parse(wholeYear, "MMMM-yyyy", new Date());
    // Days of Month
    // Need to be updated everytime month and year changes
    let days = eachDayOfInterval({
        start: startOfWeek(firstDayofMonthYear),
        end: endOfWeek(endOfMonth(firstDayofMonthYear)),
    });

    // Dates Between from and to date range
    let DateBetween = eachDayOfInterval({
        start: isDateRange.from.value,
        end: isDateRange.to.value,
    });

    let Years = eachYearOfInterval({
        start: new Date(1970, 6, 10),
        end: new Date(5000, 6, 10),
    });

    const SelectedDayHandler = (day: any) => {
        if (isDateRange.from.validate === false) {
            setDateRange({
                ...isDateRange,
                from: {
                    value: day,
                    validate: true,
                },
            });
        } else if (isDateRange.to.validate === false) {
            setDateRange({
                ...isDateRange,
                to: {
                    value: day,
                    validate: true,
                },
            });
        }
        if (
            isDateRange.from.validate === true &&
            isDateRange.to.validate === true
        ) {
            setDateRange({
                ...isDateRange,
                from: {
                    value: day,
                    validate: true,
                },
                to: {
                    value: day,
                    validate: false,
                },
            });
        }
    };
    const SelectedMonth = (month: string) => {
        const selectedMonth = parse(month, "MMMM", new Date());
        if (type === "First") {
            setCalendar({
                ...calendar,
                firstCalMonth: selectedMonth,
            });
        } else {
            setCalendar({
                ...calendar,
                secondCalMonth: selectedMonth,
            });
        }
        setToggleButton({
            ...toggleButton,
            month: false,
        });
    };
    const SelectedYear = (year: Date) => {
        if (type === "First") {
            setCalendar({
                ...calendar,
                firstCalYear: year,
            });
        } else {
            setCalendar({
                ...calendar,
                secondCalYear: year,
            });
        }
        setToggleButton({
            ...toggleButton,
            year: false,
        });
    };

    const SubtAddYear = (button: string) => {
        const NextYear = add(
            type === "First" ? calendar.firstCalYear : calendar.secondCalYear,
            {
                years: button === "next" ? 1 : -1,
            }
        );
        if (type === "First") {
            setCalendar({
                ...calendar,
                firstCalYear: NextYear,
            });
        } else {
            setCalendar({
                ...calendar,
                secondCalYear: NextYear,
            });
        }
    };
    const PrevNext = (button: string) => {
        // Get Current Month and Year

        // Add and Subt Month depend on button clicked
        let firstdayNextMonth = add(
            type === "First" ? calendar.firstCalMonth : calendar.secondCalMonth,
            {
                months: button === "next" ? 1 : -1,
            }
        );
        // Set New Month
        if (type === "First") {
            setCalendar({
                ...calendar,
                firstCalMonth: firstdayNextMonth,
            });
        } else {
            setCalendar({
                ...calendar,
                secondCalMonth: firstdayNextMonth,
            });
        }

        const validateMonth = format(firstdayNextMonth, "MM");
        if (validateMonth === "01" && button === "next") {
            SubtAddYear("next");
        }

        if (validateMonth === "12" && button === "prev") {
            SubtAddYear("prev");
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
                            currentYear === "1970" && currentMonth === "January"
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
                                {format(
                                    type === "First"
                                        ? calendar.firstCalMonth
                                        : calendar.secondCalMonth,
                                    "MMMM"
                                )}
                            </span>
                            {toggleButton.month && (
                                <ul className="absolute top-full left-0 w-full bg-white shadow-md max-h-[200px] overflow-auto z-50">
                                    {Months.map((month, index) => (
                                        <li
                                            key={index}
                                            className={`py-1 px-2 text-[12px] cursor-pointer hover:bg-ThemeRed50 ${
                                                currentMonth === month
                                                    ? " bg-ThemeRed text-white"
                                                    : "text-[#757575]"
                                            }`}
                                            onClick={() => SelectedMonth(month)}
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
                                {format(
                                    type === "First"
                                        ? calendar.firstCalYear
                                        : calendar.secondCalYear,
                                    "yyyy"
                                )}
                            </span>
                            {toggleButton.year && (
                                <ul className="absolute top-full left-0 w-full bg-white shadow-md max-h-[200px] overflow-auto z-50">
                                    {Years.map((year, index) => (
                                        <li
                                            key={index}
                                            className={`py-1 px-2 text-[12px] cursor-pointer hover:bg-ThemeRed50 ${
                                                currentYear ===
                                                format(year, "yyyy")
                                                    ? " bg-ThemeRed text-white"
                                                    : "text-[#757575]"
                                            }`}
                                            onClick={() => SelectedYear(year)}
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
                            currentYear === "5000" &&
                            currentMonth === "December"
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
                            onClick={() => SelectedDayHandler(day)}
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
                                    isEqual(day, isDateRange.from.value) &&
                                    isDateRange.from.validate &&
                                    "rounded-full bg-ThemeRed text-white"
                                }
                                ${
                                    isEqual(day, isDateRange.to.value) &&
                                    isDateRange.to.validate &&
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
