import React, { useEffect, useState } from "react";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../../../Reusable/NumberFormat";
import { TableThreeTotal } from "../../../../../Reusable/TableTotal";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../../../../Reusable/TableErrorMessage";

export type Outstanding = {
    id: string | number;
    document_no: string;
    charge: string;
    charge_id: string;
    description: string;
    due_amount: number;
    applied_amount: number;
    balance: number;
};

type Props = {
    Error: () => void;
    DefaultOutstanding: Outstanding[];
    setDefaultValue: Function;
    amount_paid: number;
    customer_id: string | number;
    outStandingError: boolean;
    outStandingLoading: boolean;
    setDueAmountTotal: Function;
    isDueAmountTotal: number;
    setAppliedAmount: Function;
    isAppliedAmount: number;
    setBalanceAmount: Function;
    isBalanceTotal: number;
};

export default function OutStandingBalance({
    DefaultOutstanding,
    setDefaultValue,
    amount_paid,
    customer_id,
    outStandingError,
    outStandingLoading,
    setDueAmountTotal,
    isDueAmountTotal,
    setAppliedAmount,
    isAppliedAmount,
    setBalanceAmount,
    isBalanceTotal,
}: Props) {
    const [isToggle, setToggle] = useState(false);
    useEffect(() => {
        setDueAmountTotal(0);
        setAppliedAmount(0);
        setBalanceAmount(0);
        DefaultOutstanding?.map((item) => {
            setDueAmountTotal(
                (prev: number) => Number(prev) + Number(item.due_amount)
            );
            setAppliedAmount(
                (prev: number) => Number(prev) + Number(item.applied_amount)
            );
            setBalanceAmount(
                (prev: number) => Number(prev) + Number(item.balance)
            );
        });
    }, [DefaultOutstanding]);

    const SetToggleHandler = () => {
        setToggle(!isToggle);
        if (isToggle) {
            Compute();
        }
    };

    const Compute = () => {
        const AppliedAmount =
            Number(amount_paid) / Number(DefaultOutstanding?.length);
        const CloneToUpdate = DefaultOutstanding?.map((item: Outstanding) => {
            const balance = Number(item.due_amount) - Number(AppliedAmount);
            if (!isToggle) {
                return {
                    ...item,
                    applied_amount: AppliedAmount,
                    balance: balance <= 0 ? 0 : balance,
                };
            } else {
                return {
                    ...item,
                    applied_amount: 0,
                    balance: item.due_amount,
                };
            }
        });
        setDefaultValue(CloneToUpdate);
    };

    useEffect(() => {
        Compute();
    }, [amount_paid, isToggle]);

    return (
        <div className="border-b border-gray-300">
            <div className=" flex justify-between items-center">
                <h1 className="SectionTitle mb-5">Outstanding Balance</h1>
                <div
                    onClick={SetToggleHandler}
                    className={`cursor-pointer duration-300 ease-in-out delay-100 text-[#828282] relative h-[28px]  py-[2px] px-[10px] rounded-[50px] ${
                        !isToggle
                            ? "pr-[30px] bg-[#4a4a4a]"
                            : "pl-[30px] bg-[#b7b7b7]"
                    }`}
                >
                    <p className=" -mt-[1px]">Heirarchy</p>
                    <div
                        className={`h-[20px] duration-300 ease-in-out w-[20px] bg-ThemeRed rounded-full absolute top-[50%] translate-y-[-50%] ${
                            !isToggle ? "right-[5px]" : "right-[78px]"
                        }`}
                    ></div>
                </div>
            </div>
            <div className="table_container">
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            <th>DOCUMENT NO</th>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>DUE AMOUNT</th>
                            <th>APPLIED PAYMENT</th>
                            <th>BALANCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer_id !== "" && (
                            <>
                                {DefaultOutstanding?.map((item, index) => (
                                    <List
                                        key={index}
                                        itemDetail={item}
                                        isTable={DefaultOutstanding}
                                        setTable={setDefaultValue}
                                        index={index}
                                        isToggle={isToggle}
                                    />
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
                {outStandingLoading && (
                    <div className="w-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="10px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                {outStandingError && <TableErrorMessage />}
            </div>
            <TableThreeTotal
                total1={isDueAmountTotal}
                total2={isAppliedAmount}
                total3={isBalanceTotal}
                label={"SUB DUE"}
                redBG={false}
            />
        </div>
    );
}

type List = {
    setTable: Function;
    isTable: Outstanding[];
    itemDetail: Outstanding;
    index: number;
    isToggle: boolean;
};

const List = ({ setTable, isTable, itemDetail, index, isToggle }: List) => {
    const updateValue = (keyField: string, value: string | number) => {
        const closeToUpdate = isTable?.map((item: Outstanding) => {
            if (item.id === itemDetail.id) {
                if (keyField === "applied_payment") {
                    const balance = Number(item.due_amount) - Number(value);
                    return {
                        ...item,
                        applied_amount: value,
                        balance: balance <= 0 ? 0 : balance,
                    };
                }
            }
            return item;
        });
        setTable(closeToUpdate);
    };

    return (
        <tr>
            <td>{itemDetail.document_no}</td>
            <td>{itemDetail.charge}</td>
            <td>{itemDetail.description}</td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.due_amount}
                    className="withPeso w-full"
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`field number text-end ${
                        !isToggle && "disabled"
                    }`}
                    value={Number(itemDetail?.applied_amount)}
                    onChange={updateValue}
                    type={"applied_payment"}
                />
            </td>
            <td>
                <TextNumberDisplay
                    value={itemDetail.balance}
                    className="withPeso w-full"
                />
            </td>
        </tr>
    );
};
