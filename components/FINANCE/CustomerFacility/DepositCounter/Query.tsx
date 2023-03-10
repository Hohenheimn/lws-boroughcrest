import { getCookie } from "cookies-next";
import { useQuery } from "react-query";
import api from "../../../../util/api";

export const GetReceiptsBook = (
    keyword: string,
    tablepage: string | number,
    status: string,
    listType: string
) => {
    return useQuery(
        ["receipts-book-list", keyword, tablepage, listType, status],
        () => {
            return api.get(
                `/finance/customer-facility/deposit-counter?list_type=${listType}&status=${status}&keywords=${keyword}&paginate=10&page=${tablepage}`,

                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
};

export const GetCashReceipt = () => {
    return useQuery(["cash-receipts-list"], () => {
        return api.get(
            `/finance/customer-facility/deposit-counter?list_type=cash_receipt`,

            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });
};

export const GetBankCredit = (
    status: string,
    dateFrom: string,
    dateTo: string,
    bankIDs: number[],
    page: number,
    keywords: string
) => {
    return useQuery(
        ["bank-credit-list", status, dateFrom, dateTo, bankIDs, page, keywords],
        () => {
            return api.get(
                `/finance/customer-facility/bank-credit?status=${status}&date_from=${dateFrom}&date_to=${dateTo}&bank_account_ids=[${bankIDs}]&paginate=10&page=${page}&keywords=${keywords}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
};
