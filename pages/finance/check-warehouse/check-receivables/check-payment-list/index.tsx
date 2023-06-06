import React, { useState } from "react";
import { Advancefilter } from "../../../../../components/Reusable/AdvanceFilter";
import TableCheckReceivables from "../../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function CheckPaymentList() {
    const [isSearch, setSearch] = useState("");

    const [TablePage, setTablePage] = useState(1);

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [isAdvFilter, setAdvFilter] = useState<Advancefilter>([]);

    const [isFilterText, setFilterText] = useState<string>("");

    const PagePermisson = PageAccessValidation("Check Receivables");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <TableCheckReceivables
            isSearch={isSearch}
            setSearch={setSearch}
            TablePage={TablePage}
            setTablePage={setTablePage}
            isAdvFilter={isAdvFilter}
            setAdvFilter={setAdvFilter}
            isFilterText={isFilterText}
            setFilterText={setFilterText}
            isPeriod={isPeriod}
            setPeriod={setPeriod}
            page="check-payment-list"
            EndPointList={
                "/finance/customer-facility/collection?paginate=10&collection_check_warehouse_id=not null&receipt_type=Acknowledgement"
            }
            EndPointAdvFilter={
                "/finance/customer-facility/collection/filter-options?receipt_type=Acknowledgement&collection_check_warehouse_id=not null&keywords="
            }
            EndPointExport=""
        />
    );
}
