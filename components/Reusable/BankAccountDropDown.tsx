import React, { useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BarLoader } from "react-spinners";
import DynamicPopOver from "./DynamicPopOver";
import { GetBA } from "../ReactQuery/BankAccount";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type Props = {
    isObject: {
        value: string;
        id: string | number;
    };
    setObject: Function;
};

export default function BankAccountDropDown({ isObject, setObject }: Props) {
    const [isToggle, setToggle] = useState(false);
    const [tempVal, setTempVal] = useState<any>(isObject.value);

    const UpdateHandler = (
        id: string | number,
        account_no: string | number,
        branch: string
    ) => {
        setTempVal(`${account_no} - ${branch}`);
        setToggle(false);
        setObject({
            id: id,
            value: `${account_no} - ${branch}`,
        });
    };
    return (
        <>
            <DynamicPopOver
                className=""
                samewidth={false}
                toRef={
                    <input
                        type="text"
                        className=" field w-full"
                        onClick={() => setToggle(true)}
                        value={tempVal}
                        onChange={(e) => {
                            setTempVal(e.target.value);
                        }}
                    />
                }
                toPop={
                    <>
                        {isToggle && (
                            <DropdownItems
                                setToggle={setToggle}
                                keyword={tempVal}
                                UpdateHandler={UpdateHandler}
                                setTempVal={setTempVal}
                                isObject={isObject}
                            />
                        )}
                    </>
                }
            />
        </>
    );
}

type DropdownItems = {
    setToggle: Function;
    keyword: string;
    UpdateHandler: (
        id: string | number,
        account_no: string | number,
        branch: string
    ) => void;
    isObject: {
        id: string | number;
        value: string;
    };
    setTempVal: Function;
};

type BankAccount = {
    id: string | number;
    bank_acc_no: string | number;
    bank_branch: string;
    status: string;
};

const DropdownItems = ({
    setTempVal,
    isObject,
    setToggle,
    keyword,
    UpdateHandler,
}: DropdownItems) => {
    // Reset show item when open
    const [showItemAll, setshowItemAll] = useState(true);
    const keywordSearch = showItemAll ? "" : keyword;
    useEffect(() => {
        if (isObject.value !== keyword) {
            setshowItemAll(false);
        }
    }, [keyword]);
    // end

    const { data, isLoading, isError } = GetBA(keywordSearch);

    const table = useRef<any>();

    // Click out side
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!table.current.contains(e.target)) {
                setToggle(false);
                setTempVal(isObject.value);
                setshowItemAll(true);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <>
            <table className="crud-table narrow" ref={table}>
                <thead>
                    <tr>
                        <th className="text-white">BANK ACCOUNT NO.</th>
                        <th className="text-white">BANK & BRANCH</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && !isError && (
                        <>
                            {data?.data.map(
                                (item: BankAccount, index: number) => (
                                    <List
                                        itemDetail={item}
                                        key={index}
                                        UpdateHandler={UpdateHandler}
                                    />
                                )
                            )}
                        </>
                    )}
                </tbody>
            </table>
            {isLoading && (
                <div className="w-full flex justify-center py-3">
                    <BarLoader
                        color={"#8f384d"}
                        height="5px"
                        width="100px"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}
            {isError && (
                <div className="w-full flex justify-center py-3">
                    <h1>Bank Account cannot be found!</h1>
                </div>
            )}
        </>
    );
};

type List = {
    itemDetail: BankAccount;
    UpdateHandler: (
        id: string | number,
        account_no: string | number,
        branch: string
    ) => void;
};

const List = ({ itemDetail, UpdateHandler }: List) => {
    return (
        <tr
            className={`cursor-pointer  ${
                itemDetail.status === "No"
                    ? " bg-gray-300"
                    : "hover:bg-ThemeRed50 hover:text-white"
            }`}
            onClick={(e) =>
                itemDetail.status !== "No" &&
                UpdateHandler(
                    itemDetail.id,
                    itemDetail.bank_acc_no,
                    itemDetail.bank_branch
                )
            }
        >
            <td className="relative">
                {itemDetail.status === "No" && (
                    <Tippy
                        theme="ThemeRed"
                        content={
                            <p className=" text-[12px]">
                                No cash Inbound or Outbound
                            </p>
                        }
                    >
                        <div className="absolute left-[5px] top-[50%] translate-y-[-50%] text-[14px] text-ThemeRed">
                            <AiOutlineInfoCircle />
                        </div>
                    </Tippy>
                )}
                <p className=" ml-4">{itemDetail.bank_acc_no}</p>
            </td>
            <td>
                <p>{itemDetail.bank_branch}</p>
            </td>
        </tr>
    );
};
