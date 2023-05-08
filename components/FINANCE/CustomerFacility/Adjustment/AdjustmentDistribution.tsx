export const Applied_Advances = {
    debitAccounts: ["PS Advances Account", "Deferred Customer GST Account"],
    creditAccounts: ["PS Receivable Account"],
};

export const Discounts = {
    debitAccounts: ["Discount Contra Account", "Deferred Customer GST Account"],
    creditAccounts: ["PS Receivable Account"],
};

export const Credit_Tax = {
    debitAccounts: ["Customer WTAX Account"],
    creditAccounts: ["PS Receivable Account"],
};

export const Charge_Reversal = {
    debitAccounts: ["PS Revenue Account", "Deferred Customer GST Account"],
    creditAccounts: ["PS Receivable Account"],
};

export const Charge_Debit = {
    debitAccounts: ["PS Receivable Account"],
    creditAccounts: ["PS Revenue Account", "Deferred Customer GST Account"],
};

export const ValidationDebitCredit = (type: string, defaultAccount: string) => {
    if (type == "Applied Advances") {
        if (Applied_Advances.debitAccounts.includes(defaultAccount)) {
            return "debit";
        }
        if (Applied_Advances.creditAccounts.includes(defaultAccount)) {
            return "credit";
        }
    }

    if (type == "Discounts") {
        if (Discounts.debitAccounts.includes(defaultAccount)) {
            return "debit";
        }
        if (Discounts.creditAccounts.includes(defaultAccount)) {
            return "credit";
        }
    }

    if (type == "Credit Tax") {
        if (Credit_Tax.debitAccounts.includes(defaultAccount)) {
            return "debit";
        }
        if (Credit_Tax.creditAccounts.includes(defaultAccount)) {
            return "credit";
        }
    }

    if (type == "Charge Reversal") {
        if (Charge_Reversal.debitAccounts.includes(defaultAccount)) {
            return "debit";
        }
        if (Charge_Reversal.creditAccounts.includes(defaultAccount)) {
            return "credit";
        }
    }

    if (type == "Charge Debit") {
        if (Charge_Debit.debitAccounts.includes(defaultAccount)) {
            return "debit";
        }
        if (Charge_Debit.creditAccounts.includes(defaultAccount)) {
            return "credit";
        }
    }

    return false;
};
