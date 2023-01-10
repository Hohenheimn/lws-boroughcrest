import React, { useState } from "react";
import JournalTable from "../../../../../components/FINANCE/Journal/JournalTable";

export default function Index() {
    const [isJounalType, setJournalType] = useState("Unposted");

    return (
        <>
            <ul className="SimpleTab">
                <li
                    className={`${isJounalType === "Unposted" && "Active"}`}
                    onClick={() => setJournalType("Unposted")}
                >
                    Unposted Journal
                </li>
                <li
                    className={`${isJounalType === "Posted" && "Active"}`}
                    onClick={() => setJournalType("Posted")}
                >
                    Posted Journal
                </li>
            </ul>
            <JournalTable type={isJounalType} />
        </>
    );
}
