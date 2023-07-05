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
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";
import { ShowBookedCheck } from "../../../../../components/FINANCE/Check-Warehouse/CheckReceivables/Query";
import { BookedCheckType } from "../../../check-warehouse/check-receivables/booked-check";

export default function Modify({ modify_id, from }: any) {
    const router = useRouter();

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.removeQueries("collection-detail");
    }, []);

    const { isLoading, data, isError } = GetCollectionDetail(
        router.query.from === "payment_queueing" ? modify_id : null
    );

    const {
        isLoading: BookedLoading,
        data: BookedData,
        isError: BookedError,
    } = ShowBookedCheck(
        router.query.from === "check_warehouse" ? modify_id : null
    );

    const BookedCheck: BookedCheckType = BookedData?.data;

    const collection: CollectionItem = data?.data;

    const {
        isLoading: customerLoading,
        data: customerData,
        isError: customerError,
    } = GetCustomer(
        router.query.from === "check_warehouse"
            ? BookedCheck?.customer_id
            : collection?.customer_id
    );

    const customer: customer = customerData?.data;

    const deposit_date_collection = parse(
        collection?.deposit_date,
        "yyyy-MM-dd",
        new Date()
    );

    const deposit_date_booked_check = parse(
        BookedCheck?.deposit_date,
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
        if (
            !isLoading &&
            !isError &&
            router.query.from === "payment_queueing"
        ) {
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
                deposit_date: isValid(deposit_date_collection)
                    ? format(deposit_date_collection, "MMM dd yyyy")
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
            if (collection.outright_advances !== undefined) {
                const outrights = collection.outright_advances.filter(
                    (itemFilter) => itemFilter.type === "Outright"
                );
                if (outrights.length > 0) {
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
                }

                const advances = collection.outright_advances.filter(
                    (itemFilter) => itemFilter.type === "Advance"
                );

                if (advances.length > 0) {
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

        if (
            router.query.from === "check_warehouse" &&
            BookedCheck !== undefined
        ) {
            setHeaderForm({
                customer_id: BookedCheck.customer_id,
                receipt_type: "Acknowledgement",
                receipt_date: format(today, "MMM dd yyyy"),
                receipt_no: "",
                description: BookedCheck.description,
                mode_of_payment: "Deposit",
                deposit_date: isValid(deposit_date_booked_check)
                    ? format(deposit_date_booked_check, "MMM dd yyyy")
                    : "",
                chart_of_account_id: "",
                chart_of_account_name: "",
                reference_no: BookedCheck.reference_no,
                amount_paid: BookedCheck.amount,
                credit_tax: 0,
                discount: 0,
            });
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

    const PagePermisson = PageAccessValidation("Collection");

    const Permission_modify = AccessActionValidation("Collection", "modify");

    const Permission_create = AccessActionValidation("Collection", "create");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (
        !Permission_modify &&
        Permission_modify !== undefined &&
        router.query.from === "payment_queueing"
    ) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission to Modify Collection
                    </h1>
                </div>
            </div>
        );
    }

    if (
        !Permission_create &&
        Permission_create !== undefined &&
        router.query.from === "check_warehouse"
    ) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission to Create Collection
                    </h1>
                </div>
            </div>
        );
    }

    if (
        isLoading ||
        customerLoading ||
        BookedLoading ||
        HeaderForm.receipt_type === ""
    ) {
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

    if (isError || customerError || BookedError) {
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
