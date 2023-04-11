import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../util/api";
import AppContext from "../Context/AppContext";

export default function UserInfo() {
    const { setPrompt, setUserInfo } = useContext(AppContext);
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

    useEffect(() => {
        setUserInfo({
            name: data?.data.name,
            email: data?.data.email,
            email_verified: data?.data.email_verified,
            image_url: data?.data.image_photo,
            image_signature_url: data?.data.image_signature,
            position: data?.data.position,
            contact_no: data?.data.contact_no,
            status: data?.data.status,
            created_at: data?.data.created_at,
            updated_at: data?.data.updated_at,
        });
    }, [data]);

    return <></>;
}
