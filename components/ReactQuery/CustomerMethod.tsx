import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";
import axios from "axios";

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
        (data: FormData) => {
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
export const CustomerExport = () => {
    return useQuery("export-customer", () => {
        return api.get("/admin/customer/export", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
                "Content-Type": "application/xlsx",
            },
        });
    });
};

export const UpdateProperties = (id: any, onSuccess: any) => {
    return useMutation(
        (data: any) => {
            return api.post(`admin/customer/${id}/property`, data, {
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

export const GetDraft = () => {
    return useQuery("get-customer-draft", () => {
        return api.get("/admin/customer/draft", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetImage = (pathName: any) => {
    return useQuery(
        ["get-image", pathName],
        () => {
            return api.get(`/get-img?image=${pathName}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
                responseType: "blob",
            });
        },
        {
            enabled: !!pathName,
        }
    );
};
