import React, { useState, useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Table from "../../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";

export default function Corporate() {
    const [isSearchTable, setSearchTable] = useState("");
    const { corpToggle } = useContext(AppContext);
    return (
        <>
            <SearchFilter page="corporate" setSearchTable={setSearchTable} />
            <Table isSearchTable={isSearchTable} />

            {corpToggle && <NewCorporate />}
        </>
    );
}
