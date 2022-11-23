import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import NewCustomer from "../../../components/ADMIN/Customer/NewCustomer";
import { useRouter } from "next/router";
import UpdateDraft from "../../../components/ADMIN/Customer/UpdateDraft";

export default function Customer() {
    const router = useRouter();
    const { setSearchBar, cusToggle } = useContext(AppContext);

    return (
        <>
            <SearchFilter page="customer" setSearchTable={setSearchBar} />
            <CustomerTable />

            {cusToggle && <NewCustomer />}
            {router.query.draft !== undefined && <UpdateDraft />}
        </>
    );
}
