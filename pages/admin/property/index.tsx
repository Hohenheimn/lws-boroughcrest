import React, { useContext, useState } from "react";
import AppContext from "../../../components/Context/AppContext";
import SearchFilter from "../../../components/SearchFilterNew/SearchFilter";
import PropertyTable from "../../../components/ADMIN/Property/PropertyTable";
import Form from "../../../components/ADMIN/Property/Form";
import { PropertyDefaultValue } from "../../../types/PropertyList";
import {
    PostDraftProperty,
    PostProperty,
} from "../../../components/ReactQuery/PropertyMethod";

export default function Property() {
    const { newPropToggle, setPrompt } = useContext(AppContext);
    const [isSearchTable, setSearchTable] = useState("");

    const DefaultFormData: PropertyDefaultValue = {
        unit_code: "",
        address: "",
        area: "",
        class: "",
        type: "",
        acceptance_date: "",
        turnover_date: "",
        status: "",
        developer_id: "",
        project_id: "",
        tower_id: "",
        floor_id: "",
        project: "",
        tower: "",
        floor: "",
        developer: "",
    };

    const onSuccess = () => {
        setPrompt({
            message: "Property Unit successfully registered!",
            type: "success",
            toggle: true,
        });
    };
    const onError = () => {
        setPrompt({
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        });
    };
    const { mutate: SaveMutate, isLoading: SaveLoading } = PostProperty(
        onSuccess,
        onError
    );
    // Drafft
    const onSuccessDraft = () => {
        setPrompt({
            message: "Property Unit successfully registered as draft!",
            type: "draft",
            toggle: true,
        });
    };
    const { mutate: SaveDraftMutate, isLoading: SaveDraftLoading } =
        PostDraftProperty(onSuccessDraft, onError);

    return (
        <div>
            <SearchFilter
                page="property unit"
                setSearchTable={setSearchTable}
            />
            <PropertyTable isSearchTable={isSearchTable} />
            {newPropToggle && (
                <Form
                    DefaultFormData={DefaultFormData}
                    saveHandler={SaveMutate}
                    saveLoading={SaveLoading}
                    draftHandler={SaveDraftMutate}
                    draftLoading={SaveDraftLoading}
                />
            )}
        </div>
    );
}
