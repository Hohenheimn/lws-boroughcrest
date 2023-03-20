export const GeneralLedger = [
    {
        name: "Chart of Account",
        activeUrl: "chart-of-account",
        url: "/finance/general-ledger/chart-of-account",
        type: "",
    },
    {
        name: "Opening Balance",
        activeUrl: "opening-balance",
        url: "/finance/general-ledger/opening-balance/general-ledger",
        type: "",
        submenu: [
            {
                name: "General Ledger Opening Balance",
                url: "/finance/general-ledger/opening-balance/general-ledger",
            },
            {
                name: "Subledger Opening Balance",
                url: "/finance/general-ledger/opening-balance/subledger",
            },
        ],
    },
    {
        name: "Bank Reconciliation",
        activeUrl: "bank-reconciliation",
        url: "/finance/general-ledger/bank-reconciliation",
        type: "",
    },
    {
        name: "Asset Management",
        activeUrl: "asset-management",
        url: "/finance/general-ledger/asset-management",
        type: "disabled",
    },
    {
        name: "Journal",
        activeUrl: "journal",
        url: "/finance/general-ledger/journal/create-journal",
        type: "",
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

export const CustomerFacility = [
    {
        name: "Charge",
        activeUrl: "charge",
        url: "/finance/customer-facility/charge",
    },
    {
        name: "Billing",
        activeUrl: "billing",
        url: "/finance/customer-facility/billing/create-invoice",
        submenu: [
            {
                name: "Create Invoice",
                url: "/finance/customer-facility/billing/create-invoice",
            },
            {
                name: "Record Meter Reading",
                url: "/finance/customer-facility/billing/record-meter-reading",
            },
            {
                name: "Batch Invoice",
                url: "/finance/customer-facility/billing/batch-invoice",
            },
            {
                name: "Invoice List",
                url: "/finance/customer-facility/billing/invoice-list",
            },
        ],
    },
    {
        name: "Collection",
        activeUrl: "collection",
        url: "/finance/customer-facility/collection/receive-payment",
        submenu: [
            {
                name: "Receive Payment",
                url: "/finance/customer-facility/collection/receive-payment",
            },
            {
                name: "Payment Register",
                url: "/finance/customer-facility/collection/payment-register",
            },
            {
                name: "Payment Queueing",
                url: "/finance/customer-facility/collection/payment-queueing",
            },
        ],
    },
    {
        name: "Deposit Counter",
        activeUrl: "deposit-counter",
        url: "/finance/customer-facility/deposit-counter",
    },
    {
        name: "Adjustment",
        activeUrl: "adjustment",
        url: "/finance/customer-facility/adjustment",
        submenu: [
            {
                name: "Create Customer Adjustment",
                url: "/finance/customer-facility/adjustment/create-adjustment",
            },
            {
                name: "Adjustment List",
                url: "/finance/customer-facility/adjustment/adjustment-list",
            },
        ],
    },
];
