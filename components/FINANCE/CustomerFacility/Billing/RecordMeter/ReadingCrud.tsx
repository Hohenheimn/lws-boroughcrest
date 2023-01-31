import React, { useEffect, useState, useRef, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader, MoonLoader } from "react-spinners";
import { MdSaveAlt } from "react-icons/md";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import { useQueryClient } from "react-query";
import AppContext from "../../../../Context/AppContext";
// Palitin
import {
    DeleteBA,
    GetBA,
    CreateBA,
    UpdateBA,
} from "../../../../ReactQuery/BankAccount";

type Props = {
    isObject: {
        id: string;
        value: string;
        firstVal: string;
        firstID: string;
        toggle: boolean;
    };
    setObject: Function;
};

const ReadingCrud = ({ isObject, setObject }: Props) => {
    const modal = useRef<any>();

    const [isArray, setArray] = useState<any>([]);
    const [isWarning, setWarning] = useState("");

    // Click out side
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                //remove empty array
                setArray((itemList: any) =>
                    itemList.filter((item: any) => item.name !== "")
                );
                // put back to first val and close
                setObject({
                    ...isObject,
                    value: isObject.firstVal,
                    toggle: false,
                });
                // Blank warning
                setWarning("");
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const AddArray = () => {
        setArray([
            ...isArray,
            {
                id: Math.random(),
                displayId: "----",
                column1: "",
                column2: "",
                tagged: "",
            },
        ]);
    };

    const { isLoading, data, isError } = GetBA(isObject.value);

    // Set Data from backend to array of front end
    useEffect(() => {
        if (data?.status === 200) {
            const cloneArray = data?.data.map((item: any) => {
                return {
                    id: item.id,
                    displayId: item.assigned_bank_account_id,
                    column1: item.bank_acc_no,
                    column2: item.bank_branch,
                };
            });
            setArray(cloneArray);
        }
    }, [data]);

    return (
        <div className="crud-container" ref={modal}>
            <table className="crud-table wide">
                <thead>
                    <tr>
                        <th className="text-white">CHARGE</th>
                        <th className="text-white">READING</th>
                        <th className="text-white">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr></tr>
                    ) : (
                        <>
                            {isArray.map((item: any, index: number) => (
                                <List
                                    itemDetail={item}
                                    key={index}
                                    setArray={setArray}
                                    isArray={isArray}
                                    setWarning={setWarning}
                                    isFieldObj={isObject}
                                    setFieldObj={setObject}
                                />
                            ))}
                        </>
                    )}
                </tbody>
            </table>
            {isLoading && (
                <div className="w-full flex justify-center py-3">
                    <BarLoader
                        color={"#8f384d"}
                        height="5px"
                        width="100px"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}
            {isError ||
                (data?.data.length <= 0 && (
                    <div className="w-full flex justify-center py-3">
                        <h1>Bank Account number cannot be found!</h1>
                    </div>
                ))}
            {isWarning !== "" && (
                <p className="text-[12px] text-ThemeRed">{isWarning}</p>
            )}
            <h1
                className="cursor-pointer text-ThemeRed text-[12px] inline-block py-2 hover:underline"
                onClick={AddArray}
            >
                ADD READING
            </h1>
        </div>
    );
};
type List = {
    itemDetail: any;
    setArray: any;
    isArray: any;
    setWarning: any;
    setFieldObj: Function;
    isFieldObj: {
        toggle: boolean;
        id: any;
        value: any;
        firstVal: any;
        firstID: any;
    };
};
const List = ({
    setFieldObj,
    isFieldObj,
    itemDetail,
    setArray,
    isArray,
    setWarning,
}: List) => {
    const [isModify, setModify] = useState(false);
    const clientQuery = useQueryClient();
    const { setPrompt } = useContext(AppContext);

    // Auto editable field when add row
    useEffect(() => {
        if (itemDetail.column1 === "") {
            setModify(true);
        }
    }, [itemDetail.column1]);
    // Toggle Modify Button
    const Edit = () => {
        setModify(!isModify);
    };

    // Get Selected Data
    const Selected = (id: string | number, name: string) => {
        setFieldObj({
            ...isFieldObj,
            id: id,
            value: name,
            firstVal: name,
            firstID: id,
            toggle: false,
        });
    };

    // Functions // Edit Array from front end
    const ModifyArray = (event: any, type: string) => {
        const newItems = isArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (type === "column1") {
                    return {
                        ...item,
                        column1: event.target.value,
                    };
                }
                if (type === "column2") {
                    return {
                        ...item,
                        column2: event.target.value,
                    };
                }
            }
            return item;
        });
        setArray(newItems);
    };

    // Mutation
    const onSuccessSave = () => {
        clientQuery.invalidateQueries("get-bank-account");
        setPrompt({
            message: "Reading successfully registered!",
            type: "success",
            toggle: true,
        });
    };
    const onSuccessDelete = () => {
        clientQuery.invalidateQueries("get-bank-account");
        setPrompt({
            message: "Reading successfully deleted!",
            type: "success",
            toggle: true,
        });
    };
    const onSuccessUpdate = () => {
        clientQuery.invalidateQueries("get-bank-account");
        setPrompt({
            message: "Reading successfully Updated!",
            type: "success",
            toggle: true,
        });
    };
    const onError = () => {
        setWarning("Reading has already been registered");
        setPrompt({
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        });
    };
    // Save
    const { isLoading: loadingSave, mutate: mutateSave } = CreateBA(
        onSuccessSave,
        onError
    );
    // Delete
    const { isLoading: loadingDelete, mutate: mutateDelete } = DeleteBA(
        onSuccessDelete,
        onError
    );
    // Update
    const { isLoading: loadingUpdate, mutate: mutateUpdate } = UpdateBA(
        onSuccessUpdate,
        onError,
        itemDetail.id
    );

    const Save = () => {
        // prevent here the function if field is empty
        if (itemDetail.column1 === "" && itemDetail.column2 === "") {
            setWarning("Cannot save with empty Charge and Reading");
            return;
        }
        setModify(!isModify);
        setWarning("");
        const Payload = {
            charge_id: itemDetail.displayId,
            reading: itemDetail.column2,
        };
        console.log(Payload);

        // if (itemDetail.displayId === "----") {
        //     mutateSave(Payload);
        // } else {
        //     mutateUpdate(Payload);
        // }
    };
    const Delete = () => {
        if (itemDetail.displayId === "----") {
            // Only delete from array
            setArray((item: any[]) =>
                item.filter((x: { id: any }) => x.id !== itemDetail.id)
            );
        } else {
            // Delete from API
            mutateDelete(itemDetail.id);

            // Check if selected item will be delete then, it will reset the select item back to blank
            if (itemDetail.id === isFieldObj.id) {
                setFieldObj({
                    id: "",
                    value: "",
                    firstVal: "",
                    firstID: "",
                });
            }
        }
    };
    return (
        <tr
            className={`cursor-pointer container ${
                isFieldObj.id === itemDetail.id ? "active" : ""
            }`}
        >
            <td
                onClick={(e) =>
                    !isModify && Selected(itemDetail.id, itemDetail.column2)
                }
                className="bg-hover"
            >
                <input
                    type="text"
                    className={`${!isModify && "disabled"}`}
                    value={itemDetail.column1}
                    onChange={(e) => ModifyArray(e, "column1")}
                />
            </td>
            <td
                onClick={(e) =>
                    !isModify && Selected(itemDetail.id, itemDetail.column2)
                }
                className="bg-hover"
            >
                <input
                    type="text"
                    className={`${!isModify && "disabled"}`}
                    value={itemDetail.column2}
                    onChange={(e) => ModifyArray(e, "column2")}
                />
            </td>
            <td className="action">
                <div>
                    {loadingSave || loadingUpdate ? (
                        <div className="icon">
                            <MoonLoader size={10} color="#8f384d" />
                        </div>
                    ) : (
                        <>
                            {isModify ? (
                                <Tippy content={"Save"} theme="ThemeRed">
                                    <div>
                                        <MdSaveAlt
                                            className="icon"
                                            onClick={Save}
                                        />
                                    </div>
                                </Tippy>
                            ) : (
                                <div>
                                    <Tippy content={"Edit"} theme="ThemeRed">
                                        <div>
                                            <BiEdit
                                                className="icon"
                                                onClick={Edit}
                                            />
                                        </div>
                                    </Tippy>
                                </div>
                            )}
                        </>
                    )}
                    {loadingDelete ? (
                        <div className="icon">
                            <MoonLoader size={10} color="#8f384d" />
                        </div>
                    ) : (
                        <Tippy theme="ThemeRed" content="Export">
                            <div>
                                <MdDeleteOutline
                                    className="icon"
                                    onClick={Delete}
                                />
                            </div>
                        </Tippy>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ReadingCrud;
