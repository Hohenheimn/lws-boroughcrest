import { format, isValid, parse, startOfDay } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { GetCollectionDetail } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import ReceivePaymentForm, {
    Deposits,
    HeaderForm,
} from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ReceivePaymentForm";
import { GetCustomer } from "../../../../../components/ReactQuery/CustomerMethod";
import { customer } from "../../../../../types/customerList";
import { CollectionItem } from "../payment-register";
import { isProvisionalTable } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ProvisionalForm";
import OutRight, {
    Outright,
} from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/OfficialForm/OutrightAndAdvances/OutRight";
import { AdvancesType } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/OfficialForm/OutrightAndAdvances/Advances";
import { useQueryClient } from "react-query";

export default function Modify({ modify_id, from }: any) {
    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.removeQueries("collection-detail");
    }, []);

    const { isLoading, data, isError } = GetCollectionDetail(modify_id);

    const {
        isLoading: customerLoading,
        data: customerData,
        isError: customerError,
    } = GetCustomer(data?.data.customer_id);

    const customer: customer = customerData?.data;

    const collection: CollectionItem = data?.data;

    const receipt_date = parse(
        collection?.receipt_date,
        "yyyy-MM-dd",
        new Date()
    );

    const deposit_date = parse(
        collection?.deposit_date,
        "yyyy-MM-dd",
        new Date()
    );

    const [HeaderForm, setHeaderForm] = useState<HeaderForm>({
        customer_id: "",
        receipt_type: "",
        receipt_date: "",
        receipt_no: "",
        description: "",
        mode_of_payment: "",
        deposit_date: "",
        chart_of_account_id: "",
        chart_of_account_name: "",
        reference_no: "",
        amount_paid: "",
        credit_tax: "",
        discount: 0,
    });

    const [isCustomer, setCustomer] = useState<any>({
        id: "",
        name: "",
        class: "",
        property: [],
    });

    const [isAcknowledgement, setAcknowledgement] = useState<Deposits[]>([]);

    const [isProvisional, setProvisional] = useState<isProvisionalTable[]>([]);

    const [isOutright, setOutRight] = useState<Outright[]>([]);

    const [isAdvances, setAdvances] = useState<AdvancesType[]>([]);

    const date = new Date();
    let today = startOfDay(date);

    useEffect(() => {
        if (!isLoading && !isError) {
            let receipt_type = "";

            if (from === "check_warehouse") {
                receipt_type = "Acknowledgement";
            } else {
                receipt_type = collection.receipt_type;
            }

            setHeaderForm({
                customer_id: collection.customer_id,
                receipt_type: receipt_type,
                receipt_date: format(today, "MMM dd yyyy"),
                receipt_no: collection.receipt_no,
                description: collection.description,
                mode_of_payment: collection.mode_of_payment,
                deposit_date: isValid(deposit_date)
                    ? format(deposit_date, "MMM dd yyyy")
                    : "",
                chart_of_account_id: collection.chart_of_account_id,
                chart_of_account_name: collection.chart_of_account_account_name,
                reference_no: collection.reference_no,
                amount_paid: collection.amount_paid,
                credit_tax: collection.credit_tax,
                discount: collection.discount,
            });

            if (collection.check_warehouses !== undefined) {
                setProvisional(() =>
                    collection.check_warehouses.map((item) => {
                        return {
                            id: item.id,
                            check_date: item.check_date,
                            description: item.description,
                            check_no: `${item.check_no}`,
                            bank_branch: item.bank_branch_name,
                            bank_branch_id: item.bank_branch_id,
                            amount: item.amount,
                        };
                    })
                );
            } else {
                setProvisional([
                    {
                        id: 1,
                        check_date: "",
                        description: "",
                        check_no: "",
                        bank_branch: "",
                        bank_branch_id: "",
                        amount: 0,
                    },
                ]);
            }

            if (collection.outstanding_balances !== undefined) {
                const outrights = collection.outright_advances.filter(
                    (itemFilter) => itemFilter.type === "Outright"
                );
                setOutRight(() =>
                    outrights.map((item) => {
                        return {
                            id: item.id,
                            charge: item.charge_name,
                            charge_id: `${item.charge_id}`,
                            description: item.description,
                            uom: item.uom,
                            unit_price: Number(item.unit_price),
                            qty: Number(item.quantity),
                            amount: Number(item.amount),
                        };
                    })
                );
                const advances = collection.outright_advances.filter(
                    (itemFilter) => itemFilter.type === "Advance"
                );
                setAdvances(() =>
                    advances.map((item) => {
                        return {
                            id: item.id,
                            charge: item.charge_name,
                            charge_id: `${item.charge_id}`,
                            description: item.description,
                            amount: Number(item.amount),
                        };
                    })
                );
            } else {
                setOutRight([
                    {
                        id: 1,
                        charge: "",
                        charge_id: "",
                        description: "",
                        uom: "",
                        unit_price: 0,
                        qty: "",
                        amount: 0,
                    },
                ]);
                setAdvances([
                    {
                        id: 1,
                        charge: "",
                        charge_id: "",
                        description: "",
                        amount: 0,
                    },
                ]);
            }

            if (collection?.deposits !== undefined) {
                const clone = collection.deposits.map((item) => {
                    return {
                        id: item.id,
                        charge: item.charge_name,
                        charge_id: item.charge_id,
                        description: item.description,
                        amount: item.amount,
                    };
                });
                setAcknowledgement(clone);
            } else {
                setAcknowledgement([
                    {
                        id: 0,
                        charge: "",
                        charge_id: "",
                        description: "",
                        amount: 0,
                    },
                ]);
            }
        }
    }, [collection]);

    useEffect(() => {
        if (!customerLoading && !customerError) {
            setCustomer({
                id: customer?.id,
                name: customer?.name,
                class: customer?.class,
                property: customer?.properties.map((item: any) => {
                    return item.unit_code;
                }),
            });
        }
    }, [customerData?.status]);

    if (isLoading || customerLoading) {
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

    if (isError || customerError) {
        return (
            <div className="pageDetail">
                <h1>Something is wrong</h1>
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <ReceivePaymentForm
            DefaultCustomer={isCustomer}
            DefaultValHeaderForm={HeaderForm}
            type={HeaderForm.receipt_type}
            DefaultValAcknowledgement={isAcknowledgement}
            DefaultProvisional={isProvisional}
            DefaultOfficialOutrightAdvances={{
                Outright: isOutright,
                Advances: isAdvances,
            }}
        />
    );
}

export async function getServerSideProps({ query }: any) {
    const modify_id = query.modify_id;
    let from = query.from;
    return {
        props: {
            modify_id: modify_id,
            from: from === undefined ? "" : from,
        },
    };
}
