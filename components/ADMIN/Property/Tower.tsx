import React, { useEffect, useState, useRef, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { BarLoader, MoonLoader } from "react-spinners";
import { MdSaveAlt } from "react-icons/md";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import {
    DeleteTower,
    GetTower,
    PostTower,
    UpdateTower,
    GetProject,
} from "../../ReactQuery/PropertyMethod";
import { useQueryClient } from "react-query";
import AppContext from "../../Context/AppContext";
import DynamicPopOver from "../../Reusable/DynamicPopOver";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";

type Props = {
    set: any;
    update: any;
    is: any;
    isObject: any;
    isValID: any;
    setObject: any;
    project_id: any;
    project_name: string;
};

const Tower = ({
    set,
    update,
    is,
    isValID,
    isObject,
    setObject,
    project_id,
    project_name,
}: Props) => {
    const modal = useRef<any>();
    // Click out side, remove empty array
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setArray((itemList: any) =>
                    itemList.filter((item: any) => item.name !== "")
                );
                set(false);
                setWarning("");
                setObject({
                    ...isObject,
                    value: isObject.firstVal,
                    id: isObject.firstID,
                });
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
                project_id: "",
                project: "",
            },
        ]);
    };

    const { isLoading, data, isError } = GetTower(
        isObject.value === null || isObject.value === undefined
            ? ""
            : isObject.value,
        project_id
    );

    useEffect(() => {
        if (data?.status === 200) {
            const cloneArray = data?.data.map((item: any) => {
                return {
                    id: item.id,
                    displayId: item.assigned_tower_id,
                    name: item.name,
                    project_id: item.project_id,
                    project: item?.project?.name,
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
                        <th className="text-white">ID</th>
                        <th className="text-white">NAME</th>
                        <th className="text-white">PROJECT</th>
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
                                    is={is}
                                    update={update}
                                    isValID={isValID}
                                    project_id={project_id}
                                    project_name={project_name}
                                />
                            ))}
                        </>
                    )}
                </tbody>
            </table>
            {isError ||
                (data?.data.length <= 0 && (
                    <div className="w-full flex justify-center py-2 text-[14px]">
                        <p>No TOWER found!</p>
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
                className="cursor-pointer text-ThemeRed text-[12px] inline-block py-2 hover:underline"
                onClick={AddArray}
            >
                ADD TOWER
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
    is: any;
    isValID: any;
    project_id: string;
    project_name: string;
};
const List = ({
    itemDetail,
    setArray,
    isArray,
    setWarning,
    set,
    is,
    update,
    isValID,
    project_id,
    project_name,
}: List) => {
    const [isModify, setModify] = useState(false);
    const clientQuery = useQueryClient();
    const [isProjectList, setProjectList] = useState(false);
    const { setPrompt } = useContext(AppContext);

    useEffect(() => {
        if (itemDetail.name === "") {
            setModify(true);
        }
    }, [itemDetail.name]);

    // Functions
    const ModifyArray = (event: any, type: string) => {
        const newItems = isArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (type === "name") {
                    return {
                        ...item,
                        name: event.target.value,
                    };
                }
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
    // Second Field Dropdown Update Value base on selected item
    const updateVal = (value: any, id: any) => {
        const newItems = isArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                return {
                    ...item,
                    project: value,
                    project_id: id,
                };
            }
            return item;
        });
        setArray(newItems);
    };

    // Mutation
    const onSuccessSave = () => {
        clientQuery.invalidateQueries("get-tower");
        setPrompt({
            message: "Tower successfully registered!",
            type: "success",
            toggle: true,
        });
    };

    const onSuccessDelete = () => {
        clientQuery.invalidateQueries("get-tower");
        setPrompt({
            message: "Tower successfully deleted!",
            type: "success",
            toggle: true,
        });
    };

    const onSuccessUpdate = () => {
        clientQuery.invalidateQueries("get-tower");
        setPrompt({
            message: "Tower successfully Updated!",
            type: "success",
            toggle: true,
        });
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    // Save
    const { isLoading: loadingSave, mutate: mutateSave } = PostTower(
        onSuccessSave,
        onError
    );

    // Delete
    const { isLoading: loadingDelete, mutate: mutateDelete } = DeleteTower(
        onSuccessDelete,
        onError
    );

    // Update
    const { isLoading: loadingUpdate, mutate: mutateUpdate } = UpdateTower(
        onSuccessUpdate,
        onError,
        itemDetail.id
    );

    const [isProject, setProject] = useState({
        value: project_name,
        firstVal: project_name,
        id: project_id,
        firstID: project_id,
    });

    const Save = () => {
        // prevent here the function if field is empty
        if (itemDetail.name === "" && itemDetail.project === "") {
            setWarning("Cannot save with empty name and project field");
            return;
        }
        setModify(!isModify);
        setWarning("");
        const Payload = {
            name: itemDetail.name,
            project_id: isProject.id,
        };

        if (itemDetail.displayId === "----") {
            mutateSave(Payload);
        } else {
            mutateUpdate(Payload);
        }
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
        }
    };
    return (
        <tr
            className={`cursor-pointer container ${
                isValID === itemDetail.id ? "active" : ""
            }`}
        >
            <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
                {/* <p>{itemDetail.displayId}</p> */}
                <p>{itemDetail.displayId}</p>
            </td>
            <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
                <input
                    type="text"
                    className={`${!isModify && "disabled"}`}
                    value={itemDetail.name}
                    onChange={(e) => ModifyArray(e, "name")}
                />
            </td>
            <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
                <input
                    type="text"
                    className={`disabled`}
                    value={isProject.value}
                />
                {/* <DynamicPopOver
                    className=""
                    samewidth={true}
                    toRef={
                        <input
                            type="text"
                            className={`${!isModify && "disabled"}`}
                            value={isProject.value}
                            onChange={(e: any) => {
                                setProject({
                                    ...isProject,
                                    value: e.target.value,
                                });
                            }}
                            onFocus={() => setProjectList(true)}
                        />
                    }
                    toPop={
                        <>
                            {isProjectList && (
                                <ListDropdown
                                    set={setProjectList}
                                    updateVal={updateVal}
                                    isProject={isProject}
                                    setProject={setProject}
                                />
                            )}
                        </>
                    }
                /> */}
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

export default Tower;

type ListDropdown = {
    set: any;
    updateVal: any;
    isProject: {
        value: string;
        firstVal: string;
        firstID: string;
    };
    setProject: Function;
};

const ListDropdown = ({
    set,
    updateVal,
    isProject,
    setProject,
}: ListDropdown) => {
    const { data, isLoading, isError } = GetProject(isProject.value);

    const modal = useRef<any>();

    const reset = () => {
        set(false);
        setProject({
            ...isProject,
            value: isProject.firstVal,
            id: isProject.firstID,
        });
    };

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                reset();
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const select = (e: any) => {
        const id = e.target.getAttribute("data-id");
        const value = e.target.innerHTML;
        updateVal(value, id);
        setProject({
            value: value,
            firstVal: value,
            firstID: id,
            id: id,
        });
        set(false);
    };

    if (isLoading) {
        return (
            <ul ref={modal} className="w-full flex justify-center py-3">
                <BarLoader
                    color={"#8f384d"}
                    height="5px"
                    width="100px"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </ul>
        );
    }

    return (
        <ul ref={modal} className="dropdown-list smaller">
            {data?.data.map((item: any, index: number) => (
                <li data-id={item.id} key={index} onClick={select}>
                    {item.name}
                </li>
            ))}
            {isError || (data?.data.length <= 0 && <li>No PROJECT found!</li>)}
        </ul>
    );
};
