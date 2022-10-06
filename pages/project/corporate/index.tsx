import React, { useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";
import { useRouter } from "next/router";
export default function corporate() {
    const router = useRouter();
    const [toggleNew, setToggleNew] = useState(false);
    return (
        <div>
            <>
                <SearchFilter page="corporate" setToggleNew={setToggleNew} />
                <Table />
                <Pagination />
            </>

            {toggleNew && <NewCorporate setToggleNew={setToggleNew} />}
        </div>
    );
}
