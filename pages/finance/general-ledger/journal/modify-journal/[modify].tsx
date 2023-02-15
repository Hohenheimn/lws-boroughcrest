import React from "react";
import JournalForm from "../../../../../components/FINANCE/Journal/JournalForm";

export default function Modify() {
    const Value = [
        {
            id: 1,
            account_id: "",
            code: "",
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
