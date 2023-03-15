import React, { useState } from "react";
import JournalTable from "../../../../../components/FINANCE/General-Ledger/Journal/JournalTable";

export default function Index() {
    const [isJounalType, setJournalType] = useState("unposted");

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    return (
        <>
            <ul className="SimpleTab">
                <li
                    className={`${isJounalType === "unposted" && "Active"}`}
                    onClick={() => {
                        setJournalType("unposted");
                        setPeriod({ from: "", to: "" });
                    }}
                >
                    Unposted Journal
                </li>
                <li
                    className={`${isJounalType === "posted" && "Active"}`}
                    onClick={() => {
                        setPeriod({ from: "", to: "" });
                        setJournalType("posted");
                    }}
                >
                    Posted Journal
                </li>
            </ul>
            <JournalTable
                type={isJounalType}
                isPeriod={isPeriod}
                setPeriod={setPeriod}
            />
        </>
    );
}
