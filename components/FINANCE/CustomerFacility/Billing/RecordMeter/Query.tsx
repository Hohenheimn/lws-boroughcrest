import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../../util/api";

export const GetReadingDD = (keyword: string) => {
    return useQuery(["reading-list", keyword], () => {
        return api.get(
            `/finance/customer-facility/billing/record-meter-reading/reading-charge`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const CreateReadingDD = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/billing/record-meter-reading/reading-charge`,
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onSuccess: onSucces,
            onError: onError,
        }
    );
};

export const UpdateReadingDD = (onSucces: any, onError: any, id: number) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/billing/record-meter-reading/reading-charge/${id}`,
                Payload,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onSuccess: onSucces,
            onError: onError,
        }
    );
};
