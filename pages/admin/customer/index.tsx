import React, { useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";

export default function customer() {
    const [toggleNew, setToggleNew] = useState(false);
    return (
        <div>
            <SearchFilter page="customer" setToggleNew={setToggleNew} />
            <CustomerTable />
            <Pagination />
        </div>
    );
}
