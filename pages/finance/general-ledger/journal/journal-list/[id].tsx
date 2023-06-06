import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import JournalDetail from "../../../../../components/FINANCE/General-Ledger/Journal/JournalDetail";
import { GetJournalDetail } from "../../../../../components/FINANCE/General-Ledger/Journal/Query";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Id() {
    const router = useRouter();
    const id: any = router.query.id;
    const { isLoading, data, isError } = GetJournalDetail(id);

    const PagePermisson = PageAccessValidation("Journal");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (isLoading) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something is wrong!</h1>
            </div>
        );
    }

    return <JournalDetail Detail={data?.data} />;
}
