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
    const [isSearchTable, setSearchTable] = useState("");
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
                setSearchTable={setSearchTable}
                exportAPI={`/admin/property/unit/export?keywords=${isSearchTable}`}
            />
            <PropertyTable isSearchTable={isSearchTable} />
            {newPropToggle && (
                <Form
                    DefaultFormData={DefaultFormData}
                    isSearchTable={isSearchTable}
                />
            )}
            {router.query.draft !== undefined && (
                <Draft isSearchTable={isSearchTable} />
            )}
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
