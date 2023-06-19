import React from "react";
import { GetCollectionListPrint } from "../ReceivePayment/Query";
import { CollectionItem } from "../../../../../pages/finance/customer-facility/collection/payment-register";
import { BarLoader } from "react-spinners";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import { TextNumberDisplay } from "../../../../Reusable/NumberFormat";

export default function PrintCollectionList() {
    const { isLoading, data, isError } = GetCollectionListPrint();
    return (
        <div>
            <table className="w-full">
                <thead className="text-[#545454] text-[14px] text-start">
                    <tr>
                        <th className=" text-start">Receipt Date</th>
                        <th className=" text-start">Receipt No.</th>
                        <th className=" text-start">Customer</th>
                        <th className=" text-start">Property</th>
                        <th className=" text-start">Amount Received</th>
                        <th className=" text-start">Mode of Payment</th>
                        <th className=" text-start">Cash Account</th>
                    </tr>
                </thead>
                <tbody className="text-[14px]">
                    {!isLoading && !isError && (
                        <>
                            {data?.data.map(
                                (item: CollectionItem, index: number) => (
                                    <List key={index} itemDetail={item} />
                                )
                            )}
                        </>
                    )}
                </tbody>
            </table>
            {isLoading && (
                <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
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
        </div>
    );
}
type ListProps = {
    itemDetail: CollectionItem;
};

const List = ({ itemDetail }: ListProps) => {
    const date = parse(itemDetail?.receipt_date, "yyyy-MM-dd", new Date());

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

            <td>{itemDetail?.customer?.name}</td>

            <td>
                {itemDetail?.customer?.properties?.map(
                    (item: any, index: number) =>
                        itemDetail?.customer?.properties?.length - 1 === index
                            ? item.unit_code
                            : item.unit_code + ", "
                )}
            </td>

            <td>
                <div className=" flex w-full justify-end pr-2">
                    <TextNumberDisplay
                        className="withPeso w-full text-end"
                        value={itemDetail?.amount_paid}
                    />
                </div>
            </td>

            <td>{itemDetail?.mode_of_payment}</td>

            <td>{itemDetail?.chart_of_account_account_name}</td>
        </tr>
    );
};
