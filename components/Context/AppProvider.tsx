import AppContext from "./AppContext";
import { useState } from "react";

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
    });

    const [isNewCustomer, setNewCustomer] = useState({
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
        });
    };

    const [TableRows, setTableRows] = useState<number>(5);
    const [corpColumn, setCorpColumn] = useState([
        "ID",
        "Name",
        "Address",
        "TIN",
        "Contact no.",
        "Email",
    ]);
    const [cusColumn, setCusColumn] = useState([
        "ID",
        "Class",
        "Name",
        "Mobile",
        "Email",
        "Status",
    ]);
    const [isSearchBar, setSearchBar] = useState("");
    return (
        <AppContext.Provider
            value={{
                createCorporate,
                setCreateCorporate,
                TableRows,
                setTableRows,
                emptyCorporate,
                modifyCorporate,
                setModifyCorporate,
                corpColumn,
                setCorpColumn,
                cusColumn,
                setCusColumn,
                isSearchBar,
                setSearchBar,
                setNewCustomer,
                isNewCustomer,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
