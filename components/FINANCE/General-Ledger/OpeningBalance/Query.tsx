import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../util/api";

export const CreateUpdateSubledger = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                "/finance/general-ledger/opening-balance/subledger",
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
                onSucces();
                queryClient.invalidateQueries("subledger-list");
            },
            onError: onError,
        }
    );
};

export const OpeningBalanceImport = (
    onSuccess: any,
    ImportError: any,
    endpoint: string
) => {
    return useMutation(
        (data: FormData) => {
            return api.post(`${endpoint}`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
            onError: ImportError,
        }
    );
};

export const GetSubledger = () => {
    return useQuery("subledger-list", () => {
        return api.get(`/finance/general-ledger/opening-balance/subledger`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const CreateUpdateGeneralLedger = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                "/finance/general-ledger/opening-balance/general-ledger",
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
                onSucces();
                queryClient.invalidateQueries("subledger-list");
            },
            onError: onError,
        }
    );
};

export const GetGeneralLedger = () => {
    return useQuery("generalLedger-list", () => {
        return api.get(
            `/finance/general-ledger/opening-balance/general-ledger`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};
