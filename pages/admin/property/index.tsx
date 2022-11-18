import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import Form from "../../../components/ADMIN/Property/Form";
import { PropertyDefaultValue } from "../../../types/PropertyList";

export default function Property() {
    const { newPropToggle } = useContext(AppContext);
    const [isSearchTable, setSearchTable] = useState("");

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
            {newPropToggle && <Form DefaultFormData={DefaultFormData} />}
        </div>
    );
}
