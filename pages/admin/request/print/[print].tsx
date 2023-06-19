import React from "react";
import PrintTemplate from "../../../../components/Reusable/PrintTemplate";
import { ShowRequest } from "../../../../components/ADMIN/Request/Query";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import {
    RequestDetailType,
    RequestRemarks,
} from "../../../../components/ADMIN/Request/Card";
import {
    Detail,
    RemarksProfile,
} from "../../../../components/ADMIN/Request/RequestModal";

export default function PrintRequest() {
    const router = useRouter();

    const request_id: any = router.query.print;

    const { isLoading, data, isError } = ShowRequest(request_id);

    const RequestDetail: RequestDetailType = data?.data;

    if (isLoading) {
        <div className="flex items-center flex-col">
            <PrintTemplate title="Closed Requests" narrow={true}>
                <div className="flex justify-center py-10">
                    <BeatLoader color={"#8f384d"} size={30} />
                </div>
            </PrintTemplate>{" "}
        </div>;
    }

    if (isError) {
        <div className="flex items-center flex-col">
            <PrintTemplate title="Closed Requests" narrow={true}>
                <div className="flex justify-center">
                    <h1>Something went wrong!</h1>
                </div>
            </PrintTemplate>{" "}
        </div>;
    }

    return (
        <div className="flex items-center flex-col">
            <PrintTemplate title="Closed Requests" narrow={true}>
                <ul className="flex flex-wrap text-[14px] 640px:text-[12px] mb-5">
                    <Detail Label={"DATE"} Value={RequestDetail?.date} />
                    <Detail
                        Label={"TICKET NO."}
                        Value={RequestDetail?.ticket_no}
                    />
                    <Detail
                        Label={"REQUESTOR"}
                        Value={RequestDetail?.customer_name}
                    />
                    <Detail
                        Label={"PROPERTY"}
                        Value={RequestDetail?.property_unit_code}
                    />
                    <Detail Label={"REQUEST"} Value={RequestDetail?.request} />

                    <Detail Label={"REMARKS"} Value={RequestDetail?.remarks} />

                    <li className="w-full">
                        <h1 className=" text-ThemeRed">TRAIL</h1>
                        {RequestDetail?.trail.map((item, index: number) => (
                            <h4 key={index}>
                                {item.event}, {item.date}, {item.time} |{" "}
                                {item.user}
                            </h4>
                        ))}
                    </li>
                </ul>
                <div className="py-5 border-t border-gray-400">
                    <h1 className=" text-[20px]  640px:text-[16px] mb-2 text-ThemeRed">
                        REMARKS
                    </h1>
                    <ul>
                        {RequestDetail?.request_remarks.map(
                            (item: RequestRemarks, index: number) => (
                                <RemarksProfile
                                    remarkDetail={item}
                                    key={index}
                                />
                            )
                        )}
                    </ul>
                </div>
            </PrintTemplate>
        </div>
    );
}

PrintRequest.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
