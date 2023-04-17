import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../util/api";

export const GetInvoiceList = (
    keyword: string,
    type: string,
    TablePage: number | string,
    filterArray: string,
    dateFrom: string,
    dateTo: string
) => {
    return useQuery(
        [
            "invoice-list",
            keyword,
            type,
            TablePage,
            filterArray,
            dateFrom,
            dateTo,
        ],
        () => {
            return api.get(
                `/finance/customer-facility/billing?list_type=${type}&paginate=10&keywords=${keyword}&page=${TablePage}&filters=${filterArray}&date_from=${dateFrom}&date_to=${dateTo}`,
                {
                    headers: { Authorization: "Bearer " + getCookie("user") },
                }
            );
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};

export const CreateInvoiceBilling = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/finance/customer-facility/billing`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSuccess();
                queryClient.invalidateQueries(["invoice-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const ModifyInvoiceBilling = (onSuccess: any, onError: any, id: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/billing/${id}`,
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
                queryClient.invalidateQueries(["invoice-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const MultipleUpdateBillingList = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(`/finance/customer-facility/billing`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries(["invoice-list"]);
            },
            onError: onError,
        }
    );
};

export const GetInvoiceListDetail = (id: number | string) => {
    return useQuery(["invoice-detail", id], () => {
        return api.get(`/finance/customer-facility/billing/${id}`, {
            headers: { Authorization: "Bearer " + getCookie("user") },
        });
    });
};

export const GetInvoiceListByCustomer = (id: number | string) => {
    return useQuery(
        ["invoice-list-customer", id],
        () => {
            return api.get(
                `/finance/customer-facility/billing/load-list?customer_id=${id}`,
                {
                    headers: { Authorization: "Bearer " + getCookie("user") },
                }
            );
        },
        {
            enabled: !!id,
        }
    );
};

export const GetInvoiceRecentSearch = (
    id: string | number,
    keyword: string
) => {
    return useQuery(["billing-recent-search", id, keyword], () => {
        return api.get(
            `/finance/customer-facility/billing/recent-search/${id}?keywords=${keyword}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const DeleteInvoice = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id) => {
            return api.delete(`/finance/customer-facility/billing/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries(["invoice-list"]);
            },
            onError: onError,
        }
    );
};
