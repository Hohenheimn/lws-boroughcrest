import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BarLoader, MoonLoader } from "react-spinners";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import Pagination from "../../../../Reusable/Pagination";
import AppContext from "../../../../Context/AppContext";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { DeleteGroup, GetBatchInvoiceGroupList } from "./Query";
import {
    DeleteButton,
    EyeButton,
    PencilButtonTable,
} from "../../../../Reusable/Icons";
import { batchForm } from "./BatchForm";
import { useQueryClient } from "react-query";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";

type isTable = {
    itemArray: isTableItemObj[];
    selectAll: boolean;
};
type isTableItemObj = {
    id: number;
    name: string;
    select: boolean;
};

type Props = {
    toggle: Function;
    setArray: Function;
    isArray: batchForm[];
    id: number | boolean;
    setEditID: Function;
    setTypBatchForm: Function;
};

export default function SelectGroup({
    toggle,
    setArray,
    isArray,
    id,
    setTypBatchForm,
    setEditID,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

    useEffect(() => {
        const addExistingID = isArray[0].application?.map((item) => {
            return item.id;
        });
        setSelectedIDs(addExistingID);
    }, []);

    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });

    useEffect(() => {
        if (
            isTableItem.itemArray.length === isSelectedIDs.length &&
            isTableItem.itemArray.length > 0
        ) {
            setTableItem({
                ...isTableItem,
                selectAll: true,
            });
        } else {
            setTableItem({
                ...isTableItem,
                selectAll: false,
            });
        }
    }, [isSelectedIDs]);

    const selectAll = () => {
        if (isTableItem.selectAll) {
            // remove
            setSelectedIDs([]);
        } else {
            // add
            const cloneToGetIDS = isTableItem.itemArray.map((item) => {
                return item.id;
            });
            setSelectedIDs(cloneToGetIDS);
        }
        const newItems = isTableItem?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isTableItem.selectAll,
            };
        });
        setTableItem({
            itemArray: newItems,
            selectAll: !isTableItem.selectAll,
        });
    };

    useEffect(() => {
        const addExistingID = isArray[0]?.application.map((item) => {
            return Number(item.id);
        });
        setSelectedIDs(addExistingID);
    }, [isSearch, TablePage, id]);

    const { isLoading, isError, data } = GetBatchInvoiceGroupList(
        isSearch,
        TablePage
    );

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;

            const CloneArray = data?.data.data.map((item: isTableItemObj) => {
                let select = false;
                if (isSelectedIDs.some((someIDs) => someIDs === item.id)) {
                    select = true;
                }
                return {
                    id: item.id,
                    name: item.name,
                    select: select,
                };
            });
            if (
                CloneArray.length === isSelectedIDs.length &&
                CloneArray.length !== 0
            ) {
                selectAll = true;
            }

            setTableItem({
                itemArray: CloneArray,
                selectAll: selectAll,
            });
        }
    }, [data?.data.data, isSearch]);

    const SaveHandler = () => {
        if (isSelectedIDs.length <= 0) {
            setPrompt({
                message: "Select a Group",
                type: "draft",
                toggle: true,
            });
            return;
        }
        const filter = isTableItem.itemArray.filter(
            (filteritem) =>
                isSelectedIDs.includes(filteritem.id) && {
                    name: filteritem.name,
                    id: filteritem.id,
                }
        );

        const cloneToRemoveSelect = filter.map((item) => {
            return {
                name: item.name,
                id: item.id,
            };
        });
        const cloneToUpdateValue = isArray.map((item: batchForm) => {
            if (item.id === id) {
                return {
                    ...item,
                    application: cloneToRemoveSelect,
                };
            }
            return item;
        });
        setArray(cloneToUpdateValue);

        toggle(false);
    };

    return (
        <ModalTemp>
            <div>
                <h3 className="mb-5 text-ThemeRed">Select application</h3>

                <div className="flex justify-between items-center">
                    <div className="mb-5 flex items-center shadow-lg px-2 h-8 1550px:h-8 bg-white flex-1 max-w-[300px] 640px:max-w-[unset] rounded-lg">
                        <input
                            type="text"
                            placeholder="Search"
                            value={isSearch}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 outline-none text-[#545454] text-[12px] shadow-none"
                            style={{ boxShadow: "none" }}
                        />
                        <BiSearch className="text-[16px] text-gray-400" />
                    </div>
                    <button
                        className="buttonRed"
                        onClick={() => setTypBatchForm("add")}
                    >
                        ADD GROUP
                    </button>
                </div>

                <div className="w-full overflow-auto max-h-[50vh]">
                    <table className="table_list miniTable">
                        <thead className="textRed">
                            <tr>
                                <th className="checkbox">
                                    <div className="item">
                                        <input
                                            type="checkbox"
                                            checked={isTableItem.selectAll}
                                            onChange={selectAll}
                                        />
                                    </div>
                                </th>
                                <th className="text-start">GROUP NAME</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isTableItem?.itemArray.map(
                                (item: isTableItemObj, index: number) => (
                                    <TableList
                                        key={index}
                                        itemDetail={item}
                                        isTableItem={isTableItem}
                                        setTableItem={setTableItem}
                                        setSelectedIDs={setSelectedIDs}
                                        isSelectedIDs={isSelectedIDs}
                                        setTypBatchForm={setTypBatchForm}
                                        setEditID={setEditID}
                                    />
                                )
                            )}
                        </tbody>
                    </table>

                    {isLoading && (
                        <div className="w-full h-full flex justify-center items-center">
                            <aside className="text-center flex justify-center py-5">
                                <BarLoader
                                    color={"#8f384d"}
                                    height="10px"
                                    width="200px"
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </aside>
                        </div>
                    )}
                    {isError && <TableErrorMessage />}
                </div>

                <div className="mb-5"></div>
                <Pagination
                    setTablePage={setTablePage}
                    TablePage={TablePage}
                    PageNumber={data?.data.last_page}
                    CurrentPage={data?.data.current_page}
                />
                <div className="flex justify-end py-5 mt-10">
                    <button
                        className="button_cancel"
                        onClick={() => toggle(false)}
                    >
                        Cancel
                    </button>
                    <button className="buttonRed" onClick={SaveHandler}>
                        SAVE
                    </button>
                </div>
            </div>
        </ModalTemp>
    );
}

type ListProps = {
    itemDetail: isTableItemObj;
    isTableItem: isTable;
    setTableItem: Function;
    isSelectedIDs: number[];
    setSelectedIDs: Function;
    setTypBatchForm: Function;
    setEditID: Function;
};
const TableList = ({
    itemDetail,
    isTableItem,
    setTableItem,
    isSelectedIDs,
    setSelectedIDs,
    setTypBatchForm,
    setEditID,
}: ListProps) => {
    const { setPrompt } = useContext(AppContext);
    const updateValue = (e: any) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (item.select) {
                    // remove
                    const filterSelected = isSelectedIDs.filter(
                        (itemFilt) => Number(item.id) !== itemFilt
                    );
                    setSelectedIDs(filterSelected);
                } else {
                    // add
                    setSelectedIDs([...isSelectedIDs, item.id]);
                }
                return {
                    ...item,
                    select: !item.select,
                };
            }
            return item;
        });

        setTableItem({
            itemArray: newItems,
            selectAll: false,
        });
    };
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["group-application-list"]);
        setPrompt({
            message: `Group successfully Deleted`,
            type: "success",
            toggle: true,
        });
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };
    const { mutate, isLoading } = DeleteGroup(onSuccess, onError);

    const DeleteHandler = () => {
        mutate(itemDetail.id);
    };
    return (
        <tr>
            <td className="checkbox">
                <div className="item">
                    <input
                        type="checkbox"
                        onChange={(e: any) => updateValue(e)}
                        checked={itemDetail.select}
                    />
                </div>
            </td>
            <td className=" text-DarkBlue">{itemDetail.name}</td>
            <td className="flex justify-end items-center w-full">
                <div
                    className=" mr-3"
                    onClick={() => {
                        setEditID(itemDetail.id);
                        setTypBatchForm("view");
                    }}
                >
                    <EyeButton />
                </div>
                <div
                    className=" mr-3"
                    onClick={() => {
                        setEditID(itemDetail.id);
                        setTypBatchForm("edit");
                    }}
                >
                    <PencilButtonTable />
                </div>
                <div onClick={DeleteHandler}>
                    {isLoading ? <MoonLoader size={12} /> : <DeleteButton />}
                </div>
            </td>
        </tr>
    );
};
