import React, { useEffect, useState } from "react";
import style from "../../styles/finance/UpperMenu.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { GeneralLedger } from "./FinanceUrl";

export default function UpperMenu() {
    const router = useRouter();
    const [isUrlData, setUrlData] = useState<any>();
    useEffect(() => {
        if (router.pathname.includes("general-ledger/chart-of-account")) {
            setUrlData(GeneralLedger);
        }
    });
    return (
        <ul className={style.container}>
            {isUrlData?.map((item: any, index: number) => (
                <li
                    className={
                        router.pathname.includes(item.url) ? style.active : ""
                    }
                    key={index}
                >
                    <Link href={item.url}>
                        <a>{item.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
