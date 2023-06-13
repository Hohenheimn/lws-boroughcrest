import { useMutation, useQuery } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";

export const GetFavoriteList = (report_type: string, page: number) => {
    return useQuery(["favorite-list", report_type], () => {
        return api.get(
            `/finance/customer-facility/customer-reports/favorite-reports?report_type=${report_type}&paginate=10&page=${page}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const ShowFavorite = (id: number) => {
    return useQuery(
        ["show-favorite", id],
        () => {
            return api.get(
                `/finance/customer-facility/customer-reports/favorite-reports/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
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
