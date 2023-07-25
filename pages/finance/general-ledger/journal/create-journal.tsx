import React, { useState } from "react";
import { format, startOfDay } from "date-fns";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";

import JournalCopy from "../../../../components/FINANCE/General-Ledger/Journal/JournalCopy";
import JournalForm, {
    defaultArray,
} from "../../../../components/FINANCE/General-Ledger/Journal/JournalForm";
import { AccessActionValidation } from "../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function CreateJournal() {
    const router = useRouter();

    const date = new Date();

    let today = startOfDay(date);

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

    const Permission_create = AccessActionValidation("Journal", "create");

    const PagePermisson = PageAccessValidation("Journal");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (!Permission_create && Permission_create !== undefined) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission for Creating Journal
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            {router.query.copy == undefined ? (
                <JournalForm
                    id=""
                    JournalList={isJournalList}
                    DefaultParticulars=""
                    DefaultDateValue={format(today, "MMM dd yyyy")}
                    DefaultStatus=""
                    type="create"
                />
            ) : (
                <JournalCopy />
            )}
        </>
    );
}
