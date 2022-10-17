import React from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import { useRouter } from "next/router";
import NewProperty from "../../../components/ADMIN/Property/NewProperty";

export default function Property() {
    const router = useRouter();
    return (
        <div>
            <SearchFilter page="property unit" />
            <PropertyTable />
            {router.query.new !== undefined && <NewProperty />}
        </div>
    );
}
