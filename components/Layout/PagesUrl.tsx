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
                url: "/finance/reports",
                ActiveName: "reports",
            },
            {
                name: "Policy",
                url: "/finance/policy",
                ActiveName: "policy",
            },
        ],
    },
];
