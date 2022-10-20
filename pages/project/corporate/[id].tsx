import React from "react";
import CorporateDetails from "../../../components/PROJECT/Corporate/CorporateDetails";
import api from "../../../util/api";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";

export default function CorporateId() {
    const router = useRouter();
    const id = router.query.id;

    const { isLoading, data, isError } = useQuery(
        ["Corporate-detail", id],
        () => {
            return api.get(`/project/corporate/${id}`);
        }
    );
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
        return;
    }
    const CorporateData = data?.data;

    return (
        <div>
            <CorporateDetails CorporateData={CorporateData} />
        </div>
    );
}
