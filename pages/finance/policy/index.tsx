import React, { useState } from "react";
import { PencilButton } from "../../../components/Reusable/Icons";

type FinanceReference = {
    document: string;
    prefix: string;
    serial: string;
    serial2: string;
    id: number;
};

export default function Policy() {
    const [isToggle, setToggle] = useState(false);
    const [FinanceReference, setFinanceReference] = useState([
        {
            id: 1,
            document: "Invoice",
            prefix: "INV",
            serial: "10001",
            serial2: "99999",
        },
        {
            id: 12,
            document: "Journal",
            prefix: "JOUR",
            serial: "10001",
            serial2: "99999",
        },
        {
            id: 13,
            document: "Official Receipt",
            prefix: "OR",
            serial: "10001",
            serial2: "99999",
        },
        {
            id: 14,
            document: "Acknowledge Receipt",
            prefix: "AR",
            serial: "10001",
            serial2: "99999",
        },
        {
            id: 15,
            document: "Provisional Receipt",
            prefix: "PR",
            serial: "10001",
            serial2: "99999",
        },
        {
            id: 16,
            document: "Customer Debit Notes",
            prefix: "CDN",
            serial: "10001",
            serial2: "99999",
        },
        {
            id: 17,
            document: "Customer Credit Notes",
            prefix: "CCN",
            serial: "10001",
            serial2: "99999",
        },
    ]);

    const UpdateValue = (key: string, value: string, id: number) => {
        const cloneToUpdate = FinanceReference.map((item) => {
            if (item.id === id) {
                if (key === "prefix") {
                    return {
                        ...item,
                        prefix: value,
                    };
                }
                if (key === "serial") {
                    return {
                        ...item,
                        serial: value,
                    };
                }
                if (key === "serial2") {
                    return {
                        ...item,
                        serial2: value,
                    };
                }
            }
            return item;
        });
        setFinanceReference(cloneToUpdate);
    };

    return (
        <div className="py-20 640px:py-10">
            <h1 className="pageTitle mb-5">Finance Policy</h1>
            <ul
                className={` duration-200 ease-in-out flex relative w-full p-10 rounded-2xl 480px:p-8 ${
                    !isToggle && "shadow-lg bg-white"
                }`}
            >
                <li className="absolute top-4 right-4">
                    {!isToggle && (
                        <PencilButton
                            FunctionOnClick={() => {
                                setToggle(true);
                            }}
                            title={"Modify"}
                        />
                    )}
                </li>
                <li className="w-2/12 640px:hidden">
                    <div className=" mb-10 640px:mb-5">
                        <h4 className="main_text noMB">FINANCE PERIOD</h4>
                    </div>
                    <div>
                        <h4 className="main_text noMB">FINANCE REFERENCE</h4>
                    </div>
                </li>
                <li className="border-l pl-10 ml-10 640px:m-0 640px:p-0 640px:border-none w-full overflow-auto">
                    <h4 className="main_text noMB hidden 640px:block">
                        FINANCE PERIOD
                    </h4>
                    <section className="flex items-center mb-10 ">
                        <input
                            type="text"
                            className={`field mr-5 ${
                                !isToggle && "noStyle"
                            } duration-200 ease-in-out`}
                            value="Calendar"
                            readOnly
                        />
                        <input
                            type="text"
                            className={`field ${
                                !isToggle && "noStyle"
                            } duration-200 ease-in-out`}
                            value="2022"
                            readOnly
                        />
                    </section>
                    <h4 className="main_text noMB hidden 640px:block">
                        FINANCE REFERENCE
                    </h4>
                    <section className=" 640px:mt-5">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="label_text">DOCUMENT</th>
                                    <th className="label_text">PREFIX</th>
                                    <th className="label_text">SERIAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FinanceReference.map(
                                    (item: FinanceReference, index) => (
                                        <tr key={index}>
                                            <td className="py-2 pr-5 min-w-[200px]">
                                                <h4 className="main_text noMB">
                                                    {item.document}
                                                </h4>
                                            </td>
                                            <td className="pr-5 py-2">
                                                {isToggle ? (
                                                    <input
                                                        type="text"
                                                        className={`field duration-200 ease-in-out`}
                                                        value={item.prefix}
                                                        onChange={(e) =>
                                                            UpdateValue(
                                                                "prefix",
                                                                e.target.value,
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <h4 className="main_text noMB">
                                                        {item.prefix}
                                                    </h4>
                                                )}
                                            </td>
                                            <td className="flex items-center py-2">
                                                {isToggle ? (
                                                    <input
                                                        type="text"
                                                        className={`field duration-200 ease-in-out`}
                                                        value={item.serial}
                                                        onChange={(e) =>
                                                            UpdateValue(
                                                                "serial",
                                                                e.target.value,
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <h4 className="main_text noMB">
                                                        {item.serial}
                                                    </h4>
                                                )}
                                                <span className=" text-DarkBlue font-NHU-bold mx-5">
                                                    -
                                                </span>{" "}
                                                {isToggle ? (
                                                    <input
                                                        type="text"
                                                        className={`field duration-200 ease-in-out`}
                                                        value={item.serial2}
                                                        onChange={(e) =>
                                                            UpdateValue(
                                                                "serial2",
                                                                e.target.value,
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <h4 className="main_text noMB">
                                                        {item.serial2}
                                                    </h4>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </section>
                </li>
            </ul>
            {isToggle && (
                <div className="flex justify-end items-center mt-5 1550px:mt-2">
                    <button
                        className="button_cancel"
                        onClick={() => setToggle(false)}
                    >
                        CANCEL
                    </button>
                    <button className="buttonRed">SAVE</button>
                </div>
            )}
        </div>
    );
}
