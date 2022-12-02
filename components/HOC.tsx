import React from "react";
import api from "../util/api";

export default function HOC() {
    const CheckToken = () => {
        <></>;
    };
    return CheckToken;
}

export const getServerSideProps = async (context: any) => {
    const cookiesName: any = context.req.headers.cookie;
    if (cookiesName === undefined) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else {
        const cookieArray = cookiesName?.split("=");
        let cookie = cookieArray[cookieArray?.length - 1];
        cookie = cookie.replace("%7C", "|");
        try {
            const { data } = await api.get(`/auth/me`, {
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            });
            return {
                props: {},
            };
        } catch {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }
    }
};
