import React, { useEffect, useState } from "react";
import style from "../../styles/finance/UpperMenu.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { GeneralLedger } from "./FinanceUrl";

export default function UpperMenu() {
    const router = useRouter();
    const [isUrlData, setUrlData] = useState<any>();
    useEffect(() => {
        if (router.pathname.includes("general-ledger")) {
            setUrlData(GeneralLedger);
        }
    });
    return (
        <div className={style.wrapper}>
            <ul className={style.container}>
                {isUrlData?.map((item: any, index: number) => (
                    <li
                        className={
                            router.pathname.includes(item.activeUrl)
                                ? style.active
                                : ""
                        }
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
                        <ul className={`${style.container}`} key={index}>
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
