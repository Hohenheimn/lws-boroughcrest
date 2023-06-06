import React, { useEffect, useState } from "react";
import ModalTemp from "../../Reusable/ModalTemp";
import { useRouter } from "next/router";
import Image from "next/image";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";

export default function RequestModal() {
    const router = useRouter();

    const type = router.query.type;

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
                <Detail Label={"DATE"} Value={"09/20/2022"} />
                <Detail Label={"TICKET NO."} Value={"00000"} />
                <Detail Label={"REQUESTOR"} Value={"Juan Dela Cruz"} />
                <Detail Label={"PROPERTY"} Value={"lorem ipsum"} />
                <Detail Label={"REQUEST"} Value={"lorem ipsum"} />
                <Detail Label={"TRAIL"} Value={"08/20/2022 | 08:00 AM"} />
                <Detail Label={"REMARKS"} Value={"lorem ipsum"} />
            </ul>
            {(type === "In Review" || type === "Closed") && (
                <div className="py-5 mb-5 border-t border-gray-400">
                    <h1 className=" text-[20px]  640px:text-[16px] mb-2 text-ThemeRed">
                        REMARKS
                    </h1>
                    <ul className="max-h-[40vh] 1366px:max-h-[30vh] 640px:max-h-[50vh] overflow-auto">
                        <RemarksProfile />
                        <RemarksProfile />
                        <RemarksProfile />
                        <RemarksProfile />
                        <RemarksProfile />
                        <RemarksProfile />
                        <RemarksProfile />
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
                    <button className="buttonRed">PROCESS</button>
                )}
                {type === "In Process" && (
                    <>
                        <button className="buttonRed mr-5 640px:mr-0 640px:mb-2">
                            REVIEW
                        </button>
                        <button className="buttonBorder">REJECT</button>
                    </>
                )}
                {type === "In Review" && (
                    <>
                        {PermissionValidationApprove && (
                            <button className="buttonRed mr-5  640px:mr-0 640px:mb-2">
                                APPROVED
                            </button>
                        )}

                        <button className="buttonBlue mr-5 640px:mr-0 640px:mb-2">
                            RETURN
                        </button>
                        <button className="buttonBorder 640px:mr-0 640px:mb-2">
                            REJECT
                        </button>
                    </>
                )}
                {type === "Closed" && PermissionValidationPrint && (
                    <button className="buttonRed">PRINT</button>
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
const RemarksProfile = () => {
    return (
        <li className="flex  640px:flex-col items-start mb-5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative 640px:mb-1">
                <Image
                    src={"/Images/sampleProfile.png"}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="pl-2 flex flex-col">
                <h3 className="text-ThemeRed">John Doe</h3>
                <span className=" text-gray-400 mb-1 text-[12px]">
                    September 26, 2022 | 01:30 PM
                </span>
                <p className=" text-RegularColor 640px:text-[14px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa, laborum?
                </p>
            </div>
        </li>
    );
};
