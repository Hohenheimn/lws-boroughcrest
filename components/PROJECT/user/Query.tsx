import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../util/api";

export const GetUser = (keyword: string, pageNumber: number) => {
    return useQuery(["user-list", keyword, pageNumber], () => {
        return api.get(
            `/project/user?keywords=${keyword}&page=${pageNumber}&paginate=10`,
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
