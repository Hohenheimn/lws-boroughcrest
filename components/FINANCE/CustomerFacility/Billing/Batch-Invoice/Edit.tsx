import React, { useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";
import { customer } from "../../../../../types/customerList";
import ModalTemp from "../../../../Reusable/ModalTemp";
import GroupForm, { CustomerGroup } from "./GroupForm";
import { ShowGroup } from "./Query";

type Props = {
    typeBatchForm: string;
    id: number;
    toggle: Function;
};

export default function EditView({ typeBatchForm, id, toggle }: Props) {
    const { data, isLoading, isError } = ShowGroup(id);
    let customerGroup: CustomerGroup[] = [];

    const [isGroupName, setGroupName] = useState("");
    useEffect(() => {
        if (!isLoading && !isError) {
            setGroupName(data?.data.name);
        }
    }, [data?.data, id, typeBatchForm]);

    if (isLoading) {
        return (
            <ModalTemp>
                <div className="pageDetail">
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

    if (isError) {
        return (
            <ModalTemp>
                <div className="pageDetail">
                    <h1>Something is wrong!</h1>
                </div>
            </ModalTemp>
        );
    }
    return (
        <>
            <GroupForm
                toggle={toggle}
                externalDefaultValue={data?.data?.customers.map(
                    (item: customer) => {
                        return {
                            select: true,
                            id: item.id,
                            name: item.name,
                            email: item.preferred_email,
                            class: item.class,
                        };
                    }
                )}
                formType={"edit"}
                id={id}
                groupName={isGroupName}
            />
        </>
    );
}
