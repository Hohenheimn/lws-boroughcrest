import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Table from "../../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";

export default function Corporate() {
    const { toggleNewForm } = useContext(AppContext);
    const [isSearchTable, setSearchTable] = useState("");
    return (
        <div>
            <SearchFilter page="corporate" setSearchTable={setSearchTable} />
            <Table isSearchTable={isSearchTable} />

            {toggleNewForm && <NewCorporate />}
        </div>
    );
}
