import { useRouter } from "next/router";
import React, { useState } from "react";
import JournalCopy from "../../../../components/FINANCE/General-Ledger/Journal/JournalCopy";
import JournalForm, {
    defaultArray,
} from "../../../../components/FINANCE/General-Ledger/Journal/JournalForm";

export default function CreateJournal() {
    const router = useRouter();
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
            {router.query.copy == undefined ? (
                <JournalForm
                    id=""
                    JournalList={isJournalList}
                    DefaultParticulars=""
                    DefaultDateValue=""
                    DefaultStatus=""
                    type="create"
                />
            ) : (
                <JournalCopy />
            )}
        </>
    );
}
