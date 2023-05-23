import { format, isValid, parse } from "date-fns";
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
import { COADetail } from "../../../../../components/ReactQuery/ChartofAccount";

export default function Modify({ modify_id }: any) {
    const { isLoading, data, isError } = GetCollectionDetail(modify_id);

    const {
        isLoading: customerLoading,
        data: customerData,
        isError: customerError,
    } = GetCustomer(data?.data.customer_id);

    const customer: customer = customerData?.data;

    const collection: CollectionItem = data?.data;

    const {
        isLoading: coaLoading,
        data: coaData,
        isError: coaError,
    } = COADetail(collection?.chart_of_account_id);

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

    useEffect(() => {
        if (!isLoading && !isError && !coaLoading && !coaError) {
            setHeaderForm({
                customer_id: collection.customer_id,
                receipt_type: collection.receipt_type,
                receipt_date: isValid(receipt_date)
                    ? format(receipt_date, "MMM dd yyyy")
                    : "",
                receipt_no: collection.receipt_no,
                description: collection.description,
                mode_of_payment: collection.mode_of_payment,
                deposit_date: isValid(deposit_date)
                    ? format(deposit_date, "MMM dd yyyy")
                    : "",
                chart_of_account_id: collection.chart_of_account_id,
                chart_of_account_name: coaData?.data.account_name,
                reference_no: collection.reference_no,
                amount_paid: collection.amount_paid,
                credit_tax: collection.credit_tax,
                discount: collection.discount,
            });
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
            }
        }
    }, [collection, coaData?.data]);

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

    if (isLoading || customerLoading || coaLoading) {
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
    if (isError || customerError || coaError) {
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
            DefaultProvisional={[]}
            DefaultOfficialOutrightAdvances={{
                Outright: [],
                Advances: [],
            }}
        />
    );
}

export async function getServerSideProps({ query }: any) {
    const modify_id = query.modify_id;
    return {
        props: {
            modify_id: modify_id,
        },
    };
}
