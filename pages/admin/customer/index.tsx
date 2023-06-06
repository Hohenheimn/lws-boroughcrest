import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import { useRouter } from "next/router";
import ModifyCustomer from "../../../components/ADMIN/Customer/CustomerForm/ModifyCustomer";
import CustomerForm from "../../../components/ADMIN/Customer/CustomerForm/CustomerForm";
import { requiredAuthentication } from "../../../components/HOC/Authentication";
import { GetServerSideProps } from "next";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Customer() {
    const router = useRouter();

    const { setSearchBar, cusToggle, DefaultCustomerFormValue } =
        useContext(AppContext);

    const PagePermisson = PageAccessValidation("Customer");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <>
            <SearchFilter page="Customer" setSearchTable={setSearchBar} />
            <CustomerTable />
            {cusToggle && (
                <CustomerForm DefaultValue={DefaultCustomerFormValue} />
            )}
            {router.query.draft !== undefined && <ModifyCustomer />}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = requiredAuthentication(
    async (context) => {
        return {
            props: {},
        };
    }
);
