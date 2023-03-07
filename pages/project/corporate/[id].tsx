import React from "react";
import CorporateDetails from "../../../components/PROJECT/Corporate/CorporateDetails";
import api from "../../../util/api";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { getCookie } from "cookies-next";

export default function CorporateId() {
    const router = useRouter();
    const id = router.query.id;

    const { isLoading, data, isError } = useQuery(
        ["Corporate-detail", id],
        () => {
            return api.get(`/project/corporate/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
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
        return (
            <div className="pageDetail">
                <h1>Something is wrong</h1>
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }
    const CorporateData = data?.data;

    return (
        <div>
            <CorporateDetails CorporateData={CorporateData} />
        </div>
    );
}
