import React from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../../components/PROJECT/Corporate/NewCorporate";
import { useRouter } from "next/router";
export default function Corporate() {
    const router = useRouter();
    return (
        <div>
            <>
                <SearchFilter page="corporate" />
                <Table />
                <Pagination />
            </>

            {router.query.new !== undefined && <NewCorporate />}
        </div>
    );
}
