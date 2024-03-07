import React, { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import CustomerForm from "../../../components/ADMIN/Customer/CustomerForm/CustomerForm";
import ModifyCustomer from "../../../components/ADMIN/Customer/CustomerForm/ModifyCustomer";
import CustomerTable from "../../../components/ADMIN/Customer/CustomerTable";
import AppContext from "../../../components/Context/AppContext";
import { requiredAuthentication } from "../../../components/HOC/Authentication";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";

export default function Customer() {
  const router = useRouter();

  const { cusToggle, DefaultCustomerFormValue } = useContext(AppContext);

  const [search, setSearch] = useState("");

  const PagePermisson = PageAccessValidation("Customer");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  return (
    <>
      <SearchFilter
        page="Customer"
        setSearchTable={setSearch}
        exportAPI={`/admin/customer/export?keywords=${search}`}
      />
      <CustomerTable search={search} />
      {cusToggle && <CustomerForm DefaultValue={DefaultCustomerFormValue} />}
      {router.query.draft !== undefined && <ModifyCustomer />}
    </>
  );
}
