import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../../util/api";

export const GetReceiptsBook = (
    keyword: string,
    tablepage: string | number
) => {
    return useQuery(["receipts-book-list", keyword, tablepage], () => {
        return api.get(
            `/finance/general-ledger/chart-of-accounts?keywords=${keyword}&paginate=10&page=${tablepage}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const GetBankCredit = (keyword: string, tablepage: string | number) => {
    return useQuery(["bank-credit-list", keyword, tablepage], () => {
        return api.get(
            `/finance/general-ledger/chart-of-accounts?keywords=${keyword}&paginate=10&page=${tablepage}`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};
