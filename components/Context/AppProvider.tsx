import { useState, useReducer } from "react";

import { CustomerFormDefaultValue } from "../ADMIN/Customer/CustomerForm/CustomerForm";
import { LoginUserInfo } from "../HOC/LoginUser/UserInfo";
import AppContext from "./AppContext";

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
        gst_type: "",
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
    const CustomerErrorDefault = {
        class: "",
        contact_no: "",
        name: "",
        registered_address_building: "",
        registered_address_district: "",
        registered_address_municipal_city: "",
        registered_address_province: "",
        registered_address_street: "",
        registered_address_unit_floor: "",
        registered_address_zip_code: "",
        registered_email: "",
        preferred_email: "",
    };
    const [CusError, setCusError] = useState({
        ...CustomerErrorDefault,
    });
    const [cusToggle, setCusToggle] = useState(false);
    const [cusReset, setCusReset] = useState(false);
    const DefaultCustomerFormValue: CustomerFormDefaultValue = {
        class: "",
        type: "",
        name: "",
        individual_co_owner: "",
        individual_citizenship: "",
        individual_birth_date: "",
        company_contact_person: "",
        tin: "",
        branch_code: "",
        portal_id: "",
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
        image_photo: null,
        image_photo_url: "",
        image_valid_id: null,
        image_valid_id_url: "",
        image_signature: null,
        image_signature_url: "",
        contact_no: "",
        registered_email: "",
        preferred_email: "",
        status: true,
        unit_codes: [
            {
                name: "",
                unit_code: "",
                id: 1,
            },
        ],
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
    // Customer
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

    const [isPrint, setPrint] = useState({
        keyword: "",
        page: "",
        limit: "",
        url: "",
    });

    const [userInfo, setUserInfo] = useState();

    const [isSearchBar, setSearchBar] = useState("");

    // recordmeter

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
                cusFilterColumn,
                setCusFilterColumn,
                ImgUrl,
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
                CusError,
                setCusError,
                setPrint,
                isPrint,
                setUserInfo,
                userInfo,
                DefaultCustomerFormValue,
                CustomerErrorDefault,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
