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
            if (userInfo?.permissions.length <= 0) {
                setValidation(false);
                return;
            }
            if (userInfo?.permissions.some((some) => some.menu === menu)) {
                const cloneFilter = userInfo.permissions.filter(
                    (filterItem) => filterItem.menu === menu
                );

                setValidation(cloneFilter[0].access.includes("view"));
            } else {
                setValidation(false);
            }
        }
    }, [userInfo]);

    return Validation;
};
