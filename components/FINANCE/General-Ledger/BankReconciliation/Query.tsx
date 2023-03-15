import api from "../../../../util/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";

export const CreateUpdateBR = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                "/finance/general-ledger/bank-reconciliation",
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
                queryClient.invalidateQueries("bank-recon-list");
            },
            onError: onError,
        }
    );
};

export const GetBR = (
    dateFrom: string,
    dateTo: string,
    bank_account_id: string
) => {
    return useQuery(
        ["bank-recon-list", bank_account_id, dateFrom, dateTo],
        () => {
            return api.get(
                `/finance/general-ledger/bank-reconciliation?bank_account_id=${bank_account_id}&date_from=${dateFrom}&date_to=${dateTo}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
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
