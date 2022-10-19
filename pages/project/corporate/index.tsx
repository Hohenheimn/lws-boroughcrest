import React, { useContext } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Table from "../../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";

export default function Corporate() {
    const { toggleNewForm } = useContext(AppContext);
    return (
        <div>
            <>
                <SearchFilter page="corporate" />
                <Table />
            </>

            {toggleNewForm && <NewCorporate />}
        </div>
    );
}
