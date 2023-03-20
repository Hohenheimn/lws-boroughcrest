import React, { useState } from "react";
import AdjustmentTable from "../../../../../components/FINANCE/CustomerFacility/Adjustment/AdjustmentTable";

export default function AdjustmentList() {
    const [isType, setType] = useState("unposted");

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    return (
        <>
            <ul className="SimpleTab">
                <li
                    className={`${isType === "unposted" && "Active"}`}
                    onClick={() => {
                        setType("unposted");
                        setPeriod({ from: "", to: "" });
                    }}
                >
                    Unposted Journal
                </li>
                <li
                    className={`${isType === "posted" && "Active"}`}
                    onClick={() => {
                        setPeriod({ from: "", to: "" });
                        setType("posted");
                    }}
                >
                    Posted Journal
                </li>
            </ul>
            <AdjustmentTable
                type={isType}
                isPeriod={isPeriod}
                setPeriod={setPeriod}
            />
        </>
    );
}
