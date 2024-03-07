import React, { useEffect, useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

type Pagination = {
  setTablePage: Function;
  tablePage: number;
  totalPage: number;
};

export default function Pagination({
  setTablePage,
  tablePage,
  totalPage,
}: Pagination) {
  const SelectPage = (page: number) => {
    const SelectedPage = Number(page);
    setTablePage(SelectedPage);
  };

  const getPreviousAndNextNumbers = (number: number) => {
    const result = [];

    for (let i = number - 2; i <= number + 2; i++) {
      if (i >= 1 && i <= totalPage) {
        result.push(i);
      }
    }
    return result;
  };

  const [currentPages, setCurrentPages] = useState([1]);

  useEffect(() => {
    const activePage = getPreviousAndNextNumbers(tablePage);
    setCurrentPages(activePage);
  }, [tablePage, totalPage]);

  return (
    <div className=" w-full flex justify-end ">
      <ul className=" flex items-center  ">
        <li>
          <button
            className="flex items-center"
            disabled={1 === tablePage && true}
            onClick={() => setTablePage((page: number) => page - 1)}
          >
            <RiArrowLeftSLine className="text-[24px] text-black cursor-pointer" />
          </button>
        </li>

        {tablePage > 3 && (
          <li className=" flex items-center text-gray-400 border-4 border-white">
            <div
              onClick={() => SelectPage(1)}
              className={`${
                tablePage === 1 && " text-ThemeRed"
              } w-10 h-8 bg-gray-100 border-r border-white font-bold size-16 flex justify-center items-center cursor-pointer`}
            >
              {1}...
            </div>
          </li>
        )}

        <li className=" flex items-center text-gray-400 border-4 border-white ">
          {currentPages.map((item) => (
            <div
              onClick={() => SelectPage(item)}
              key={item}
              className={`${
                tablePage === item && " text-ThemeRed"
              } w-8 aspect-square bg-gray-100 border-r border-white font-bold size-16 flex justify-center items-center cursor-pointer`}
            >
              {item}
            </div>
          ))}
        </li>
        {tablePage < totalPage - 2 && (
          <li className=" flex items-center text-gray-400 border-4 border-white">
            <div
              onClick={() => SelectPage(totalPage)}
              className={`${
                tablePage === totalPage && " text-ThemeRed"
              } w-10 h-8 bg-gray-100 border-r border-white font-bold size-16 flex justify-center items-center cursor-pointer`}
            >
              ...{totalPage}
            </div>
          </li>
        )}

        <li>
          <button
            className="flex items-center"
            onClick={() => setTablePage((page: number) => page + 1)}
            disabled={tablePage === totalPage}
          >
            <RiArrowRightSLine className=" text-[24px] text-black cursor-pointer" />
          </button>
        </li>
      </ul>
    </div>
  );
}
