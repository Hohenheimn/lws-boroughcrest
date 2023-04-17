import React from "react";
import { BeatLoader } from "react-spinners";
import BillingDetail from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingDetail";
import { GetInvoiceListDetail } from "../../../../../components/FINANCE/CustomerFacility/Billing/Query";

export default function Id({ id }: any) {
    const { isLoading, data, isError } = GetInvoiceListDetail(id);

    console.log(data?.data);

    if (isLoading) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something is wrong!</h1>
            </div>
        );
    }
    return (
        <div>
            <BillingDetail InvoiceDetail={data?.data} />
        </div>
    );
}

export async function getServerSideProps({ query }: any) {
    const id = query.id;
    return {
        props: {
            id: id,
        },
    };
}
