import React, { useEffect, useState } from "react";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import { TableTwoTotal } from "../../../Reusable/TableTotal";
import { AdjustmentAccounts } from "./AdjustmentForm";
import DropDownCOA from "../../../Dropdowns/DropdownCOA";
import { validateCreditDebitField } from "../../General-Ledger/OpeningBalance/ValidateCreditDebitField";
import { MinusButtonTable, PlusButtonTable } from "../../../Reusable/Icons";

type Props = {
    toggle: boolean;
    isAccounts: AdjustmentAccounts[];
    setAccounts: Function;
};

export default function AccountTable({
    toggle,
    isAccounts,
    setAccounts,
}: Props) {
    return (
        <div className="py-10 1550px:py-5">
            <h1 className=" text-RegularColor text-[22px] 1550px:text-[20px] mb-5 1550px:mb-3">
                Account
            </h1>
            <div className="table_container hAuto">
                <table className="table_list ">
                    <thead className="textRed">
                        <tr>
                            <th>CHART CODE</th>
                            <th>ACCOUNT NAME</th>
                            <th>DEBIT ACCOUNT</th>
                            <th>CREDIT ACCOUNT</th>
                            {toggle && <th></th>}
                        </tr>
                    </thead>
                    <tbody className="textBlack">
                        {isAccounts.map((item: AdjustmentAccounts, index) => (
                            <List
                                itemDetail={item}
                                key={index}
                                index={index}
                                isAccounts={isAccounts}
                                setAccounts={setAccounts}
                                toggle={toggle}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <TableTwoTotal total1={100} total2={100} />
        </div>
    );
}

type ListProps = {
    itemDetail: AdjustmentAccounts;
    index: number;
    isAccounts: AdjustmentAccounts[];
    setAccounts: Function;
    toggle: boolean;
};

const List = ({
    itemDetail,
    index,
    isAccounts,
    setAccounts,
    toggle,
}: ListProps) => {
    const [isAccountName, setAccountName] = useState({
        accountName: itemDetail.account_name,
    });
    const [debitValidate, setDebitValidate] = useState("");
    const [creditValidate, setcreditValidate] = useState("");
    useEffect(() => {
        validateCreditDebitField(
            itemDetail.debit,
            itemDetail.credit,
            setDebitValidate,
            setcreditValidate
        );
    }, [itemDetail.debit, itemDetail.credit]);

    const UpdateStateHandler = (key: string, value: any) => {
        const newItems = isAccounts.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "debit") {
                    return {
                        ...item,
                        credit: "",
                        debit: Number(value),
                    };
                }
                if (key === "credit") {
                    return {
                        ...item,
                        credit: Number(value),
                        debit: "",
                    };
                }
            }
            return item;
        });
        setAccounts(newItems);
    };

    const RemoveJournal = () => {
        setAccounts((item: AdjustmentAccounts[]) =>
            item.filter((x: any) => x.id !== itemDetail.id)
        );
    };

    const AddJournal = (e: any) => {
        const random = Math.random();
        setAccounts([
            ...isAccounts,
            {
                id: random,
                coa_id: 1,
                chart_code: "",
                account_name: "",
                debit: 0,
                credit: 0,
            },
        ]);
    };
    return (
        <tr>
            <td>
                {toggle ? (
                    <input
                        type="text"
                        className="field disabled"
                        readOnly
                        value={itemDetail.chart_code}
                    />
                ) : (
                    itemDetail.chart_code
                )}
            </td>
            <td>
                {toggle ? (
                    <DropDownCOA
                        UpdateStateHandler={(key: string, e: any) => {
                            const newItems = isAccounts.map(
                                (item: AdjustmentAccounts) => {
                                    if (itemDetail.id == item.id) {
                                        return {
                                            ...item,
                                            coa_id: e.target.getAttribute(
                                                "data-id"
                                            ),
                                            chart_code:
                                                e.target.getAttribute(
                                                    "data-code"
                                                ),
                                            account_name: e.target.innerHTML,
                                        };
                                    }
                                    return item;
                                }
                            );
                            setAccounts(newItems);
                        }}
                        itemDetail={isAccountName}
                    />
                ) : (
                    itemDetail.account_name
                )}
            </td>
            <td>
                {toggle ? (
                    <InputNumberForTable
                        className={`number field inline-block w-full bg-white ${debitValidate} `}
                        value={itemDetail.debit}
                        onChange={UpdateStateHandler}
                        type={"debit"}
                    />
                ) : (
                    <TextNumberDisplay
                        className="withPeso w-full text-end"
                        value={itemDetail.debit}
                    />
                )}
            </td>
            <td>
                {toggle ? (
                    <InputNumberForTable
                        className={`number field inline-block w-full bg-white ${creditValidate} `}
                        value={itemDetail.credit}
                        onChange={UpdateStateHandler}
                        type={"credit"}
                    />
                ) : (
                    <TextNumberDisplay
                        className="withPeso w-full text-end"
                        value={itemDetail.credit}
                    />
                )}
            </td>

            {toggle && (
                <td className="actionIcon flex items-center">
                    {isAccounts.length > 1 && (
                        <div onClick={RemoveJournal}>
                            <MinusButtonTable />
                        </div>
                    )}
                    {isAccounts.length - 1 === index && (
                        <div
                            className="ml-5 1024px:ml-2"
                            onClick={(e) => AddJournal(e)}
                        >
                            <PlusButtonTable />
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
};
