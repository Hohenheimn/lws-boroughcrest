import React, { useState } from "react";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";
import { format, isValid, parse } from "date-fns";
import { GetCollectionList } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import TableLoadingNError from "../../../../../components/Reusable/TableLoadingNError";
import Pagination from "../../../../../components/Reusable/Pagination";
import { CollectionItem } from "../payment-register";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Archive() {
    const [isStatus, setStatus] = useState("Archived");

    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [TablePage, setTablePage] = useState(1);

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());
    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());

    const { isLoading, data, isError } = GetCollectionList(
        isSearch,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        TablePage,
        isFilterText,
        isStatus
    );

    const PagePermisson = PageAccessValidation("Collection");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <>
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint=""
                page="archive"
                isPeriod={isPeriod}
                setPeriod={setPeriod}
                ExportEndpoint={""}
            />
            <div className="flex items-center">
                <h1
                    onClick={() => setStatus("Archived")}
                    className={`${
                        isStatus === "Archived" &&
                        " text-ThemeRed border-b border-ThemeRed"
                    } font-bold mb-5 text-[20px] 480px:text-[18px] 1550px:mb-2 mr-5 cursor-pointer`}
                >
                    Archive
                </h1>
                <h1
                    onClick={() => setStatus("Rejected")}
                    className={`${
                        isStatus === "Rejected" &&
                        " text-ThemeRed border-b border-ThemeRed"
                    } font-bold mb-5 text-[20px] 480px:text-[18px] 1550px:mb-2 mr-5 cursor-pointer`}
                >
                    Rejected
                </h1>
            </div>
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            <th>Deposit Date</th>
                            <th>Reference No.</th>
                            <th>Customer</th>
                            <th>Property</th>
                            <th>Amount Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map(
                            (item: CollectionItem, index: number) => (
                                <List key={index} item={item} />
                            )
                        )}
                    </tbody>
                </table>
                <TableLoadingNError isLoading={isLoading} isError={isError} />
            </div>
            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.meta.last_page}
                CurrentPage={data?.data.meta.current_page}
            />
        </>
    );
}

type ListProps = {
    item: CollectionItem;
};

const List = ({ item }: ListProps) => {
    const receipt_date = parse(item.deposit_date, "yyyy-MM-dd", new Date());

    return (
        <tr>
            <td>
                {isValid(receipt_date)
                    ? format(receipt_date, "MMM dd yyyy")
                    : ""}
            </td>
            <td>{item.reference_no}</td>
            <td>{item.customer.name}</td>
            <td>
                {item.customer?.properties.map((item: any, index: number) =>
                    item.customer?.properties.length - 1 === index
                        ? item.unit_code
                        : item.unit_code + ", "
                )}
            </td>
            <td>
                <TextNumberDisplay
                    className="withPeso w-full"
                    value={item.amount_paid}
                />
            </td>
        </tr>
    );
};
