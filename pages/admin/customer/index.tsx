import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import { useRouter } from "next/router";
import ModifyCustomer from "../../../components/ADMIN/Customer/CustomerForm/ModifyCustomer";
import CustomerForm from "../../../components/ADMIN/Customer/CustomerForm/CustomerForm";

export default function Customer() {
    const router = useRouter();
    const { setSearchBar, cusToggle, DefaultCustomerFormValue } =
        useContext(AppContext);

    return (
        <>
            <SearchFilter page="customer" setSearchTable={setSearchBar} />
            <CustomerTable />
            {cusToggle && (
                <CustomerForm DefaultValue={DefaultCustomerFormValue} />
            )}
            {router.query.draft !== undefined && <ModifyCustomer />}
        </>
    );
}
