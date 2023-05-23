import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { UserDetail } from "./UserTable";
import ModalTemp from "../../Reusable/ModalTemp";
import UserRoleAndPermissionsCheckBox from "./UserRoleAndPermissionsCheckBox";

type Props = {
    setToggle: Function;
    UserDetail: UserDetail;
};

export default function ModifyRolesPermission({
    setToggle,
    UserDetail,
}: Props) {
    const [isUserForm, setUserForm] = useState([false, true]);

    const [isSelectedRolePermission, setSelectedRolePermission] = useState(
        UserDetail.permissions.map((item) => {
            return {
                menu: item.menu,
                role: item.access,
                duration: item.duration,
            };
        })
    );

    const [isRoleName, setRoleName] = useState({
        id: `${UserDetail.role_id}`,
        value: UserDetail.role_name,
    });

    const [UserInfo, setUserInfo] = useState({
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
    });

    useEffect(() => {
        setToggle(isUserForm[1]);
    }, [isUserForm]);

    return (
        <UserRoleAndPermissionsCheckBox
            setUserForm={setUserForm}
            userInfo={UserInfo}
            type={"modify"}
            isSelectedRolePermission={isSelectedRolePermission}
            setSelectedRolePermission={setSelectedRolePermission}
            isRoleName={isRoleName}
            setRoleName={setRoleName}
            setUserInfo={setUserInfo}
            DefaultSelected={UserDetail.permissions.map((item) => {
                return {
                    menu: item.menu,
                    role: item.access,
                    duration: item.duration,
                };
            })}
        />
    );
}
