import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";
import AppContext from "../../Context/AppContext";

type Props = {
    Detail: {
        ticket_no: string;
        requestor: string;
        property: string;
        request: string;
        date: string;
    };
    type: string;
};

export default function Card({ Detail, type }: Props) {
    const { setPrompt } = useContext(AppContext);

    const ActionPermision_view = AccessActionValidation(
        `Customer Request View (${type})`,
        "view"
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
    }, [Detail]);

    const router = useRouter();

    const OpenModalHandler = () => {
        if (ActionPermision_view) {
            router.push(`/admin/request?type=${type}&request=${1}`);
        } else {
            setPrompt({
                message: "You have no permission to view",
                type: "draft",
                toggle: true,
            });
        }
    };

    return (
        <div
            onClick={OpenModalHandler}
            className=" cursor-pointer text-[13px] w-full 1366px:text-[12px] p-3 px-5 1366px:px-3 bg-white shadow-lg rounded-lg text-RegularColor mb-3 hover:bg-[#f8f8f8]"
        >
            {router.pathname.includes("dashboard") && (
                <h1 style={{ color: color }}>{type}</h1>
            )}
            <h1 className=" mb-1" style={{ color: color }}>
                {Detail.date}
            </h1>
            <ul className="flex flex-wrap">
                <li className="w-2/4">Ticket No.</li>
                <li className="w-2/4">{Detail.ticket_no}</li>
                <li className="w-2/4">Requestor</li>
                <li className="w-2/4">{Detail.requestor}</li>
                <li className="w-2/4">Property</li>
                <li className="w-2/4">{Detail.property}</li>
                <li className="w-2/4">Request</li>
                <li className="w-2/4">{Detail.property}</li>
            </ul>
        </div>
    );
}
