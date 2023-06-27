export const Applied_Advances = {
    debitAccounts: [9, 11],
    creditAccounts: [4],
};

export const Discounts = {
    debitAccounts: [14, 11],
    creditAccounts: [4],
};

export const Credit_Tax = {
    debitAccounts: [5],
    creditAccounts: [4],
};

export const Charge_Reversal = {
    debitAccounts: [13, 11],
    creditAccounts: [4],
};

export const Charge_Debit = {
    debitAccounts: [4],
    creditAccounts: [13, 11],
};

export const ValidationDebitCredit = (
    type: string,
    coa_default_account_id: number
) => {
    if (type == "Applied Advances") {
        if (Applied_Advances.debitAccounts.includes(coa_default_account_id)) {
            return "debit";
        }
        if (Applied_Advances.creditAccounts.includes(coa_default_account_id)) {
            return "credit";
        }
    }

    if (type == "Discounts") {
        if (Discounts.debitAccounts.includes(coa_default_account_id)) {
            return "debit";
        }
        if (Discounts.creditAccounts.includes(coa_default_account_id)) {
            return "credit";
        }
    }

    if (type == "Credit Tax") {
        if (Credit_Tax.debitAccounts.includes(coa_default_account_id)) {
            return "debit";
        }
        if (Credit_Tax.creditAccounts.includes(coa_default_account_id)) {
            return "credit";
        }
    }

    if (type == "Charge Reversal") {
        if (Charge_Reversal.debitAccounts.includes(coa_default_account_id)) {
            return "debit";
        }
        if (Charge_Reversal.creditAccounts.includes(coa_default_account_id)) {
            return "credit";
        }
    }

    if (type == "Charge Debit") {
        if (Charge_Debit.debitAccounts.includes(coa_default_account_id)) {
            return "debit";
        }
        if (Charge_Debit.creditAccounts.includes(coa_default_account_id)) {
            return "credit";
        }
    }

    return false;
};
