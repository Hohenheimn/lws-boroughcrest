import React, { useState } from "react";
import Card, { RequestDetailType } from "../ADMIN/Request/Card";
import { GetRequest } from "../ADMIN/Request/Query";
import { PageAccessValidation } from "../Reusable/PermissionValidation/PageAccessValidation";

export default function RequestComp() {
    const [isTab, setTab] = useState("All");

    const { isLoading, data, isError } = GetRequest(
        isTab === "All" ? "" : "New Request",
        "",
        10,
        1
    );

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
                {isError && (
                    <li className="w-full flex justify-center py-10">
                        <h1>Something went wrong</h1>
                    </li>
                )}
                {data?.data.data.map(
                    (item: RequestDetailType, index: number) => (
                        <li
                            key={index}
                            className="
                w-[49%] 1024px:w-full"
                        >
                            <Card
                                type={item.status}
                                Detail={{
                                    id: item.id,
                                    customer_id: item.customer_id,
                                    customer_name: item.customer_name,
                                    property_unit_id: item.property_unit_id,
                                    property_unit_code: item.property_unit_code,
                                    date: item.date,
                                    request: item.request,
                                    ticket_no: item.ticket_no,
                                    remarks: item.remarks,
                                    status: item.status,
                                    create_at: "",
                                    trail: [],
                                    request_remarks: [],
                                    updated_at: "",
                                }}
                            />
                        </li>
                    )
                )}
                {data?.data.data.length <= 0 && (
                    <li className="w-full">
                        <h1 className="text-center py-10">No Request Found</h1>
                    </li>
                )}
            </ul>
        </div>
    );
}
