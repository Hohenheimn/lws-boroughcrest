import { getCookie } from "cookies-next";
import React from "react";
import { BarLoader } from "react-spinners";
import { GetPrintCustomerList } from "../../../../../components/ReactQuery/CustomerMethod";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import PrintTemplate from "../../../../../components/Reusable/PrintTemplate";
import { customerItemDetail } from "../../../../../types/customerList";
import { GetCollectionList } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { CollectionItem } from ".";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";

export default function Print() {
    // const { data, isLoading, isError } = GetCustomerList(
    //     Number(PageNumber),
    //     Keyword,
    //     RowNumber
    // );
    const { isLoading, data, isError } = GetCollectionList(
        "",
        "",
        "",
        1,
        [],
        ""
    );

    const PagePermisson = PageAccessValidation("Collection");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <>
            <div className="flex items-center flex-col">
                <PrintTemplate title="Payment Register">
                    <table className="w-full">
                        <thead className="text-[#545454] text-[14px] text-start">
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
                        <tbody className="text-[14px]">
                            {!isLoading && !isError && (
                                <>
                                    {data?.data?.data.map(
                                        (
                                            item: CollectionItem,
                                            index: number
                                        ) => (
                                            <List
                                                key={index}
                                                itemDetail={item}
                                            />
                                        )
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </PrintTemplate>
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
                <button></button>
            </div>
        </>
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
                <div className=" flex w-full justify-end">
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

Print.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
