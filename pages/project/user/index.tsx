import React, { useContext, useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import UserTable from "../../../components/PROJECT/user/UserTable";
import AppContext from "../../../components/Context/AppContext";
import UserForm from "../../../components/PROJECT/user/UserForm";
export default function User() {
    const [isSearchTable, setSearchTable] = useState("");
    const { newUserToggle } = useContext(AppContext);
    const router = useRouter();

    return (
        <div>
            <>
                <SearchFilter page="user" setSearchTable={setSearchTable} />
                <UserTable />
            </>
            {newUserToggle && <UserForm />}
        </div>
    );
}
