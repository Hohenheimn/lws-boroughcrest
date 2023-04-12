import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../../util/api";

export const GetDiscountList = () => {
    return useQuery(
        ["discount-list"],
        () => {
            return api.get(`/finance/customer-facility/collection/discount`, {
                headers: { Authorization: "Bearer " + getCookie("user") },
            });
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};

export const CreateDiscount = (
    onSuccess: any,
    onError: any,
    id: string | number
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/collection/discount/${id}`,
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
                queryClient.invalidateQueries(["discount-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const CreateCollection = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(`/finance/customer-facility/collection`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSuccess();
                queryClient.invalidateQueries(["collection-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const DeleteDiscount = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: number) => {
            return api.delete(
                `/finance/customer-facility/collection/discount/${id}`,
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
                queryClient.invalidateQueries(["discount-list"]);
            },
            onError: () => {
                onError();
            },
        }
    );
};

export const GetCollectionList = (
    search: string,
    date_from: string,
    date_to: string,
    page: number,
    filterArray: string[]
) => {
    return useQuery(
        ["collection-list", search, date_from, date_to, page, filterArray],
        () => {
            return api.get(
                `/finance/customer-facility/collection?search=${search}&date_from=${date_from}&date_to=${date_to}&paginate=10&page=${page}&filters=${filterArray}`,
                {
                    headers: { Authorization: "Bearer " + getCookie("user") },
                }
            );
        }
    );
};

export const GetCollectionDetail = (id: number) => {
    return useQuery(["collection-detail", id], () => {
        return api.get(`/finance/customer-facility/collection/${id}`, {
            headers: { Authorization: "Bearer " + getCookie("user") },
        });
    });
};

export const GetCustomerOutstanding = (id: number) => {
    return useQuery(
        ["billing-outstanding", id],
        () => {
            return api.get(
                `/finance/customer-facility/billing?customer_id=${id}&list_type=posted`,
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

export const GetCustomerSummary = (id: number) => {
    return useQuery(
        ["customer-collection", id],
        () => {
            return api.get(
                `/finance/customer-facility/collection?customer_id=${id}`,
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
