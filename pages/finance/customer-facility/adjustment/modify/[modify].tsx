import { format, isValid, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import AdjustmentForm, {
    DefaultValueAdjustment,
} from "../../../../../components/FINANCE/CustomerFacility/Adjustment/AdjustmentForm";
import { GetAdjustmentDetail } from "../../../../../components/FINANCE/CustomerFacility/Adjustment/Query";
import {
    AdjustmentDetailType,
    adjustment_accounts,
} from "../../../../../components/FINANCE/CustomerFacility/Adjustment/AdjusmentDetail";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Modify({ id }: any) {
    const { isLoading, data, isError } = GetAdjustmentDetail(id);

    const [DefaultValue, setDefaultValue] = useState<DefaultValueAdjustment>();

    const AdjustmentDetail: AdjustmentDetailType = data?.data;

    const MemoDate = parse(AdjustmentDetail?.date, "yyyy-MM-dd", new Date());

    useEffect(() => {
        if (AdjustmentDetail !== undefined) {
            setDefaultValue({
                Customer: {
                    id: AdjustmentDetail.customer.id,
                    name: AdjustmentDetail.customer.name,
                    class: AdjustmentDetail.customer.class,
                    property: AdjustmentDetail.customer.properties.map(
                        (item) => item.unit_code
                    ),
                },
                HeaderForm: {
                    customer_id: AdjustmentDetail.customer_id,
                    memo_type: AdjustmentDetail.memo_type,
                    memo_date: isValid(MemoDate)
                        ? format(MemoDate, "MMM dd yyyy")
                        : "",
                    description: AdjustmentDetail.description,
                    charge_id_header: "",
                    charge_id: "",
                    document_no: AdjustmentDetail.memo_no,
                },
                Charge: {
                    charge: AdjustmentDetail.charge,
                    charge_id: AdjustmentDetail.charge_id,
                },
                transaction_type: AdjustmentDetail.transaction,
                Invoice: AdjustmentDetail.adjustment_invoice.map((item) => {
                    return {
                        id: Number(item.billing_invoice_list.id),
                        adjustment_amount: Number(item.adjustment_amount),
                        balance: Number(item.balance),
                    };
                }),
                AdvancesToggle:
                    AdjustmentDetail.adjustment_invoice.length <= 0
                        ? true
                        : false,
                Accounts: AdjustmentDetail.adjustment_accounts.map(
                    (item: adjustment_accounts, index: number) => {
                        return {
                            id: index,
                            coa_id: item.account.id,
                            chart_code: item.account.chart_code,
                            account_name: item.account.account_name,
                            debit: item.debit,
                            credit: item.credit,
                        };
                    }
                ),
            });
        }
    }, [data?.data]);

    const PagePermisson = PageAccessValidation("Adjustment");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (isLoading) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something went wrong!</h1>
            </div>
        );
    }

    return (
        <>
            {DefaultValue !== undefined && (
                <AdjustmentForm DefaultValue={DefaultValue} />
            )}
        </>
    );
}

export async function getServerSideProps({ query }: any) {
    const id = query.modify;
    return {
        props: {
            id: id,
        },
    };
}
