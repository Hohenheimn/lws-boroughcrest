import React, { useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import UserTable from "../../../components/PROJECT/user/UserTable";
import NewUser from "../../../components/PROJECT/user/NewUser";
export default function User() {
    const [isSearchTable, setSearchTable] = useState("");
    const router = useRouter();

    return (
        <div>
            <>
                <SearchFilter page="user" setSearchTable={setSearchTable} />
                <UserTable />
            </>
            {router.query.new !== undefined && <NewUser />}
        </div>
    );
}
