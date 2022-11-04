import AppContext from "./AppContext";
import { useState } from "react";
import type { customer } from "../../types/customerList";

type AppProvider = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: AppProvider) {
    const [createCorporate, setCreateCorporate] = useState({
        logo: undefined,
        name: "",
        tin: "",
        branch_code: undefined,
        gst_type: "VAT",
        rdo_no: undefined,
        sec_registration_no: undefined,
        email: "",
        contact_no: undefined,
        alt_email: "",
        alt_contact_no: undefined,
        address_unit_floor: undefined,
        address_building: "",
        address_street: "",
        address_district: undefined,
        address_municipal_city: "",
        address_province: "",
        address_zip_code: undefined,
    });

    const [modifyCorporate, setModifyCorporate] = useState({
        id: 0,
        logo: undefined,
        name: "",
        tin: "",
        branch_code: undefined,
        gst_type: "VAT",
        rdo_no: undefined,
        sec_registration_no: undefined,
        email: "",
        contact_no: undefined,
        alt_email: "",
        alt_contact_no: undefined,
        address_unit_floor: undefined,
        address_building: "",
        address_street: "",
        address_district: undefined,
        address_municipal_city: "",
        address_province: "",
        address_zip_code: undefined,
        _method: "PUT",
    });

    const [isNewCustomer, setNewCustomer] = useState<customer>({
        assigned_customer_id: "",
        portal_id: "",
        class: "",
        type: "",
        name: "",
        individual_co_owner: "",
        individual_citizenship: "",
        individual_birth_date: "",
        company_contact_person: "",
        tin: "",
        branch_code: "",
        registered_address_unit_floor: "",
        registered_address_building: "",
        registered_address_street: "",
        registered_address_district: "",
        registered_address_municipal_city: "",
        registered_address_province: "",
        registered_address_zip_code: "",
        mailing_address_unit_floor: "",
        mailing_address_building: "",
        mailing_address_street: "",
        mailing_address_district: "",
        mailing_address_municipal_city: "",
        mailing_address_province: "",
        mailing_address_zip_code: "",
        image_photo: "",
        image_valid_id: "",
        image_signature: "",
        contact_no: "",
        registered_email: "",
        preferred_email: "",
        status: "",
        unit_codes: [],
    });
    const [isModifyCustomer, setModifyCustomer] = useState<customer>({
        ...isNewCustomer,
        _method: "PUT",
    });

    const emptyCorporate = () => {
        setCreateCorporate({
            logo: undefined,
            name: "",
            tin: "",
            branch_code: undefined,
            gst_type: "VAT",
            rdo_no: undefined,
            sec_registration_no: undefined,
            email: "",
            contact_no: undefined,
            alt_email: "",
            alt_contact_no: undefined,
            address_unit_floor: undefined,
            address_building: "",
            address_street: "",
            address_district: undefined,
            address_municipal_city: "",
            address_province: "",
            address_zip_code: undefined,
        });
        setModifyCorporate({
            id: 0,
            logo: undefined,
            name: "",
            tin: "",
            branch_code: undefined,
            gst_type: "VAT",
            rdo_no: undefined,
            sec_registration_no: undefined,
            email: "",
            contact_no: undefined,
            alt_email: "",
            alt_contact_no: undefined,
            address_unit_floor: undefined,
            address_building: "",
            address_street: "",
            address_district: undefined,
            address_municipal_city: "",
            address_province: "",
            address_zip_code: undefined,
            _method: "PUT",
        });
    };

    const emptyCustomer = () => {
        setNewCustomer({
            assigned_customer_id: "",
            portal_id: "",
            class: "",
            type: "",
            name: "",
            individual_co_owner: "",
            individual_citizenship: "",
            individual_birth_date: "",
            company_contact_person: "",
            tin: "",
            branch_code: "",
            registered_address_unit_floor: "",
            registered_address_building: "",
            registered_address_street: "",
            registered_address_district: "",
            registered_address_municipal_city: "",
            registered_address_province: "",
            registered_address_zip_code: "",
            mailing_address_unit_floor: "",
            mailing_address_building: "",
            mailing_address_street: "",
            mailing_address_district: "",
            mailing_address_municipal_city: "",
            mailing_address_province: "",
            mailing_address_zip_code: "",
            image_photo: "",
            image_valid_id: "",
            image_signature: "",
            contact_no: "",
            registered_email: "",
            preferred_email: "",
            status: "",
            unit_codes: [],
        });
    };
    const [CorpTableRows, setCorpTableRows] = useState<number>(5);
    const [TableRows, setTableRows] = useState<number>(10);
    const [corpColumn, setCorpColumn] = useState([
        "ID",
        "Name",
        "Address",
        "TIN",
        "Contact no.",
        "Email",
    ]);
    const [cusTableColumn, setCusTableColumn] = useState([
        "Class",
        "Mobile",
        "Email",
        "Status",
    ]);
    const [cusFilterColumn, setCusFilterColumn] = useState([
        "Class",
        "Mobile",
        "Email",
        "Status",
        "Spouse",
        "Citizenship",
        "Birth Date",
        "Contact Person",
        "Property",
        "TIN",
        "Branch Code",
        "Type",
    ]);
    const ImgUrl = "https://boroughcrest-api.lws.codes/get-img?image=";

    const [isDraft, setDraft] = useState(false);

    const [isSearchBar, setSearchBar] = useState("");
    return (
        <AppContext.Provider
            value={{
                createCorporate,
                setCreateCorporate,
                CorpTableRows,
                setCorpTableRows,
                TableRows,
                setTableRows,
                emptyCorporate,
                modifyCorporate,
                setModifyCorporate,
                corpColumn,
                setCorpColumn,
                cusTableColumn,
                setCusTableColumn,
                isSearchBar,
                setSearchBar,
                setNewCustomer,
                isNewCustomer,
                emptyCustomer,
                cusFilterColumn,
                setCusFilterColumn,
                ImgUrl,
                isModifyCustomer,
                setModifyCustomer,
                setDraft,
                isDraft,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
