import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { UserDetail } from "./UserTable";
import ModalTemp from "../../Reusable/ModalTemp";
import UserRoleAndPermissionsCheckBox from "./UserRoleAndPermissionsCheckBox";

type Props = {
    setToggle: Function;
};

export default function ModifyRolesPermission({ setToggle }: Props) {
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
        <ModalTemp>
            <UserRoleAndPermissionsCheckBox
                setUserForm={setUserForm}
                type={"modify"}
                userInfo={{
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
                    image_photo_url: "",
                    image_signature: undefined,
                    status: "",
                }}
            />
        </ModalTemp>
    );
}
