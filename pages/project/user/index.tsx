import React from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import UserTable from "../../../components/PROJECT/user/UserTable";
import NewUser from "../../../components/PROJECT/user/NewUser";
export default function User() {
    const router = useRouter();

    return (
        <div>
            {/* <>
                <SearchFilter page="user" />
                <UserTable />
                <Pagination />
            </>
            {router.query.new !== undefined && <NewUser />} */}
        </div>
    );
}
