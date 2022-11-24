export const GeneralLedger = [
    {
        name: "Chart of Account",
        activeUrl: "chart-of-account",
        url: "/finance/general-ledger/chart-of-account",
    },
    {
        name: "Opening Balance",
        activeUrl: "opening-balance",
        url: "/finance/general-ledger/opening-balance",
    },
    {
        name: "Bank Reconciliation",
        activeUrl: "bank-reconciliation",
        url: "/finance/general-ledger/bank-reconciliation",
    },
    {
        name: "Asset Management",
        activeUrl: "asset-management",
        url: "/finance/general-ledger/asset-management",
    },
    {
        name: "Journal",
        activeUrl: "journal",
        url: "/finance/general-ledger/journal/create-journal",
        submenu: [
            {
                name: "Create Journal",
                url: "/finance/general-ledger/journal/create-journal",
            },
            {
                name: "Journal List",
                url: "/finance/general-ledger/journal/journal-list",
            },
        ],
    },
];
