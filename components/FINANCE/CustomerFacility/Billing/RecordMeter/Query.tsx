import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../../util/api";

export const GetReadingDD = (keyword: string) => {
    return useQuery(["reading-list", keyword], () => {
        return api.get(
            `/finance/customer-facility/billing/record-meter-reading/reading-charge?keywords=${keyword}`,
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

export const GetRecordMeterList = (
    charde_id: string,
    from: string,
    to: string,
    page: number
) => {
    return useQuery(["record-meter-list", charde_id, from, to, page], () => {
        return api.get(
            `/finance/customer-facility/billing/record-meter-reading?charge_id=${charde_id}&period_from=${from}&period_to=${to}&paginate=10&page=${page}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const CreateRecordMeter = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post(
                `/finance/customer-facility/billing/record-meter-reading`,
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

export const UpdateRecordMeter = (onSucces: any, onError: any, id: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/billing/record-meter-reading/${id}`,
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

export const ShowRecordMeter = (id: any) => {
    return useQuery(["reading-show", id], () => {
        return api.get(
            `/finance/customer-facility/billing/record-meter-reading/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const ApplyRecordMeter = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.put(
                `/finance/customer-facility/billing/record-meter-reading/apply`,
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
