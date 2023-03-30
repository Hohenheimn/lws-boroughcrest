import React, { useState } from "react";
import { batchForm } from "./BatchForm";
import GroupForm from "./GroupForm";
import Modify from "./Modify";
import SelectGroup from "./SelectGroup";
import View from "./View";

type Props = {
    toggle: Function;
    setArray: Function;
    isArray: batchForm[];
    id: number | boolean;
};

export default function SelectAndFormGroup({
    toggle,
    setArray,
    isArray,
    id,
}: Props) {
    const [typeBatchForm, setTypBatchForm] = useState("");
    const [isEditID, setEditID] = useState(0);
    return (
        <>
            {typeBatchForm === "" && (
                <SelectGroup
                    toggle={toggle}
                    setArray={setArray}
                    isArray={isArray}
                    id={id}
                    setTypBatchForm={setTypBatchForm}
                    setEditID={setEditID}
                />
            )}
            {typeBatchForm === "add" && (
                <GroupForm
                    id={isEditID}
                    toggle={setTypBatchForm}
                    formType={typeBatchForm}
                    externalDefaultValue={[]}
                    groupName={""}
                />
            )}
            {typeBatchForm === "edit" && <Modify />}
            {typeBatchForm === "view" && <View />}
        </>
    );
}
