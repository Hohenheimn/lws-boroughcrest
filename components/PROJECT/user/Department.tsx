import React, { useEffect, useState, useRef, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader, MoonLoader } from "react-spinners";
import { MdSaveAlt } from "react-icons/md";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useQueryClient } from "react-query";
import AppContext from "../../Context/AppContext";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import {
    DeleteDepartment,
    GetDepartment,
    PostDepartment,
    UpdateDepartment,
} from "./Query";

type Props = {
    set: Function;
    update: (value: any, id: any) => void;
    isValID: number | null;
    isObject: any;
    setObject: Function;
};

const Department = ({ set, update, isValID, isObject, setObject }: Props) => {
    const modal = useRef<any>();
    // Click out side, remove empty array
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setArray((itemList: any) =>
                    itemList.filter((item: any) => item.name !== "")
                );
                setObject({
                    ...isObject,
                    value: isObject.firstVal,
                    id: isObject.firstID,
                });
                set(false);
                setWarning("");
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const [isArray, setArray] = useState<any>([]);
    const [isWarning, setWarning] = useState("");

    const AddArray = () => {
        setArray([
            ...isArray,
            {
                id: Math.random(),
                displayId: "----",
                name: "",
            },
        ]);
    };

    const { isLoading, data, isError } = GetDepartment(
        isObject.value === null ? "" : isObject.value
    );

    useEffect(() => {
        if (data?.status === 200) {
            const cloneArray = data?.data.map((item: any) => {
                return {
                    id: item.id,
                    displayId: item.id,
                    name: item.name,
                };
            });
            setArray(cloneArray);
        }
    }, [data]);

    return (
        <div className="crud-container" ref={modal}>
            <table className="crud-table">
                <thead>
                    <tr>
                        <th className="text-white">ID</th>
                        <th className="text-white">NAME</th>
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
                                    set={set}
                                    update={update}
                                    isValID={isValID}
                                />
                            ))}
                        </>
                    )}
                </tbody>
            </table>

            {isError ||
                (data?.data.length <= 0 && (
                    <div className="w-full flex justify-center py-2 text-[14px]">
                        <p> Department cannot be found!</p>
                    </div>
                ))}
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
            {isWarning !== "" && (
                <p className="text-[12px] text-ThemeRed">{isWarning}</p>
            )}
            <h1
                className="cursor-pointer text-ThemeRed text-[12px] py-2 hover:underline"
                onClick={AddArray}
            >
                ADD DEPARTMENT
            </h1>
        </div>
    );
};
type List = {
    itemDetail: any;
    setArray: any;
    isArray: any;
    setWarning: any;
    set: any;
    update: any;
    isValID: any;
};
const List = ({
    itemDetail,
    setArray,
    isArray,
    setWarning,
    set,
    update,
    isValID,
}: List) => {
    const [isModify, setModify] = useState(false);
    const clientQuery = useQueryClient();
    const { setPrompt } = useContext(AppContext);

    useEffect(() => {
        if (itemDetail.name === "") {
            setModify(true);
        }
    }, [itemDetail.name]);
    // Run once

    // Functions
    const ModifyArray = (event: any) => {
        const newItems = isArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                return {
                    ...item,
                    name: event.target.value,
                };
            }
            return item;
        });
        setArray(newItems);
    };
    const Selected = (e: any) => {
        update(itemDetail.name, itemDetail.id);
        set(false);
    };
    const Edit = () => {
        setModify(!isModify);
    };

    // Mutation
    const onSuccessSave = () => {
        clientQuery.invalidateQueries("get-department");
        setPrompt({
            message: "Department successfully registered!",
            type: "success",
            toggle: true,
        });
    };
    const onSuccessDelete = () => {
        clientQuery.invalidateQueries("get-department");
        setPrompt({
            message: "Department successfully deleted!",
            type: "success",
            toggle: true,
        });
    };
    const onSuccessUpdate = () => {
        clientQuery.invalidateQueries("get-department");
        setPrompt({
            message: "Department successfully Updated!",
            type: "success",
            toggle: true,
        });
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };
    // Save
    const { isLoading: loadingSave, mutate: mutateSave } = PostDepartment(
        onSuccessSave,
        onError
    );
    // Delete
    const { isLoading: loadingDelete, mutate: mutateDelete } = DeleteDepartment(
        onSuccessDelete,
        onError
    );
    // Update
    const { isLoading: loadingUpdate, mutate: mutateUpdate } = UpdateDepartment(
        onSuccessUpdate,
        onError,
        itemDetail.id
    );
    const Save = () => {
        // prevent here the function if field is empty
        if (itemDetail.name === "") {
            setWarning("Cannot save with empty name");
            return;
        }
        setModify(!isModify);
        setWarning("");
        const Payload = {
            name: itemDetail.name,
        };

        if (itemDetail.displayId === "----") {
            mutateSave(Payload);
        } else {
            mutateUpdate(Payload);
        }
    };
    const Delete = () => {
        if (itemDetail.displayId === "----") {
            // Only delete in array
            setArray((item: any[]) =>
                item.filter((x: { id: any }) => x.id !== itemDetail.id)
            );
        } else {
            // Delete in API
            mutateDelete(itemDetail.id);
        }
    };
    return (
        <tr
            className={`cursor-pointer container ${
                isValID === itemDetail.id ? "active" : ""
            }`}
        >
            <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
                <p>{itemDetail.displayId}</p>
            </td>
            <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
                <input
                    type="text"
                    className={`${!isModify && "disabled"}`}
                    value={itemDetail.name}
                    onChange={ModifyArray}
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
                                <Tippy content={"Edit"} theme="ThemeRed">
                                    <div>
                                        <BiEdit
                                            className="icon"
                                            onClick={Edit}
                                        />
                                    </div>
                                </Tippy>
                            )}
                        </>
                    )}
                    {loadingDelete ? (
                        <div className="icon">
                            <MoonLoader size={10} color="#8f384d" />
                        </div>
                    ) : (
                        <Tippy content={"Delete"} theme="ThemeRed">
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

export default Department;
