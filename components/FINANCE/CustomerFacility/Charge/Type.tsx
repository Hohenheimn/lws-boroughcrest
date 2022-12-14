export type ChargePayload = {
    code: string;
    type: string;
    name: string;
    description: string;
    base_rate: number;
    uom: string;
    vat_percent: number;
    receivable_coa_id: any;
    receivable_coa_value: string;
    discounts_coa_id: any;
    discounts_coa_value: string;
    revenue_coa_id: any;
    revenue_coa_value: string;
    advances_coa_id: any;
    advances_coa_value: string;
    minimum: number;
    interest: string;
    payment_heirarchy: number;
    soa_sort_order: number;
};
export type IDstate = {
    value: string;
    id: string;
    toggle: boolean;
    firstVal: string;
    firstID: string;
};
