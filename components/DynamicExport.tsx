import axios from "axios";
import { getCookie } from "cookies-next";
import { format } from "date-fns";

export const DynamicExportHandler = (endPoint: string, name: string) => {
    const date = format(new Date(), "dd/MM/yyyy");
    axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
        headers: {
            Authorization: "Bearer " + getCookie("user"),
        },
        method: "get",
        responseType: "blob",
    }).then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `${name}-${date}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
};
