import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

export const ChargeDetail = (id: any) => {
    return useQuery(["Charge-detail", id], () => {
        return api.get(`/finance/customer-facility/charges/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const ChargeCreate = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/finance/customer-facility/charges", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSucces,
            onError: onError,
        }
    );
};

export const ChargeUpdate = (onSucces: any, onError: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/charges/${id}`,
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onSuccess: onSucces,
            onError: onError,
        }
    );
};

export const ChargeDelete = (onSucces: any, onError: any, id: any) => {
    return useMutation(
        () => {
            return api.delete(`/finance/customer-facility/charges/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSucces,
            onError: onError,
        }
    );
};
