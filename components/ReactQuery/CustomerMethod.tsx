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
