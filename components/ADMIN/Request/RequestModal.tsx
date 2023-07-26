import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";

import { BeatLoader, ScaleLoader } from "react-spinners";

import AppContext from "../../Context/AppContext";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import ModalTemp from "../../Reusable/ModalTemp";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";
import { RequestDetailType, RequestRemarks } from "./Card";
import { ActionMutationRequest, ShowRequest } from "./Query";

export default function RequestModal() {
    const { setPrompt } = useContext(AppContext);

    const [isDetails_idcards, setDetails] = useState<
        { label: string; value: string }[]
    >([]);

    const [isDetails_accessCard, setDetails_accessCard] = useState<
        { label: string; value: string }[]
    >([]);

    const [isToolEquipment, setToolEquipment] = useState<
        { label: string; value: string }[]
    >([]);

    const [isScopeWork, setScopeWork] = useState<
        { label: string; value: string }[]
    >([]);

    const [isVehicleDetail, setVehicleDetail] = useState<
        { label: string; value: string }[]
    >([]);

    const [isButtonClicked, setButtonClicked] = useState("");

    let buttonClicked = "";

    const router = useRouter();

    const type = router.query.type;

    const request_id: any = router.query.request;

    const { isLoading, data, isError } = ShowRequest(request_id);

    const RequestDetail: RequestDetailType = data?.data;

    useEffect(() => {
        if (
            RequestDetail?.information !== undefined &&
            RequestDetail?.information !== null
        ) {
            const detailsAccessCard: any = [];
            const details: any = [];
            const toolsEquiptment: any = [];
            const vehiclesDetail: any = [];
            const scopeWork: any = [];
            const keys = Object.keys(RequestDetail?.information);
            keys.forEach((key) => {
                if (
                    RequestDetail?.information[key] === "true" ||
                    RequestDetail?.information[key] === "false"
                ) {
                    toolsEquiptment.push({
                        label: key,
                        value: RequestDetail?.information[key],
                    });
                    scopeWork.push({
                        label: key,
                        value: RequestDetail?.information[key],
                    });
                }
                if (key.includes("vehicle_details")) {
                    vehiclesDetail.push({
                        label: key,
                        value: RequestDetail?.information[key],
                    });
                }
                if (key.includes("id_card_details")) {
                    details.push({
                        label: key,
                        value: RequestDetail?.information[key],
                    });
                }
                if (key.includes("access_card_details")) {
                    detailsAccessCard.push({
                        label: key,
                        value: RequestDetail?.information[key],
                    });
                }
            });
            setToolEquipment(toolsEquiptment);
            setVehicleDetail(vehiclesDetail);
            setDetails(details);
            setDetails_accessCard(detailsAccessCard);
            setScopeWork(scopeWork);
        }
    }, [RequestDetail]);

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
                <Detail Label={"DATE"} Value={RequestDetail?.date} />
                <Detail Label={"TICKET NO."} Value={RequestDetail?.ticket_no} />
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

                {RequestDetail?.information?.amenity !== undefined && (
                    <Detail
                        Label={"AMENITY"}
                        Value={RequestDetail?.information?.amenity}
                    />
                )}

                {RequestDetail?.information?.breif_description !==
                    undefined && (
                    <Detail
                        Label={"BRIEF DESCRIPTION"}
                        Value={RequestDetail?.information?.breif_description}
                    />
                )}

                {RequestDetail?.information?.class !== undefined && (
                    <Detail
                        Label={"CLASS"}
                        Value={RequestDetail?.information?.class}
                    />
                )}

                {RequestDetail?.information?.customer !== undefined && (
                    <Detail
                        Label={"customer"}
                        Value={RequestDetail?.information?.customer}
                    />
                )}

                {RequestDetail?.information?.time_range !== undefined && (
                    <Detail
                        Label={"time_range"}
                        Value={RequestDetail?.information?.time_range}
                    />
                )}

                {RequestDetail?.information?.worker_names !== undefined && (
                    <Detail
                        Label={"worker_names"}
                        Value={RequestDetail?.information?.worker_names}
                    />
                )}

                {RequestDetail?.information?.carrier !== undefined && (
                    <Detail
                        Label={"carrier"}
                        Value={RequestDetail?.information?.carrier}
                    />
                )}

                {RequestDetail?.information?.move_out_names !== undefined && (
                    <li className="w-full mt-5">
                        <h1 className=" text-ThemeRed mb-2">MOVE OUT</h1>
                    </li>
                )}

                {RequestDetail?.information?.move_out_names !== undefined && (
                    <>
                        {RequestDetail?.information?.move_out_names.map(
                            (mapItem: any, index: number) => (
                                <li
                                    key={index}
                                    className="w-full flex flex-wrap"
                                >
                                    <div className=" w-4/12 640px:w-2/4">
                                        <h1 className=" text-ThemeRed uppercase">
                                            {"NAME"}
                                        </h1>
                                        <h4>{mapItem.name}</h4>
                                    </div>
                                    <div className=" w-4/12 640px:w-2/4">
                                        <h1 className=" text-ThemeRed uppercase">
                                            {"remarks"}
                                        </h1>
                                        <h4>{mapItem.remarks}</h4>
                                    </div>
                                </li>
                            )
                        )}
                    </>
                )}

                {isDetails_idcards.length > 0 && (
                    <li className="w-full mt-5">
                        <h1 className=" text-ThemeRed mb-2">
                            ID CARDS DETAILS
                        </h1>
                    </li>
                )}

                {isDetails_idcards.map((mapItem, index) => (
                    <Detail
                        key={index}
                        Label={mapItem.label.replaceAll("id_card_details", "")}
                        Value={mapItem.value}
                    />
                ))}

                {isDetails_accessCard.length > 0 && (
                    <li className="w-full mt-5">
                        <h1 className=" text-ThemeRed mb-2">
                            ACCESS CARDS DETAILS
                        </h1>
                    </li>
                )}

                {isDetails_accessCard.map((mapItem, index) => (
                    <Detail
                        key={index}
                        Label={mapItem.label.replaceAll(
                            "access_card_details",
                            ""
                        )}
                        Value={mapItem.value}
                    />
                ))}

                {isVehicleDetail.length > 0 && (
                    <li className="w-full mt-5">
                        <h1 className=" text-ThemeRed mb-2">VEHICLE DETAILS</h1>
                    </li>
                )}

                {isVehicleDetail.map((mapItem, index) => (
                    <Detail
                        key={index}
                        Label={mapItem.label.replaceAll("vehicle_details", "")}
                        Value={mapItem.value}
                    />
                ))}

                {isToolEquipment.length > 0 &&
                    RequestDetail.request === "Amenity Usage" && (
                        <li className="w-full mt-5">
                            <h1 className=" text-ThemeRed mb-2">
                                TOOLS AND EQUIPMENTS
                            </h1>
                        </li>
                    )}

                {isToolEquipment.length > 0 &&
                    RequestDetail.request === "Amenity Usage" && (
                        <li className="w-full">
                            {isToolEquipment.map((mapItem, index) => (
                                <h1
                                    className=" uppercase flex items-center"
                                    key={index}
                                >
                                    <span className="mr-1 text-lg text-ThemeRed">
                                        {mapItem.value === "true" ? (
                                            <AiFillCheckSquare />
                                        ) : (
                                            <AiFillCloseSquare />
                                        )}
                                    </span>
                                    {mapItem.label.replaceAll("_", " ")}
                                </h1>
                            ))}
                        </li>
                    )}

                {isScopeWork.length > 0 &&
                    RequestDetail.request === "Work Permit" && (
                        <li className="w-full mt-5">
                            <h1 className=" text-ThemeRed mb-2">
                                SCOPE OF WORK
                            </h1>
                        </li>
                    )}

                {isScopeWork.length > 0 &&
                    RequestDetail.request === "Work Permit" && (
                        <li className="w-full">
                            {isScopeWork.map((mapItem, index) => (
                                <h1
                                    className=" uppercase flex items-center"
                                    key={index}
                                >
                                    <span className="mr-1 text-lg text-ThemeRed">
                                        {mapItem.value === "true" ? (
                                            <AiFillCheckSquare />
                                        ) : (
                                            <AiFillCloseSquare />
                                        )}
                                    </span>
                                    {mapItem.label.replaceAll("_", " ")}
                                </h1>
                            ))}
                        </li>
                    )}

                <li className="w-full mb-5 mt-5">
                    <h1 className=" text-ThemeRed">TRAIL</h1>
                    {RequestDetail?.trail.map((item, index: number) => (
                        <h4 key={index}>
                            {item.event}, {item.date}, {item.time} | {item.user}
                        </h4>
                    ))}
                </li>

                <li className="w-full">
                    <h1 className=" text-ThemeRed mb-5">ATTACHMENT</h1>
                    <div className="relative aspect-[2/1]">
                        <Image
                            src={`https://boroughcrest-api.lws.codes/get-img?image=${RequestDetail.attachment}`}
                            layout="fill"
                            objectFit="contain"
                            alt="attachment"
                        />
                    </div>
                </li>
            </ul>

            {(type === "In Review" || type === "Closed") && (
                <div className="py-5 mb-5 border-t border-gray-400">
                    <h1 className=" text-[20px]  640px:text-[16px] mb-2 text-ThemeRed">
                        REMARKS
                    </h1>
                    <ul className="max-h-[40vh] 1366px:max-h-[30vh] 640px:max-h-[50vh] overflow-auto">
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
                            ActionHandler("In Process", RequestDetail?.id)
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
                                ActionHandler("In Review", RequestDetail?.id)
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
                                ActionHandler("Rejected", RequestDetail?.id)
                            }
                        >
                            {mutateLoading && isButtonClicked === "Rejected" ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "Rejected"
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
                                    ActionHandler("Approved", RequestDetail?.id)
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
                                ActionHandler("In Process", RequestDetail?.id)
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
                                ActionHandler("Rejected", RequestDetail?.id)
                            }
                        >
                            {mutateLoading && isButtonClicked === "Rejected" ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "Rejected"
                            )}
                        </button>
                    </>
                )}
                {type === "Closed" && PermissionValidationPrint && (
                    <Link href={`/admin/request/print/${RequestDetail?.id}`}>
                        <a className="buttonRed" target="_blank">
                            PRINT
                        </a>
                    </Link>
                )}
            </div>
        </ModalTemp>
    );
}

export type Detail = {
    Label: string;
    Value: string;
};

export const Detail = ({ Label, Value }: Detail) => {
    return (
        <li className="w-4/12 640px:w-2/4 mb-5">
            <h1 className=" text-ThemeRed uppercase">
                {Label.replaceAll("_", " ")}
            </h1>
            <h4>{Value}</h4>
        </li>
    );
};

export const DetailHalf = ({ Label, Value }: Detail) => {
    return (
        <li className="w-6/12 640px:w-full mb-5">
            <h1 className=" text-ThemeRed uppercase">
                {Label.replaceAll("_", " ")}
            </h1>
            <h4>{Value}</h4>
        </li>
    );
};

type PropsRemarkProfile = {
    remarkDetail: RequestRemarks;
};

export const RemarksProfile = ({ remarkDetail }: PropsRemarkProfile) => {
    const Image_Photo =
        remarkDetail?.user_image_photo === null
            ? "/Images/sampleProfile.png"
            : "https://boroughcrest-api.lws.codes/get-img?image=" +
              remarkDetail?.user_image_photo;

    return (
        <li className="flex  640px:flex-col items-start mb-5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative 640px:mb-1">
                <Image
                    src={Image_Photo}
                    layout="fill"
                    objectFit="cover"
                    alt="img"
                />
            </div>
            <div className="pl-2 flex flex-col">
                <h3 className="text-ThemeRed">{remarkDetail?.user_name}</h3>
                <span className=" text-gray-400 mb-1 text-[12px]">
                    {remarkDetail?.created_at}
                </span>
                <p className=" text-RegularColor 640px:text-[14px]">
                    {remarkDetail?.remarks}
                </p>
            </div>
        </li>
    );
};
