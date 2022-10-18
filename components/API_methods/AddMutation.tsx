import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import api from "../../util/api";

export const AddCorporateAccount = (onSuccess: any) => {
    return useMutation(
        (CorporateDetail: any) => {
            return api.post("/project/corporate", CorporateDetail);
        },
        {
            onSuccess: onSuccess,
        }
    );
};
