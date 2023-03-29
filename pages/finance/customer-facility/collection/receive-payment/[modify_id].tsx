import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { GetCollectionDetail } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import ReceivePaymentForm, {
    HeaderForm,
} from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/ReceivePaymentForm";
import { GetCustomer } from "../../../../../components/ReactQuery/CustomerMethod";
import { customer } from "../../../../../types/customerList";
import { CollectionItem } from "../payment-register";

export default function Modify({ modify_id }: any) {
    const { isLoading, data, isError } = GetCollectionDetail(modify_id);

    const {
        isLoading: customerLoading,
        data: customerData,
        isError: customerError,
    } = GetCustomer(data?.data.data.customer_id);

    const customer: customer = customerData?.data;

    const collection: CollectionItem = data?.data.data;

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
        bank_account_id: "",
        reference_no: "",
        amount_paid: "",
        credit_tax: "",
    });

    const [isCustomer, setCustomer] = useState<any>({
        id: "",
        name: "",
        class: "",
        property: [],
    });

    useEffect(() => {
        if (!isLoading && !isError) {
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
                bank_account_id: collection.bank_account_id,
                reference_no: collection.reference_no,
                amount_paid: collection.amount_paid,
                credit_tax: collection.credit_tax,
            });
        }
    }, [data?.status]);

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
            DefaultValAcknowledgement={[]}
            DefaultProvisional={[]}
            DefaultOfficial={{
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
