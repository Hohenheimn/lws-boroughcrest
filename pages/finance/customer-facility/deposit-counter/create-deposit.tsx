import React from "react";
import DepositForm from "../../../../components/FINANCE/CustomerFacility/DepositCounter/DepositForm";

export default function CreateDeposit() {
    return (
        <DepositForm
            defDate={""}
            defReferenceNo={""}
            defBank={{
                id: "",
                value: "",
            }}
            defCashReceipt={[]}
        />
    );
}
