import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import api from "../../../util/api";

export const PostSubscriber = (Success: any, onError: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return api.post("/system-admin/subscriber", data, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriber-list");
        Success();
      },
      onError: (e) => {
        onError(e);
      },
    }
  );
};

export const SubscriberList = (
  keyword: string,
  pageNumber: number,
  rowNumber: number
) => {
  return useQuery(["subscriber-list", keyword, pageNumber], () => {
    return api.get(
      `/system-admin/subscriber?keywords=${keyword}&page=${
        keyword === "" ? pageNumber : 1
      }&paginate=${rowNumber}`,
      {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      }
    );
  });
};

export const UpdateSubscriber = (Success: any, onError: any, id: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return api.put(`/system-admin/subscriber/${id}`, data, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriber-list");
        Success();
      },
      onError: (e) => {
        onError(e);
      },
    }
  );
};
