import React, { useState, useContext, useRef, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import style from "../../../styles/Popup_Modal.module.scss";
import {
    PostCustomerSave,
    GetUnitCode,
    PostCustomerDraft,
} from "../../ReactQuery/CustomerMethod";
import DynamicPopOver from "../../Reusable/DynamicPopOver";

type NewPropertyInfo = {
    setActiveForm: Function;
    isActiveForm: any;
};

export default function NewPropertyInfo({
    setActiveForm,
    isActiveForm,
}: NewPropertyInfo) {
    const [whichSaveBtn, setWhichSaveBtn] = useState("");
    const [isError, setError] = useState("");

    const {
        isNewCustomer,
        setNewCustomer,
        NewCustomerDefault,
        setCusReset,
        setCusToggle,
        cusReset,
        setPrompt,
        CusError,
        setCusError,
        ErrorDefault,
    } = useContext(AppContext);

    const [isProperty, setProperty] = useState<any>([
        {
            id: 1,
            unitCode: "",
            project: "",
        },
    ]);

    useEffect(() => {
        if (isNewCustomer.unit_codes.length > 0) {
            setProperty([...isNewCustomer.unit_codes]);
        }
    }, []);

    const Success = async () => {
        // Prompt Message
        setPrompt((prev: any) => ({
            ...prev,
            message: `Customer successfully ${
                whichSaveBtn === "draft" ? "saved as draft" : "registered"
            }!`,
            type: whichSaveBtn === "draft" ? "draft" : "success",
            toggle: true,
        }));
        setCusReset(!cusReset);
        // Reset Customer Fields
        setNewCustomer({ ...NewCustomerDefault });
        // Reset Unicode Error
        setError("");
        setCusError({ ...ErrorDefault });
        // Close Save button
        setSave(false);
        // Reset UnitCode Array
        setProperty([
            {
                id: 1,
                unitCode: "",
                project: "",
            },
        ]);
        if (whichSaveBtn === "savenew") {
            backTofirstPage();
        }
        if (whichSaveBtn === "save" || whichSaveBtn === "draft") {
            setCusToggle(false);
        }
    };

    const onError = (e: any) => {
        const ErrorField = e.response.data;
        let message: any;
        if (ErrorField > 0 || ErrorField !== null || ErrorField !== undefined) {
            setCusError({ ...ErrorField });
            message = "Please check all the fields!";
        } else {
            message = "Something is wrong!";
        }
        setPrompt((prev: any) => ({
            ...prev,
            message: message,
            type: "error",
            toggle: true,
        }));
    };

    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };
    const [isSave, setSave] = useState(false);

    const backTofirstPage = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = true),
            (item[1] = false),
            (item[2] = false),
        ]);
    };

    // MUTATION START HERE
    // Save Mutation
    const { isLoading: MutateLoading, mutate } = PostCustomerSave(
        Success,
        onError
    );
    const { isLoading: MutateDraftLoading, mutate: DraftSave } =
        PostCustomerDraft(Success);

    const SaveMutation = async (button: any) => {
        const ArrayPropertyID = isProperty.map((item: any) => {
            if (item.unitCode !== "") {
                return item.unitCode;
            } else {
                return "";
            }
        });

        let newData = { ...isNewCustomer, unit_codes: ArrayPropertyID };

        // if Type is company, empty the field of not for company
        if (newData.type === "Company" || newData.type === "company") {
            newData = {
                ...newData,
                individual_birth_date: "",
                individual_citizenship: "",
                individual_co_owner: "",
            };
        }
        // if Type is individual, empty the field of not for individual
        if (newData.type === "individual" || newData.type === "Individual") {
            newData = { ...newData, company_contact_person: "" };
        }
        // Draft button clicked, change status to draft
        if (button === "draft") {
            newData = {
                ...newData,
                status: "draft",
            };
        } else {
            newData = {
                ...newData,
                status: isNewCustomer.status,
            };
        }

        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(newData);

        await keys.forEach((key) => {
            if (
                key === "image_photo" ||
                key === "image_valid_id" ||
                key === "image_signature"
            ) {
                if (newData[key] === undefined) {
                    arrayData.push({
                        key: key,
                        keyData: "",
                    });
                } else {
                    arrayData.push({
                        key: key,
                        keyData: newData[key],
                    });
                }
            } else {
                arrayData.push({
                    key: key,
                    keyData: newData[key],
                });
            }
        });
        arrayData.map(({ key, keyData }: any) => {
            if (key === "unit_codes") {
                const stringify = JSON.stringify(keyData);
                formData.append("unit_codes", stringify);
            } else {
                formData.append(key, keyData);
            }
        });

        if (button === "draft") {
            DraftSave(formData);
        } else {
            mutate(formData);
        }
    };

    // SAVE BUTTONS
    const Save = () => {
        setWhichSaveBtn("save");
        SaveMutation("save");
    };
    const SaveNew = () => {
        setWhichSaveBtn("savenew");
        SaveMutation("savenew");
    };
    const Draft = () => {
        setWhichSaveBtn("draft");
        SaveMutation("draft");
    };

    return (
        <div className={`${isActiveForm[2] ? "" : "hidden"}`}>
            <h1 className=" w-full text-[24px] mb-3">Property Information</h1>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            UNIT CODE
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            PROJECT
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isProperty.map((item: any, index: number) => (
                        <List
                            detail={item}
                            setProperty={setProperty}
                            id={index}
                            key={index}
                            isProperty={isProperty}
                            setUnitCodeError={setError}
                        />
                    ))}
                </tbody>
            </table>
            {isError !== "" && <p className={style.ErrorMsg}>{isError}</p>}

            <div className={style.SaveButton}>
                <button className={style.back} onClick={Back}>
                    BACK
                </button>

                <div className={style.Save}>
                    <div>
                        <button
                            type="submit"
                            name="save"
                            onClick={Save}
                            className={style.save_button}
                        >
                            {MutateLoading || MutateDraftLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "Save"
                            )}
                        </button>
                        <aside className={style.Arrow}>
                            <RiArrowDownSFill
                                onClick={() => setSave(!isSave)}
                            />
                        </aside>
                    </div>
                    {isSave && (
                        <ul>
                            <li>
                                <button type="submit" onClick={SaveNew}>
                                    SAVE & NEW
                                </button>
                            </li>
                            <li>
                                <button type="submit" onClick={Draft}>
                                    SAVE AS DRAFT
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
type List = {
    detail: any;
    setProperty: Function;
    isProperty: {}[];
    id: number;
    setUnitCodeError: any;
};
const List = ({ detail, isProperty, setProperty, id }: List) => {
    const newID = Math.random();
    const [isSelect, setSelect] = useState(false);
    const { setPrompt } = useContext(AppContext);

    const updateValue = (event: any) => {
        const UnitCode = event.target.innerHTML;
        let validate = true;
        isProperty.map((item: any) => {
            if (item.unitCode === UnitCode) {
                setPrompt({
                    message: "Selected Unit Code already in the list!",
                    type: "error",
                    toggle: true,
                });
                validate = false;
                return;
            }
        });
        if (validate === true) {
            const newItems = isProperty.map((item: any) => {
                if (detail.id == item.id) {
                    return {
                        ...item,
                        project: event.target.getAttribute("data-projname"),
                        unitCode: UnitCode,
                    };
                }
                return item;
            });
            setProperty(newItems);
            setSelect(false);
        }
    };

    return (
        <tr>
            <td className="pr-2 ">
                <div className=" relative">
                    <DynamicPopOver
                        className=""
                        samewidth={true}
                        toRef={
                            <input
                                type="text"
                                value={detail.unitCode}
                                onChange={(e) => updateValue(e)}
                                className="field w-full"
                                onFocus={() => setSelect(true)}
                            />
                        }
                        toPop={
                            <>
                                {isSelect && (
                                    <Select
                                        setSelect={setSelect}
                                        updateValue={updateValue}
                                    />
                                )}
                            </>
                        }
                    />
                </div>
            </td>
            <td className="pr-2">
                <input
                    type="text"
                    className="field disabled"
                    value={detail.project}
                />
            </td>
            <td className=" flex justify-center">
                <div className="flex justify-between w-10">
                    {isProperty.length > 1 && (
                        <button
                            className=" text-[32px] text-ThemeRed mr-2"
                            onClick={() =>
                                setProperty((item: any[]) =>
                                    item.filter(
                                        (x: { id: any }) => x.id !== detail.id
                                    )
                                )
                            }
                        >
                            -
                        </button>
                    )}
                    {isProperty.length - 1 === id && (
                        <button
                            className=" text-[32px] text-ThemeRed"
                            onClick={() =>
                                setProperty((item: any) => [
                                    ...item,
                                    {
                                        id: newID,
                                        unitCode: "",
                                        project: "",
                                    },
                                ])
                            }
                        >
                            +
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

const Select = ({ setSelect, updateValue }: any) => {
    const Menu = useRef<any>();

    // Get unit codes to display
    const { isLoading, data, isError } = GetUnitCode();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!Menu.current.contains(e.target)) {
                setSelect(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <ul ref={Menu} className="dropdown-list">
            {isLoading && (
                <div className="flex justify-center">
                    <ScaleLoader color="#8f384d" height="10px" width="2px" />
                </div>
            )}
            {!isLoading &&
                data?.data.map((item: any, index: number) => (
                    <li
                        key={index}
                        data-projname={item?.project?.name}
                        onClick={updateValue}
                        className="cursor-pointer"
                    >
                        {item?.unit_code}
                    </li>
                ))}
        </ul>
    );
};
