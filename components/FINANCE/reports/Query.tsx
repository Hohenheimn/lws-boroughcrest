import { useMutation, useQuery } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";

export const GetFavoriteList = (Keyword: string) => {
    return useQuery(["favorite-list", Keyword], () => {
        return api.get(`/project/roles?keywords=${Keyword}&paginate=10`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const ShowFavorite = (id: number) => {
    return useQuery(
        ["show-favorite", id],
        () => {
            return api.get(`/project/roles/${id}`, {
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

export const SaveFavorite = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post(
                "/finance/customer-facility/customer-reports",
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
