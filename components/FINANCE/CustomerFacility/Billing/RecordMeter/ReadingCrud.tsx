import React, { useEffect, useState, useRef, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { BarLoader, MoonLoader } from "react-spinners";
import { MdSaveAlt } from "react-icons/md";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import AppContext from "../../../../Context/AppContext";
// Palitin
import { CreateReadingDD, GetReadingDD, UpdateReadingDD } from "./Query";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import { useQueryClient } from "react-query";
import DynamicPopOver from "../../../../Reusable/DynamicPopOver";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";

type readingCharge = {
    id: number;
    displayID: string;
    charge_id: string;
    base_rate: number;
    charge: string;
    reading_name: string;
};

type Props = {
    value: string;
    setvalue: Function;
};

const ReadingCrud = ({ setvalue, value }: Props) => {
    const [isToggle, setToggle] = useState(false);
    const [tempSearch, setTempSearch] = useState("");
    useEffect(() => {
        setTempSearch(value);
    }, [value]);

    return (
        <DynamicPopOver
            toRef={
                <input
                    type="text"
                    autoComplete="off"
                    onClick={() => setToggle(true)}
                    className="field"
                    value={tempSearch}
                    onChange={(e: any) => setTempSearch(e.target.value)}
                />
            }
            toPop={
                <>
                    {isToggle && (
                        <ReadingCrudList
                            value={value}
                            setTempSearch={setTempSearch}
                            tempSearch={tempSearch}
                            setToggle={setToggle}
                            setvalue={setvalue}
                        />
                    )}
                </>
            }
            className={""}
        />
    );
};

type ReadingCrudList = {
    value: string;
    tempSearch: string;
    setToggle: Function;
    setTempSearch: Function;
    setvalue: Function;
};

const ReadingCrudList = ({
    tempSearch,
    setToggle,
    setTempSearch,
    value,
    setvalue,
}: ReadingCrudList) => {
    const modal = useRef<any>();
    const [isArray, setArray] = useState<readingCharge[]>([]);
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
                setTempSearch(value);
                setToggle(false);
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
                displayID: "----",
                charge_id: "",
                reading_name: "",
                charge: "",
                base_rate: 0,
            },
        ]);
    };

    const { isLoading, data, isError } = GetReadingDD(tempSearch);

    // Set Data from backend to array of front end
    useEffect(() => {
        if (data?.status === 200) {
            const cloneArray = data?.data.map((item: any) => {
                return {
                    id: item?.id,
                    displayID: item?.id,
                    charge_id: item.charge?.id,
                    charge: item?.charge?.name,
                    reading_name: item?.reading_name,
                    base_rate: item?.charge?.base_rate,
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
                    {isArray.map((item: any, index: number) => (
                        <List
                            itemDetail={item}
                            key={index}
                            setArray={setArray}
                            isArray={isArray}
                            setWarning={setWarning}
                            setvalue={setvalue}
                            setToggle={setToggle}
                        />
                    ))}
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
            {isError && (
                <div className="w-full flex justify-center py-3">
                    <h1>Something is wrong!</h1>
                </div>
            )}
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
    itemDetail: readingCharge;
    setArray: Function;
    isArray: readingCharge[];
    setWarning: Function;
    setvalue: Function;
    setToggle: Function;
};
const List = ({
    itemDetail,
    setArray,
    isArray,
    setWarning,
    setvalue,
    setToggle,
}: List) => {
    const [isModify, setModify] = useState(false);
    const { setPrompt } = useContext(AppContext);

    // Auto editable field when add row
    useEffect(() => {
        if (itemDetail.charge_id === "") {
            setModify(true);
        }
    }, [itemDetail.charge_id]);
    // Toggle Modify Button
    const Edit = () => {
        setModify(!isModify);
    };

    // Get Selected Data
    const Selected = (
        id: string | number,
        name: string,

        charge_name: string,
        charge_id: string,
        base_rate: number
    ) => {
        setvalue({
            reading_id: id,
            reading_name: name,

            charge_name: charge_name,
            base_rate: base_rate,
            charge_id: charge_id,
        });
        setToggle(false);
    };

    // Functions // Edit Array from front end
    const ModifyArray = (key: string, value: any) => {
        const newItems = isArray.map((item: any) => {
            if (itemDetail.id == item.id) {
                if (key === "charge") {
                    const charge_id = value.target.getAttribute("data-id");
                    const charge = value.target.innerHTML;
                    return {
                        ...item,
                        charge_id: charge_id,
                        charge: charge,
                    };
                }
                if (key === "reading_name") {
                    return {
                        ...item,
                        reading_name: value,
                    };
                }
            }
            return item;
        });
        setArray(newItems);
    };

    const queryClient = useQueryClient();
    const messageHandler = (action: string) => {
        setPrompt({
            message: `Reading successfully ${action}!`,
            type: "success",
            toggle: true,
        });
        queryClient.invalidateQueries(["reading-list"]);
    };
    // Mutation
    const onSuccessSave = () => {
        messageHandler("registered");
    };
    const onSuccessUpdate = () => {
        messageHandler("updated");
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };
    // Save
    const { isLoading: loadingSave, mutate: mutateSave } = CreateReadingDD(
        onSuccessSave,
        onError
    );
    // Update
    const { isLoading: loadingUpdate, mutate: mutateUpdate } = UpdateReadingDD(
        onSuccessUpdate,
        onError,
        itemDetail.id
    );

    const Save = () => {
        // prevent here the function if field is empty
        if (itemDetail.charge_id === "" && itemDetail.charge === "") {
            setWarning("Cannot save with empty Charge and Reading");
            return;
        }
        setModify(!isModify);
        setWarning("");
        const Payload = {
            charge_id: itemDetail.charge_id,
            reading_name: itemDetail.reading_name,
        };

        if (itemDetail.displayID === "----") {
            mutateSave(Payload);
        } else {
            mutateUpdate(Payload);
        }
    };

    return (
        <tr className={`cursor-pointer container`}>
            <td
                onClick={(e) =>
                    !isModify &&
                    Selected(
                        itemDetail.id,
                        itemDetail.reading_name,
                        itemDetail.charge,
                        itemDetail.charge_id,
                        itemDetail.base_rate
                    )
                }
                className="bg-hover"
            >
                <DropDownCharge
                    UpdateStateHandler={ModifyArray}
                    itemDetail={itemDetail}
                    forCrudTableDD={true}
                    filter={true}
                    className={`${!isModify && "disabled"} text-center`}
                />
            </td>
            <td
                onClick={(e) =>
                    !isModify &&
                    Selected(
                        itemDetail.id,
                        itemDetail.reading_name,

                        itemDetail.charge,
                        itemDetail.charge_id,
                        itemDetail.base_rate
                    )
                }
                className="bg-hover"
            >
                <input
                    type="text"
                    className={`${!isModify && "disabled"}`}
                    value={itemDetail.reading_name}
                    onChange={(e) =>
                        ModifyArray("reading_name", e.target.value)
                    }
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
                </div>
            </td>
        </tr>
    );
};

export default ReadingCrud;
