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
    selecteRefRec: number[];
};

export default function DropdownReceipt_Reference({
    name,
    selectHandler,
    value,
    keyType,
    rowID,
    selecteRefRec,
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
                                selecteRefRec={selecteRefRec}
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
    selecteRefRec: number[];
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
    selecteRefRec,
}: ListItem) => {
    const { isLoading, data, isError } = useQuery(
        ["DD-RB", "Receipt-Book-dropdown", tempSearch],
        () => {
            return api.get(
                `/finance/customer-facility/deposit-counter?list_type=receipt_book&status=unmatched&keywords=${tempSearch}`,
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
                return {
                    receipt_no: item.receipt_no,
                    reference_no: item.reference_no,
                    id: item.id,
                    amount: item.amount_paid,
                };
            });
            const filterIndex = CloneArray.filter((item: Receipt) => {
                return !selecteRefRec.includes(item.id);
            });
            setReceipt(filterIndex);
        }
    }, [data, tempSearch]);

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
                    data-receiptno={
                        item.receipt_no === null
                            ? item.reference_no
                            : item.receipt_no
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
