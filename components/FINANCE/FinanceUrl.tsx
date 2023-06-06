import { useEffect, useState } from "react";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";

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

export const GeneralLedgerLinks = () => {
    const [userInfo, setUserInfo] = useState<LoginUserInfo>();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.userInfo));
    }, []);

    const [Links, setLinks] = useState<FinanceUrls[]>([
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
    ]);

    const CheckValidation = () => {
        let validate = false;
        userInfo?.permissions.map((item) => {
            console.log(item.menu);
            if (item.menu === "Journal") {
                validate = true;
                return;
            }
        });
        return validate;
    };
    useEffect(() => {
        if (localStorage.userInfo !== undefined) {
            userInfo?.permissions.map((item) => {
                console.log(item.menu);
            });
            const GetLink = Links.map((mapItem) => {
                if (CheckValidation()) {
                    return mapItem;
                } else {
                    return {
                        name: "",
                        activeUrl: "",
                        url: "",
                        type: "",
                    };
                }
            });
            const FilterLink = GetLink.filter(
                (filterItem) => filterItem.name !== ""
            );
            setLinks(FilterLink);
        }
    }, [userInfo]);

    return Links;
};

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
export const CheckWarehouse = [
    {
        name: "Check Receivables",
        activeUrl: "check-warehouse/check-receivables",
        url: "/finance/check-warehouse/check-receivables/check-schedule",
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
    },
];

export const Reports = [
    {
        name: "General Reports",
        activeUrl: "reports/general-reports",
        url: "/finance/reports/general-reports",
    },
    {
        name: "Customer Reports",
        activeUrl: "reports/customer-reports",
        url: "/finance/reports/customer-reports",
    },
];
