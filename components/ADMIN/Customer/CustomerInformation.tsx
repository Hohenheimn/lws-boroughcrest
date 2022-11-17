import React from "react";
import { customer, customerItemDetail } from "../../../types/customerList";

export default function CustomerInformation({
    itemDetail,
}: customerItemDetail) {
    return (
        <ul className="flex flex-wrap">
            <li className=" w-full">
                <h1 className=" font-NHU-bold text-[24px] mb-5">
                    Contact Information
                </h1>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">MOBILE</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {itemDetail?.contact_no}
                </h4>
            </li>
            {itemDetail?.type !== "Company" && (
                <>
                    <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            CO-OWNER
                        </p>
                        <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                            {itemDetail?.individual_co_owner}
                        </h4>
                    </li>
                    <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                        <p className=" text-gray-400 1024px:text-[14px]">
                            BIRTH DATE
                        </p>
                        <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                            {itemDetail?.individual_birth_date}
                        </h4>
                    </li>
                </>
            )}

            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    REGITERED EMAIL
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {itemDetail?.registered_email}
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    PREFERED EMAIL
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {itemDetail?.preferred_email}
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    REGISTERED ADDRESS
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {itemDetail?.registered_address_street},{" "}
                    {itemDetail?.registered_address_building},{" "}
                    {itemDetail?.registered_address_district},{" "}
                    {itemDetail?.registered_address_municipal_city},{" "}
                    {itemDetail?.registered_address_province},{" "}
                    {itemDetail?.registered_address_zip_code}
                </h4>
            </li>
            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">
                    MAILING ADDRESS
                </p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {itemDetail?.mailing_address_street !== "null"
                        ? itemDetail?.mailing_address_street + ", "
                        : ""}

                    {itemDetail?.mailing_address_building !== "null"
                        ? itemDetail?.mailing_address_building + ", "
                        : ""}

                    {itemDetail?.mailing_address_district !== "null"
                        ? itemDetail?.mailing_address_district + ", "
                        : ""}

                    {itemDetail?.mailing_address_municipal_city !== "null"
                        ? itemDetail?.mailing_address_municipal_city + ", "
                        : ""}

                    {itemDetail?.mailing_address_province !== "null"
                        ? itemDetail?.mailing_address_province + ", "
                        : ""}

                    {itemDetail?.mailing_address_zip_code !== "null"
                        ? itemDetail?.mailing_address_zip_code
                        : ""}
                </h4>
            </li>
        </ul>
    );
}
