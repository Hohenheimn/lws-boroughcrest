import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

export const COADetail = (id: number) => {
    return useQuery("COA-detail", () => {
        return api.get(`/finance/general-ledger/chart-of-accounts/${id}`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};
