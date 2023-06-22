import React, { useEffect, useState } from "react";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { GetJournalDetail } from "../../../../../components/FINANCE/General-Ledger/Journal/Query";
import JournalDetail, {
    journal_list,
} from "../../../../../components/FINANCE/General-Ledger/Journal/JournalDetail";
import { parse } from "date-fns";
import PrintTemplate from "../../../../../components/Reusable/PrintTemplate";

export default function Print({ id }: any) {
    const { isLoading, data, isError } = GetJournalDetail(id);

    const Detail = data?.data;

    const PagePermisson = PageAccessValidation("Journal");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <>
            <div className="flex items-center flex-col">
                <PrintTemplate title="Journal Detail">
                    <JournalDetail Detail={data?.data} forPrint={true} />
                </PrintTemplate>
            </div>
        </>
    );
}

export async function getServerSideProps({ query }: any) {
    const id = query?.journal_id;
    return {
        props: {
            id: id,
        },
    };
}

Print.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
