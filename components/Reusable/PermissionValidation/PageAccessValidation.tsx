import { useEffect, useState } from "react";
import { LoginUserInfo } from "../../HOC/LoginUser/UserInfo";

export const PageAccessValidation = (menu: string) => {
    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    const [Validation, setValidation] = useState<boolean | undefined>(
        undefined
    );

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    useEffect(() => {
        if (userInfo !== undefined) {
            setValidation(
                userInfo?.permissions.some((some) => some.menu === menu)
            );
        }
    }, [userInfo]);

    return Validation;
};
