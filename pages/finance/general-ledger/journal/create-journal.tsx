import React, { useState } from "react";
import JournalForm, {
    defaultArray,
} from "../../../../components/FINANCE/Journal/JournalForm";

export default function CreateJournal() {
    const [isJournalList, setJournalList] = useState<defaultArray>([
        {
            id: 1,
            account_id: "",
            accountCode: "",
            accountName: "",
            debit: "",
            credit: "",
        },
    ]);

    return (
        <>
            <JournalForm
                id=""
                JournalList={isJournalList}
                setJournalList={setJournalList}
                DefaultParticulars=""
                DefaultDateValue=""
                DefaultStatus=""
                type="create"
            />
        </>
    );
}
