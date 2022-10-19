import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import NewCustomer from "../../../components/ADMIN/Customer/NewCustomer";

export default function Customer() {
    const { toggleNewForm } = useContext(AppContext);
    return (
        <div>
            <SearchFilter page="customer" />
            <CustomerTable />
            <Pagination />
            {toggleNewForm && <NewCustomer />}
        </div>
    );
}
