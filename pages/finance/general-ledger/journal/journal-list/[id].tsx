import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import JournalDetail from "../../../../../components/FINANCE/Journal/JournalDetail";
import { GetJournalDetail } from "../../../../../components/FINANCE/Journal/Query";

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
                <h1>Something is wrong!</h1>
            </div>
        );
    }

    return <JournalDetail Detail={data?.data} />;
}
