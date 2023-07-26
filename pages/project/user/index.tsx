import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import AppContext from "../../../components/Context/AppContext";
import UserForm from "../../../components/PROJECT/user/UserForm";
import UserTable from "../../../components/PROJECT/user/UserTable";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";

export default function User() {
    const router = useRouter();
    const [isSearchTable, setSearchTable] = useState("");
    const { newUserToggle } = useContext(AppContext);
    const [isToggle, setToggle] = useState(false);

    const DefaultVal = {
        employee_id: "",
        name: "",
        email: "",
        corporate_id: "",
        corporate: "",
        department_id: null,
        department: "",
        contact_no: "",
        position: "",
        image_photo: undefined,
        image_signature: undefined,
        image_photo_url: "",
        status: "Active",
    };

    return (
        <div>
            <SearchFilter
                page="user"
                setSearchTable={setSearchTable}
                exportAPI={""}
            />
            <UserTable isSearch={isSearchTable} />
            {(newUserToggle || router.query.new !== undefined) && (
                <UserForm
                    DefaultValue={DefaultVal}
                    type="create"
                    setToggle={setToggle}
                />
            )}
        </div>
    );
}
