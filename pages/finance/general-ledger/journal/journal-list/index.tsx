import React, { useState } from "react";
import JournalTable from "../../../../../components/FINANCE/Journal/JournalTable";

export default function Index() {
    const [isJounalType, setJournalType] = useState("unposted");

    return (
        <>
            <ul className="SimpleTab">
                <li
                    className={`${isJounalType === "unposted" && "Active"}`}
                    onClick={() => setJournalType("unposted")}
                >
                    Unposted Journal
                </li>
                <li
                    className={`${isJounalType === "posted" && "Active"}`}
                    onClick={() => setJournalType("posted")}
                >
                    Posted Journal
                </li>
            </ul>
            <JournalTable type={isJounalType} />
        </>
    );
}
