import { deleteCookie, getCookie } from "cookies-next";
import { startOfDay, format } from "date-fns";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "../../util/api";
import AppContext from "../Context/AppContext";
import Image from "next/image";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function PrintTemplate({ title, children }: Props) {
    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    const date = new Date();

    let today = startOfDay(date);

    return (
        <div className="w-[95%] max-w-[1366px] printThis print:h-full top-0 ">
            <table className=" w-full">
                <thead>
                    <tr>
                        <th>
                            <header className=" w-full flex flex-col items-start">
                                <h1 className="text-ThemeRed">Boroughcrest</h1>
                                <h3 className=" text-[32px] ">{title}</h3>
                            </header>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-10">{children}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className=" print:h-[100px]"></td>
                    </tr>
                </tfoot>
            </table>
            <footer className=" print:fixed bottom-0 h-[100px] flex flex-col justify-center">
                <h2>{format(today, "MMM dd yyyy")}</h2>
                <h3>{userInfo?.name}</h3>
            </footer>
        </div>
    );
}
