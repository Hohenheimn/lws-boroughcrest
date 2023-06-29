import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import api from "../../../util/api";

export const PostRole = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/project/roles", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};

export const GetRoles = (Keyword: string, Page: number) => {
    return useQuery(["get-roles", Keyword, Page], () => {
        return api.get(
            `/project/roles?keywords=${Keyword}&paginate=10&page=${Page}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const ShowRole = (id: number) => {
    return useQuery(
        ["show-role", id],
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

export const RecentRole = (id: number, keyword: string) => {
    return useQuery(["recent-show-role", id], () => {
        return api.get(
            `/project/roles/recent-search/${id}?search=${keyword}&paginate=3`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const DeleteRole = (success: any, error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(`/project/roles/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};

export const UpdateRole = (success: any, error: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(`/project/roles/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};

export const AddUser = (success: any, error: any, id: number) => {
    return useMutation(
        (Payload: any) => {
            return api.post(`/project/roles/add-user/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
