export const SidebarLinks = [
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
                name: "roles",
                url: "/project/roles",
                ActiveName: "roles",
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
                name: "customer",
                url: "/admin/customer",
                ActiveName: "customer",
            },
            {
                name: "property",
                url: "/admin/property",
                ActiveName: "property",
            },
            {
                name: "request",
                url: "/admin/request",
                ActiveName: "request",
            },
            {
                name: "communication",
                url: "/admin/communication",
                ActiveName: "communication",
            },
        ],
    },
    {
        name: "finance",
        url: "/finance",
        iconUrl: "Finance.png",
        ActiveUrl: "finance",
        SubMenu: [],
    },
];
