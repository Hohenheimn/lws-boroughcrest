import React, { useEffect, useState } from "react";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import SelectDropdown from "../../../Reusable/SelectDropdown";
import DropDownCharge from "../../../Dropdowns/DropDownCharge";
import { AdjustmentHeaderForm } from "./AdjustmentForm";

type Props = {
    setHeaderForm: Function;
    HeaderForm: AdjustmentHeaderForm;
    isCharge: { charge: string; charge_id: string | number };
    setCharge: Function;
    isTransaction: string;
    setTransaction: Function;
};

export default function ChargeTransaction({
    HeaderForm,
    setHeaderForm,
    isCharge,
    setCharge,
    isTransaction,
    setTransaction,
}: Props) {
    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            charge_id: Number(isCharge.charge_id),
        });
    }, [isCharge]);
    return (
        <ul className="w-full flex flex-wrap border-b border-gray-300">
            <li className="w-8/12 640px:w-full 640px:pr-0 640px:pb-0 640px:border-none pr-10 py-10 1550px:pr-5 1550px:py-5 flex flex-col justify-start items-start border-r border-gray-300">
                <div className="flex items-center mb-5 640px:w-full">
                    <label htmlFor="" className="labelField">
                        CHARGE
                    </label>
                    <DropDownCharge
                        UpdateStateHandler={(key, e) => {
                            setCharge({
                                charge: e.target.innerHTML,
                                charge_id: e.target.getAttribute("data-id"),
                            });
                        }}
                        itemDetail={isCharge}
                    />
                </div>
                <div className="table_container w-full hAuto">
                    <table className="table_list">
                        <thead className="textRed">
                            <tr>
                                <th>DOCUMENT DATE</th>
                                <th>DOCUMENT NO.</th>
                                <th>DESCRIPTION</th>
                                <th>AMOUNT DUE</th>
                                <th>REMAINING&nbsp;ADVANCES</th>
                            </tr>
                        </thead>
                        <tbody className="textBlack">
                            <tr>
                                <td>Lorem, ipsum.</td>
                                <td>Lorem, ipsum.</td>
                                <td>Lorem, ipsum.</td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-end"
                                        value={1000}
                                    />
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-end"
                                        value={1000}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
            <li className="w-4/12 640px:w-full 640px:pl-0 640px:pt-0 pl-10 py-10 1550px:pl-5 1550px:py-5">
                <div className="flex items-center mb-5">
                    <label htmlFor="" className="labelField">
                        TRANSACTION
                    </label>
                    <SelectDropdown
                        selectHandler={(value: string) => {
                            setTransaction(value);
                        }}
                        className=""
                        inputElement={
                            <input className="w-full field" value="" readOnly />
                        }
                        listArray={[
                            "Apply Advances",
                            "Discount",
                            "Credit Tax",
                            "Charge Reversal",
                        ]}
                    />
                </div>
                <div className="table_container hAuto">
                    <table className="table_list">
                        <thead className="textRed">
                            <tr>
                                <th>ADJUSTMENT</th>
                                <th>BALANCE</th>
                            </tr>
                        </thead>
                        <tbody className="textBlack">
                            <tr>
                                <td>
                                    <InputNumberForTable
                                        className={"field w-full"}
                                        value={1000}
                                        onChange={function (
                                            type: string,
                                            value: string | number
                                        ): void {
                                            throw new Error(
                                                "Function not implemented."
                                            );
                                        }}
                                        type={""}
                                    />
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-end"
                                        value={1000}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4 className=" text-ThemeRed text-end">
                                        SUB TOTAL
                                    </h4>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-end"
                                        value={1000}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <button className="buttonRed">APPLY</button>
                </div>
            </li>
        </ul>
    );
}
