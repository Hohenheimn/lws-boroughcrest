import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../../util/api";
import AppContext from "../../Context/AppContext";

export type LoginUserInfo = {
    id: number;
    portal_id: number;
    employee_id: number;
    name: string;
    email: string;
    email_verified_at: string;
    remember_token: string;
    role_id: string;
    corporate_id: number;
    department_id: number;
    contact_no: number;
    position: string;
    image_photo: string;
    image_signature: string;
    status: string;
    created_at: string;
    updated_at: string;
    corporate_gst_type: string;
};

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

    const UserData: LoginUserInfo = data?.data;

    if (isError) {
        setPrompt({
            message: "Unauthorized!",
            type: "error",
            toggle: true,
        });
        deleteCookie("user");
        router.push("/login");
    }

    useEffect(() => {
        setUserInfo({
            name: UserData?.name,
            email: UserData?.email,
            email_verified: UserData?.email_verified_at,
            image_url: UserData?.image_photo,
            image_signature_url: UserData?.image_signature,
            position: UserData?.position,
            contact_no: UserData?.contact_no,
            status: UserData?.status,
            created_at: UserData?.created_at,
            updated_at: UserData?.updated_at,
            id: UserData?.id,
            portal_id: UserData?.portal_id,
            employee_id: UserData?.employee_id,
            corporate_gst_type: UserData?.corporate_gst_type,
        });

        // localStorage.setItem("UserInfo", data?.data?.created_at);
    }, [data]);

    return <></>;
}
