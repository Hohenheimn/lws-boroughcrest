import React, { useEffect } from "react";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

import { customer } from "../../../../types/customerList";
import { GetCustomer } from "../../../ReactQuery/CustomerMethod";
import ModalTemp from "../../../Reusable/ModalTemp";
import CustomerForm from "./CustomerForm";

export default function ModifyCustomer() {
    const router = useRouter();

    const id =
        router.query.draft === undefined ? router.query.id : router.query.draft;

    const { isLoading, data, isError } = GetCustomer(id);

    const CustomerDetail: customer = data?.data;

    const BirthDate: any = parse(
        CustomerDetail?.individual_birth_date,
        "yyyy-MM-dd",
        new Date()
    );

    let Contact: any = CustomerDetail.contact_no
        ? CustomerDetail.contact_no
        : "";

    const first = Contact[0];
    if (first === 0 || first === "0") {
        Contact = Contact.replace(first, "");
    }

    const isDefaultValue = {
        class: CustomerDetail?.class === null ? "" : CustomerDetail?.class,
        type: CustomerDetail?.type === null ? "" : CustomerDetail?.type,
        name: CustomerDetail?.name === null ? "" : CustomerDetail?.name,
        individual_co_owner:
            CustomerDetail?.individual_co_owner === null
                ? ""
                : CustomerDetail?.individual_co_owner,
        individual_citizenship:
            CustomerDetail?.individual_citizenship === null
                ? ""
                : CustomerDetail?.individual_citizenship,
        individual_birth_date:
            CustomerDetail?.individual_birth_date === null
                ? ""
                : isValid(BirthDate)
                ? format(BirthDate, "MMM dd yyyy")
                : "",
        company_contact_person:
            CustomerDetail?.company_contact_person === null
                ? ""
                : CustomerDetail?.company_contact_person,
        tin:
            CustomerDetail?.tin === null
                ? ""
                : CustomerDetail?.tin.replaceAll("-", ""),
        branch_code:
            CustomerDetail?.branch_code === null
                ? ""
                : CustomerDetail?.branch_code,
        portal_id:
            CustomerDetail?.user?.portal_id === null ||
            CustomerDetail?.user?.portal_id === undefined
                ? ""
                : CustomerDetail?.user?.portal_id,
        registered_address_unit_floor:
            CustomerDetail?.registered_address_unit_floor === null
                ? ""
                : CustomerDetail?.registered_address_unit_floor,
        registered_address_building:
            CustomerDetail?.registered_address_building === null
                ? ""
                : CustomerDetail?.registered_address_building,
        registered_address_street:
            CustomerDetail?.registered_address_street === null
                ? ""
                : CustomerDetail?.registered_address_street,
        registered_address_district:
            CustomerDetail?.registered_address_district === null
                ? ""
                : CustomerDetail?.registered_address_district,
        registered_address_municipal_city:
            CustomerDetail?.registered_address_municipal_city === null
                ? ""
                : CustomerDetail?.registered_address_municipal_city,
        registered_address_province:
            CustomerDetail?.registered_address_province === null
                ? ""
                : CustomerDetail?.registered_address_province,
        registered_address_zip_code:
            CustomerDetail?.registered_address_zip_code === null
                ? ""
                : CustomerDetail?.registered_address_zip_code,
        mailing_address_unit_floor:
            CustomerDetail?.mailing_address_unit_floor === null
                ? ""
                : CustomerDetail?.mailing_address_unit_floor,
        mailing_address_building:
            CustomerDetail?.mailing_address_building === null
                ? ""
                : CustomerDetail?.mailing_address_building,
        mailing_address_street:
            CustomerDetail?.mailing_address_street === null
                ? ""
                : CustomerDetail?.mailing_address_street,
        mailing_address_district:
            CustomerDetail?.mailing_address_district === null
                ? ""
                : CustomerDetail?.mailing_address_district,
        mailing_address_municipal_city:
            CustomerDetail?.mailing_address_municipal_city === null
                ? ""
                : CustomerDetail?.mailing_address_municipal_city,
        mailing_address_province:
            CustomerDetail?.mailing_address_province === null
                ? ""
                : CustomerDetail?.mailing_address_province,
        mailing_address_zip_code:
            CustomerDetail?.mailing_address_zip_code === null
                ? ""
                : CustomerDetail?.mailing_address_zip_code,
        image_photo: null,
        image_photo_url:
            CustomerDetail?.image_photo === null
                ? ""
                : "https://boroughcrest-api.lws.codes/get-img?image=" +
                  CustomerDetail?.image_photo,
        image_valid_id: null,
        image_valid_id_url:
            CustomerDetail?.image_valid_id === null
                ? ""
                : "https://boroughcrest-api.lws.codes/get-img?image=" +
                  CustomerDetail?.image_valid_id,
        image_signature: null,
        image_signature_url:
            CustomerDetail?.image_signature === null
                ? ""
                : "https://boroughcrest-api.lws.codes/get-img?image=" +
                  CustomerDetail?.image_signature,
        contact_no: Contact,
        registered_email:
            CustomerDetail?.registered_email === null
                ? ""
                : CustomerDetail?.registered_email,
        preferred_email:
            CustomerDetail?.preferred_email === null
                ? ""
                : CustomerDetail?.preferred_email,
        status: CustomerDetail?.status,
        unit_codes: CustomerDetail?.properties.map((item: any) => {
            return {
                name: item?.project?.name,
                id: item.id,
                unit_code: item?.unit_code,
            };
        }),
    };

    if (isLoading) {
        return (
            <ModalTemp>
                <div className="w-full flex justify-center">
                    <BeatLoader
                        color={"#8f384d"}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </ModalTemp>
        );
    }
    return (
        <>
            <CustomerForm DefaultValue={isDefaultValue} />
        </>
    );
}
