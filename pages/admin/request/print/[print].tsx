import React from "react";
import PrintTemplate from "../../../../components/Reusable/PrintTemplate";
import { ShowRequest } from "../../../../components/ADMIN/Request/Query";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

export default function PrintRequest() {
    const router = useRouter();

    const request_id: any = router.query.print;

    const { isLoading, data, isError } = ShowRequest(request_id);

    return (
        <div className="flex items-center flex-col">
            <PrintTemplate title="Closed Requests" narrow={true}>
                <div className="flex justify-center py-10">
                    <BeatLoader color={"#8f384d"} size={30} />
                </div>
            </PrintTemplate>
        </div>
    );
}

PrintRequest.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
