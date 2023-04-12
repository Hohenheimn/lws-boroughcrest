import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

export const SendLink = (Success: any, Error: any) => {
    return useMutation(
        (emailAdd: any) => {
            return api.post("/auth/forgot-password", { email: emailAdd });
        },
        {
            onSuccess: () => {
                Success();
            },
            onError: (e) => {
                Error(e);
            },
        }
    );
};

export const ChangePassword = (token: any, OnSuccess: any, onError: any) => {
    return useMutation(
        (data: any) => {
            return api.post(`/auth/reset-password?token=${token}`, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
        },
        {
            onSuccess: OnSuccess,
            onError: onError,
        }
    );
};
