import React, { useEffect, useState } from "react";
import { GetReceiptsBook } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import Receiptsbook, {
    isReceiptBookData,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";

export default function ReceiptsBook() {
    const [isChangeData, setChangeData] = useState({});
    const [isBankCredit, setBankCredit] = useState({
        itemArray: [],
        selectAll: false,
    });

    const [ReceiptBookData, setReceiptBookData] = useState<isReceiptBookData>({
        selectAll: false,
        itemArray: [],
    });

    return (
        <Receiptsbook
            type="receipts-book"
            setChangeData={setChangeData}
            isReceiptBookData={ReceiptBookData}
            setReceiptBookData={setReceiptBookData}
            isBankCredit={isBankCredit}
            setBankCredit={setBankCredit}
            SaveHandler={() => {}}
            isLoadingSave={undefined}
        />
    );
}
