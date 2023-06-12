import React from "react";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";

const detailContainer =
    "w-1/5 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export type FavoriteDetail = {
    created_at: string;
    id: number;
    report_name: string;
    updated_at: string;
    user_id: number;
    report_type: string;
    customer_name: string;
    customer_class: string;
    property_type: string;
    property_class: string;
    property_tower: string;
    property_floor: string;
    property_project: string;
    report_mode_of_payment: string;
    report_charge: string;
    report_account: string;
    report_memo_type: string;
    report_receipt_type: string;
    document_type: string;
};

export default function FavoriteDetailPage() {
    const PagePermisson_customer = PageAccessValidation("Customer Reports");

    const PagePermisson_general = PageAccessValidation("General Reports");

    if (
        (!PagePermisson_general && PagePermisson_general !== undefined) ||
        (!PagePermisson_customer && PagePermisson_customer !== undefined)
    ) {
        return <NoPermissionComp />;
    }
    return (
        <div>
            <h1 className="pageTitle">Favorite Detail</h1>
            <section className=" px-10 py-10 bg-white rounded-lg shadow-lg">
                <ul className="w-full flex flex-wrap mb-10">
                    <li className="w-full mb-2">
                        <h3 className=" text-ThemeRed">PROPERTY</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">Type</p>
                        <h3 className="main_text">Parking</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">Class</p>
                        <h3 className="main_text">Common</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">Project</p>
                        <h3 className="main_text">Lorem ipsum</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">Tower</p>
                        <h3 className="main_text">Tower 1</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">Floor</p>
                        <h3 className="main_text">3rd Floor</h3>
                    </li>
                </ul>

                <ul className="w-full flex flex-wrap mb-10">
                    <li className="w-full mb-2">
                        <h3 className=" text-ThemeRed">CUSTOMER</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">CLASS</p>
                        <h3 className="main_text">Owner</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">NAME</p>
                        <h3 className="main_text">Juan Dela Cruz</h3>
                    </li>
                </ul>

                <ul className="w-full flex flex-wrap">
                    <li className="w-full mb-2">
                        <h3 className=" text-ThemeRed">REPORT</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">MODE OF PAYMENT</p>
                        <h3 className="main_text">Cash</h3>
                    </li>
                    <li className={detailContainer}>
                        <p className="label_text">RECEIPT TYPE</p>
                        <h3 className="main_text">Official Receipt</h3>
                    </li>
                </ul>
            </section>
        </div>
    );
}
