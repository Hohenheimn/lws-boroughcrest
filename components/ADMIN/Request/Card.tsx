import { useRouter } from "next/router";
import React from "react";

type Props = {
    Detail: any;
    color: string;
    type: string;
};

export default function Card({ Detail, color, type }: Props) {
    const router = useRouter();
    const OpenModalHandler = () => {
        router.push(`?type=${type}&request=${1}`);
    };
    return (
        <div
            onClick={OpenModalHandler}
            className=" cursor-pointer text-[13px] 1366px:text-[12px] p-3 px-5 1366px:px-3 bg-white shadow-lg rounded-lg text-RegularColor mb-3 hover:bg-[#f8f8f8]"
        >
            <h1 className=" mb-1" style={{ color: color }}>
                08/16/23
            </h1>
            <ul className="flex flex-wrap">
                <li className="w-2/4">Ticket No.</li>
                <li className="w-2/4">0754979844648</li>
                <li className="w-2/4">Requestor</li>
                <li className="w-2/4">Juan Dela Cruz</li>
                <li className="w-2/4">Property</li>
                <li className="w-2/4">Lorem ipsum</li>
                <li className="w-2/4">Request</li>
                <li className="w-2/4">Gate Pass</li>
            </ul>
        </div>
    );
}
