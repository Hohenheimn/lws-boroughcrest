import React, { useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import UserTable from "../../../components/PROJECT/user/UserTable";
import NewUser from "../../../components/PROJECT/user/NewUser";
export default function user() {
    const router = useRouter();
    const [toggleNew, setToggleNew] = useState(false);
    return (
        <div>
            <>
                <SearchFilter page="user" setToggleNew={setToggleNew} />
                <UserTable />
                <Pagination />
            </>
            {toggleNew && <NewUser setToggleNew={setToggleNew} />}
        </div>
    );
}
