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
    if (cloneGL !== undefined) {
      if (cloneGL.some((someItem) => someItem.menu === "Chart of Accounts")) {
        return "/finance/general-ledger/chart-of-account";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Opening Balance")) {
        return "/finance/general-ledger/opening-balance/general-ledger";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Bank Reconciliation")) {
        return "/finance/general-ledger/bank-reconciliation";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Journal")) {
        return "/finance/general-ledger/journal/create-journal";
      }
    }
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

    if (cloneGL !== undefined) {
      if (cloneGL.some((someItem) => someItem.menu === "Charges")) {
        return "/finance/customer-facility/charge";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Billing")) {
        return "/finance/customer-facility/billing/create-invoice";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Collection")) {
        return "/finance/customer-facility/collection/receive-payment";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Deposit Counter")) {
        return "/finance/customer-facility/deposit-counter";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Adjustment")) {
        return "/finance/customer-facility/adjustment/create-adjustment";
      }
    }
  }

  if (name === "reports") {
    const cloneGL = userInfo?.permissions.filter(
      (item) =>
        item.menu === "General Reports" || item.menu === "Customer Reports"
    );

    if (cloneGL !== undefined) {
      if (cloneGL.some((someItem) => someItem.menu === "General Reports")) {
        return "/finance/reports/general-reports";
      }
      if (cloneGL.some((someItem) => someItem.menu === "Customer Reports")) {
        return "/finance/reports/customer-reports";
      }
    }
  }
};
