import React, { useState } from "react";
import Image from "next/image";
import Calendar from "../../../Calendar";
import { TextNumberDisplay } from "../../../NumberFormat";
import BankAccountDropDown from "../../../BankAccountDropDown";

type Props = {
    id?: number;
};

export default function DepositForm({ id }: Props) {
    const [isDate, setDate] = useState({
        toggle: false,
        value: "",
    });
    const [isBankAccount, setBankAccount] = useState({
        id: "",
        value: "",
    });
    return (
        <>
            <h1 className=" text-[24px] 1366px:text-[20px] mb-5 480px:mb-2 flex items-center">
                {id !== undefined ? "Modify Deposit" : "Create Deposit"}
            </h1>
            <ul className="flex flex-wrap justify-between pb-8 mb-8">
                <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
                    <p className="labelField">DEPOSIT DATE</p>
                    <div className="calendar">
                        <span className="cal">
                            <Image
                                src="/Images/CalendarMini.png"
                                width={15}
                                height={15}
                                alt=""
                            />
                        </span>
                        <input
                            type="text"
                            value={isDate.value}
                            onChange={() => {}}
                            placeholder="dd/mm/yyyy"
                            onClick={() => setDate({ ...isDate, toggle: true })}
                        />
                        {isDate.toggle && (
                            <Calendar value={isDate} setValue={setDate} />
                        )}
                    </div>
                </li>
                <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
                    <p className=" labelField">REFERENCE NO.</p>
                    <input type="text" className="field" />
                </li>
                <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
                    <p className=" labelField">BANK</p>
                    <BankAccountDropDown
                        isObject={isBankAccount}
                        setObject={setBankAccount}
                    />
                </li>
                <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
                    <p className=" labelField">REFERENCE NO.</p>
                    <h1>
                        <TextNumberDisplay
                            className="withPeso font-NHU-medium"
                            value={2000}
                        />
                    </h1>
                </li>
            </ul>
            <h1 className=" text-[20px] 1366px:text-[17px] mb-5 480px:mb-2 flex items-center lowGray">
                Cash Receipts
            </h1>
            <div className="table_container">
                <table className="table_list">
                    <thead className="textRed">
                        <tr>
                            <th className="checkbox">
                                <div className="item">
                                    <input type="checkbox" />
                                </div>
                            </th>
                            <th>DOCUMENT DATE</th>
                            <th>CUSTOMER</th>
                            <th>RECEIPT NO.</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                        <List />
                        <List />
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <button className="buttonRed">SAVE</button>
            </div>
        </>
    );
}

const List = () => {
    return (
        <tr>
            <td className="checkbox">
                <div className="item">
                    <input type="checkbox" />
                </div>
            </td>
            <td>Oct 10 2022</td>
            <td>John Doe</td>
            <td>OR000022</td>
            <td>
                <TextNumberDisplay className="withPeso" value={1000} />
            </td>
        </tr>
    );
};
