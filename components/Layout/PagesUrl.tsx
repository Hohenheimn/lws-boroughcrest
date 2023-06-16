import { useEffect, useState } from "react";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";
import { FinanceRedirect } from "./FinanceRedirect";

export const SidebarLinks = () => {
    const [Links, setLinks] = useState([
        {
            name: "dashboard",
            url: "/dashboard",
            iconUrl: "Dashboard.png",
            ActiveUrl: "dashboard",
            SubMenu: [
                {
                    name: "",
                    url: "",
                    ActiveName: "",
                },
            ],
        },
        {
            name: "project",
            url: "/project/corporate",
            iconUrl: "Project.png",
            ActiveUrl: "project",
            SubMenu: [
                {
                    name: "corporate",
                    url: "/project/corporate",
                    ActiveName: "corporate",
                },
                {
                    name: "user",
                    url: "/project/user",
                    ActiveName: "user",
                },
                {
                    name: "access",
                    url: "/project/access",
                    ActiveName: "access",
                },
            ],
        },
        {
            name: "admin",
            url: "/admin/customer",
            iconUrl: "Admin.png",
            ActiveUrl: "admin",
            SubMenu: [],
        },
        {
            name: "finance",
            url: "/finance/general-ledger/chart-of-account",
            iconUrl: "Finance.png",
            ActiveUrl: "finance",
            SubMenu: [],
        },
    ]);

    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    const ValidatePermissionPage = (menu: string) => {
        const cloneFilter: any = userInfo?.permissions?.filter(
            (filterItem) => filterItem.menu === menu
        );
        if (cloneFilter[0]?.access.includes("view")) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (localStorage.userInfo !== undefined) {
            const clone = Links.map((item) => {
                if (item.name === "admin") {
                    let addLinks: any[] = [];
                    if (
                        userInfo?.permissions?.some(
                            (someItem) => someItem.menu === "Customer"
                        )
                    ) {
                        if (ValidatePermissionPage("Customer")) {
                            addLinks = [
                                ...addLinks,
                                {
                                    name: "customer",
                                    url: "/admin/customer",
                                    ActiveName: "customer",
                                },
                            ];
                        }
                    }
                    if (
                        userInfo?.permissions?.some(
                            (someItem) => someItem.menu === "Announcement"
                        )
                    ) {
                        if (ValidatePermissionPage("Announcement")) {
                            addLinks = [
                                ...addLinks,
                                {
                                    name: "announcement",
                                    url: "/admin/announcement",
                                    ActiveName: "announcement",
                                },
                            ];
                        }
                    }
                    if (
                        userInfo?.permissions?.some(
                            (someItem) => someItem.menu === "Property"
                        )
                    ) {
                        if (ValidatePermissionPage("Property")) {
                            addLinks = [
                                ...addLinks,
                                {
                                    name: "property",
                                    url: "/admin/property",
                                    ActiveName: "property",
                                },
                            ];
                        }
                    }
                    // if (
                    //     userInfo?.permissions?.some(
                    //         (someItem) => someItem.menu === "Communication"
                    //     )
                    // ) {
                    //     if (ValidatePermissionPage("Communication")) {
                    //         addLinks = [
                    //             ...addLinks,
                    //             {
                    //                 name: "communication",
                    //                 url: "/admin/communication",
                    //                 ActiveName: "communication",
                    //             },
                    //         ];
                    //     }
                    // }
                    if (
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (New Request)"
                        ) ||
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (In Process)"
                        ) ||
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (In Review)"
                        ) ||
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (Closed)"
                        )
                    ) {
                        if (
                            ValidatePermissionPage(
                                "Customer Request View (New Request)"
                            ) ||
                            ValidatePermissionPage(
                                "Customer Request View (In Process)"
                            ) ||
                            ValidatePermissionPage(
                                "Customer Request View (In Review)"
                            ) ||
                            ValidatePermissionPage(
                                "Customer Request View (Closed)"
                            )
                        ) {
                            addLinks = [
                                ...addLinks,
                                {
                                    name: "request",
                                    url: "/admin/request",
                                    ActiveName: "request",
                                },
                            ];
                        }
                    }
                    return {
                        ...item,
                        url: addLinks.length > 0 ? addLinks[0].url : "",
                        SubMenu: [...addLinks, ...item.SubMenu],
                    };
                }

                if (item.name === "finance") {
                    let addLinks: any[] = [];
                    if (
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu === "Chart of Accounts" ||
                                someItem.menu === "Opening Balance" ||
                                someItem.menu === "Bank Reconciliation" ||
                                someItem.menu === "Journal"
                        )
                    ) {
                        const urlRedirect = FinanceRedirect(
                            `general ledger`,
                            userInfo
                        );

                        addLinks = [
                            ...addLinks,
                            {
                                name: "general ledger",
                                url: urlRedirect,
                                ActiveName: "general-ledger",
                            },
                        ];
                    }

                    if (
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu === "Charges" ||
                                someItem.menu === "Billing" ||
                                someItem.menu === "Deposit Counter" ||
                                someItem.menu === "Collection" ||
                                someItem.menu === "Adjustment"
                        )
                    ) {
                        const urlRedirect = FinanceRedirect(
                            `customer facility`,
                            userInfo
                        );
                        addLinks = [
                            ...addLinks,
                            {
                                name: "Customer Facility",
                                url: urlRedirect,
                                ActiveName: "customer-facility",
                            },
                        ];
                    }

                    if (
                        userInfo?.permissions?.some(
                            (someItem) => someItem.menu === "Email Blast"
                        )
                    ) {
                        addLinks = [
                            ...addLinks,
                            {
                                name: "Email Blast",
                                url: "/finance/email-blast",
                                ActiveName: "email-blast",
                            },
                        ];
                    }

                    if (
                        userInfo?.permissions?.some(
                            (someItem) =>
                                someItem.menu === "General Reports" ||
                                someItem.menu === "Customer Reports"
                        )
                    ) {
                        const urlRedirect = FinanceRedirect(
                            `reports`,
                            userInfo
                        );
                        addLinks = [
                            ...addLinks,
                            {
                                name: "Reports",
                                url: urlRedirect,
                                ActiveName: "reports",
                            },
                        ];
                    }

                    if (
                        userInfo?.permissions?.some(
                            (someItem) => someItem.menu === "Policy"
                        )
                    ) {
                        addLinks = [
                            ...addLinks,
                            {
                                name: "Policy",
                                url: "/finance/policy",
                                ActiveName: "policy",
                            },
                        ];
                    }

                    addLinks.splice(2, 0, {
                        name: "Check Warehouse",
                        url: "/finance/check-warehouse/check-receivables/check-schedule",
                        ActiveName: "check-warehouse",
                    });

                    const urlRedirect = FinanceRedirect(
                        `${addLinks[0]?.name}`,
                        userInfo
                    );

                    return {
                        ...item,
                        url:
                            addLinks.length > 0 && urlRedirect !== undefined
                                ? urlRedirect
                                : "/finance/check-warehouse/check-payment",
                        SubMenu: [...addLinks, ...item.SubMenu],
                    };
                }

                return item;
            });
            if (userInfo?.corporate_id === null) {
                const cloneSuperAdmin = clone.filter(
                    (item) => item.name !== "admin" && item.name !== "finance"
                );
                setLinks(cloneSuperAdmin);
            }
            if (
                userInfo?.corporate_id !== null &&
                userInfo?.corporate_id !== undefined
            ) {
                const cloneOtherUser = clone.filter(
                    (item) => item.name !== "project"
                );
                const removeNoSubMenu = cloneOtherUser.filter(
                    (filterItem) => filterItem.SubMenu.length > 0
                );
                setLinks(removeNoSubMenu);
            }
        }
    }, [userInfo]);

    return Links;
};
