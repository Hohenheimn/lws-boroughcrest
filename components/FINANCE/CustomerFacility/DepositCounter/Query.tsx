import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../util/api";

export const GetReceiptsBook = (
    keyword: string,
    tablepage: string | number,
    status: string,
    listType: string
) => {
    return useQuery(
        ["receipts-book-list", keyword, tablepage, listType, status],
        () => {
            return api.get(
                `/finance/customer-facility/deposit-counter?list_type=${listType}&status=${status}&keywords=${keyword}&paginate=10&page=${tablepage}`,

                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
};

export const GetCashReceipt = () => {
    return useQuery(["cash-receipts-list"], () => {
        return api.get(
            `/finance/customer-facility/deposit-counter?list_type=cash_receipt`,

            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const GetBankCredit = (
    status: string,
    dateFrom: string,
    dateTo: string,
    bankIDs: number[],
    page: number | string,
    keywords: string
) => {
    return useQuery(
        ["bank-credit-list", status, dateFrom, dateTo, bankIDs, page, keywords],
        () => {
            return api.get(
                `/finance/customer-facility/bank-credit?status=${status}&date_from=${dateFrom}&date_to=${dateTo}&bank_account_ids=${
                    bankIDs.length <= 0 ? "" : `[${bankIDs}]`
                }&paginate=10&page=${page}&keywords=${keywords}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
};

export const CreateDepositCounter = (onSuccess: any, onError: any) => {
    const queryCLient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/deposit-counter`,
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
                queryCLient.invalidateQueries("bank-credit-list");
                queryCLient.invalidateQueries("receipts-book-list");
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const UpdateDepositCounter = (
    onSucces: any,
    onError: any,
    id: string | number
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/deposit-counter/${id}`,
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
                queryClient.invalidateQueries("bank-credit-list");
                queryClient.invalidateQueries("receipts-book-list");
            },
            onError: onError,
        }
    );
};

export const MultipleUpdateBankCredit = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(`/finance/customer-facility/bank-credit`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("bank-credit-list");
            },
            onError: onError,
        }
    );
};

export const MultipleUpdateReceiptBook = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/deposit-counter`,
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
                queryClient.invalidateQueries("bank-credit-list");
            },
            onError: onError,
        }
    );
};

export const ShowDeposit = (id: string | number) => {
    return useQuery(["show-deposit", id], () => {
        return api.get(`/finance/customer-facility/deposit-counter/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const ShowBankCredit = (id: string | number) => {
    return useQuery(["show-bank-credit", id], () => {
        return api.get(`/finance/customer-facility/bank-credit/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const SaveTagging = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/deposit-counter/save-tagging`,
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
                queryClient.invalidateQueries("bank-credit-list");
                queryClient.invalidateQueries("receipts-book-list");
            },
            onError: onError,
        }
    );
};
