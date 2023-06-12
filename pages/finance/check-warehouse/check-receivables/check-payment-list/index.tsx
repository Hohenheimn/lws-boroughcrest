import React, { useEffect, useState } from "react";
import { Advancefilter } from "../../../../../components/Reusable/AdvanceFilter";
import TableCheckReceivables from "../../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { format, isValid, parse } from "date-fns";

export default function CheckPaymentList() {
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
            page="check-payment-list"
            EndPointList={`/finance/customer-facility/collection?paginate=10&collection_check_warehouse_id=not null&receipt_type=Acknowledgement&filters=${isFilterText}&keyword=${isSearch}&page=${
                isSearch === "" ? TablePage : 1
            }&date_from=${dateFrom}&date_to=${dateTo}`}
            EndPointAdvFilter={
                "/finance/customer-facility/collection/filter-options?receipt_type=Acknowledgement&collection_check_warehouse_id=not null&keywords="
            }
            EndPointExport={`/finance/customer-facility/collection/export?paginate=10&collection_check_warehouse_id=not null&receipt_type=Acknowledgement&filters=${isFilterText}&keyword=${isSearch}&page=${
                isSearch === "" ? TablePage : 1
            }&date_from=${dateFrom}&date_to=${dateTo}`}
            ExportName="Check-Payment-list"
        />
    );
}
