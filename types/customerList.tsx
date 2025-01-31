export type customerItemDetail = {
    itemDetail?: customer;
    isNewCustomer?: customer;
    PermissionValidationView?: any;
};

export type customer = {
    id?: number;
    assigned_customer_id: string;
    portal_id: string;
    class: string;
    type: string;
    name: string;
    individual_co_owner: string;
    individual_citizenship: string;
    individual_birth_date: string;
    company_contact_person: string;
    tin: string;
    branch_code: string;
    registered_address_unit_floor: string;
    registered_address_building: string;
    registered_address_street: string;
    registered_address_district: string;
    registered_address_municipal_city: string;
    registered_address_province: string;
    registered_address_zip_code: string;
    mailing_address_unit_floor: string;
    mailing_address_building: string;
    mailing_address_street: string;
    mailing_address_district: string;
    mailing_address_municipal_city: string;
    mailing_address_province: string;
    mailing_address_zip_code: string;
    image_photo: string;
    image_valid_id: string;
    image_signature: string;
    contact_no: string;
    registered_email: string;
    preferred_email: string;
    status: string;
    unit_codes: [];
    properties: [];
    user: {
        id: number;
        portal_id: string;
    };
    _method?: "PUT";
};
