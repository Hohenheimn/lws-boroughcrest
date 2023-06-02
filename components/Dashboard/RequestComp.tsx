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
                        type={"In Process"}
                        Detail={{
                            ticket_no: "0754979844648",
                            requestor: "Juan Dela Cruz",
                            property: "Lorem ipsum",
                            request: "Gate Pass",
                            date: "08/16/23",
                        }}
                    />
                </li>

                <li
                    className="
                w-[49%] 1024px:w-full"
                >
                    <Card
                        type={"New Request"}
                        Detail={{
                            ticket_no: "0754979844648",
                            requestor: "Juan Dela Cruz",
                            property: "Lorem ipsum",
                            request: "Gate Pass",
                            date: "08/16/23",
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
                            ticket_no: "0754979844648",
                            requestor: "Juan Dela Cruz",
                            property: "Lorem ipsum",
                            request: "Gate Pass",
                            date: "08/16/23",
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
                            ticket_no: "0754979844648",
                            requestor: "Juan Dela Cruz",
                            property: "Lorem ipsum",
                            request: "Gate Pass",
                            date: "08/16/23",
                        }}
                    />
                </li>
            </ul>
        </div>
    );
}
