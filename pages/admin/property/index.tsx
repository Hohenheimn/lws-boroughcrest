import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import Form from "../../../components/ADMIN/Property/Form";

export default function Property() {
    const { newPropToggle } = useContext(AppContext);
    const [isSearchTable, setSearchTable] = useState("");

    return (
        <div>
            <SearchFilter
                page="property unit"
                setSearchTable={setSearchTable}
            />
            <PropertyTable isSearchTable={isSearchTable} />
            {newPropToggle && <Form />}
        </div>
    );
}
