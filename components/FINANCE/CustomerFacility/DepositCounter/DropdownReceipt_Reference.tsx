import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { isError, useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../../util/api";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";

type Props = {
    name: string;
    selectHandler: (value: string) => void;
    value: string | number;
    keyType: string;
    rowID: string | number;
};

export default function DropdownReceipt_Reference({
    name,
    selectHandler,
    value,
    keyType,
    rowID,
}: Props) {
    const [toggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState<string | number>("");
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
}: ListItem) => {
    const { isLoading, data, isError } = useQuery(
        ["DC-DD", name, tempSearch],
        () => {
            return api.get(
                `/finance/customer-facility/deposit-counter?list_type=receipt_book&status=unmatched?keywords=${tempSearch}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const [isReceipt, setReceipt] = useState([
        {
            receipt_no: "0000000333",
            reference_no: "RF48489754",
            id: 2,
            amount: 1000,
        },
        {
            receipt_no: "0000000334",
            reference_no: "RF48489755",
            id: 2,
            amount: 1000,
        },
        {
            receipt_no: "0000000335",
            reference_no: "RF48489756",
            id: 2,
            amount: 1000,
        },
    ]);

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
            {isReceipt.map((item, index) => (
                <li
                    key={index}
                    data-ref_ref_id={item.id}
                    data-receiptno={item.receipt_no}
                    data-referenceno={item.reference_no}
                    data-amount={item.amount}
                    data-rowid={rowID}
                    onClick={(e: any) => {
                        selectHandler(e);
                        setToggle(false);
                    }}
                >
                    {keyType === "receipt"
                        ? item.receipt_no
                        : item.reference_no}
                </li>
            ))}

            {/* {data?.data.map((item: any, index: number) => (
                <li key={index} onClick={selectHandler} data-id={item.id}>
                    {
                        key === 'receipt' ? item.receipt_no : item.reference_no
                    }
                </li>
            ))} */}

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

            {isError && <li>Receipt Book cannot be found!</li>}
        </ul>
    );
};
