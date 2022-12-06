import React, { useContext } from "react";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import api from "../../util/api";
import AppContext from "../Context/AppContext";
export default function SignOut() {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    const SignOutHandler = async () => {
        try {
            const token = getCookie("user");
            const response = await api.get("/auth/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                deleteCookie("user");
                router.push("/login");
            } else if (response.status === 401) {
                setPrompt({
                    message: "Unauthorized!",
                    type: "error",
                    toggle: true,
                });
            }
        } catch (error) {
            setPrompt({
                message: "Unauthorized!",
                type: "error",
                toggle: true,
            });
            deleteCookie("user");
            router.push("/login");
        }
    };
    return (
        <ul className="absolute w-[200px] top-full right-0 bg-white px-5 py-3 text-ThemeRed">
            <li className="cursor-pointer" onClick={SignOutHandler}>
                Log Out
            </li>
        </ul>
    );
}
