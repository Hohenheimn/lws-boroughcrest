import { useRouter } from "next/router";
import React, { useState } from "react";
import JournalCopy from "../../../../components/FINANCE/General-Ledger/Journal/JournalCopy";
import JournalForm, {
    defaultArray,
} from "../../../../components/FINANCE/General-Ledger/Journal/JournalForm";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

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
