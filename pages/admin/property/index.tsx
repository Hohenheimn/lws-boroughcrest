import React, { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Draft from "../../../components/ADMIN/Property/Draft";
import Form from "../../../components/ADMIN/Property/PropertyForm";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import AppContext from "../../../components/Context/AppContext";
import { requiredAuthentication } from "../../../components/HOC/Authentication";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import { PropertyDefaultValue } from "../../../types/PropertyList";

export default function Property() {
  const { newPropToggle } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const DefaultFormData: PropertyDefaultValue = {
    unit_code: "",
    address: "",
    area: "",
    class: "",
    type: "",
    acceptance_date: "",
    turnover_date: "",
    status: "",
    developer_id: "",
    project_id: "",
    tower_id: "",
    floor_id: "",
    project: "",
    tower: "",
    floor: "",
    developer: "",
  };

  const PagePermisson = PageAccessValidation("Property");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  return (
    <div>
      <SearchFilter
        page="Property"
        setSearchTable={setSearch}
        exportAPI={`/admin/property/unit/export?keywords=${search}`}
      />
      <PropertyTable isSearchTable={search} />
      {newPropToggle && (
        <Form DefaultFormData={DefaultFormData} isSearchTable={search} />
      )}
      {router.query.draft !== undefined && <Draft isSearchTable={search} />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = requiredAuthentication(
  async (context) => {
    return {
      props: {},
    };
  }
);
