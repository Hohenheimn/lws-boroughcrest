export type ChartofAccountList = {
    chart_code: string;
    code_suffix: string;
    account_name: string;
    description: string;
    apply_to_sub_acc: boolean;
    bank_account: string;
    bank_account_id: string | number;
    coa_default_account_id: string | number;
    defaultAccount: string;
    parent_id: string | number;
    parent: string;
};

export type ChartofAccountPayload = {
    chart_code: string;
    parent_id: number | null;
    code_suffix: string;
    account_name: string;
    description: string;
    coa_default_account_id: string;
    apply_to_sub_acc: string | boolean;
    bank_account_id: string | number;
};
