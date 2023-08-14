import React, { useEffect, useRef, useState } from "react";
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
  forTable?: boolean;
  birthday?: boolean;
  onChange?: (value: string) => void;
};

export default function Calendar({
  value,
  setValue,
  period,
  forTable,
  birthday,
  onChange,
}: Props) {
  const modal = useRef<any>();

  const currentValue = parse(value.value, "MMM dd yyyy", new Date());

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

  // Subtract year
  function subtractYears(date: Date, years: number) {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(date.getFullYear() - years);
    return dateCopy;
  }

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
  // IF enable birthday, calendar can only select a year 10year ago
  const YearCanbeSelected = subtractYears(date, 10);

  // get date today
  let today = startOfDay(date);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM"));
  const [currenYear, setCurrentYear] = useState(
    birthday !== undefined
      ? format(YearCanbeSelected, "yyyy")
      : format(today, "yyyy")
  );
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
    setValue({
      value: format(day, "MMM dd yyyy"),
      toggle: false,
    });
    if (onChange) {
      onChange(format(day, "MMM dd yyyy"));
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
    <div
      className={` z-[60] ${
        forTable
          ? "fixed top-0 left-0 w-full h-full z-[99999999] bg-[#00000040] flex justify-center items-center"
          : "absolute mt-2 "
      }`}
    >
      {/* Ask kung pano naka infinite ung year tas naka focus agad ung year sa current yr */}
      <div
        className="max-w-[250px] w-full shadow-lg rounded-lg overflow-hidden"
        style={{ backgroundColor: "#f5f5f5" }}
        ref={modal}
      >
        <div className="p-3 bg-[#f5f5f5] rounded-t">
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
                className="mr-3 640px:mr-1 text-[#757575] border flex justify-center items-center bg-white rounded-full font-NHU-black w-5 h-5 "
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
                          style={{
                            width: "100%",
                            marginBottom: "0",
                          }}
                          className={`py-1 px-2 text-[12px] border bordeer-black w-full cursor-pointer hover:bg-ThemeRed50 hover:text-white ${
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
                          style={{
                            width: "100%",
                            marginBottom: "0",
                          }}
                          className={`py-1 px-2 text-[12px] cursor-pointer hover:bg-ThemeRed50 hover:text-white ${
                            currenYear === format(year, "yyyy")
                              ? " bg-ThemeRed text-white"
                              : "text-[#757575]"
                          }`}
                          onClick={() => {
                            setCurrentYear(format(year, "yyyy"));
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
                  currenYear === "5000" && currentMonth === "December"
                    ? true
                    : false
                }
                className=" ml-3 640px:ml-1 border flex justify-center items-center bg-white rounded-full font-NHU-black w-5 h-5"
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
                  className={` w-[90%] flex justify-center items-center m-0 aspect-square text-[14px] rounded-lg 
                                    ${
                                      isEqual(day, today)
                                        ? " bg-ThemeRed text-white"
                                        : isEqual(day, currentValue)
                                        ? " bg-RegularColor text-white"
                                        : "hover:bg-RegularColor hover:text-white"
                                    }
                            
                                    ${
                                      isSameMonth(day, today) &&
                                      !isToday(day) &&
                                      "bg-white"
                                    } ${
                    period !== undefined &&
                    ` ${
                      (compareDesc(period.from, day) === 1 ||
                        compareDesc(period.from, day) === 0) &&
                      (compareDesc(period.to, day) === 0 ||
                        compareDesc(period.to, day) === -1)
                        ? ""
                        : ` pointer-events-none ${
                            !isEqual(day, today) && "bg-gray-200 "
                          }`
                    } `
                  } ${
                    birthday === true &&
                    compareDesc(YearCanbeSelected, day) === 1 &&
                    "pointer-events-none cursor-default bg-gray-200"
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
