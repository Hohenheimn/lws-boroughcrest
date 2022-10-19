import React from "react";
import CorporateDetails from "../../../components/PROJECT/Corporate/CorporateDetails";
import api from "../../../util/api";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
export default function CorporateId() {
    const router = useRouter();
    const id = router.query.id;
    const { isLoading, data, isError } = useQuery("Corporate-detail", () => {
        return api.get(`/project/corporate/${id}`);
    });
    if (isLoading) {
        return;
    }
    const CorporateData = data?.data;

    return (
        <div>
            <CorporateDetails CorporateData={CorporateData} />
        </div>
    );
}
