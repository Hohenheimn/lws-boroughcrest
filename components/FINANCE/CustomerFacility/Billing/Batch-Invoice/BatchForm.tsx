import React, { useContext, useState } from "react";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import { MinusButtonTable, PlusButtonTable } from "../../../../Reusable/Icons";
import SelectAndFormGroup from "./SelectAndFormGroup";
import { CreateUpdateBatchInvoice } from "./Query";
import AppContext from "../../../../Context/AppContext";
import { useQuery, useQueryClient } from "react-query";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/router";
import { TextFieldValidation } from "../../../../Reusable/InputField";

export type batchForm = {
    id: number;
    backend_id: number | null;
    charge_id: string | number;
    charge: string;
    description: string;
    application: {
        name: string;
        id: number;
    }[];
};

type Props = {
    DefaultValue: batchForm[];
};

export default function BatchForm({ DefaultValue }: Props) {
    const [isDefault, setDefault] = useState<batchForm[]>(DefaultValue);
    const [selectedID, setSelectedID] = useState<boolean | number>(false);
    const { setPrompt } = useContext(AppContext);
    const queryClient = useQueryClient();
    const router = useRouter();

    const onSuccess = () => {
        queryClient.invalidateQueries(["batch-invoice-list"]);
        if (router.query.modify !== undefined) {
            router.push("/finance/customer-facility/billing/batch-invoice");
        }
        setPrompt({
            message: `Batch invoice successfully ${
                router.query.modify !== undefined ? "updated" : "registered"
            }`,
            type: "success",
            toggle: true,
        });
        setDefault([
            {
                id: 0,
                backend_id: null,
                charge: "",
                charge_id: 0,
                description: "",
                application: [],
            },
        ]);
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading, mutate } = CreateUpdateBatchInvoice(onSuccess, onError);

    const ApplyHandler = () => {
        let validate = true;
        const Payload = isDefault.map((item) => {
            return {
                charge_id: item.charge_id,
                billing_group_ids: item.application.map((item) => item.id),
                description: item.description,
                id: item.backend_id,
            };
        });
        Payload.map((item) => {
            if (item.charge_id === 0 || item.billing_group_ids.length <= 0) {
                validate = false;
                return;
            }
        });
        if (validate) {
            mutate(Payload);
        } else {
            setPrompt({
                type: "draft",
                message: "Fill out all fields",
                toggle: true,
            });
        }
    };

    return (
        <>
            {selectedID !== false && (
                <SelectAndFormGroup
                    isArray={isDefault}
                    setArray={setDefault}
                    id={selectedID}
                    toggle={setSelectedID}
                />
            )}

            <div className="table_container max-half border-b border-gray-300 pb-10 mb-10 1550px:mb-5 1550px:pb-5">
                <table className="table_list forCrud">
                    <thead className="textRed">
                        <tr>
                            {/* <th className="checkbox">
                                <input type="checkbox" />
                            </th> */}
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>APPLICATION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isDefault?.map((item: any, index: number) => (
                            <List
                                key={index}
                                index={index}
                                setDefault={setDefault}
                                itemList={item}
                                isDefault={isDefault}
                                setSelectedID={setSelectedID}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="py-2 flex justify-end">
                <button className="buttonRed" onClick={ApplyHandler}>
                    {isLoading ? (
                        <ScaleLoader color="#fff" height="10px" width="2px" />
                    ) : (
                        "APPLY"
                    )}
                </button>
            </div>
        </>
    );
}

type List = {
    index: number;
    itemList: batchForm;
    setDefault: Function;
    isDefault: batchForm[];
    setSelectedID: Function;
};

const List = ({
    itemList,
    setDefault,
    isDefault,
    index,
    setSelectedID,
}: List) => {
    const AddJournal = () => {
        const random = Math.random();
        setDefault((temp: any) => [
            ...temp,
            {
                id: random,
                backend_id: null,
                charge: "",
                charge_id: 0,
                description: "",
                application: [],
            },
        ]);
    };
    const RemoveJournal = () => {
        setDefault((item: any[]) =>
            item.filter((x: any) => x.id !== itemList.id)
        );
    };
    const updateValue = (key: string, e: any) => {
        const newItems = isDefault.map((item: batchForm) => {
            if (itemList.id == item.id) {
                if (key === "charge") {
                    return {
                        ...item,
                        charge: e.target.innerHTML,
                        charge_id: e.target.getAttribute("data-id"),
                        description: e.target.getAttribute("data-description"),
                    };
                } else if (key === "description") {
                    return {
                        ...item,
                        description: e.target.value,
                    };
                }
            }
            return item;
        });
        setDefault(newItems);
    };
    return (
        <tr>
            {/* <td className="checkbox">
                <input type="checkbox" />
            </td> */}
            <td className="flex items-center">
                <DropDownCharge
                    UpdateStateHandler={updateValue}
                    itemDetail={itemList}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field w-full"
                    value={itemList.description}
                    onChange={(e) => {
                        if (!TextFieldValidation(e, 50)) return;
                        updateValue("description", e);
                    }}
                />
            </td>
            <td>
                <input
                    type="text"
                    readOnly
                    className=" bg-ThemeRed text-white text-center cursor-pointer"
                    value={
                        itemList.application.length <= 0
                            ? "SELECT GROUP"
                            : itemList?.application.map((item, index) =>
                                  itemList.application.length - 1 === index
                                      ? item.name
                                      : item.name + " "
                              )
                    }
                    onClick={() => setSelectedID(itemList.id)}
                />
            </td>
            <td className="actionIcon">
                {isDefault.length > 1 && (
                    <div onClick={RemoveJournal}>
                        <MinusButtonTable />
                    </div>
                )}
                {isDefault.length - 1 === index && (
                    <div className="ml-5 1024px:ml-2" onClick={AddJournal}>
                        <PlusButtonTable />
                    </div>
                )}
            </td>
        </tr>
    );
};
