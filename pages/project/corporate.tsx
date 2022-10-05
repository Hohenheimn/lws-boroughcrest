import React, { useState } from "react";
import SearchFilter from "../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../components/Pagination";
import Table from "../../components/PROJECT/Corporate/Table";
import NewCorporate from "../../components/PROJECT/Corporate/NewCorporate";
import { useRouter } from "next/router";
import CorporateDetails from "../../components/PROJECT/Corporate/CorporateDetails";
export default function corporate() {
    const router = useRouter();
    return (
        <div>
            {router.query.details === undefined && (
                <>
                    <SearchFilter page="corporate" />
                    <Table />
                    <Pagination />
                </>
            )}
            {router.query.new !== undefined && <NewCorporate />}
            {router.query.details !== undefined && <CorporateDetails />}
        </div>
    );
}
