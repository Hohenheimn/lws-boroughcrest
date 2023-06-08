import React, { useEffect, useState } from "react";
import TableCheckReceivables from "../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";
import { Advancefilter } from "../../../../components/Reusable/AdvanceFilter";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { format, isValid, parse } from "date-fns";

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

    // ADVANCE FILTER
    useEffect(() => {
        const cloneArray = isAdvFilter.map((item) => {
            return `${item.key}:${item.value}`;
        });
        setFilterText(cloneArray.toString());
    }, [isAdvFilter]);

    let dateFrom: any = parse(isPeriod.from, "MMM dd yyyy", new Date());

    let dateTo: any = parse(isPeriod.to, "MMM dd yyyy", new Date());

    dateFrom = isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "";

    dateTo = isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "";

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
            EndPointList={`/finance/customer-facility/check-schedule?paginate=10&filters=${isFilterText}&keyword=${isSearch}&page=${
                isSearch === "" ? TablePage : 1
            }&date_from=${dateFrom}&date_to=${dateTo}`}
            EndPointExport={`/finance/customer-facility/check-schedule/export?paginate=10&filters=${isFilterText}&keyword=${isSearch}&page=${
                isSearch === "" ? TablePage : 1
            }&date_from=${dateFrom}&date_to=${dateTo}`}
            ExportName="Check-Schedule"
        />
    );
}
