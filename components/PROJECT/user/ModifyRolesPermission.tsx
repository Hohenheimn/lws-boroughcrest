import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import UserRolePermissionsForm from "./UserRolePermissionsForm";
import { UserDetail } from "./UserTable";

type Props = {
    setToggle: Function;
    UserDetail: UserDetail;
};

export default function ModifyRolesPermission({
    setToggle,
    UserDetail,
}: Props) {
    const router = useRouter();
    const id: any = router.query.id;
    const [isUserForm, setUserForm] = useState([false, true]);

    const isTable = [
        {
            id: 1,
            permission: "123",
            access: "123",
            duration: "123",
        },
        {
            id: 2,
            permission: "321",
            access: "123123",
            duration: "31",
        },
    ];
    useEffect(() => {
        setToggle(isUserForm[1]);
    }, [isUserForm]);
    return (
        <div className={style.container}>
            <section>
                <UserRolePermissionsForm
                    setUserForm={setUserForm}
                    userForm={isUserForm}
                    type="modify"
                    DefaultTable={isTable}
                    id={id}
                    role_name={"Sample"}
                />
            </section>
        </div>
    );
}
