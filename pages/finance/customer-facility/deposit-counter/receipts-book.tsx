import React, { useEffect, useState } from "react";
import { GetReceiptsBook } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import Receiptsbook, {
    isReceiptBookData,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

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

    const PagePermisson = PageAccessValidation("Deposit Counter");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

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
