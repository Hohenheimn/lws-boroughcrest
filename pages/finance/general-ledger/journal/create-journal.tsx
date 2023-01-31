import React from "react";
import JournalForm from "../../../../components/FINANCE/Journal/JournalForm";

export default function CreateJournal() {
    const Value = [
        {
            id: 1,
            account_id: "",
            code: 0,
            accountName: "",
            debit: 0,
            credit: 0,
        },
    ];
    return (
        <>
            <JournalForm DefaultValue={Value} type="create" />
        </>
    );
}
