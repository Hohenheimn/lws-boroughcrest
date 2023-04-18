import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";
import axios from "axios";

export const PostCustomerSave = (Success: any, onError: any) => {
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
            onError: (e) => {
                onError(e);
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
    return useQuery(
        ["get-customer-detail", id],
        () => {
            return api.get(`/admin/customer/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            enabled: !!id,
        }
    );
};

export const GetCustomerList = (
    TablePage: number,
    isSearchBar: string,
    TableRows: number
) => {
    return useQuery(
        ["get-customer-list", TablePage, isSearchBar, TableRows],
        () => {
            return api.get(
                `/admin/customer?keywords=${isSearchBar}&paginate=${TableRows}&page=${
                    isSearchBar === "" ? TablePage : 1
                }`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
};

export const GetCustomerDraft = (id: any) => {
    return useQuery(["get-customer-draft", id], () => {
        return api.get(`/admin/customer/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetUnitCode = (classType: string) => {
    return useQuery(["get-unitcode", classType], () => {
        return api.get(
            `/admin/property/unit${classType === "Owner" ? "?NoOwner=1" : ""}${
                classType === "Developer" ? "?NoDeveloper=1" : ""
            }`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const PutCustomer = (onSuccess: any, onError: any, id: any) => {
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
            onError: onError,
        }
    );
};

export const UpdateDraft = (onSuccess: any, onError: any, id: any) => {
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
            onError: onError,
        }
    );
};

export const CustomerImport = (onSuccess: any, ImportError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: FormData) => {
            return api.post(`/admin/customer/import`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("get-customer-list");
                onSuccess();
            },
            onError: ImportError,
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

export const GetImage = (pathName: any, wait?: any) => {
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
            enabled: !!wait,
        }
    );
};

export const SendPortal = (onSuccess: any, onError: any) => {
    return useMutation(
        (id: any) => {
            return api.post(`/admin/customer/${id}/send-portalid`, null, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};
