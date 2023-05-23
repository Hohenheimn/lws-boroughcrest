import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import PaymentRegisterDetail from "../../../../../components/FINANCE/CustomerFacility/Collection/PaymentRegisterDetail";
import { GetCollectionDetail } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";

export default function CheckPaymentDetail() {
    const router = useRouter();

    const id: any = router.query.id;

    const { isLoading, data, isError } = GetCollectionDetail(id);

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
                <h1>Something is wrong</h1>
            </div>
        );
    }

    return (
        <div>
            <PaymentRegisterDetail CollectionDetail={data?.data} />
        </div>
    );
}
