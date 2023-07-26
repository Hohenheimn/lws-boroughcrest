import React, { useState, useContext } from "react";

import AppContext from "../../../components/Context/AppContext";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";
import Table from "../../../components/PROJECT/Corporate/Table";
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
