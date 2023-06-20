import React from "react";
import PrintTemplate from "../../../../../components/Reusable/PrintTemplate";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { GetInvoiceListPrint } from "../../../../../components/FINANCE/CustomerFacility/Billing/Query";

export default function Print() {
    const { data, isLoading, isError } = GetInvoiceListPrint();

    const PagePermisson = PageAccessValidation("Billing");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }
    return (
        <div className="flex items-center flex-col">
            <PrintTemplate title={"Posted Invoices"}>
                <table className="w-full">
                    <thead className=" text-RegularColor text-[14px] text-start">
                        <tr>
                            <th className=" text-start">Billing Date</th>
                            <th className=" text-start">Invoice No.</th>
                            <th className=" text-start">Customer</th>
                            <th className=" text-start">Property</th>
                            <th className=" text-start">Due Amount</th>
                            <th className=" text-start">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.map((item: any, index: number) => (
                            <tr className="text-RegularColor" key={index}>
                                <td>{item?.billing_date}</td>
                                <td>{item?.invoice_no}</td>
                                <td>{item?.customer?.name}</td>
                                <td>
                                    {item?.customer?.properties.map(
                                        (itemInner: any, index: number) =>
                                            item?.customer?.properties.length -
                                                1 ===
                                            index
                                                ? itemInner?.unit_code
                                                : itemInner?.unit_code + ", "
                                    )}
                                </td>
                                <td>{item?.due_amount}</td>
                                <td>{item?.due_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </PrintTemplate>
        </div>
    );
}
Print.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
