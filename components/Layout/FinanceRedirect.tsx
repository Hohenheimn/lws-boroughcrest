import { useEffect, useState } from "react";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";

export const FinanceRedirect = (name: string, userInfo?: LoginUserInfo) => {
    if (name === "general ledger") {
        const cloneGL = userInfo?.permissions.filter(
            (item) =>
                item.menu === "Chart of Accounts" ||
                item.menu === "Opening Balance" ||
                item.menu === "Bank Reconciliation" ||
                item.menu === "Journal"
        );
        let url = "";
        if (cloneGL !== undefined) {
            if (cloneGL[0]?.menu === "Chart of Accounts") {
                url = "/finance/general-ledger/chart-of-account";
            }
            if (cloneGL[0]?.menu === "Opening Balance") {
                url = "/finance/general-ledger/opening-balance/general-ledger";
            }
            if (cloneGL[0]?.menu === "Bank Reconciliation") {
                url = "/finance/general-ledger/bank-reconciliation";
            }
            if (cloneGL[0]?.menu === "Journal") {
                url = "/finance/general-ledger/journal/create-journal";
            }
        }
        return url;
    }
    if (name === "customer facility") {
        const cloneGL = userInfo?.permissions.filter(
            (item) =>
                item.menu === "Charges" ||
                item.menu === "Billing" ||
                item.menu === "Collection" ||
                item.menu === "Deposit Counter" ||
                item.menu === "Adjustment"
        );
        let url = "";
        if (cloneGL !== undefined) {
            if (cloneGL[0]?.menu === "Charges") {
                url = "/finance/customer-facility/charge";
            }
            if (cloneGL[0]?.menu === "Billing") {
                url = "/finance/customer-facility/billing/create-invoice";
            }
            if (cloneGL[0]?.menu === "Collection") {
                url = "/finance/customer-facility/collection/receive-payment";
            }
            if (cloneGL[0]?.menu === "Deposit Counter") {
                url = "/finance/customer-facility/deposit-counter";
            }
            if (cloneGL[0]?.menu === "Adjustment") {
                url = "/finance/customer-facility/adjustment/create-adjustment";
            }
        }
        return url;
    }

    if (name === "reports") {
        const cloneGL = userInfo?.permissions.filter(
            (item) =>
                item.menu === "General Reports" ||
                item.menu === "Customer Reports"
        );
        let url = "";
        if (cloneGL !== undefined) {
            if (cloneGL[0]?.menu === "General Reports") {
                url = "/finance/reports/general-reports";
            }
            if (cloneGL[0]?.menu === "Customer Reports") {
                url = "/finance/reports/customer-reports";
            }
        }
        return url;
    }
};
