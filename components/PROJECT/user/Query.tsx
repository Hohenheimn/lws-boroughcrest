import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../util/api";

export const GetUser = (
    keyword: string,
    pageNumber: number,
    rowNumber: number
) => {
    return useQuery(["user-list", keyword, pageNumber], () => {
        return api.get(
            `/project/user?keywords=${keyword}&page=${
                keyword === "" ? pageNumber : 1
            }&paginate=${rowNumber}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const GetUseradd = (keyword: string, pageNumber: number) => {
    return useQuery(["user-list", keyword, pageNumber], () => {
        return api.get(
            `/project/user?keywords=${keyword}&page=${
                keyword === "" ? pageNumber : 1
            }`,
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
            `/project/user/recent-search/${id}?keywords=${keyword}&paginate=3`,
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
                queryValidate.invalidateQueries(["user-detail", `${id}`]);
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const UpdateUserRole = (id: number, onSuccess: any, onError: any) => {
    const queryValidate = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(`/project/user/modify-role/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryValidate.invalidateQueries(["user-detail", `${id}`]);
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const CreateUser = (onSuccess: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post(`/project/user`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

// Get Department
export const GetDepartment = (Keyword: string) => {
    return useQuery(["get-department", Keyword], () => {
        return api.get(`/project/user/department?keywords=${Keyword}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

// Create Department
export const PostDepartment = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/project/user/department", Payload, {
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
// Delete Department
export const DeleteDepartment = (success: any, error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(`/project/user/department/${id}`, {
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
// Update Department
export const UpdateDepartment = (success: any, error: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(`/project/user/department/${id}`, Payload, {
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
