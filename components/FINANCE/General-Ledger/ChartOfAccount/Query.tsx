import { getCookie } from "cookies-next";
import { useMutation, useQueryClient } from "react-query";
import api from "../../../../util/api";

export const ChartOfAccountImport = (onSuccess: any, ImportError: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: FormData) => {
            return api.post(
                `/finance/general-ledger/chart-of-accounts/import`,
                data,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("COA-list");
                onSuccess();
            },
            onError: ImportError,
        }
    );
};
