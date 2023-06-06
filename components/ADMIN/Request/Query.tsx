import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../util/api";

export const CreateUpdateBR = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post("", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("");
            },
            onError: onError,
        }
    );
};

export const ShowBankRecon = (id: string | number) => {
    return useQuery(["show-bank-reconciliation", id], () => {
        return api.get(`/finance/customer-facility/deposit-counter/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};
