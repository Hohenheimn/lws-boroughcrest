import React, { useContext, useEffect, useState } from "react";
import ModalTemp from "../../Reusable/ModalTemp";
import { useRouter } from "next/router";
import Image from "next/image";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";
import { ActionMutationRequest, ShowRequest } from "./Query";
import { RequestDetailType, RequestRemarks } from "./Card";
import { BeatLoader, ScaleLoader } from "react-spinners";
import Link from "next/link";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import AppContext from "../../Context/AppContext";

export default function RequestModal() {
    const { setPrompt } = useContext(AppContext);

    const [isButtonClicked, setButtonClicked] = useState("");

    let buttonClicked = "";

    const router = useRouter();

    const type = router.query.type;

    const request_id: any = router.query.request;

    const { isLoading, data, isError } = ShowRequest(request_id);

    const RequestDetail: RequestDetailType = data?.data;

    const PermissionValidationApprove = AccessActionValidation(
        `Customer Request View (${type})`,
        "approve"
    );

    const PermissionValidationPrint = AccessActionValidation(
        `Customer Request View (${type})`,
        "print"
    );

    const [color, setColor] = useState("");

    useEffect(() => {
        if (type === "New Request") {
            setColor("#8f384d");
        }
        if (type === "In Process") {
            setColor("#5c6e91");
        }
        if (type === "In Review") {
            setColor("#dd9866");
        }
        if (type === "Closed") {
            setColor("#41b6ff");
        }
    }, [type]);

    const onSuccess = () => {
        setPrompt({
            message: `Request successfully ${buttonClicked}`,
            type: "success",
            toggle: true,
        });
        router.push("");
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: mutateLoading, mutate } = ActionMutationRequest(
        onSuccess,
        onError
    );

    const ActionHandler = (button: string, id: number) => {
        setButtonClicked(button);
        buttonClicked = button;
        const Payload = {
            status: button,
            remarks: "",
        };
        mutate({ id: id, payload: Payload });
    };

    if (isLoading) {
        return (
            <ModalTemp>
                <div className="flex items-center mb-5">
                    <h1 className="mr-3 640px:text-[14px]">Customer Request</h1>
                    <span
                        className="text-white text-[11px] px-3 py-1 rounded-[50px]"
                        style={{ backgroundColor: color }}
                    >
                        {type}
                    </span>
                </div>

                <div className="flex justify-center py-10">
                    <BeatLoader color={color} />
                </div>
            </ModalTemp>
        );
    }
    if (isError) {
        return (
            <ModalTemp>
                <div className="flex items-center mb-5">
                    <h1 className="mr-3 640px:text-[14px]">Customer Request</h1>
                    <span
                        className="text-white text-[11px] px-3 py-1 rounded-[50px]"
                        style={{ backgroundColor: color }}
                    >
                        {type}
                    </span>
                </div>

                <h1 className=" text-ThemeRed text-center">
                    Something went wrong
                </h1>
            </ModalTemp>
        );
    }

    return (
        <ModalTemp>
            <div className="flex items-center mb-5">
                <h1 className="mr-3 640px:text-[14px]">Customer Request</h1>
                <span
                    className="text-white text-[11px] px-3 py-1 rounded-[50px]"
                    style={{ backgroundColor: color }}
                >
                    {type}
                </span>
            </div>
            <ul className="flex flex-wrap text-[14px] 640px:text-[12px] mb-5">
                <Detail Label={"DATE"} Value={RequestDetail.date} />
                <Detail Label={"TICKET NO."} Value={RequestDetail.ticket_no} />
                <Detail
                    Label={"REQUESTOR"}
                    Value={RequestDetail.customer_name}
                />
                <Detail
                    Label={"PROPERTY"}
                    Value={RequestDetail.property_unit_code}
                />
                <Detail Label={"REQUEST"} Value={RequestDetail.request} />

                <Detail Label={"REMARKS"} Value={RequestDetail.details} />

                <li className="w-full">
                    <h1 className=" text-ThemeRed">TRAIL</h1>
                    {RequestDetail.trail.map((item, index: number) => (
                        <h4 key={index}>
                            {item.event}, {item.date}, {item.time} | {item.user}
                        </h4>
                    ))}
                </li>
            </ul>

            {(type === "In Review" || type === "Closed") && (
                <div className="py-5 mb-5 border-t border-gray-400">
                    <h1 className=" text-[20px]  640px:text-[16px] mb-2 text-ThemeRed">
                        REMARKS
                    </h1>
                    <ul className="max-h-[40vh] 1366px:max-h-[30vh] 640px:max-h-[50vh] overflow-auto">
                        {RequestDetail.remarks.map(
                            (item: RequestRemarks, index: number) => (
                                <RemarksProfile
                                    remarkDetail={item}
                                    key={index}
                                />
                            )
                        )}
                    </ul>
                </div>
            )}
            <div className="flex justify-end 640px:flex-col">
                <button
                    className="button_cancel  640px:mt-2 640px:order-8 640px:ml-5"
                    onClick={() => router.push("")}
                >
                    CANCEL
                </button>
                {type === "New Request" && PermissionValidationApprove && (
                    <button
                        className="buttonRed"
                        onClick={() =>
                            ActionHandler("In Process", RequestDetail.id)
                        }
                    >
                        {mutateLoading && isButtonClicked === "In Process" ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "PROCESS"
                        )}
                    </button>
                )}
                {type === "In Process" && (
                    <>
                        <button
                            className="buttonRed mr-5 640px:mr-0 640px:mb-2"
                            onClick={() =>
                                ActionHandler("In Review", RequestDetail.id)
                            }
                        >
                            {mutateLoading &&
                            isButtonClicked === "In Review" ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "REVIEW"
                            )}
                        </button>
                        <button
                            className="buttonBorder"
                            onClick={() =>
                                ActionHandler("Reject", RequestDetail.id)
                            }
                        >
                            {mutateLoading && isButtonClicked === "Reject" ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "REJECT"
                            )}
                        </button>
                    </>
                )}
                {type === "In Review" && (
                    <>
                        {PermissionValidationApprove && (
                            <button
                                className="buttonRed mr-5  640px:mr-0 640px:mb-2"
                                onClick={() =>
                                    ActionHandler("Approved", RequestDetail.id)
                                }
                            >
                                {mutateLoading &&
                                isButtonClicked === "Approved" ? (
                                    <ScaleLoader
                                        color="#fff"
                                        height="10px"
                                        width="2px"
                                    />
                                ) : (
                                    "APPROVED"
                                )}
                            </button>
                        )}

                        <button
                            className="buttonBlue mr-5 640px:mr-0 640px:mb-2"
                            onClick={() =>
                                ActionHandler("In Process", RequestDetail.id)
                            }
                        >
                            {mutateLoading &&
                            isButtonClicked === "In Process" ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "RETURN"
                            )}
                        </button>
                        <button
                            className="buttonBorder 640px:mr-0 640px:mb-2"
                            onClick={() =>
                                ActionHandler("Reject", RequestDetail.id)
                            }
                        >
                            {mutateLoading && isButtonClicked === "Reject" ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "REJECT"
                            )}
                        </button>
                    </>
                )}
                {type === "Closed" && PermissionValidationPrint && (
                    <Link href={`/admin/request/print/${RequestDetail.id}`}>
                        <a className="buttonRed">PRINT</a>
                    </Link>
                )}
            </div>
        </ModalTemp>
    );
}

type Detail = {
    Label: string;
    Value: string;
};

const Detail = ({ Label, Value }: Detail) => {
    return (
        <li className="w-4/12 640px:w-2/4 mb-5">
            <h1 className=" text-ThemeRed">{Label}</h1>
            <h4>{Value}</h4>
        </li>
    );
};

type PropsRemarkProfile = {
    remarkDetail: RequestRemarks;
};

const RemarksProfile = ({ remarkDetail }: PropsRemarkProfile) => {
    const Image_Photo =
        remarkDetail.user_image_photo === null
            ? "/Images/sampleProfile.png"
            : "https://boroughcrest-api.lws.codes/get-img?image=" +
              remarkDetail.user_image_photo;

    return (
        <li className="flex  640px:flex-col items-start mb-5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative 640px:mb-1">
                <Image src={Image_Photo} layout="fill" objectFit="cover" />
            </div>
            <div className="pl-2 flex flex-col">
                <h3 className="text-ThemeRed">{remarkDetail.user_name}</h3>
                <span className=" text-gray-400 mb-1 text-[12px]">
                    {remarkDetail.created_at}
                </span>
                <p className=" text-RegularColor 640px:text-[14px]">
                    {remarkDetail.remarks}
                </p>
            </div>
        </li>
    );
};
