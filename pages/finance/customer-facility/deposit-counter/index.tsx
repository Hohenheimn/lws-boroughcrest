import React from "react";
import BankCredit from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import Receiptsbook from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function index() {
    return (
        <>
            <Receiptsbook type="" />
            <div className="my-10 h-[1px] bg-gray-300 w-full"></div>
            <BankCredit type="" />
        </>
    );
}
