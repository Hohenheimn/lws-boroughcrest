import React, { useState } from "react";
import { Advancefilter } from "../../../../../components/Reusable/AdvanceFilter";
import TableCheckReceivables from "../../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";

export default function CheckPaymentList() {
    const [isSearch, setSearch] = useState("");

    const [TablePage, setTablePage] = useState(1);

    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [isAdvFilter, setAdvFilter] = useState<Advancefilter>([]);

    const [isFilterText, setFilterText] = useState<string>("");

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
            EndPointList={"/finance/customer-facility/collection"}
            EndPointAdvFilter={
                "/finance/customer-facility/collection/filter-options"
            }
            EndPointExport=""
        />
    );
}
