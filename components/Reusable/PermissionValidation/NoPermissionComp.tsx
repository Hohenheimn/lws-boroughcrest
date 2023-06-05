import Link from "next/link";
import React from "react";
import { FaLock } from "react-icons/fa";

export default function NoPermissionComp() {
    return (
        <div className=" fixed top-0 left-0 w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
            <div className="flex flex-col items-center ">
                <h1>
                    <FaLock className=" text-ThemeRed text-[55px] mb-3" />
                </h1>
                <h1 className=" text-ThemeRed text-[24px]">
                    You do not have permission for this Page
                </h1>
                <p className=" text-RegularColor mb-5">
                    Contact to administrator if you need help
                </p>
                <Link href="/dashboard">
                    <a className=" buttonRed">Go Back to Dashboard</a>
                </Link>
            </div>
        </div>
    );
}
