import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { ShowInvoice } from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingDetail";
import BillingForm from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";
import { GetInvoiceListDetail } from "../../../../../components/FINANCE/CustomerFacility/Billing/Query";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

export default function Id({ id }: any) {
    const { isLoading, data, isError } = GetInvoiceListDetail(id);

    const InvoiceDetail = data?.data;
    // Pass only the key of billing_readings_list_id is equal to null
    const InvoiceList = InvoiceDetail?.invoice_list.filter(
        (item: any) => item?.billing_readings_list_id === null
    );

    const Value = InvoiceList?.map((item: ShowInvoice) => {
        return {
            id: item.id,
            charge: item.charge.name,
            description: item.description,
            charge_id: item.charge.id,
            charge_vat: item.charge.vat_percent,
            unit_price: item.unit_price,
            quantity: item.quantity,
            uom: item.charge.uom.name,
            vat: item.vat,
            amount: item.amount,
            property_unit_code: item?.property?.unit_code,
            property_id: item?.property?.id,
            billing_batch_list_id: item?.billing_batch_list_id,
            billing_readings_list_id: item?.billing_batch_list_id,
        };
    });
    const CustomerDefault = {
        id: InvoiceDetail?.customer.id,
        name: InvoiceDetail?.customer.name,
        class: InvoiceDetail?.customer.class,
        property: InvoiceDetail?.customer.properties.map((item: any) => {
            return item.unit_code;
        }),
        properties: InvoiceDetail?.invoice_list.map((item: ShowInvoice) => {
            return {
                id: item.property.id,
                unit_code: item.property.unit_code,
            };
        }),
    };

    const PagePermisson = PageAccessValidation("Billing");

    const Permission_modify = AccessActionValidation("Billing", "modify");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (!Permission_modify && Permission_modify !== undefined) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission to Modify Billing
                    </h1>
                </div>
            </div>
        );
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
                <h1>Something is wrong!</h1>
            </div>
        );
    }

    return (
        <div>
            <BillingForm
                DefaultValue={Value}
                formType="modify"
                DefaultCustomer={CustomerDefault}
            />
        </div>
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
