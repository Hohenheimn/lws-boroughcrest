import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../../util/api";

export const GetDiscountList = () => {
    return useQuery(
        ["discount-list"],
        () => {
            return api.get(`/finance/customer-facility/collection/discount`, {
                headers: { Authorization: "Bearer " + getCookie("user") },
            });
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};

export const CreateDiscount = (
    onSuccess: any,
    onError: any,
    id: string | number
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/collection/discount/${id}`,
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onSuccess: () => {
                onSuccess();
                queryClient.invalidateQueries(["discount-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const CreateCollection = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/finance/customer-facility/collection`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSuccess();
                queryClient.invalidateQueries(["collection-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};
