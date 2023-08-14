import React, { useState, useContext, useEffect } from "react";

import AppContext from "../../../components/Context/AppContext";
import SuperAdminDashboard from "../../../components/Dashboard/SuperAdmin/SuperAdminDashboard";
import { LoginUserInfo } from "../../../components/HOC/LoginUser/UserInfo";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";
import Table from "../../../components/PROJECT/Corporate/Table";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";

export default function Corporate() {
  const [isSearchTable, setSearchTable] = useState("");
  const { corpToggle } = useContext(AppContext);

  return (
    <>
      <SearchFilter
        page="corporate"
        setSearchTable={setSearchTable}
        exportAPI={""}
      />
      <Table isSearchTable={isSearchTable} />

      {corpToggle && <NewCorporate />}
    </>
  );
}
