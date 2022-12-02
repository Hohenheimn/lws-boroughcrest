import React from "react";
import CustomerDetail from "../../../components/ADMIN/Customer/CustomerDetails";
import api from "../../../util/api";

export default function CustomerID({ Draft }: any) {
    return (
        <div>
            <CustomerDetail Draft={Draft} />
        </div>
    );
}

export const getServerSideProps = async (context: any) => {
    const id = context.query.id;
    const cookiesName: any = context.req.headers.cookie;
    const cookieArray = cookiesName.split("=");
    let cookie = cookieArray[cookieArray.length - 1];
    cookie = cookie.replace("%7C", "|");
    let DraftVal: any;

    try {
        const { data } = await api.get(`/admin/customer/draft/${id}`, {
            headers: {
                Authorization: `Bearer ${cookie}`,
            },
        });
        DraftVal = data;
        return {
            props: {
                Draft: DraftVal,
            },
        };
    } catch {
        DraftVal = false;
        return {
            props: {
                Draft: DraftVal,
            },
        };
    }
};
