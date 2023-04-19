import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import { GetCollectionList } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { GetCustomer } from "../../../../../components/ReactQuery/CustomerMethod";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";
import Pagination from "../../../../../components/Reusable/Pagination";
import TableErrorMessage from "../../../../../components/Reusable/TableErrorMessage";
import { customer } from "../../../../../types/customerList";
import { GetBADetail } from "../../../../../components/ReactQuery/BankAccount";

export type CollectionItem = {
    id: number;
    corporate_id: number;
    depositor_type: string;
    customer_id: number;
    user_id: number;
    type: string;
    receipt_type: string;
    receipt_date: string;
    receipt_no: string;
    description: string;
    mode_of_payment: string;
    deposit_date: string;
    amount_paid: number;
    reference_no: number | null;
    credit_tax: number;
    status: string;
    deposits: {
        charge_id: string;
        charge_name: string;
        amount: number;
        description: string;
    }[];
    check_warehouses: {
        check_date: string;
        description: string;
        check_no: number;
        amount: number;
    }[];
    bank_account_id: number | null;
    parent_id: number | null;
    updated_at: string;
    created_at: string;
    histories: PaymentSummaryHistories[];
    outright_advances: {
        id: number;
        amount: number;
        charge_id: number;
        charge_name: string;
        description: string;
        quantity: number;
        type: string;
        unit_price: string | number;
    }[];
    outstanding_balances: {
        balance: string | number;
        billing_invoice_id: number;
        collection_id: number;
        id: number;
        payment_amount: string | number;
        charge_name: string;
        charge_description: string;
        charge_id: number;
    }[];
    discount: number;
};

export type PaymentSummaryHistories = CollectionItem;

export default function PaymentRegister() {
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [TablePage, setTablePage] = useState(1);

    const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());
    const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());

    const { isLoading, data, isError } = GetCollectionList(
        isSearch,
        isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
        isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
        TablePage,
        isFilterText
    );

    return (
        <>
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint="/finance/customer-facility/collection/filter-options"
                page="payment-register"
                isPeriod={isPeriod}
                setPeriod={setPeriod}
            />
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            <th>Receipt Date</th>
                            <th>Receipt No.</th>
                            <th>Customer</th>
                            <th>Property</th>
                            <th>Amount Received</th>
                            <th>Mode of Payment</th>
                            <th>Cash Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map(
                            (item: CollectionItem, index: number) => (
                                <List key={index} itemDetail={item} />
                            )
                        )}
                    </tbody>
                </table>

                {isLoading && (
                    <div className="w-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="10px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                {isError && <TableErrorMessage />}
            </div>
            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.meta.last_page}
                CurrentPage={data?.data.meta.current_page}
            />
        </>
    );
}

type ListProps = {
    itemDetail: CollectionItem;
};

const List = ({ itemDetail }: ListProps) => {
    const date = parse(itemDetail?.receipt_date, "yyyy-MM-dd", new Date());
    const { data: bankAccount } = GetBADetail(
        Number(itemDetail?.bank_account_id)
    );
    const { data } = GetCustomer(itemDetail?.customer_id);

    const CustomerDetail: customer = data?.data;

    const router = useRouter();

    return (
        <tr
            className="cursor-pointer"
            onClick={() => {
                router.push(
                    `/finance/customer-facility/collection/payment-register/${itemDetail.id}`
                );
            }}
        >
            <td>{isValid(date) ? format(date, "MMM dd yyyy") : ""}</td>
            <td>{itemDetail?.receipt_no}</td>
            <td>{CustomerDetail?.name}</td>
            <td>
                {CustomerDetail?.properties.map((item: any, index: number) =>
                    CustomerDetail.properties.length - 1 === index
                        ? item.unit_code
                        : item.unit_code + ", "
                )}
            </td>
            <td>
                <TextNumberDisplay
                    className="withPeso w-full"
                    value={itemDetail?.amount_paid}
                />
            </td>
            <td>{itemDetail?.mode_of_payment}</td>
            <td>
                {/* {bankAccount?.data?.bank_acc_no} */}
                Sample Inbound
            </td>
        </tr>
    );
};
