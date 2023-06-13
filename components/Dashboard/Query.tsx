import { useQuery } from "react-query";
import api from "../../util/api";
import { getCookie } from "cookies-next";

export const GetDashboardUtility = () => {
    return useQuery(["dashboard-utility"], () => {
        return api.get(`/dashboard-utilities`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};

export const GetDashboardProperty = (
    tower_id: string,
    floor_id: string,
    type: string,
    chart_type: string,
    citizenship_type: string,
    class_type: string
) => {
    return useQuery(
        [
            "dashboard-properties",
            tower_id,
            floor_id,
            type,
            chart_type,
            class_type,
            citizenship_type,
        ],
        () => {
            return api.get(
                `/dashboard-properties?tower_id=${tower_id}&floor_id=${floor_id}&type=${type}&class=${class_type}&chart_type=${chart_type}&citizenship_type=${citizenship_type}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
};
