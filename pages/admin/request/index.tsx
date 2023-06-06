import React, { useEffect, useState } from "react";
import {
    RequestIcon,
    RequestRefresh,
} from "../../../components/Reusable/Icons";
import CardContainer from "../../../components/ADMIN/Request/CardContainer";
import RequestModal from "../../../components/ADMIN/Request/RequestModal";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

const four = "w-1/4";
const three = "w-4/12";
const two = "w-2/4";
const one = "w-2/4";

export default function Request() {
    const router = useRouter();

    const [colNo, setColNo] = useState(4);

    const PagePermisson_NewRequest = PageAccessValidation(
        "Customer Request View (New Request)"
    );

    const PagePermisson_InProcess = PageAccessValidation(
        "Customer Request View (In Process)"
    );

    const PagePermisson_InReview = PageAccessValidation(
        "Customer Request View (In Review)"
    );

    const PagePermisson_Closed = PageAccessValidation(
        "Customer Request View (Closed)"
    );

    useEffect(() => {
        setColNo(0);
        if (PagePermisson_NewRequest) {
            setColNo((prev) => Number(prev) + 1);
        }
        if (PagePermisson_InProcess) {
            setColNo((prev) => Number(prev) + 1);
        }
        if (PagePermisson_InReview) {
            setColNo((prev) => Number(prev) + 1);
        }
        if (PagePermisson_Closed) {
            setColNo((prev) => Number(prev) + 1);
        }
    }, [
        PagePermisson_NewRequest,
        PagePermisson_InProcess,
        PagePermisson_InReview,
        PagePermisson_Closed,
    ]);

    if (
        !PagePermisson_NewRequest &&
        PagePermisson_NewRequest !== undefined &&
        !PagePermisson_InProcess &&
        PagePermisson_InProcess !== undefined &&
        !PagePermisson_InReview &&
        PagePermisson_InReview !== undefined &&
        !PagePermisson_Closed &&
        PagePermisson_Closed !== undefined
    ) {
        return <NoPermissionComp />;
    }

    return (
        <div>
            {router.query.type !== undefined && <RequestModal />}
            <h1 className="pageTitle">Request Board</h1>
            <ul className="w-full flex justify-end items-center">
                <li className="mr-5">
                    <Link href="/admin/request/request-list">
                        <a>
                            <RequestIcon />
                        </a>
                    </Link>
                </li>
                <li>
                    <RequestRefresh />
                </li>
            </ul>
            <div className=" overflow-auto w-full">
                <ul className="flex flex-wrap mt-5 min-w-[1000px]">
                    {PagePermisson_NewRequest && (
                        <li
                            className={`${colNo === 1 && one} ${
                                colNo === 2 && two
                            } ${colNo === 3 && three} ${colNo === 4 && four}`}
                        >
                            <CardContainer color="#8f384d" type="New Request" />
                        </li>
                    )}
                    {PagePermisson_InProcess && (
                        <li
                            className={`${colNo === 1 && one} ${
                                colNo === 2 && two
                            } ${colNo === 3 && three} ${colNo === 4 && four}`}
                        >
                            <CardContainer color="#5c6e91" type="In Process" />
                        </li>
                    )}
                    {PagePermisson_InReview && (
                        <li
                            className={`${colNo === 1 && one} ${
                                colNo === 2 && two
                            } ${colNo === 3 && three} ${colNo === 4 && four}`}
                        >
                            <CardContainer color="#dd9866" type="In Review" />
                        </li>
                    )}
                    {PagePermisson_Closed && (
                        <li
                            className={`${colNo === 1 && one} ${
                                colNo === 2 && two
                            } ${colNo === 3 && three} ${colNo === 4 && four}`}
                        >
                            <CardContainer color="#41b6ff" type="Closed" />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
