import React from "react";
import JournalForm from "../../../../../components/FINANCE/Journal/JournalForm";

export default function Modify() {
    const Value = [
        {
            id: 1,
            code: 0,
            accountName: "Jomari",
            debit: "",
            credit: "",
        },
    ];
    return (
        <>
            <JournalForm DefaultValue={Value} type="modify" />
        </>
    );
}
