import React, { useEffect } from "react";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { useRouter } from "next/router";
import { ShowFavorite } from "../../../../components/FINANCE/reports/Query";
import { BeatLoader } from "react-spinners";

const detailContainer =
    "w-1/5 pr-1 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2";

export type FavoriteDetail = {
    created_at: string;
    id: number;
    report_name: string;
    updated_at: string;
    user_id: number;
    columns: any[];
};

export default function FavoriteDetailPage() {
    const PagePermisson_customer = PageAccessValidation("Customer Reports");

    const PagePermisson_general = PageAccessValidation("General Reports");

    const router = useRouter();

    const id: any = router.query.id;

    const { data, isLoading } = ShowFavorite(id);

    // Property
    const Type = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_type"
    )[0]?.value;

    const Class = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_class"
    )[0]?.value;

    const Project = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_project"
    )[0]?.value;

    const Tower = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_tower"
    )[0]?.value;

    const Floor = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "property_floor"
    )[0]?.value;

    // Customer
    const customer_class = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "customer_class"
    )[0]?.value;

    const name = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "customer_name"
    )[0]?.value;

    // Reports
    const mode_of_payment = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "report_mode_of_payment"
    )[0]?.value;

    const receipt_type = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "report_receipt_type"
    )[0]?.value;

    const charge = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "report_charge"
    )[0]?.value;

    const memo_type = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "report_memo_type"
    )[0]?.value;

    const account = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "report_account"
    )[0]?.value;

    useEffect(() => {
        console.log(data?.data);
    }, [data?.data]);

    //Document
    const document_type = data?.data.columns.filter(
        (itemFilter: any) => itemFilter.label === "document_type"
    )[0]?.value;

    if (
        (!PagePermisson_general && PagePermisson_general !== undefined) ||
        (!PagePermisson_customer && PagePermisson_customer !== undefined)
    ) {
        return <NoPermissionComp />;
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

    return (
        <div>
            <h1 className="pageTitle">Favorite Detail</h1>
            <section className=" px-10 py-10 bg-white rounded-lg shadow-lg">
                <ul className="w-full flex flex-wrap mb-10">
                    <li className="w-full mb-2">
                        <h3 className=" text-ThemeRed">PROPERTY</h3>
                    </li>
                    {Type !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">Type</p>
                            <h3 className="main_text">
                                {Type?.map((itemMap: string, index: number) =>
                                    index === Type.length - 1
                                        ? itemMap
                                        : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {Class !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">Class</p>
                            <h3 className="main_text">
                                {Class?.map((itemMap: string, index: number) =>
                                    index === Class.length - 1
                                        ? itemMap
                                        : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {Project !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">Project</p>
                            <h3 className="main_text">
                                {Project?.map((itemMap: any, index: number) =>
                                    index === Project.length - 1
                                        ? itemMap.name
                                        : itemMap.name + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {Tower !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">Tower</p>
                            <h3 className="main_text">
                                {Tower?.map((itemMap: any, index: number) =>
                                    index === Tower.length - 1
                                        ? itemMap.name
                                        : itemMap.name + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {Floor !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">Floor</p>
                            <h3 className="main_text">
                                {Floor?.map((itemMap: any, index: number) =>
                                    index === Floor.length - 1
                                        ? itemMap.name
                                        : itemMap.name + ", "
                                )}
                            </h3>
                        </li>
                    )}
                </ul>

                <ul className="w-full flex flex-wrap mb-10">
                    <li className="w-full mb-2">
                        <h3 className=" text-ThemeRed">CUSTOMER</h3>
                    </li>
                    {customer_class !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">CLASS</p>
                            <h3 className="main_text">
                                {customer_class?.map(
                                    (itemMap: any, index: number) =>
                                        index === customer_class.length - 1
                                            ? itemMap
                                            : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {name !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">NAME</p>
                            <h3 className="main_text">{name}</h3>
                        </li>
                    )}
                </ul>

                <ul className="w-full flex flex-wrap">
                    <li className="w-full mb-2">
                        <h3 className=" text-ThemeRed">REPORT</h3>
                    </li>
                    {account !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">ACCOUNT</p>
                            <h3 className="main_text">
                                {account?.map((itemMap: any, index: number) =>
                                    index === account.length - 1
                                        ? itemMap.name
                                        : itemMap.name + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {charge !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">CHARGE</p>
                            <h3 className="main_text">
                                {charge?.map((itemMap: any, index: number) =>
                                    index === charge.length - 1
                                        ? itemMap.name
                                        : itemMap.name + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {memo_type !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">MEMO TYPE</p>
                            <h3 className="main_text">
                                {memo_type?.map((itemMap: any, index: number) =>
                                    index === memo_type.length - 1
                                        ? itemMap
                                        : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {mode_of_payment !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">MODE OF PAYMENT</p>
                            <h3 className="main_text">
                                {mode_of_payment?.map(
                                    (itemMap: any, index: number) =>
                                        index === mode_of_payment.length - 1
                                            ? itemMap
                                            : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {receipt_type !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">RECEIPT TYPE</p>
                            <h3 className="main_text">
                                {receipt_type?.map(
                                    (itemMap: any, index: number) =>
                                        index === receipt_type.length - 1
                                            ? itemMap
                                            : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                    {document_type !== undefined && (
                        <li className={detailContainer}>
                            <p className="label_text">DOCUMENT TYPE</p>
                            <h3 className="main_text">
                                {document_type?.map(
                                    (itemMap: any, index: number) =>
                                        index === document_type.length - 1
                                            ? itemMap
                                            : itemMap + ", "
                                )}
                            </h3>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    );
}
