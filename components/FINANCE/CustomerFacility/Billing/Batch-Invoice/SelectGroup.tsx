import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import Pagination from "../../../../Reusable/Pagination";
import AppContext from "../../../../Context/AppContext";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { GetBatchInvoiceGroupList } from "./Query";
import {
    DeleteButton,
    EyeButton,
    PencilButtonTable,
} from "../../../../Reusable/Icons";
import { batchForm } from "./BatchForm";

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
};

export default function Readingform({ toggle, setArray, isArray, id }: Props) {
    const { setPrompt } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const [isSelectedIDs, setSelectedIDs] = useState<
        { id: number; name: string }[]
    >([]);

    useEffect(() => {
        const getSpecificBatch = isArray.filter(
            (item: batchForm) => item.id === id
        );
        getSpecificBatch[0].application.map((gsbItem) => {
            setSelectedIDs([...isSelectedIDs, gsbItem]);
        });
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
                return {
                    id: item.id,
                    name: item.name,
                };
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

    const { isLoading, isError, data } = GetBatchInvoiceGroupList(
        isSearch,
        TablePage
    );

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;

            const CloneArray = data?.data.data.map((item: isTableItemObj) => {
                let select = false;
                if (isSelectedIDs.some((someIDs) => someIDs.id === item.id)) {
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
    }, [data?.status, isSearch]);

    const SaveHandler = () => {
        if (isSelectedIDs.length <= 0) {
            setPrompt({
                message: "Select a Group",
                type: "draft",
                toggle: true,
            });
            return;
        }
        const cloneToUpdateValue = isArray.map((item: batchForm) => {
            if (item.id === id) {
                return {
                    ...item,
                    application: isSelectedIDs,
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
                    <button className="buttonRed">ADD GROUP</button>
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
    isSelectedIDs: { id: number; name: string }[];
    setSelectedIDs: Function;
};
const TableList = ({
    itemDetail,
    isTableItem,
    setTableItem,
    isSelectedIDs,
    setSelectedIDs,
}: ListProps) => {
    const updateValue = (e: any) => {
        const newItems = isTableItem?.itemArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (item.select) {
                    // remove
                    const filterSelected = isSelectedIDs.filter(
                        (itemFilt) => Number(item.id) !== itemFilt.id
                    );
                    setSelectedIDs(filterSelected);
                } else {
                    // add
                    setSelectedIDs([
                        ...isSelectedIDs,
                        {
                            id: item.id,
                            name: item.name,
                        },
                    ]);
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
                <div className=" mr-3">
                    <EyeButton />
                </div>
                <div className=" mr-3">
                    <PencilButtonTable />
                </div>
                <div>
                    <DeleteButton />
                </div>
            </td>
        </tr>
    );
};
