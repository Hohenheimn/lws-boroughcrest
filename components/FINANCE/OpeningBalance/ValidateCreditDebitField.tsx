type validateCreditDebitField = {
    debit: string | number;
    setDebit: Function;
    credit: string | number;
    setCredit: Function;
};

export const validateCreditDebitField = (
    debit: string | number,
    credit: string | number,
    setDebit: Function,
    setCredit: Function
) => {
    if (debit === "" && credit === "") {
        setCredit((prev: any) => (prev = ""));
        setDebit((prev: any) => (prev = ""));
        return;
    }
    if (debit === 0 && credit === "") {
        setCredit((prev: any) => (prev = ""));
        setDebit((prev: any) => (prev = ""));
        return;
    }
    if (debit === "" && credit === 0) {
        setCredit((prev: any) => (prev = ""));
        setDebit((prev: any) => (prev = ""));
        return;
    }
    if (debit === 0 && credit === 0) {
        setCredit((prev: any) => (prev = ""));
        setDebit((prev: any) => (prev = ""));
        return;
    }
    if (debit !== "") {
        setCredit((prev: any) => (prev = "disabled"));
        setDebit((prev: any) => (prev = ""));
        return;
    }
    if (credit !== "") {
        setDebit((prev: any) => (prev = "disabled"));
        setCredit((prev: any) => (prev = ""));
        return;
    }
};
