import React, { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";

import TableCheckReceivables from "../../../../components/FINANCE/Check-Warehouse/CheckReceivables/TableCheckReceivables";
import { Advancefilter } from "../../../../components/Reusable/AdvanceFilter";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export type BookedCheckType = {
  id: 1;
  payor: string;
  receipt_no: string;
  check_date: string;
  customer_id: number;
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
  acknowledge: boolean;
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
      page="booked-check"
      EndPointList={`/finance/customer-facility/booked-check?paginate=10&filters=${isFilterText}&keyword=${isSearch}&page=${TablePage}&date_from=${dateFrom}&date_to=${dateTo}`}
      EndPointAdvFilter={`/finance/customer-facility/booked-check/filter-options?keywords=`}
      EndPointExport={`/finance/customer-facility/booked-check/export?paginate=10&filters=${isFilterText}&keyword=${isSearch}&page=${TablePage}&date_from=${dateFrom}&date_to=${dateTo}`}
      ExportName="Booked-check"
    />
  );
}
