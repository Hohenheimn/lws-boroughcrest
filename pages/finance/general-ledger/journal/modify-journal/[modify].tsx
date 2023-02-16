import { useRouter } from "next/router";
import React from "react";
import JournalForm from "../../../../../components/FINANCE/Journal/JournalForm";
import { GetJournalDetail } from "../../../../../components/FINANCE/Journal/Query";

export default function Modify() {
    const router = useRouter();
    const id: any = router.query.modify;
    const { isLoading, data, isError } = GetJournalDetail(id);
    const Value = [
        {
            id: 1,
            account_id: "",
            accountCode: "",
            accountName: "",
            debit: "",
            credit: "",
        },
    ];
    return (
        <>
            <JournalForm
                DefaultValue={Value}
                DefaultParticulars={data?.data.particulars}
                DefaultDateValue={data?.data.date}
                type="modify"
            />
        </>
    );
}
