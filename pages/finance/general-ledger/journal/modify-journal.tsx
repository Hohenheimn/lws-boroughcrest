import React from "react";
import JournalForm from "../../../../components/FINANCE/Journal/JournalForm";

export default function ModifyJournal() {
    const Value = [
        {
            id: 1,
            code: 0,
            accountName: "",
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
