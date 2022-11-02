import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

export const SendLink = (Success: any) => {
    return useMutation(
        (email: any) => {
            return api.post("/forgot-password", email);
        },
        {
            onSuccess: () => {
                Success();
            },
        }
    );
};

export const ChangePassword = (token: any) => {
    return useMutation((data: any) => {
        return api.post(`/auth/reset-password/${token}`, data);
    });
};
