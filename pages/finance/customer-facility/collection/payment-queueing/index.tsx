import Tippy from "@tippy.js/react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import { GetCollectionList } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { GetCustomer } from "../../../../../components/ReactQuery/CustomerMethod";
import ModalTemp from "../../../../../components/Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";
import Pagination from "../../../../../components/Reusable/Pagination";
import TableErrorMessage from "../../../../../components/Reusable/TableErrorMessage";
import { customer } from "../../../../../types/customerList";

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
    bank_account_id: number | null;
    parent_id: number | null;
    remarks: string;
    updated_at: string;
    created_at: string;
};

export default function PaymentQueueing() {
    const router = useRouter();
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [TablePage, setTablePage] = useState(1);

    const { isLoading, data, isError } = GetCollectionList(
        isSearch,
        "",
        "",
        TablePage
    );

    return (
        <>
            {router.query.remark !== undefined && (
                <ModalTemp narrow={true}>
                    <h1 className="text-ThemeRed mb-2">Remarks</h1>
                    <textarea
                        name=""
                        id=""
                        className="field w-full mb-5"
                    ></textarea>
                    <div className="flex justify-end items-center w-full">
                        <Link href="">
                            <a className="button_cancel">CANCEL</a>
                        </Link>
                        <button className="buttonRed">ARCHIVE</button>
                    </div>
                </ModalTemp>
            )}
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint="/finance/general-ledger/journal/filter-options"
                page="payment-queueing"
                isPeriod={isPeriod}
                setPeriod={setPeriod}
            />
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Class</th>
                            <th>Property</th>
                            <th>Amount Received</th>
                            <th>Deposit Date</th>
                            <th>Reference No.</th>
                            <th>Remarks</th>
                            <th></th>
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
                                height="6px"
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
    const router = useRouter();

    const redirect = () => {
        router.push(
            `/finance/customer-facility/collection/receive-payment/${itemDetail.id}`
        );
    };

    const date = parse(itemDetail.deposit_date, "yyyy-MM-dd", new Date());

    const { data } = GetCustomer(itemDetail.customer_id);

    const CustomerDetail: customer = data?.data;

    return (
        <tr onClick={redirect} className="cursor-pointer">
            <td>{CustomerDetail.name}</td>
            <td>{CustomerDetail.class}</td>
            <td>
                {CustomerDetail.properties.map((item: any, index: number) =>
                    CustomerDetail.properties.length - 1 === index
                        ? item.unit_code
                        : item.unit_code + ", "
                )}
            </td>
            <td>
                <TextNumberDisplay
                    className="withPeso w-full"
                    value={itemDetail.amount_paid}
                />
            </td>
            <td>{isValid(date) ? format(date, "MMM dd yyyy") : ""}</td>
            <td>{itemDetail.reference_no}</td>
            <td>{itemDetail.remarks}</td>
            <td className="icon">
                <ul className="flex items-center justify-around">
                    <Tippy content={"Remark"} theme="ThemeRed">
                        <li>
                            <Link
                                href={`/finance/customer-facility/collection/payment-queueing?remark=1`}
                            >
                                <a>
                                    <Image
                                        src="/Images/f_remark.png"
                                        width={20}
                                        height={20}
                                        alt="Remark"
                                    />
                                </a>
                            </Link>
                        </li>
                    </Tippy>

                    <Tippy content={"Modify"} theme="ThemeRed">
                        <li>
                            <Link
                                href={`/finance/customer-facility/collection/receive-payment/id`}
                            >
                                <a>
                                    <Image
                                        src="/Images/f_opposite_arrow.png"
                                        width={22}
                                        height={18}
                                        alt="Modify"
                                    />
                                </a>
                            </Link>
                        </li>
                    </Tippy>

                    <Tippy content={"Attachment"} theme="ThemeRed">
                        <li>
                            <Image
                                src="/Images/f_attach.png"
                                width={20}
                                height={20}
                                alt="Attach"
                            />
                        </li>
                    </Tippy>
                </ul>
            </td>
        </tr>
    );
};
