export type ChargePayload = {
    code: string;
    type: string;
    name: string;
    description: string;
    base_rate: number | string;
    vat_percent: number | string;
    receivable_coa_id: any;
    receivable_coa_value: string | string;
    charge_uom_id: any;
    charge_uom_value: string;
    discounts_coa_id: any;
    discounts_coa_value: string;
    revenue_coa_id: any;
    revenue_coa_value: string;
    advances_coa_id: any;
    advances_coa_value: string;
    minimum: number | string;
    interest: string;
    payment_heirarchy: number | string;
    soa_sort_order: number | string;
};
export type IDstate = {
    value: string;
    id: string;
    toggle: boolean;
    firstVal: string;
    firstID: string;
};
