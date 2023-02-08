import { deleteCookie, getCookie } from "cookies-next";
import { startOfDay, format } from "date-fns";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import api from "../util/api";
import AppContext from "./Context/AppContext";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function PrintTemplate({ title, children }: Props) {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    const { isLoading, data, isError } = useQuery("user-info", () => {
        return api.get("/auth/me", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });

    if (isError) {
        router.push("/login");
        deleteCookie("user");
        setPrompt({
            message: "Unauthorized!",
            type: "error",
            toggle: true,
        });
    }

    const date = new Date();
    let today = startOfDay(date);
    return (
        <div className="w-[95%] max-w-[1366px] printThis">
            <header className="mb-5">
                <h1 className="text-ThemeRed">Boroughcrest</h1>
                <h3 className=" text-[32px] ">{title}</h3>
            </header>
            {children}
            <footer className="mt-5">
                <h2>{format(today, "yyyy-MM-dd")}</h2>
                <h3>{data?.data.name}</h3>
            </footer>
        </div>
    );
}
