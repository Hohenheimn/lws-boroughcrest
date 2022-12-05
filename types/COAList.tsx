export type ChartofAccountPayload = {
    chart_code: string;
    parent_id: number | null;
    code_suffix: string;
    account_name: string;
    description: string;
    coa_default_account_id: number | null;
    apply_to_sub_acc: boolean;
    bank_acc_no: string;
    bank_branch: string;
    defaultAccount?: string;
    parent?: string;
};
