import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../../util/api";

export const GetBatchInvoiceGroupList = (
    keyword: string,
    PageNumber: number
) => {
    return useQuery(
        ["group-application-list", keyword, PageNumber],
        () => {
            return api.get(
                `/finance/customer-facility/billing/batch/groups?keywords=${keyword}&paginate=10&page=${PageNumber}`,
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

export const CreateGroup = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/billing/batch/groups`,
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

export const UpdateGroup = (onSucces: any, onError: any, id: number) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/billing/batch/groups/${id}`,
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

export const ShowGroup = (id: number) => {
    return useQuery(
        ["show-group", id],
        () => {
            return api.get(
                `/finance/customer-facility/billing/batch/groups/${id}`,
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

export const DeleteGroup = (onSucces: any, onError: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(
                `/finance/customer-facility/billing/batch/groups/${id}`,

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

export const CreateUpdateBatchInvoice = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/billing/batch`,
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

export const GetBatchInvoiceList = (PageNumber: number) => {
    return useQuery(
        ["batch-invoice-list", PageNumber],
        () => {
            return api.get(
                `/finance/customer-facility/billing/batch?paginate=10&page=${PageNumber}`,
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

export const DeleteBatchInvoice = (onSucces: any, onError: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(
                `/finance/customer-facility/billing/batch/${id}`,

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

export const UpdateBatchInvoice = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/billing/batch/apply`,
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

export const ShowBatchInvoice = (id: number) => {
    return useQuery(
        ["show-batch-invoice", id],
        () => {
            return api.get(`/finance/customer-facility/billing/batch/${id}`, {
                headers: { Authorization: "Bearer " + getCookie("user") },
            });
        },
        {
            enabled: !!id,
        }
    );
};
