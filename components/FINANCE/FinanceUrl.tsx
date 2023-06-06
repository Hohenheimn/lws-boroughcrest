import { useEffect, useState } from "react";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";
import { useRouter } from "next/router";

type FinanceUrls = {
    name: string;
    activeUrl: string;
    url: string;
    type: string;
    submenu?: {
        name: string;
        url: string;
    }[];
};

export const FinanceUpperLinks = () => {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    const [Links, setLinks] = useState<FinanceUrls[]>([]);

    useEffect(() => {
        if (localStorage.userInfo !== undefined) {
            if (router.pathname.includes("general-ledger")) {
                const GetLink = GeneralLedger.filter((filterItem) =>
                    userInfo?.permissions.some(
                        (someItem) => someItem.menu === filterItem.name
                    )
                );
                setLinks(GetLink);
            }
            if (router.pathname.includes("customer-facility")) {
                const GetLink = CustomerFacility.filter((filterItem) =>
                    userInfo?.permissions.some(
                        (someItem) => someItem.menu === filterItem.name
                    )
                );
                setLinks(GetLink);
            }
            if (router.pathname.includes("check-warehouse")) {
                const GetLink = CheckWarehouse.filter((filterItem) =>
                    userInfo?.permissions.some(
                        (someItem) => someItem.menu === filterItem.name
                    )
                );
                setLinks([
                    ...GetLink,
                    {
                        name: "Check Payment",
                        activeUrl: "#",
                        url: "#",
                        type: "",
                    },
                ]);
            }
            if (router.pathname.includes("reports")) {
                const GetLink = Reports.filter((filterItem) =>
                    userInfo?.permissions.some(
                        (someItem) => someItem.menu === filterItem.name
                    )
                );
                setLinks(GetLink);
            }
        }
    }, [userInfo, router.pathname]);

    return Links;
};

const GeneralLedger = [
    {
        name: "Chart of Accounts",
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
    // {
    //     name: "Asset Management",
    //     activeUrl: "asset-management",
    //     url: "/finance/general-ledger/asset-management",
    //     type: "disabled",
    // },
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

const CustomerFacility = [
    {
        name: "Charges",
        activeUrl: "charge",
        url: "/finance/customer-facility/charge",
        type: "",
    },
    {
        name: "Billing",
        activeUrl: "billing",
        url: "/finance/customer-facility/billing/create-invoice",
        type: "",
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
        type: "",
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
        type: "",
    },
    {
        name: "Adjustment",
        activeUrl: "adjustment",
        url: "/finance/customer-facility/adjustment/create-adjustment",
        type: "",
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

const CheckWarehouse = [
    {
        name: "Check Receivables",
        activeUrl: "check-warehouse/check-receivables",
        url: "/finance/check-warehouse/check-receivables/check-schedule",
        type: "",
        submenu: [
            {
                name: "Check Schedule",
                url: "/finance/check-warehouse/check-receivables/check-schedule",
            },
            {
                name: "Check Payment List",
                url: "/finance/check-warehouse/check-receivables/check-payment-list",
            },
            {
                name: "Booked Check",
                url: "/finance/check-warehouse/check-receivables/booked-check",
            },
        ],
    },
    {
        name: "Check Payment",
        activeUrl: "check-warehouse/check-payment",
        url: "#",
        type: "",
    },
];
const Reports = [
    {
        name: "General Reports",
        activeUrl: "reports/general-reports",
        url: "/finance/reports/general-reports",
        type: "",
    },
    {
        name: "Customer Reports",
        activeUrl: "reports/customer-reports",
        url: "/finance/reports/customer-reports",
        type: "",
    },
];
