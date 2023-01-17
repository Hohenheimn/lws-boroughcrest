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
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    value: {
        from: string;
        to: string;
    };
    setValue: Function;
};

export default function PeriodCalendar({ value, setValue }: Props) {
    const [isToggle, setToggle] = useState(false);
    return (
        <div className="relative">
            <aside className="flex items-center 480px:flex-wrap">
                <p className=" text-ThemeRed mr-3 font-NHU-bold 1550px:text-[14px]">
                    PERIOD
                </p>
                <div
                    className="flex bg-white px-2 py-1 rounded-md shadow-md border"
                    onClick={() => setToggle(!isToggle)}
                >
                    <input
                        type="text"
                        className="w-[150px] 480px:w-[100px] outline-none pointer-events-none"
                        value={value.from}
                        onChange={() => {}}
                    />
                    <input
                        type="text"
                        className="w-[150px] 480px:w-[100px] outline-none pointer-events-none"
                        value={value.to}
                        onChange={() => {}}
                    />
                    <span className=" cursor-pointer">
                        <Image
                            src="/Images/CalendarMini.png"
                            width={15}
                            height={15}
                            alt=""
                        />
                    </span>
                </div>
            </aside>
            {isToggle && (
                <Calendars
                    setValue={setValue}
                    value={value}
                    setToggle={setToggle}
                />
            )}
        </div>
    );
}

type CalendarsProps = {
    value: {
        from: string;
        to: string;
    };
    setValue: Function;
    setToggle: Function;
};

const Calendars = ({ setValue, value, setToggle }: CalendarsProps) => {
    const modal = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <div className="absolute top-[150%] left-0 z-50 480px:fixed 480px:top-0 flex justify-center items-center 480px:w-full 480px:h-full 480px:z-[9999] 480px:px-10 480px:bg-[#00000058]">
            <div
                className="flex shadow-md flex-wrap w-[500px] 480px:w-[full]"
                ref={modal}
            >
                <h1 className="mb-2 w-full hidden 480px:block">Period</h1>
                <div className="w-2/4 480px:w-full">
                    <Calendar
                        value={value}
                        setValue={setValue}
                        setToggle={setToggle}
                        type="from"
                    />
                </div>
                <div className="w-2/4 480px:w-full">
                    <Calendar
                        value={value}
                        setValue={setValue}
                        setToggle={setToggle}
                        type="to"
                    />
                </div>
                <div className="px-5 pb-5 flex justify-between w-full bg-[#f5f5f5]">
                    <button
                        className="font-medium text-[12px] hover:underline text-ThemeRed"
                        onClick={() => setToggle(false)}
                    >
                        CLOSE
                    </button>
                    <button
                        className="font-medium text-[12px] hover:underline text-ThemeRed"
                        onClick={() => {
                            setValue({
                                from: "",
                                to: "",
                            });
                        }}
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
};

const sameMonth = "font-bold";
const selectedDay = "bg-[#8f384d] text-white font-bold";

type CalendarProps = {
    value: {
        from: string;
        to: string;
    };
    setValue: Function;
    setToggle: Function;
    type: string;
};

function Calendar({ value, setValue, type }: CalendarProps) {
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
    const [isSelected, setSelect] = useState<Date>(today);
    useEffect(() => {
        if (value.from !== "") {
            if (type === "from") {
                const convertFrom = parse(value.from, "dd/MM/yyyy", new Date());
                setSelect(convertFrom);
            }
        } else {
            if (type === "from") {
                setSelect(today);
            }
        }
        if (value.to !== "") {
            if (type === "to") {
                const convertTo = parse(value.to, "dd/MM/yyyy", new Date());
                setSelect(convertTo);
            }
        } else {
            if (type === "to") {
                setSelect(today);
            }
        }
    }, [value]);

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
        if (type === "from") {
            setValue({
                ...value,
                from: format(day, "dd/MM/yyyy"),
            });
        }
        if (type === "to") {
            setValue({
                ...value,
                to: format(day, "dd/MM/yyyy"),
            });
        }
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
        <div className="w-full" style={{ backgroundColor: "#f5f5f5" }}>
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
                            className="focus:text-gray-400 focus:bg-ThemeRed hover:text-white mr-3 hover:bg-ThemeRed text-gray-800 border flex justify-center items-center bg-white rounded-full font-NHU-black w-5 h-5 "
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
                            <li className="relative mr-2  w-[100px] 480px:w-[80px] cursor-pointer text-center bg-white rounded-lg font-bold">
                                <span
                                    className=" py-1 px-2 inline-block text-[14px] 480px:text-[12px]"
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
                                                    currentMonth === month &&
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
                                    className=" py-1 px-2 text-[14px] 480px:text-[12px] inline-block"
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
                                                        format(year, "yyyy") &&
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
                            disabled={
                                currenYear === "5000" &&
                                currentMonth === "December"
                                    ? true
                                    : false
                            }
                            className="focus:text-gray-400 relative focus:bg-ThemeRed hover:text-white hover:bg-ThemeRed ml-3 text-gray-800 border flex justify-center items-center bg-white rounded-full font-NHU-black w-5 h-5"
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
                    <div className=" text-[14px] font-medium text-center text-gray-800  w-[14.28%] 480px:text-[12px]">
                        S
                    </div>
                    <div className="text-[14px] font-medium text-center text-gray-800  w-[14.28%] 480px:text-[12px]">
                        M
                    </div>
                    <div className="text-[14px] font-medium text-center text-gray-800  w-[14.28%] 480px:text-[12px]">
                        T
                    </div>
                    <div className="text-[14px] font-medium text-center text-gray-800  w-[14.28%] 480px:text-[12px]">
                        W
                    </div>
                    <div className="text-[14px] font-medium text-center text-gray-800 w-[14.28%] 480px:text-[12px]">
                        T
                    </div>
                    <div className="text-[14px] font-medium text-center text-gray-800 w-[14.28%] 480px:text-[12px]">
                        F
                    </div>
                    <div className="text-[14px] font-medium text-center text-gray-800 w-[14.28%] 480px:text-[12px]">
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
                                    isSameMonth(day, today) && sameMonth
                                } ${
                                    isEqual(day, isSelected) &&
                                    !isToday(day) &&
                                    selectedDay
                                } ${isSameMonth(day, today) && "bg-white"}`}
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
    );
}
