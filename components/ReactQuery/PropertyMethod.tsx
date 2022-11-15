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
