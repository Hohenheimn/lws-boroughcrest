import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BarLoader } from "react-spinners";
import DynamicPopOver from "./DynamicPopOver";
import { GetBA } from "./ReactQuery/BankAccount";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type Props = {
    isArrayBA: isObject[];
    setArrayBA: Function;
};

type isObject = {
    value: string;
    id: string | number;
    select: boolean;
};

export default function SelectBankAccount({ isArrayBA, setArrayBA }: Props) {
    const [isToggle, setToggle] = useState(false);
    const [tempVal, setTempVal] = useState<any>("");
    const [isAll, setAll] = useState(false);

    return (
        <>
            <DynamicPopOver
                className=""
                samewidth={false}
                toRef={
                    <input
                        type="text"
                        className=" field"
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
                                setTempVal={setTempVal}
                                isArrayBA={isArrayBA}
                                isAll={isAll}
                                setAll={setAll}
                                setArrayBA={setArrayBA}
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
    isArrayBA: isObject[];
    setArrayBA: Function;
    setTempVal: Function;
    isAll: boolean;
    setAll: Function;
};

type BankAccount = {
    id: string | number;
    bank_acc_no: string | number;
    bank_branch: string;
    status: string;
};

interface BankAccountSelect extends BankAccount {
    select: boolean;
}

const DropdownItems = ({
    setArrayBA,
    setTempVal,
    isArrayBA,
    setToggle,
    keyword,
    isAll,
    setAll,
}: DropdownItems) => {
    const { data, isLoading, isError } = GetBA(keyword);
    const [isBankAccount, setBankAccount] = useState<BankAccountSelect[]>([]);
    const table = useRef<any>();
    // Click out side
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!table.current.contains(e.target)) {
                setToggle(false);
                // setTempVal(isObject.value);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    // export selected item
    useEffect(() => {
        const clone = isBankAccount.filter((item: BankAccountSelect) => {
            if (item.select === true) {
                return {
                    select: true,
                    value: `${item.bank_acc_no} - ${item.bank_branch}`,
                    id: item.id,
                };
            }
        });
        setArrayBA(clone);
    }, [isBankAccount]);

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: BankAccount) => {
                return {
                    id: item.id,
                    bank_acc_no: item.bank_acc_no,
                    bank_branch: item.bank_branch,
                    status: item.status,
                    select: isArrayBA.some((el) => el.id === item.id),
                };
            });
            // Additional blank row field
            setBankAccount(CloneArray);
        }
    }, [data?.status]);

    const selectAll = () => {
        const CloneArray = isBankAccount.map((item: any) => {
            return {
                ...item,
                select: !isAll,
            };
        });
        // Additional blank row field
        setBankAccount(CloneArray);

        setAll(!isAll);
    };
    return (
        <>
            <table className="crud-table narrow" ref={table}>
                <thead>
                    <tr>
                        <th className="checkbox">
                            <input
                                type="checkbox"
                                checked={isAll}
                                onChange={selectAll}
                            />
                        </th>
                        <th className="text-white">BANK asda ACCOUNT NO.</th>
                        <th className="text-white">BANK & BRANCH</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && !isError && (
                        <>
                            {isBankAccount.map(
                                (item: BankAccountSelect, index: number) => (
                                    <List
                                        isBankAccount={isBankAccount}
                                        setBankAccount={setBankAccount}
                                        itemDetail={item}
                                        key={index}
                                        setAll={setAll}
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
            {isError ||
                (data?.data.length <= 0 && (
                    <div className="w-full flex justify-center py-3">
                        <h1>Bank Account cannot be found!</h1>
                    </div>
                ))}
        </>
    );
};

type List = {
    itemDetail: BankAccountSelect;
    setBankAccount: Function;
    isBankAccount: BankAccountSelect[];
    setAll: Function;
};

const List = ({ itemDetail, isBankAccount, setBankAccount, setAll }: List) => {
    const UpdateField = () => {
        const clone = isBankAccount.map((item: BankAccountSelect) => {
            if (itemDetail.id === item.id) {
                return {
                    ...item,
                    select: !itemDetail.select,
                };
            }
            return item;
        });
        setBankAccount(clone);
        setAll(false);
    };
    return (
        <tr
            className={`cursor-pointer  ${
                itemDetail.status === "No"
                    ? " bg-gray-300"
                    : "hover:bg-ThemeRed50 hover:text-white"
            }`}
        >
            <td className="checkbox">
                <input
                    type="checkbox"
                    checked={itemDetail.select}
                    onChange={UpdateField}
                />
            </td>
            <td className="relative">
                {itemDetail.status === "No" && (
                    <Tippy
                        theme="ThemeRed"
                        content={
                            <p className=" text-[12px]">lorem lorem lorem</p>
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
