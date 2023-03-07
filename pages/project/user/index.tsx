import React, { useContext, useState } from "react";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import UserTable from "../../../components/PROJECT/user/UserTable";
import AppContext from "../../../components/Context/AppContext";
import UserForm from "../../../components/PROJECT/user/UserForm";
export default function User() {
    const [isSearchTable, setSearchTable] = useState("");
    const { newUserToggle } = useContext(AppContext);
    const [isToggle, setToggle] = useState(false);

    const DefaultVal = {
        profile: "",
        name: "",
        signature: "",
        position: "",
        employee_id: "",
        department: "",
        email: "",
        mobile: "",
        corporate: "",
        corporate_id: "",
        status: "Active",
    };

    return (
        <div>
            <SearchFilter page="user" setSearchTable={setSearchTable} />
            <UserTable isSearch={isSearchTable} />
            {newUserToggle && (
                <UserForm
                    DefaultValue={DefaultVal}
                    type="create"
                    setToggle={setToggle}
                />
            )}
        </div>
    );
}
