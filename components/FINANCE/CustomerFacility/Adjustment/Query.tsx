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
            // ?list_type=${type}&filters=${filterArray}
            return api.get(
                `/finance/customer-facility/adjustment?paginate=10&search=${keyword}&page=${
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

export const CreateAdjustment = (onSuccess: any, onError: any) => {
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
            onError: () => {
                onError();
            },
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
            onError: () => {
                onError();
            },
        }
    );
};

export const MultipleUpdateAdjustment = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(`/finance/customer-facility/adjustment`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
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
    return useQuery(["invoice-detail", id], () => {
        return api.get(`/finance/customer-facility/adjustment/${id}`, {
            headers: { Authorization: "Bearer " + getCookie("user") },
        });
    });
};

export const GetInvoiceListByCustomerAndCharge = (
    customer_id: number | string,
    charge_id: number | string
) => {
    return useQuery(
        ["invoice-list-customer", customer_id, charge_id],
        () => {
            return api.get(
                `/finance/customer-facility/billing?customer_id=${customer_id}&charge_id=${charge_id}`,
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
