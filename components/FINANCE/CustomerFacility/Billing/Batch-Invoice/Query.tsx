import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../../../util/api";

export const GetBatchInvoiceGroupList = (
    keyword: string,
    PageNumber: number
) => {
    return useQuery(
        ["group-application-list", keyword],
        () => {
            return api.get(
                `/finance/customer-facility/billing/batch/groups?keywords=${keyword}&paginate=10&page=${PageNumber}`,
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
