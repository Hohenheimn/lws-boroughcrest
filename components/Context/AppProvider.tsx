import AppContext from "./AppContext";
import { useState, useReducer } from "react";

type AppProvider = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: AppProvider) {
    const [collapseSide, setCollapseSide] = useState(false);
    const [togglePrompt, setPrompt] = useState({
        message: "",
        type: "",
        toggle: false,
    });

    const [corpToggle, setCorpToggle] = useState(false);
    const [corpReset, setCorpReset] = useState(false);
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

    // Customer Context
    const [isType, setType] = useState<string>("");
    const [cusProfileUrl, setCusProfileUrl] = useState(
        "/Images/sampleProfile.png"
    );
    const [cusValidIDUrl, setCusValidIDUrl] = useState("/Images/id-sample.png");
    const [cusSignature, setCusSignature] = useState(false);

    const [cusToggle, setCusToggle] = useState(false);
    const [cusReset, setCusReset] = useState(false);
    const NewCustomerDefault = {
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
    const [isNewCustomer, setNewCustomer] = useState({
        ...NewCustomerDefault,
    });
    const [isModifyCustomer, setModifyCustomer] = useState({
        ...NewCustomerDefault,
        _method: "PUT",
    });

    const [isDraft, setDraft] = useState({
        ...NewCustomerDefault,
        _method: "PUT",
    });

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
    // User
    const [newUserToggle, setNewUserToggle] = useState(false);
    const [userTableRows, usersetTableRows] = useState<number>(10);
    const [userTableColumn, setUserTableColumn] = useState([
        "Department",
        "Employee ID",
        "Email",
        "Mobile",
        "Role",
        "Status",
    ]);
    const userColumnList = [
        "Department",
        "Employee ID",
        "Email",
        "Mobile",
        "Role",
        "Status",
    ];
    // Property
    const [newPropToggle, setNewPropToggle] = useState(false);
    const [propTableRows, setPropTableRows] = useState<number>(10);
    const propList = [
        "Unit Code",
        "Project",
        "Developer",
        "Tower",
        "Floor",
        "Class",
        "Type",
        "Turn Over",
        "Owner",
    ];
    const [propTableColumn, setPropTableColumn] = useState(propList);

    // Img Base Url
    const ImgUrl = "https://boroughcrest-api.lws.codes/get-img?image=";

    const [isSearchBar, setSearchBar] = useState("");
    return (
        <AppContext.Provider
            value={{
                createCorporate,
                setCreateCorporate,
                corpReset,
                setCorpReset,
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
                cusReset,
                setCusReset,
                cusProfileUrl,
                setCusProfileUrl,
                cusValidIDUrl,
                setCusValidIDUrl,
                cusSignature,
                setCusSignature,
                isType,
                setType,
                collapseSide,
                setCollapseSide,
                propTableRows,
                setPropTableRows,
                setPropTableColumn,
                propTableColumn,
                userColumnList,
                propList,
                newUserToggle,
                setNewUserToggle,
                newPropToggle,
                setNewPropToggle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
