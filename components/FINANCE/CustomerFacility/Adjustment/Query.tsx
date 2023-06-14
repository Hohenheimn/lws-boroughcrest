import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../util/api";
import { getCookie } from "cookies-next";

export const GetAdjustmentList = (
    keyword: string,
    type: string,
    TablePage: number | string,
    filterArray: string,
    dateFrom: string,
    dateTo: string
) => {
    return useQuery(
        [
            "adjustment-list",
            keyword,
            type,
            TablePage,
            filterArray,
            dateFrom,
            dateTo,
        ],
        () => {
            return api.get(
                `/finance/customer-facility/adjustment?paginate=10&list_type=${type}&filters=${filterArray}&search=${keyword}&page=${
                    keyword === "" ? TablePage : 1
                }&date_from=${dateFrom}&date_to=${dateTo}`,
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

export const CreateNewAdjustment = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/finance/customer-facility/adjustment`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSuccess();
                queryClient.invalidateQueries(["adjustment-list"]);
            },
            onError: onError,
        }
    );
};

export const CreateDraftAdjustment = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/adjustment?draft=1`,
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
                queryClient.invalidateQueries(["adjustment-list"]);
            },
            onError: onError,
        }
    );
};

export const ModifyDraftAdjustment = (
    onSuccess: any,
    onError: any,
    id: any
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/adjustment/${id}?draft=1`,
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
                queryClient.invalidateQueries(["adjustment-list"]);
            },
            onError: onError,
        }
    );
};

export const ModifyAdjustment = (onSuccess: any, onError: any, id: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/adjustment/${id}`,
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
                queryClient.invalidateQueries(["adjustment-list"]);
            },
            onError: onError,
        }
    );
};

export const MultipleUpdateAdjustment = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: { status: string; adjustment_ids: number[] }) => {
            return api.put(
                `/finance/customer-facility/adjustment/change-status`,
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
                queryClient.invalidateQueries(["adjustment-list"]);
            },
            onError: onError,
        }
    );
};

export const GetAdjustmentDetail = (id: number | string) => {
    return useQuery(["adjustment-detail", id], () => {
        return api.get(`/finance/customer-facility/adjustment/${id}`, {
            headers: { Authorization: "Bearer " + getCookie("user") },
        });
    });
};

export const GetInvoiceByCustomerAndCharge = (
    customer_id: number | string,
    charge_id: number | string
) => {
    return useQuery(
        ["Invoice-list-customer-charge", customer_id, charge_id],
        () => {
            return api.get(
                `/finance/customer-facility/billing?customer_id=${customer_id}&charge_id=${charge_id}&list_type=posted&heirarchy=1`,
                {
                    headers: { Authorization: "Bearer " + getCookie("user") },
                }
            );
        },
        {
            enabled: !!charge_id && !!customer_id,
        }
    );
};

export const GetAccountEntriesList = (
    charge_id: number | string,
    document_no: string,
    customer_id: any
) => {
    return useQuery(
        ["account-entries-list", charge_id, document_no, customer_id],
        () => {
            return api.get(
                `/finance-report/accounting-entries?charge_id=${charge_id}&document_no=${document_no}&customer_id=${customer_id}`,
                {
                    headers: { Authorization: "Bearer " + getCookie("user") },
                }
            );
        }
    );
};

export const GetFilteredAccountEntriesList = (
    charge_id: number | string,
    type: string
) => {
    return useQuery(
        ["account-filtered-entries-list", charge_id, type],
        () => {
            return api.get(
                `/finance/customer-facility/adjustment/accounting-entries?charge_id=${charge_id}&type=${type}`,
                {
                    headers: { Authorization: "Bearer " + getCookie("user") },
                }
            );
        },
        {
            enabled: !!charge_id && !!type,
        }
    );
};
