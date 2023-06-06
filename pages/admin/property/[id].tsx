import React from "react";
import { BeatLoader } from "react-spinners";
import PropertyDetails from "../../../components/ADMIN/Property/PropertyDetails";
import { useRouter } from "next/router";
import { GetPropertyDetail } from "../../../components/ReactQuery/PropertyMethod";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Id() {
    const router = useRouter();
    const id = router.query.id;
    const { isLoading, data, isError } = GetPropertyDetail(id);
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

    const PagePermisson = PageAccessValidation("Property");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            <PropertyDetails data={data?.data} />
        </div>
    );
}
