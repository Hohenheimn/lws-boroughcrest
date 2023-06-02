import { useEffect, useState } from "react";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";

export const SidebarLinks = () => {
    const [Links, setLinks] = useState([
        {
            name: "dashboard",
            url: "/dashboard",
            iconUrl: "Dashboard.png",
            ActiveUrl: "dashboard",
            SubMenu: [],
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
            SubMenu: [
                {
                    name: "announcement",
                    url: "/admin/announcement",
                    ActiveName: "announcement",
                },
            ],
        },
        {
            name: "finance",
            url: "/finance/general-ledger/chart-of-account",
            iconUrl: "Finance.png",
            ActiveUrl: "finance",
            SubMenu: [
                {
                    name: "general ledger",
                    url: "/finance/general-ledger/chart-of-account",
                    ActiveName: "general-ledger",
                },
                {
                    name: "Customer Facility",
                    url: "/finance/customer-facility/charge",
                    ActiveName: "customer-facility",
                },
                {
                    name: "Check Warehouse",
                    url: "/finance/check-warehouse/check-receivables/check-schedule",
                    ActiveName: "check-warehouse",
                },
                {
                    name: "Email Blast",
                    url: "/finance/email-blast",
                    ActiveName: "email-blast",
                },
                {
                    name: "Reports",
                    url: "/finance/reports/general-reports",
                    ActiveName: "reports",
                },
                {
                    name: "Policy",
                    url: "/finance/policy",
                    ActiveName: "policy",
                },
            ],
        },
    ]);

    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    useEffect(() => {
        if (localStorage.userInfo !== undefined) {
            const clone = Links.map((item) => {
                if (item.name === "admin") {
                    let addLinks: any[] = [];
                    if (
                        userInfo?.permissions.some(
                            (someItem) => someItem.menu === "Customer"
                        )
                    ) {
                        addLinks = [
                            ...addLinks,
                            {
                                name: "customer",
                                url: "/admin/customer",
                                ActiveName: "customer",
                            },
                        ];
                    }
                    if (
                        userInfo?.permissions.some(
                            (someItem) => someItem.menu === "Property"
                        )
                    ) {
                        addLinks = [
                            ...addLinks,
                            {
                                name: "property",
                                url: "/admin/property",
                                ActiveName: "property",
                            },
                        ];
                    }
                    if (
                        userInfo?.permissions.some(
                            (someItem) => someItem.menu === "Communication"
                        )
                    ) {
                        addLinks = [
                            ...addLinks,
                            {
                                name: "communication",
                                url: "/admin/communication",
                                ActiveName: "communication",
                            },
                        ];
                    }
                    if (
                        userInfo?.permissions.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (New Request)"
                        ) ||
                        userInfo?.permissions.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (In Process)"
                        ) ||
                        userInfo?.permissions.some(
                            (someItem) =>
                                someItem.menu ===
                                "Customer Request View (In Review)"
                        ) ||
                        userInfo?.permissions.some(
                            (someItem) =>
                                someItem.menu ===
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
                    return {
                        ...item,
                        SubMenu: [...addLinks, ...item.SubMenu],
                    };
                }

                return item;
            });

            if (
                userInfo?.corporate_id !== null ||
                userInfo.corporate_id !== undefined
            ) {
                const cloneAdmin = clone.filter(
                    (item) => item.name !== "project"
                );
                setLinks(cloneAdmin);
            } else {
                const cloneSuperAdmin = clone.filter(
                    (item) => item.name !== "admin" && item.name !== "finance"
                );
                setLinks(cloneSuperAdmin);
            }
        }
    }, [userInfo]);

    return Links;
};
