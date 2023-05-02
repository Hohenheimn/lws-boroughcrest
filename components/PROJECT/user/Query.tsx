import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../util/api";

export const GetUser = (keyword: string, pageNumber: number) => {
    return useQuery(["user-list", keyword, pageNumber], () => {
        return api.get(
            `/project/user?keywords=${keyword}&page=${
                keyword === "" ? pageNumber : 1
            }&paginate=10`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const GetUserDetail = (id: number | string) => {
    return useQuery(["user-detail", id], () => {
        return api.get(`/project/user/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetUserRecent = (id: number | string, keyword: string) => {
    return useQuery(["user-recent", id, keyword], () => {
        return api.get(
            `/project/user/recent-search/${id}?keywords=${keyword}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const UpdateUserInfo = (id: number, onSuccess: any, onError: any) => {
    const queryValidate = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/project/user/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryValidate.invalidateQueries(["user-detail", id]);
                onSuccess();
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const CreateUser = (onSuccess: any, onError: any) => {
    const queryValidate = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/project/user`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryValidate.invalidateQueries("user-list");
                onSuccess();
            },
            onError: () => {
                onError();
            },
        }
    );
};
