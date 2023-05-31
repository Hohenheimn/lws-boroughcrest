import React, { useEffect, useState } from "react";
import style from "../../styles/finance/UpperMenu.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    GeneralLedger,
    CustomerFacility,
    CheckWarehouse,
    Reports,
} from "./FinanceUrl";

export default function UpperMenu() {
    const router = useRouter();
    const [isUrlData, setUrlData] = useState<any>();
    useEffect(() => {
        if (router.pathname.includes("general-ledger")) {
            setUrlData(GeneralLedger);
            return;
        }
        if (router.pathname.includes("customer-facility")) {
            setUrlData(CustomerFacility);
            return;
        }
        if (router.pathname.includes("check-warehouse")) {
            setUrlData(CheckWarehouse);
            return;
        }
        if (router.pathname.includes("reports")) {
            setUrlData(Reports);
            return;
        }
        setUrlData(null);
    });
    return (
        <div className={style.wrapper}>
            <ul className={style.container}>
                {isUrlData?.map((item: any, index: number) => (
                    <li
                        className={`${
                            router.pathname.includes(item.activeUrl)
                                ? style.active
                                : ""
                        } ${item.type === "disabled" && style.inactive}`}
                        key={index}
                    >
                        <Link href={item.url}>
                            <a>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            {isUrlData?.map((item: any, index: number) => (
                <div key={index}>
                    {router.pathname.includes(item?.activeUrl) && (
                        <ul
                            className={`${style.container} ${style.subContainer}`}
                            key={index}
                        >
                            {item?.submenu?.map(
                                (submenuItem: any, index1: number) => (
                                    <li
                                        className={
                                            router.pathname.includes(
                                                submenuItem.url
                                            )
                                                ? style.active
                                                : style.subBorder
                                        }
                                        key={index1}
                                    >
                                        <Link href={submenuItem.url}>
                                            <a>{submenuItem.name}</a>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
