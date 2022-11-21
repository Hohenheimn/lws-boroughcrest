import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import Form from "../../../components/ADMIN/Property/PropertyForm";
import { PropertyDefaultValue } from "../../../types/PropertyList";
import { useRouter } from "next/router";
import Draft from "../../../components/ADMIN/Property/Draft";

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

    return (
        <div>
            <SearchFilter
                page="property unit"
                setSearchTable={setSearchTable}
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
