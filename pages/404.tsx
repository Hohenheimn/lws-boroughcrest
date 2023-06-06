import React from "react";
import Link from "next/link";

export default function Error() {
    return (
        <div className=" fixed top-0 left-0 w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
            <div className="flex flex-col items-center ">
                <h1 className=" text-ThemeRed text-[34px]">
                    404 - Page do not found!
                </h1>
                <p className=" text-RegularColor mb-5">Page do not found!</p>
                <Link href="/dashboard">
                    <a className=" buttonRed">Back to Dashboard</a>
                </Link>
            </div>
        </div>
    );
}

Error.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
