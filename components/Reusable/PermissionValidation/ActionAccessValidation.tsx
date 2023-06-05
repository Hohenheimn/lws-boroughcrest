import { useEffect, useState } from "react";
import { LoginUserInfo } from "../../HOC/LoginUser/UserInfo";

export const AccessActionValidation = (menu: string, action: string) => {
    const [Validation, setValidation] = useState(false);
    const [userInfo, setUserInfo] = useState<LoginUserInfo>();
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    useEffect(() => {
        const menu_permission = userInfo?.permissions.filter(
            (filter) => filter.menu === menu
        );
        if (menu_permission !== undefined) {
            setValidation(menu_permission[0]?.access?.includes(action));
        }
    }, [userInfo]);

    return Validation;
};
