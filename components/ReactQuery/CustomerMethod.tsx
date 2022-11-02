import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

export const PostCustomerSave = (Success: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: FormData) => {
            return api.post("/admin/customer?save=1", data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("get-customer-list");
                Success();
            },
        }
    );
};
export const PostCustomerDraft = (Success: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: FormData) => {
            return api.post("/admin/customer?draft=1", data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("get-customer-list");
                Success();
            },
        }
    );
};

export const GetCustomer = (id: any) => {
    return useQuery(["get-customer-detail", id], () => {
        return api.get(`/admin/customer/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetUnitCode = () => {
    return useQuery("get-unitcode", () => {
        return api.get("/admin/property/unit", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetDraft = () => {
    return useQuery("get-customer-draft", () => {
        return api.get("/admin/customer/draft", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const PutCustomer = (onSuccess: any, id: any) => {
    return useMutation(
        (data: FormData) => {
            return api.post(`/admin/customer/${id}?save=1`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
        }
    );
};

export const SaveDraftUpdate = (onSuccess: any, id: any) => {
    return useMutation(
        (data: FormData) => {
            return api.post(`/admin/customer/${id}?save=1`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
        }
    );
};

export const CustomerImport = (onSuccess: any) => {
    return useMutation(
        (data) => {
            return api.post(`/admin/customer/import`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
        }
    );
};
export const CustomerExport = (onSuccess: any) => {
    return useQuery(
        "Customer-Export",
        (data) => {
            return api.get(`/admin/customer/export`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
        }
    );
};
