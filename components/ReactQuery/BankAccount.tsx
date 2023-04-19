import { getCookie } from "cookies-next";
import { useMutation, useQuery } from "react-query";
import api from "../../util/api";

// Create
export const CreateBA = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/finance/general-ledger/bank-accounts", Payload, {
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
// Get
export const GetBA = (Keyword: string) => {
    return useQuery(["get-bank-account", Keyword], () => {
        return api.get(
            `/finance/general-ledger/bank-accounts?keywords=${
                Keyword === undefined || Keyword === null ? "" : Keyword
            }`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};
export const GetBADetail = (id: number) => {
    return useQuery(
        ["get-bank-account-detail", id],
        () => {
            return api.get(`/finance/general-ledger/bank-accounts/${id}`, {
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
// Delete
export const DeleteBA = (success: any, error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(`/finance/general-ledger/bank-accounts/${id}`, {
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
// Update
export const UpdateBA = (success: any, error: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/general-ledger/bank-accounts/${id}`,
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
