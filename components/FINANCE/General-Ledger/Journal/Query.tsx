import api from "../../../../util/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";

export const CreateJournal = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post("/finance/general-ledger/journal", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("journal-list");
            },
            onError: onError,
        }
    );
};
export const CreateDraftJournal = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.post(
                "/finance/general-ledger/journal?draft=1",
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
                onSucces();
                queryClient.invalidateQueries("journal-list");
            },
            onError: onError,
        }
    );
};
export const UpdateJournal = (
    onSucces: any,
    onError: any,
    id: string | number
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(`/finance/general-ledger/journal/${id}`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("journal-list");
            },
            onError: onError,
        }
    );
};
export const DeleteJournal = (
    onSucces: any,
    onError: any,
    id: string | number
) => {
    const queryClient = useQueryClient();
    return useMutation(
        () => {
            return api.delete(`/finance/general-ledger/journal/${id}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries("journal-list");
            },
            onError: onError,
        }
    );
};

export const MultipleUpdate = (onSucces: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (Payload: any) => {
            return api.put(`/finance/general-ledger/journal`, Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
                queryClient.invalidateQueries([
                    "journal-list",
                    "",
                    "unposted",
                    1,
                    [],
                ]);
            },
            onError: onError,
        }
    );
};

// Journal List
// type posted or unposted
export const GetJournal = (
    keyword: string,
    type: string,
    TablePage: number | string,
    filterArray: string[],
    dateFrom: string,
    dateTo: string
) => {
    return useQuery(
        [
            "journal-list",
            keyword,
            type,
            TablePage,
            filterArray,
            dateFrom,
            dateTo,
        ],
        () => {
            return api.get(
                `/finance/general-ledger/journal?list_type=${type}&paginate=10&keywords=${keyword}&page=${TablePage}&filters=${filterArray}&date_from=${dateFrom}&date_to=${dateTo}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};

export const GetJournalDetail = (id: string | number) => {
    return useQuery(["journal-detail", id], () => {
        return api.get(`/finance/general-ledger/journal/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetJournalRecentSearch = (
    id: string | number,
    keyword: string
) => {
    return useQuery(["journal-recent-search", id, keyword], () => {
        return api.get(
            `/finance/general-ledger/journal/recent-search/${id}?keywords=${keyword}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};
