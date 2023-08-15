import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";

import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";

type DropdownItem = {
  UpdateStateHandler: (value: string) => void;
  value: string;
  className?: string;
};

export default function CitizenDropdown({
  UpdateStateHandler,
  value,
  className,
}: DropdownItem) {
  const [isToggle, setToggle] = useState(false);
  const [tempSearch, setTempSearch] = useState(value);
  useEffect(() => {
    setTempSearch(value);
  }, [value]);
  return (
    <>
      <DynamicPopOver
        rightPosition={true}
        className={"w-full"}
        samewidth={true}
        toRef={
          <input
            type="text"
            className={` field w-full ` + className}
            onClick={() => setToggle(true)}
            value={tempSearch}
            onChange={(e) => {
              setTempSearch(e.target.value);
            }}
          />
        }
        toPop={
          <>
            {isToggle && (
              <List
                setToggle={setToggle}
                tempSearch={tempSearch}
                setTempSearch={setTempSearch}
                UpdateStateHandler={UpdateStateHandler}
                value={value}
              />
            )}
          </>
        }
      />
    </>
  );
}

type List = {
  setToggle: Function;
  setTempSearch: Function;
  UpdateStateHandler: (value: string) => void;
  value: string;
  tempSearch: string;
};

const List = ({
  setToggle,
  tempSearch,
  setTempSearch,
  UpdateStateHandler,
  value,
}: List) => {
  // Reset show item when open
  const [showItemAll, setshowItemAll] = useState(true);
  const keywordSearch = showItemAll ? "" : tempSearch;
  useEffect(() => {
    if (value !== tempSearch) {
      setshowItemAll(false);
    }
  }, [tempSearch]);
  // end
  const { data, isLoading, isError } = useQuery(
    ["get-citizenship", "citizenship", keywordSearch],
    () => {
      return api.get(`/customer-portal/nationality?search=${keywordSearch}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    }
  );

  const PopOver = useRef<any>();

  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!PopOver.current.contains(e.target)) {
        setToggle(false);
        setTempSearch(value);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });
  return (
    <ul className="dropdown-list" ref={PopOver}>
      <li
        onClick={(e) => {
          UpdateStateHandler("Philippine, Filipino");
          setTempSearch("Philippine, Filipino");
          setToggle(false);
        }}
      >
        Philippine, Filipino
      </li>
      {data?.data.map((item: any, index: number) => (
        <li
          key={index}
          onClick={(e) => {
            UpdateStateHandler(item.label);
            setTempSearch(item.label);
            setToggle(false);
          }}
        >
          {item.label}
        </li>
      ))}
      {isLoading && (
        <li>
          <div>
            <BarLoader
              color={"#8f384d"}
              height="5px"
              width="100px"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </li>
      )}
      {isError ||
        (data?.data.length <= 0 && (
          <li>
            <h1 className="text-center">No Citizen found!</h1>
          </li>
        ))}
    </ul>
  );
};
