import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import JournalDetail from "../../../../../components/FINANCE/General-Ledger/Journal/JournalDetail";
import { GetJournalDetail } from "../../../../../components/FINANCE/General-Ledger/Journal/Query";
import AdjustmentDetail from "../../../../../components/FINANCE/CustomerFacility/Adjustment/AdjusmentDetail";

export default function Id() {
    const router = useRouter();
    const id: any = router.query.id;
    const { isLoading, data, isError } = GetJournalDetail(id);
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
                <h1>Something went wrong!</h1>
            </div>
        );
    }

    return <AdjustmentDetail Detail={data?.data} />;
}
