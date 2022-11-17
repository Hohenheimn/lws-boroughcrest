import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

// List of Property
export const GetPropertyList = (PageNumber: any, Keyword: any) => {
    return useQuery(["Property-List", PageNumber, Keyword], () => {
        return api.get(
            `/admin/property/unit?paginate=${PageNumber}&keywords=${Keyword}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};
// Import
export const PropertyImport = (onSuccess: any, ImportError: any) => {
    return useMutation(
        (data: FormData) => {
            return api.post(`/admin/property/unit/import`, data, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: onSuccess,
            onError: ImportError,
        }
    );
};
// Show Property Detail
export const GetPropertyDetail = (id: any) => {
    return useQuery(["get-property-detail", id], () => {
        return api.get(`/admin/property/unit/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

// Create Project
export const PostProject = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/admin/property/project", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Get Project
export const GetProject = () => {
    return useQuery("get-project", () => {
        return api.get("/admin/property/project", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};
// Delete Project
export const DeleteProject = (success: any, error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(`/admin/property/project/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Update Project
export const UpdateProject = (success: any, error: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(`/admin/property/project/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Create Tower
export const PostTower = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/admin/property/tower", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Get Tower
export const GetTower = () => {
    return useQuery("get-tower", () => {
        return api.get("/admin/property/tower", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};
// Delete Tower
export const DeleteTower = (success: any, error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(`/admin/property/tower/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Update Tower
export const UpdateTower = (success: any, error: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(`/admin/property/tower/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};

// Create Floor
export const PostFloor = (success: any, error: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/admin/property/floor", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Get Floor
export const GetFloor = (success: any, error: any) => {
    return useQuery(
        "get-floor",
        () => {
            return api.get("/admin/property/floor", {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Delete Floor
export const DeleteFloor = (success: any, error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(`/admin/property/floor/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
// Update Floor
export const UpdateFloor = (success: any, error: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(`/admin/property/floor/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onError: error,
            onSuccess: success,
        }
    );
};
