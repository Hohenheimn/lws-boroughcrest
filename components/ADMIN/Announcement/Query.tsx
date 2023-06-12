import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";

export const CreateAnnouncement = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/admin/announcements`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("announcement-list");
            },
            onError: onError,
        }
    );
};

export const ModifyAnnouncement = (onSucces: any, onError: any, id: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/admin/announcements/${id}?_method=PUT`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("announcement-list");
            },
            onError: onError,
        }
    );
};
export const DeleteAnnouncement = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: any) => {
            return api.delete(`/admin/announcements/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("announcement-list");
            },
            onError: onError,
        }
    );
};

export const ShowAnnoucement = (id: string | number) => {
    return useQuery(
        ["announcement-detail", id],
        () => {
            return api.get(`/admin/announcements/${id}`, {
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

export const GetAnnouncement = (dashboard: string, paginate: number) => {
    return useQuery(
        ["announcement-list", dashboard, paginate],
        () => {
            return api.get(
                `/admin/announcements?dashboard=${dashboard}&paginate=${paginate}&page=1`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};
