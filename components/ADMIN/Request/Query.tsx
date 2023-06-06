import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";

export const ActionMutationRequest = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: { id: any; payload: any }) => {
            return api.post(`/admin/requests/${Payload.id}`, Payload.payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("request-list");
            },
            onError: onError,
        }
    );
};

export const ShowRequest = (id: string | number) => {
    return useQuery(
        ["request-detail", id],
        () => {
            return api.get(`/admin/requests/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            enabled: !!id,
        }
    );
};

export const GetRequest = (status: string, keywords: string) => {
    return useQuery(["request-list", status], () => {
        return api.get(
            `/admin/requests?status=${status}&keywords=${keywords}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};
