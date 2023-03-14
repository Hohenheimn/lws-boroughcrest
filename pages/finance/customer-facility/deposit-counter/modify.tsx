import React from "react";
import DepositForm from "../../../../components/FINANCE/CustomerFacility/DepositCounter/DepositForm";

export default function modify({ id }: any) {
    return (
        <DepositForm
            id={id}
            defDate={""}
            defReferenceNo={""}
            defBank={{
                id: "",
                value: "",
            }}
            defCashReceipt={{
                selectAll: false,
                itemArray: [],
            }}
        />
    );
}
export async function getServerSideProps({ query }: any) {
    const id = query.deposit_id;
    return {
        props: {
            id: id,
        },
    };
}
