import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../util/api";
import { getCookie } from "cookies-next";

export const CheckScheduleList = (
    keyword: string,
    TablePage: number | string,
    filterArray: string,
    dateFrom: string,
    dateTo: string,
    endpoint: string
) => {
    return useQuery(
        [
            "check-schedule-list",
            keyword,
            TablePage,
            filterArray,
            dateFrom,
            dateTo,
            endpoint,
        ],
        () => {
            return api.get(
                `${endpoint}?paginate=10&filters=${filterArray}&keyword=${keyword}&page=${
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
