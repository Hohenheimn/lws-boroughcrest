import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { GetPropertyList } from "../../../../ReactQuery/PropertyMethod";
import { BarLoader, ScaleLoader } from "react-spinners";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import Pagination from "../../../../Reusable/Pagination";
import AppContext from "../../../../Context/AppContext";
import NameIDDropdown from "../../../../Dropdowns/NameIDDropdown";
import SelectDropdown from "../../../../Reusable/SelectDropdown";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { customer } from "../../../../../types/customerList";
import { GetCustomerList } from "../../../../ReactQuery/CustomerMethod";
import { CreateGroup, UpdateGroup } from "./Query";
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";
import api from "../../../../../util/api";
import { getCookie } from "cookies-next";

type Props = {
    toggle: Function;
    externalDefaultValue: CustomerGroup[];
    formType: string;
    id: number;
    groupName: string;
};

type isTable = {
    itemArray: CustomerGroup[];
    group_name: string;
    selectAll: boolean;
};

export type CustomerGroup = {
    select: boolean;
    id: number;
    name: string;
    email: string;
    class: string;
    preferred_email?: string;
};

export default function GroupForm({
    toggle,
    externalDefaultValue,
    formType,
    id,
    groupName,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");

    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        group_name: groupName,
        selectAll: false,
    });

    const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

    const selectAll = () => {
        if (isTableItem.selectAll) {
            // get ids need to remove
            const toRemove = isTableItem.itemArray.map((mapItem) => {
                return mapItem.id;
            });
            // remove those ids from selectedIDS
            const remove = isSelectedIDs.filter((filter) => {
                return !toRemove.includes(filter);
            });
            setSelectedIDs(remove);
        } else {
            // get those ids that not in the selectedIDS
            const cloneToUpdateValue = isTableItem.itemArray.filter(
                (item) => !isSelectedIDs.includes(item.id)
            );
            // convert to ids array
            const newSelectAll = cloneToUpdateValue.map((item) => {
                return item.id;
            });
            // add selectedids
            setSelectedIDs([...newSelectAll, ...isSelectedIDs]);
        }
        const newItems = isTableItem?.itemArray.map((item: any) => {
            return {
                ...item,
                select: !isTableItem.selectAll,
            };
        });
        setTableItem({
            ...isTableItem,
            itemArray: newItems,
            selectAll: !isTableItem.selectAll,
        });
    };

    const { data, isLoading, isError } = useQuery(
        ["customer-create-group-list", isSearch],
        () => {
            return api.get(
                `/admin/customer?keywords=${isSearch}&owner_tenant_class=1&paginate=10&page=${
                    isSearch === "" ? TablePage : 1
                }`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const [isFilterbyCategory, setFilterbyCategory] = useState("");

    const [isCategoryList, setCategoryList] = useState({
        value: "",
        id: "",
    });

    useEffect(() => {
        const addExistingID = externalDefaultValue?.map(
            (item: CustomerGroup) => {
                return Number(item.id);
            }
        );
        setSelectedIDs(addExistingID);
    }, [
        data?.status,
        isSearch,
        TablePage,
        isFilterbyCategory,
        isCategoryList.value,
        externalDefaultValue,
        id,
    ]);

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;

            let CloneArray = data?.data.data.map((item: customer) => {
                let select = false;
                if (isSelectedIDs?.some((someIDs) => someIDs === item.id)) {
                    select = true;
                }
                return {
                    id: item.id,
                    name: item.name,
                    email: item.preferred_email,
                    class: item.class,
                    select: select,
                };
            });

            if (
                CloneArray.length !== 0 &&
                CloneArray.every((val: any) => isSelectedIDs.includes(val.id))
            ) {
                selectAll = true;
            } else {
                selectAll = false;
            }

            setTableItem({
                ...isTableItem,
                group_name: groupName,
                itemArray: CloneArray,
                selectAll: selectAll,
            });
        }
    }, [
        data?.status,
        isSearch,
        TablePage,
        isFilterbyCategory,
        isCategoryList.value,
        externalDefaultValue,
        id,
        isSelectedIDs,
    ]);

    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["group-application-list"]);
        setPrompt({
            message: `Group successfully ${
                formType === "add" ? "registered" : "updated"
            }!`,
            type: "success",
            toggle: true,
        });
        toggle("");
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate: createMutate, isLoading: createLoading } = CreateGroup(
        onSuccess,
        onError
    );
    const { mutate: updateMutate, isLoading: updateLoading } = UpdateGroup(
        onSuccess,
        onError,
        id
    );

    const CreateHandler = () => {
        if (isSelectedIDs.length <= 0) {
            setPrompt({
                message: "Select a customer!",
                type: "draft",
                toggle: true,
            });
            return;
        }
        if (isTableItem.group_name === "") {
            setPrompt({
                message: "Fill out the group name!",
                type: "draft",
                toggle: true,
            });
            return;
        }

        const Payload = {
            name: isTableItem.group_name,
            customer_ids: isSelectedIDs,
        };
        if (formType === "add") {
            createMutate(Payload);
        } else {
            updateMutate(Payload);
        }
    };

    return (
        <ModalTemp wide={true}>
            <div>
                <h3 className="mb-5 text-ThemeRed">
                    {formType === "edit" ? "Edit" : "Create"} Group
                </h3>
                <ul className="mb-5 flex justify-between 640px:flex-col 640px:items-end">
                    <li className=" flex items-center  640px:w-full">
                        <p className=" text-ThemeRed text-[12px] font-NHU-bold mr-3">
                            GROUP NAME:
                        </p>
                        <input
                            type="text"
                            value={isTableItem.group_name}
                            onChange={(e) => {
                                setTableItem({
                                    ...isTableItem,
                                    group_name: e.target.value,
                                });
                            }}
                            className="field mini"
                        />
                    </li>
                    <li className=" flex items-center 640px:w-full">
                        <p className=" text-ThemeRed text-[12px] font-NHU-bold mr-3">
                            FILTER BY:
                        </p>

                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setFilterbyCategory(value);
                            }}
                            className="w-[150px]"
                            inputElement={
                                <input
                                    className="w-full field mini"
                                    readOnly
                                    value={isFilterbyCategory}
                                    autoComplete="off"
                                />
                            }
                            listArray={["Tower", "Project"]}
                        />
                        <div className="mr-2"></div>
                        <NameIDDropdown
                            setValue={setCategoryList}
                            value={isCategoryList.value}
                            width="w-[150px]"
                            className="mini"
                            placeholder="Tower"
                            endpoint={
                                isFilterbyCategory === "Tower"
                                    ? "/admin/property/tower"
                                    : "/admin/property/project"
                            }
                        />
                    </li>
                </ul>
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
                <div className="w-full overflow-auto max-h-[50vh]">
                    <table className="table_list miniTable">
                        <thead>
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
                                <th className="text-start">Customer ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isTableItem?.itemArray.map(
                                (item: CustomerGroup, index: number) => (
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

                <div className="mb-5 1550px:mb-3"></div>
                <Pagination
                    setTablePage={setTablePage}
                    TablePage={TablePage}
                    PageNumber={data?.data.last_page}
                    CurrentPage={data?.data.current_page}
                />
                <div className="flex justify-end py-5 mt-10">
                    <button
                        className="button_cancel"
                        onClick={() => toggle("")}
                    >
                        Cancel
                    </button>
                    <button className="buttonRed" onClick={CreateHandler}>
                        {createLoading || updateLoading ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : formType === "edit" ? (
                            "EDIT"
                        ) : (
                            "CREATE"
                        )}
                    </button>
                </div>
            </div>
        </ModalTemp>
    );
}

type ListProps = {
    itemDetail: CustomerGroup;
    isTableItem: isTable;
    setTableItem: Function;
    isSelectedIDs: number[];
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
            ...isTableItem,
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

            <td>{itemDetail.id}</td>
            <td>{itemDetail.name}</td>
            <td>{itemDetail.email}</td>
            <td>{itemDetail.class}</td>
        </tr>
    );
};
