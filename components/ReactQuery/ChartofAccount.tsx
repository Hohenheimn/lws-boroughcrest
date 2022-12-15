import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";
import { ChartofAccountPayload } from "../../types/COAList";

export const COADetail = (id: any) => {
    return useQuery(["COA-detail", id], () => {
        return api.get(`/finance/general-ledger/chart-of-accounts/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const COACreate = (onSuccess: any, onError: any) => {
    return useMutation(
        (Payload: ChartofAccountPayload) => {
            return api.post(
                "/finance/general-ledger/chart-of-accounts",
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onError: onError,
            onSuccess: onSuccess,
        }
    );
};

export const COAUpdate = (onSuccess: any, onError: any, id: any) => {
    return useMutation(
        (Payload: ChartofAccountPayload) => {
            return api.put(
                `/finance/general-ledger/chart-of-accounts/${id}`,
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onError: onError,
            onSuccess: onSuccess,
        }
    );
};

export const COADelete = (onSuccess: any, onError: any, id: any) => {
    return useMutation(
        () => {
            return api.delete(
                `/finance/general-ledger/chart-of-accounts/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onError: onError,
            onSuccess: onSuccess,
        }
    );
};

export const COAExport = () => {
    return useQuery("export-AOC", () => {
        return api.get(
            "/finance/general-ledger/chart-of-accounts/export-list",
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                    "Content-Type": "application/xlsx",
                },
            }
        );
    });
};
