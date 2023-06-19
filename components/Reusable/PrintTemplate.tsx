import { startOfDay, format } from "date-fns";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";
import Tippy from "@tippy.js/react";

type Props = {
    title: string;
    children: React.ReactNode;
    narrow?: boolean;
};

export default function PrintTemplate({ title, children, narrow }: Props) {
    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    const date = new Date();

    let today = startOfDay(date);

    const printhandler = () => {
        print();
    };

    return (
        <div
            className={`${
                narrow ? "w-[80%]" : "w-[95%]"
            } max-w-[1366px] printThis print:h-full top-0 `}
        >
            <aside className="w-full max-w-[1366px] py-5 flex justify-end px-5 hidePrint">
                <Tippy theme="ThemeRed" content="Print">
                    <div
                        className="relative h-[35px] w-[35px] hover:scale-[1.1] transition-all duration-75"
                        onClick={printhandler}
                    >
                        <Image src="/Images/Print.png" alt="" layout="fill" />
                    </div>
                </Tippy>
            </aside>

            <table className=" w-full">
                <thead>
                    <tr>
                        <th>
                            <header className=" w-full flex flex-col items-start">
                                <h1 className="text-ThemeRed">Boroughcrest</h1>
                                <h3 className=" text-[32px] capitalize">
                                    {title}
                                </h3>
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
