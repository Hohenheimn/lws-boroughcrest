import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import NewProperty from "../../../components/ADMIN/Property/NewProperty";

export default function Property() {
    const { toggleNewForm } = useContext(AppContext);
    return (
        <div>
            <SearchFilter page="property unit" />
            <PropertyTable />
            {toggleNewForm && <NewProperty />}
        </div>
    );
}
