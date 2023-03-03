import React, { useContext, useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import UserTable from "../../../components/PROJECT/user/UserTable";
import AppContext from "../../../components/Context/AppContext";
import UserForm from "../../../components/PROJECT/user/UserForm";
export default function User() {
    const [isSearchTable, setSearchTable] = useState("");
    const { newUserToggle } = useContext(AppContext);

    return (
        <div>
            <SearchFilter page="user" setSearchTable={setSearchTable} />
            <UserTable isSearch={isSearchTable} />
            {newUserToggle && <UserForm />}
        </div>
    );
}
