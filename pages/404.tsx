import React from "react";
import Link from "next/link";

export default function Error() {
    return (
        <div className=" h-screen w-screen flex flex-col justify-center items-center">
            <h1>404</h1>
            <Link href="/dashboard">
                <a>Go to Dashboard</a>
            </Link>
        </div>
    );
}

Error.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
