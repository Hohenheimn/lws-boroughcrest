import { useRouter } from "next/router";
import React, { useState } from "react";
import JournalCopy from "../../../../components/FINANCE/General-Ledger/Journal/JournalCopy";
import JournalForm, {
    defaultArray,
} from "../../../../components/FINANCE/General-Ledger/Journal/JournalForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function CreateJournal() {
    const router = useRouter();
    const isJournalList: defaultArray = [
        {
            id: 1,
            account_id: "",
            accountCode: "",
            accountName: "",
            debit: "",
            credit: "",
        },
    ];

    const PagePermisson = PageAccessValidation("Journal");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

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
