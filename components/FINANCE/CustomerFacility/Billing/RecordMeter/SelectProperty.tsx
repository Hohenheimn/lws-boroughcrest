import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styleModal from "../../../../../styles/Popup_Modal.module.scss";
import Image from "next/image";
import { GetPropertyList } from "../../../../ReactQuery/PropertyMethod";
import { property } from "../../../../../types/PropertyList";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import Pagination from "../../../../Reusable/Pagination";
import AppContext from "../../../../Context/AppContext";
import ReadingPropertyForm, {
    DefaultValuePropertyReadingForm,
    isTableForm,
} from "./ReadingPropertyForm";
import NameIDDropdown from "../../../../Dropdowns/NameIDDropdown";
import SelectDropdown from "../../../../Reusable/SelectDropdown";
import { useRouter } from "next/router";

type Props = {
    toggle: Function;
    externalDefaultValue: DefaultValuePropertyReadingForm;
    formType: string;
};

type isTable = {
    itemArray: isTableItemObj[];
    selectAll: boolean;
};

interface isTableItemObj extends property {
    select: boolean;
}

export default function SelectProperty({
    toggle,
    externalDefaultValue,
    formType,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const [formActive, setFormActive] = useState([true, false]);
    const router = useRouter();

    const [isTableItem, setTableItem] = useState<isTable>({
        itemArray: [],
        selectAll: false,
    });

    const [DefaultValue, setDefaultValue] =
        useState<DefaultValuePropertyReadingForm>(externalDefaultValue);

    const [isSelectedIDs, setSelectedIDs] = useState<
        { id: number; unit_code: string }[]
    >([]);

    useEffect(() => {
        if (formType === "modify") {
            setFormActive([false, true]);
        }
        const addExistingID = DefaultValue.properties.map((item) => {
            return {
                id: item.property_unit_id,
                unit_code: item.property,
            };
        });
        setSelectedIDs(addExistingID);
    }, [DefaultValue.properties]);

    const selectAll = () => {
        if (isTableItem.selectAll) {
            // remove
            setSelectedIDs([]);
        } else {
            // add
            const Properties = isTableItem.itemArray.map((item) => {
                return {
                    id: Number(item.id),
                    unit_code: item.unit_code,
                };
            });
            setSelectedIDs(Properties);
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

    const { isLoading, isError, data } = GetPropertyList(
        TablePage,
        isSearch,
        10
    );

    useEffect(() => {
        if (data?.status === 200) {
            let selectAll = false;

            let CloneArray = data?.data.data.map((item: isTableItemObj) => {
                let select = false;
                if (isSelectedIDs.some((someIDs) => someIDs.id === item.id)) {
                    select = true;
                }
                return {
                    id: item.id,
                    unit_code: item?.unit_code,
                    project: {
                        name: item?.project?.name,
                    },
                    developer: {
                        name: item?.developer?.name,
                    },
                    tower: {
                        name: item?.tower?.name,
                    },
                    floor: {
                        name: item?.floor?.name,
                    },
                    class: item?.class,
                    type: item?.type,
                    select: select,
                };
            });
            const clonedIDS = CloneArray.map((item: isTableItemObj) => item.id);
            const cloneSelected = isSelectedIDs.map((item) => item.id);
            if (
                CloneArray.length !== 0 &&
                clonedIDS.every((item: any) => cloneSelected.includes(item))
            ) {
                selectAll = true;
            } else {
                selectAll = false;
            }

            setTableItem({
                itemArray: CloneArray,
                selectAll: selectAll,
            });
        }
    }, [data, isSearch, formType, isSelectedIDs]);

    const NextHandler = () => {
        if (isSelectedIDs.length <= 0) {
            setPrompt({
                toggle: true,
                message: "Select a property",
                type: "draft",
            });
            return;
        }
        const cloneToPass = isSelectedIDs.map((item) => {
            if (
                DefaultValue.properties.some(
                    (someItem) => someItem.property_unit_id === item.id
                )
            ) {
                const cloneToFilter = DefaultValue.properties.filter(
                    (filterItem) =>
                        Number(filterItem.property_unit_id) === item.id
                );
                return cloneToFilter[0];
            } else {
                return {
                    property: item.unit_code,
                    property_unit_id: Number(item.id),
                    previous_reading: 0,
                    current_reading: 0,
                    consumption: 0,
                };
            }
        });

        setDefaultValue({
            ...DefaultValue,
            properties: cloneToPass,
        });
        setFormActive([false, true]);
    };

    const [isFilterbyCategory, setFilterbyCategory] = useState("");

    const [isCategoryList, setCategoryList] = useState({
        value: "",
        id: "",
    });

    return (
        <div className={styleModal.container}>
            <section className={styleModal.wide}>
                <div className={formActive[0] ? "" : "hidden"}>
                    <h3 className="mb-5 text-ThemeRed">Select Property</h3>
                    <ul className="mb-5 flex justify-between 640px:flex-col 640px:items-end">
                        <li className=" flex items-center 640px:order-2 640px:w-full">
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
                        <li className="640px:mb-5">
                            <input
                                type="file"
                                className=" absolute opacity-0"
                                id="import"
                            />
                            <Tippy theme="ThemeRed" content="Import">
                                <label className="iconNav" htmlFor="import">
                                    <Image
                                        src="/Images/Import.png"
                                        layout="fill"
                                        alt="Import"
                                    />
                                </label>
                            </Tippy>
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
                                    <th className="text-start">ID</th>
                                    <th>Unit Code</th>
                                    <th>Project</th>
                                    <th>Developer</th>
                                    <th>Tower</th>
                                    <th>Floor</th>
                                    <th>Class</th>
                                    <th>Type</th>
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
                        {router.query.modify === undefined && (
                            <button
                                className="button_cancel"
                                onClick={() => {
                                    toggle(false);
                                }}
                            >
                                Cancel
                            </button>
                        )}
                        <button className="buttonRed" onClick={NextHandler}>
                            NEXT
                        </button>
                    </div>
                </div>
                {/* Next Form */}
                {formActive[1] && (
                    <ReadingPropertyForm
                        formActive={formActive}
                        setFormActive={setFormActive}
                        toggle={toggle}
                        DefaultValue={DefaultValue}
                        setDefaultValue={setDefaultValue}
                    />
                )}
            </section>
        </div>
    );
}

type ListProps = {
    itemDetail: isTableItemObj;
    isTableItem: isTable;
    setTableItem: Function;
    isSelectedIDs: { id: number; unit_code: string }[];
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
                            unit_code: item.unit_code,
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

            <td>{itemDetail.id}</td>
            <td>{itemDetail.unit_code}</td>
            <td>{itemDetail.project.name}</td>
            <td>{itemDetail.developer.name}</td>
            <td>{itemDetail.tower.name}</td>
            <td>{itemDetail.floor.name}</td>
            <td>{itemDetail.class}</td>
            <td>{itemDetail.type}</td>
        </tr>
    );
};
