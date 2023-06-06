import React, { useState } from "react";
import TableCheckReceivables from "../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";
import { Advancefilter } from "../../../../components/Reusable/AdvanceFilter";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export type CheckScheduleType = {
    id: 1;
    payor: string;
    receipt_no: string;
    check_date: string;
    description: string;
    check_no: string;
    bank_branch: string;
    amount: number;
    status: string;
    is_matured: boolean;
    maturity: string;
    created_at: string;
    updated_at: string;
};

export default function CheckSchedule() {
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
            page="check-schedule"
            EndPointAdvFilter="/finance/customer-facility/check-schedule/filter-options?keywords="
            EndPointList="/finance/customer-facility/check-schedule?paginate=10"
            EndPointExport="/finance/customer-facility/check-schedule/export"
        />
    );
}
