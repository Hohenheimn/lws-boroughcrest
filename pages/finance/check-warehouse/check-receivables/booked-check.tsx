import React, { useState } from "react";
import { Advancefilter } from "../../../../components/Reusable/AdvanceFilter";
import TableCheckReceivables from "../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";

export type BookedCheckType = {
    id: 1;
    payor: string;
    receipt_no: string;
    check_date: string;
    description: string;
    check_no: string;
    bank_branch: string;
    amount: 5000;
    deposit_date: string;
    reference_no: string;
    remarks: string;
    status: string;
    created_at: string;
    updated_at: string;
    collection: {
        id: number;
    };
};

export default function BookedCheck() {
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
            page="booked-check"
            EndPointList={"/finance/customer-facility/booked-check?paginate=10"}
            EndPointAdvFilter={
                "/finance/customer-facility/booked-check/filter-options"
            }
            EndPointExport="/finance/customer-facility/booked-check/export"
        />
    );
}
