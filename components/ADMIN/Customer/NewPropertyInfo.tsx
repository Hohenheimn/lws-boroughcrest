import React, { useState, useContext, useRef, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import style from "../../../styles/Popup_Modal.module.scss";
import { useRouter } from "next/router";
import {
    PostCustomerDraft,
    PostCustomerSave,
    GetUnitCode,
} from "../../ReactQuery/CustomerMethod";

type NewPropertyInfo = {
    setActiveForm: Function;
    isActiveForm: any;
    DraftImageFile: any;
};

export default function NewPropertyInfo({
    setActiveForm,
    isActiveForm,
    DraftImageFile,
}: NewPropertyInfo) {
    const router = useRouter();
    const [whichSaveBtn, setWhichSaveBtn] = useState("");
    const { isNewCustomer, setNewCustomer, isDraft, emptyCustomer } =
        useContext(AppContext);
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

    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };
    const [isSave, setSave] = useState(false);

    // MUTATION START HERE
    // Save Mutation
    const Success = () => {
        if (whichSaveBtn === "save") {
            emptyCustomer();
            router.push("");
        }
        if (whichSaveBtn === "savenew") {
            router.reload();
            // // refetch Draft
            // refetch();
            // // empty Field
            // emptyCustomer();
            // // Go to first form
            // setActiveForm((item: boolean[]) => [
            //     (item[0] = true),
            //     (item[1] = false),
            //     (item[2] = false),
            // ]);
        }
    };
    const { isLoading: MutateLoading, mutate } = PostCustomerSave(Success);

    const SaveMutation = async () => {
        const ArrayPropertyID = isProperty.map((item: any) => {
            return item.unitCode;
        });

        if (ArrayPropertyID.includes("")) {
            alert("Cannot proceed, one of unit code is empty");
            return;
        }

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

        if (isDraft) {
            newData = {
                ...newData,
                image_photo: DraftImageFile.profile_file,
                image_valid_id: DraftImageFile.valid_file,
                image_signature: DraftImageFile.signature,
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
        mutate(formData);
    };

    // SAVE BUTTONS
    const Save = () => {
        setWhichSaveBtn("save");
        SaveMutation();
    };
    const SaveNew = () => {
        setWhichSaveBtn("savenew");
        SaveMutation();
    };

    // SAVE DRAFT MUTATION
    const SuccessDraft = () => {
        emptyCustomer();
        router.push("");
    };
    const { isLoading: DraftLoading, mutate: DraftMutate } =
        PostCustomerDraft(SuccessDraft);

    const SaveDraft = async () => {
        let newData = { ...isNewCustomer, unit_codes: isProperty };

        if (newData.type === "Company" || newData.type === "company") {
            newData = {
                ...newData,
                individual_birth_date: "",
                individual_citizenship: "",
                individual_co_owner: "",
            };
        }
        if (newData.type === "individual" || newData.type === "Individual") {
            newData = { ...newData, company_contact_person: "" };
        }

        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(newData);

        await keys.forEach((key) => {
            arrayData.push({
                key: key,
                keyData: newData[key],
            });
        });
        arrayData.map(({ key, keyData }: any) => {
            if (key === "unit_codes") {
                const stringify = JSON.stringify(keyData);
                formData.append("unit_codes", stringify);
            } else {
                formData.append(key, keyData);
            }
        });
        // DraftMutate(formData);
        alert("Unavailable for now!");
    };

    return (
        <div className={`${isActiveForm[2] ? "" : "hidden"}`}>
            <h1 className=" w-full text-[24px] mb-3">Property Information</h1>

            <table className="w-full mb-20">
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
                        />
                    ))}
                </tbody>
            </table>

            <div className={style.SaveButton}>
                <button
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={Back}
                >
                    BACK
                </button>
                {(MutateLoading || DraftLoading) && (
                    <div className={style.Save}>
                        <div>
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        </div>
                    </div>
                )}
                {!MutateLoading && !DraftLoading && (
                    <div className={style.Save}>
                        <div onClick={() => setSave(!isSave)}>
                            SAVE{" "}
                            <RiArrowDownSFill className=" ml-1 text-[24px]" />
                        </div>
                        {isSave && (
                            <ul>
                                <li>
                                    <button
                                        type="submit"
                                        name="save"
                                        onClick={Save}
                                    >
                                        SAVE
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="submit"
                                        name="save-new"
                                        onClick={SaveNew}
                                    >
                                        SAVE & NEW
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="submit"
                                        name="save-new"
                                        onClick={SaveDraft}
                                    >
                                        SAVE AS DRAFT
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
type List = {
    detail: any;
    setProperty: Function;
    isProperty: {}[];
    id: number;
};
const List = ({ detail, isProperty, setProperty, id }: List) => {
    const newID = Math.random();
    const [isSelect, setSelect] = useState(false);

    const updateValue = (event: any) => {
        const UnitCode = event.target.innerHTML;
        let validate = true;
        isProperty.map((item: any) => {
            if (item.unitCode === UnitCode) {
                alert("Selected Unit Code already in the list");
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
            <td className=" max-w-[50px] pr-2 ">
                <div className=" relative">
                    <input
                        type="text"
                        value={detail.unitCode}
                        onChange={(e) => updateValue(e)}
                        className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                        onFocus={() => setSelect(true)}
                    />
                    {isSelect && (
                        <Select
                            setSelect={setSelect}
                            updateValue={updateValue}
                        />
                    )}
                </div>
            </td>
            <td className="pr-2">
                <p className="w-full rounded-md text-black h-6 px-2 text-[14px] py-[2px] outline-none bg-ThemeRed50">
                    {detail.project}
                </p>
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
        <ul
            ref={Menu}
            className=" absolute top-full left-0 w-full bg-white p-3 z-10"
        >
            {isLoading && (
                <div className="flex justify-center">
                    <ScaleLoader color="#8f384d" height="10px" width="2px" />
                </div>
            )}
            {!isLoading &&
                data?.data.map((item: any, index: number) => (
                    <li
                        key={index}
                        data-projname={item.project.name}
                        onClick={updateValue}
                    >
                        {item.unit_code}
                    </li>
                ))}
        </ul>
    );
};
