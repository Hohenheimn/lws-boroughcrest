import AppContext from "./AppContext";
import { useState } from "react";
import type { customer } from "../../types/customerList";

type AppProvider = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: AppProvider) {
    const [togglePrompt, setPrompt] = useState({
        message: "",
        type: "",
        toggle: false,
    });
    const [corpToggle, setCorpToggle] = useState(false);
    const DefaultCorporate = {
        logo: "",
        name: "",
        tin: "",
        branch_code: "",
        gst_type: "VAT",
        rdo_no: "",
        sec_registration_no: "",
        email: "",
        contact_no: "",
        alt_email: "",
        alt_contact_no: "",
        address_unit_floor: "",
        address_building: "",
        address_street: "",
        address_district: "",
        address_municipal_city: "",
        address_province: "",
        address_zip_code: "",
    };
    const [createCorporate, setCreateCorporate] = useState({
        ...DefaultCorporate,
    });
    const [modifyCorporate, setModifyCorporate] = useState({
        id: 0,
        ...DefaultCorporate,
        _method: "PUT",
    });
    const [cusToggle, setCusToggle] = useState(false);
    const NewCustomerDefault: customer = {
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
    };
    const [isNewCustomer, setNewCustomer] = useState<customer>({
        ...NewCustomerDefault,
    });
    const [isModifyCustomer, setModifyCustomer] = useState<customer>({
        ...NewCustomerDefault,
        _method: "PUT",
    });

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
    const [CorpTableRows, setCorpTableRows] = useState<number>(10);
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
    const [TableRows, setTableRows] = useState<number>(10);
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
    const [userTableRows, usersetTableRows] = useState<number>(10);
    const [userTableColumn, setUserTableColumn] = useState([
        "Department",
        "Employee ID",
        "Email",
        "Mobile",
        "Role",
        "Status",
    ]);
    const [propTableRows, userPropTableRows] = useState<number>(10);
    const [propTableColumn, setPropTableColumn] = useState([
        "Unit Code",
        "Project",
        "Developer",
        "Tower",
        "Floor",
        "Class",
        "Type",
        "Turn Over",
        "Owner",
    ]);
    const propList = {
        ...propTableColumn,
    };

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
                DefaultCorporate,
                corpToggle,
                setCorpToggle,
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
                NewCustomerDefault,
                cusFilterColumn,
                setCusFilterColumn,
                ImgUrl,
                isModifyCustomer,
                setModifyCustomer,
                setDraft,
                isDraft,
                userTableRows,
                usersetTableRows,
                userTableColumn,
                setUserTableColumn,
                togglePrompt,
                setPrompt,
                cusToggle,
                setCusToggle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
