import React, { useState } from "react";
import SelectDropdown from "../../../../Reusable/SelectDropdown";
import CustomerDropdown from "../../../../Dropdowns/CustomerDropdown";

export default function HeaderReceivePayment() {
    const [isCustomer, setCustomer] = useState({
        id: "",
        name: "",
        class: "",
        property: [],
    });
    const [isReceiptType, setReceiptType] = useState("");
    return (
        <>
            <section className="flex flex-wrap">
                <ul className="w-[25%] flex flex-col pr-10">
                    <li className="w-full mb-5">
                        <label htmlFor="" className="labelField">
                            CUSTOMER
                        </label>
                        <CustomerDropdown
                            isCustomer={isCustomer}
                            setCustomer={setCustomer}
                        />
                    </li>
                    <li className="w-full mb-5">
                        <label htmlFor="" className="labelField">
                            CLASS
                        </label>
                        <h1>{isCustomer.class}</h1>
                    </li>
                    <li>
                        <label htmlFor="" className="labelField">
                            PROPERTIES
                        </label>
                        <h1>
                            {isCustomer.property.toString().replace(",", ", ")}
                        </h1>
                    </li>
                </ul>
                <ul className=" flex flex-wrap justify-between border-l border-gray-300 w-[75%] pl-10">
                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT TYPE
                            <SelectDropdown
                                selectHandler={(value: string) => {
                                    setReceiptType(value);
                                }}
                                className=""
                                inputElement={
                                    <input
                                        className="w-full field"
                                        value={isReceiptType}
                                        readOnly
                                    />
                                }
                                listArray={[
                                    "Official",
                                    "Acknowledgement",
                                    "Provisional",
                                ]}
                            />
                        </label>
                    </li>
                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT DATE
                        </label>
                        <h1>Sep 28 2022</h1>
                    </li>
                    <li className="w-[30%]">
                        <label htmlFor="" className="labelField">
                            RECEIPT NO.
                        </label>
                        <h1>OR00000002</h1>
                    </li>

                    <li className="w-full">
                        <label htmlFor="" className="labelField">
                            DESCRIPTION
                        </label>
                        <input type="text" className="field w-full" />
                    </li>
                </ul>
            </section>
        </>
    );
}
