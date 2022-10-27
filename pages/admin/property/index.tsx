import React, { useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import NewProperty from "../../../components/ADMIN/Property/NewProperty";
import { useRouter } from "next/router";

export default function Property() {
    const router = useRouter();
    const [isSearchTable, setSearchTable] = useState("");
    return (
        <div>
            <SearchFilter
                page="property unit"
                setSearchTable={setSearchTable}
            />
            <PropertyTable />
            {router.query.new !== undefined && <NewProperty />}
        </div>
    );
}
