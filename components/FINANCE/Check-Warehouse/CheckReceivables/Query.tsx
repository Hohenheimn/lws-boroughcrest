import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../util/api";
import { getCookie } from "cookies-next";

export const CheckScheduleList = (endpoint: string) => {
    return useQuery(
        ["check-schedule-list", endpoint],
        () => {
            return api.get(`${endpoint}`, {
                headers: { Authorization: "Bearer " + getCookie("user") },
            });
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};

export const ShowBookedCheck = (id: number) => {
    return useQuery(
        ["show-booked-check", id],
        () => {
            return api.get(`/finance/customer-facility/booked-check/${id}`, {
                headers: { Authorization: "Bearer " + getCookie("user") },
            });
        },
        {
            enabled: !!id,
        }
    );
};

export const BookedCheckPost = (onSuccess: any, onError: any, id: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/check-schedule/booked-check/${id}?_method=PUT`,
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
                queryClient.invalidateQueries(["check-schedule-list"]);
            },
            onError: onError,
        }
    );
};
