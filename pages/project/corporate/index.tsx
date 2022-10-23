import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Table from "../../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";
import { useRouter } from "next/router";

export default function Corporate() {
    const { toggleNewForm } = useContext(AppContext);
    const [isSearchTable, setSearchTable] = useState("");
    const router = useRouter();
    return (
        <div>
            <SearchFilter page="corporate" setSearchTable={setSearchTable} />
            <Table isSearchTable={isSearchTable} />

            {router.query.new !== undefined && <NewCorporate />}
        </div>
    );
}
