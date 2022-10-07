import React from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import NewCustomer from "../../../components/ADMIN/Customer/NewCustomer";
import { useRouter } from "next/router";

export default function customer() {
    const router = useRouter();
    return (
        <div>
            <SearchFilter page="customer" />
            <CustomerTable />
            <Pagination />
            {router.query.new !== undefined && <NewCustomer />}
        </div>
    );
}
