import React, { useState } from "react";
import Card from "../ADMIN/Request/Card";

export default function RequestComp() {
    const [isTab, setTab] = useState("All");
    return (
        <div>
            <ul className="flex">
                <li>
                    <h5
                        onClick={() => setTab("All")}
                        className={`mr-5 cursor-pointer ${
                            isTab === "All"
                                ? " text-ThemeRed underline"
                                : " text-ThemeRed50"
                        }`}
                    >
                        All
                    </h5>
                </li>
                <li>
                    <h5
                        onClick={() => setTab("New")}
                        className={`mr-5 cursor-pointer ${
                            isTab === "New"
                                ? " text-ThemeRed underline"
                                : " text-ThemeRed50"
                        }`}
                    >
                        New
                    </h5>
                </li>
            </ul>

            <ul className=" flex flex-wrap justify-between w-full mt-2">
                <li
                    className="
                w-[49%] 1024px:w-full"
                >
                    <Card
                        type={"New Request"}
                        Detail={{
                            id: 0,
                            customer_id: 0,
                            customer_name: "sample",
                            property_unit_id: 0,
                            property_unit_code: "qwwe",
                            date: "08/16/1998",
                            request: "sample",
                            ticket_no: "213123",
                            details: "sample",
                            status: "Pending",
                            create_at: "09/16/1998",
                            trail: [],
                            remarks: [],
                            updated_at: "",
                        }}
                    />
                </li>

                <li
                    className="
                w-[49%] 1024px:w-full"
                >
                    <Card
                        type={"In Process"}
                        Detail={{
                            id: 0,
                            customer_id: 0,
                            customer_name: "sample",
                            property_unit_id: 0,
                            property_unit_code: "qwwe",
                            date: "08/16/1998",
                            request: "sample",
                            ticket_no: "213123",
                            details: "sample",
                            status: "Pending",
                            create_at: "09/16/1998",
                            trail: [],
                            remarks: [],
                            updated_at: "",
                        }}
                    />
                </li>

                <li
                    className="
                w-[49%] 1024px:w-full"
                >
                    <Card
                        type={"In Review"}
                        Detail={{
                            id: 0,
                            customer_id: 0,
                            customer_name: "sample",
                            property_unit_id: 0,
                            property_unit_code: "qwwe",
                            date: "08/16/1998",
                            request: "sample",
                            ticket_no: "213123",
                            details: "sample",
                            status: "Pending",
                            create_at: "09/16/1998",
                            trail: [],
                            remarks: [],
                            updated_at: "",
                        }}
                    />
                </li>

                <li
                    className="
                w-[49%] 1024px:w-full"
                >
                    <Card
                        type={"Closed"}
                        Detail={{
                            id: 0,
                            customer_id: 0,
                            customer_name: "sample",
                            property_unit_id: 0,
                            property_unit_code: "qwwe",
                            date: "08/16/1998",
                            request: "sample",
                            ticket_no: "213123",
                            details: "sample",
                            status: "Pending",
                            create_at: "09/16/1998",
                            trail: [],
                            remarks: [],
                            updated_at: "",
                        }}
                    />
                </li>
            </ul>
        </div>
    );
}
