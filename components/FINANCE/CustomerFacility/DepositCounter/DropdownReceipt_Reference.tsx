import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { isError, useQuery } from "react-query";
import { BarLoader } from "react-spinners";

import api from "../../../../util/api";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";

type Props = {
  name: string;
  selectHandler: (value: string) => void;
  value: string | number;
  keyTypeOutSide: string;
  rowID: string | number;
  selecteRec: string[];
  selecteRef: string[];
  setSelectField: (field: string) => void;
};

export default function DropdownReceipt_Reference({
  name,
  selectHandler,
  value,
  keyTypeOutSide,
  rowID,
  selecteRec,
  selecteRef,
  setSelectField,
}: Props) {
  console.log(value);

  const [toggle, setToggle] = useState(false);

  const [tempSearch, setTempSearch] = useState<string | number>("");

  const keyType = keyTypeOutSide.replace("-first", "");

  useEffect(() => {
    if (!keyTypeOutSide.includes("-first")) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [keyType]);

  useEffect(() => {
    setTempSearch(value);
  }, [value]);

  return (
    <>
      <DynamicPopOver
        samewidth={true}
        className="inline"
        toRef={
          <>
            <input
              type="text"
              className="field"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onClick={() => setToggle(true)}
            />
          </>
        }
        toPop={
          <>
            {toggle && (
              <ListItem
                name={name}
                tempSearch={tempSearch}
                setTempSearch={setTempSearch}
                value={value}
                selectHandler={selectHandler}
                setToggle={setToggle}
                keyType={keyType}
                rowID={rowID}
                selecteRec={selecteRec}
                selecteRef={selecteRef}
                setSelectField={setSelectField}
              />
            )}
          </>
        }
      />
    </>
  );
}

type ListItem = {
  name: string;
  tempSearch: string | number;
  setTempSearch: Function;
  value: string | number;
  selectHandler: (value: string) => void;
  setToggle: Function;
  keyType: string;
  rowID: string | number;
  selecteRec: string[];
  selecteRef: string[];
  setSelectField: (field: string) => void;
};
type Receipt = {
  receipt_no: string;
  reference_no: string;
  id: number;
  amount: number;
};
const ListItem = ({
  name,
  tempSearch,
  selectHandler,
  value,
  setTempSearch,
  setToggle,
  keyType,
  rowID,
  selecteRec,
  selecteRef,
  setSelectField,
}: ListItem) => {
  // Reset show item when open
  const [showItemAll, setshowItemAll] = useState(true);
  const keywordSearch = showItemAll ? "" : tempSearch;
  useEffect(() => {
    if (value !== tempSearch) {
      setshowItemAll(false);
    }
  }, [tempSearch]);
  // end
  const { isLoading, data, isError } = useQuery(
    ["DD-RB", "Receipt-Book-dropdown", keywordSearch],
    () => {
      return api.get(
        `/finance/customer-facility/deposit-counter?list_type=receipt_book&status=unmatched&keywords=${
          keywordSearch === undefined ? "" : keywordSearch
        }`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    }
  );
  const [isReceipt, setReceipt] = useState<Receipt[]>([]);

  useEffect(() => {
    if (data?.status === 200) {
      const CloneArray = data?.data.map((item: any) => {
        if (keyType === "reference") {
          if (item.receipt_no === null) {
            return {
              receipt_no: item.receipt_no,
              reference_no: item.reference_no,
              id: item.id,
              amount: item.amount_paid,
            };
          }
        } else {
          if (item.reference_no !== null) {
            return {
              receipt_no: item.receipt_no,
              reference_no: item.reference_no,
              id: item.id,
              amount: item.amount_paid,
            };
          }
        }
      });
      const filterUndefined = CloneArray.filter(
        (filter: any) => filter !== undefined
      );
      const selecteRefRec = [...selecteRec, ...selecteRef];

      const filterIndex = filterUndefined.filter((item: any) => {
        return !selecteRefRec?.includes(
          keyType === "reference" ? item.reference_no : item.receipt_no
        );
      });
      setReceipt(filterIndex);
    }
  }, [data?.data, tempSearch]);

  const modal = useRef<any>();

  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!modal?.current?.contains(e.target)) {
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
    <ul ref={modal} className="dropdown-list w-full">
      <li onClick={() => setSelectField("")}>Select Field ({keyType})</li>
      {isReceipt.map((item, index) => (
        <li
          key={index}
          data-ref_ref_id={item.id}
          data-receiptno={
            item.receipt_no === null ? item.reference_no : item.receipt_no
          }
          data-referenceno={item.reference_no}
          data-amount={item.amount}
          data-rowid={rowID}
          onClick={(e: any) => {
            selectHandler(e);
            setToggle(false);
          }}
        >
          {keyType === "receipt"
            ? item.receipt_no === null
              ? item.reference_no
              : item.receipt_no
            : item.reference_no}
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

      {isError && <li>Something is wrong!</li>}
      {isReceipt.length <= 0 && !isLoading && (
        <li>No Receipt Book unmatched found!</li>
      )}
    </ul>
  );
};
