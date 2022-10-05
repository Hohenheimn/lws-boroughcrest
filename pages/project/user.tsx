import React, { useState } from "react";
import SearchFilter from "../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import UserTable from "../../components/PROJECT/user/UserTable";
import UserDetails from "../../components/PROJECT/user/UserDetails";
import NewUser from "../../components/PROJECT/user/NewUser";
export default function user() {
    const router = useRouter();
    return (
        <div>
            {router.query.details === undefined && (
                <>
                    <SearchFilter page="user" />
                    <UserTable />
                    <Pagination />
                </>
            )}
            {router.query.new !== undefined && <NewUser />}
            {router.query.details !== undefined && <UserDetails />}
        </div>
    );
}
