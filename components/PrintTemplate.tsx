import { startOfDay, format } from "date-fns";
import React, { useContext } from "react";
import AppContext from "./Context/AppContext";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function PrintTemplate({ title, children }: Props) {
    const date = new Date();
    let today = startOfDay(date);
    const { userInfo } = useContext(AppContext);
    return (
        <div className="w-[95%] max-w-[1366px] printThis">
            <header className="mb-5">
                <h1 className="text-ThemeRed">Boroughcrest</h1>
                <h3 className=" text-[32px] ">{title}</h3>
            </header>
            {children}
            <footer className="mt-5">
                <h2>{format(today, "yyyy-MM-dd")}</h2>
                <h3>{userInfo.name}</h3>
            </footer>
        </div>
    );
}
