import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import NewCustomer from "../../../components/ADMIN/Customer/NewCustomer";
import { useRouter } from "next/router";

export default function Customer() {
    const { setSearchBar, isSearchBar } = useContext(AppContext);
    const router = useRouter();
    return (
        <div>
            <SearchFilter page="customer" setSearchTable={setSearchBar} />
            <CustomerTable />

            {router.query.new !== undefined && <NewCustomer />}
        </div>
    );
}
