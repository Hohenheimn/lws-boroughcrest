import AppContext from "./AppContext";
import { useState } from "react";

type AppProvider = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: AppProvider) {
    const [toggleNewForm, setToggleNewForm] = useState(false);
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
    };

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

    const [TableRows, setTableRows] = useState<number>(10);
    return (
        <AppContext.Provider
            value={{
                toggleNewForm,
                setToggleNewForm,
                createCorporate,
                setCreateCorporate,
                TableRows,
                setTableRows,
                emptyCorporate,
                modifyCorporate,
                setModifyCorporate,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
