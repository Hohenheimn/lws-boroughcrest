import React, { useContext, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import SelectDropdown from "../../Reusable/SelectDropdown";
import style from "../../../styles/Popup_Modal.module.scss";
import { UserInfoPayload } from "./UserForm";
import AppContext from "../../Context/AppContext";

type Props = {
    setUserForm: Function;
    userForm: boolean[];
    userInfo?: UserInfoPayload;
    type: string;
    DefaultTable: isTableItem[];
    id?: string | number;
    role_id?: string | number;
    role_name?: string;
};

type isTableItem = {
    id: string | number;
    permission: string;
    access: string;
    duration: number | string;
};

export default function UserRolePermissionsForm({
    setUserForm,
    userForm,
    userInfo,
    type,
    DefaultTable,
    id,
    role_id,
    role_name,
}: Props) {
    let buttonClicked = "";
    const [isSave, setSave] = useState(false);
    const { setPrompt } = useContext(AppContext);
    const [isTable, setTable] = useState<isTableItem[]>([]);
    const [isRole, setRole] = useState<any>({
        id: "1",
        value: "",
    });

    useEffect(() => {
        setRole({
            id: role_id,
            value: role_name,
        });
        setTable(DefaultTable);
    }, []);

    const Savehandler = (button: string) => {
        buttonClicked = button;
        if (isRole.id === "") {
            setPrompt({
                message: "Select a role add",
                type: "draft",
                toggle: true,
            });
        } else if (
            isTable.some(
                (prev) =>
                    prev.access === "" &&
                    prev.duration === "" &&
                    prev.permission === ""
            )
        ) {
            setPrompt({
                message: "Fill out all the fields of permissions",
                type: "draft",
                toggle: true,
            });
        } else {
            if (type === "create") {
                const Payload = {
                    ...userInfo,
                    role_id: isRole.id,
                    permissions: isTable,
                };
            } else if (type === "modify") {
                const Payload = {
                    role_id: isRole.id,
                    permissions: isTable,
                };
                console.log(Payload);
            }
        }
        setSave(false);
    };
    return (
        <div className={`${userForm[1] === true ? "" : "hidden"}`}>
            <p className=" text-[16px] mb-3 font-bold">
                Create Roles & Permissions
            </p>
            <ul className=" flex mb-10 justify-between border-b-2 border-white flex-wrap 480px:mb-2 pb-4">
                <li className=" w-4/12 480px:w-full">
                    <p className="text-Themered text-[12px] font-semibold mb-1 uppercase">
                        ROLE
                    </p>
                    <SelectDropdown
                        selectHandler={(value: string) => {
                            // setReceiptType(value);
                        }}
                        className=""
                        inputElement={
                            <input
                                className="w-full field"
                                value={""}
                                readOnly
                            />
                        }
                        listArray={[
                            "Admin",
                            "Admin Staff",
                            "Finance",
                            " Accounting",
                        ]}
                    />
                </li>
            </ul>

            <table className="w-full mb-20">
                <thead>
                    <tr>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            PERMISSION
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            ACCESS
                        </th>
                        <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                            DURATION
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {isTable.map((item, index) => (
                        <List
                            detail={item}
                            setTable={setTable}
                            key={index}
                            isTable={isTable}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>

            <div className={style.SaveButton}>
                <aside
                    className={style.back}
                    onClick={() => setUserForm([true, false])}
                >
                    {type === "create" ? "BACK" : "CANCEL"}
                </aside>

                <div className={style.Save}>
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className={style.save_button}
                            onClick={() => {
                                Savehandler("save");
                            }}
                        >
                            SAVE
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
                                <button
                                    type="submit"
                                    name="save-new"
                                    onClick={() => {
                                        Savehandler("new");
                                    }}
                                >
                                    SAVE & NEW
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
    detail: isTableItem;
    setTable: Function;
    isTable: isTableItem[];
    index: number;
};
const List = ({ detail, setTable, isTable, index }: List) => {
    let newID: any;
    useEffect(() => {
        newID = Math.random();
    });

    const updateValue = (event: any, key: string, valueSelect: string) => {
        const newItems = isTable.map((item: any) => {
            if (detail.id == item.id) {
                if (key === "duration")
                    return { ...item, duration: event.target.value };
                if (key === "permission")
                    return { ...item, permission: valueSelect };
                if (key === "access") return { ...item, access: valueSelect };
            }
            return item;
        });
        setTable(newItems);
    };
    return (
        <tr>
            <td className=" pr-2">
                <SelectDropdown
                    selectHandler={(value: string) => {
                        updateValue("", "permission", value);
                    }}
                    className=""
                    inputElement={
                        <input
                            className="w-full field"
                            value={detail.permission}
                            readOnly
                        />
                    }
                    listArray={["Admin", "Staff"]}
                />
            </td>
            <td className=" pr-2">
                <SelectDropdown
                    selectHandler={(value: string) => {
                        updateValue("", "access", value);
                    }}
                    className=""
                    inputElement={
                        <input
                            className="w-full field"
                            value={detail.access}
                            readOnly
                        />
                    }
                    listArray={["View", "Access"]}
                />
            </td>
            <td className="  pr-2">
                <input
                    type="number"
                    className="field w-full"
                    value={detail.duration}
                    placeholder="Number of Days"
                    onChange={(e) => updateValue(e, "duration", "")}
                />
            </td>

            <td className=" flex justify-start">
                {isTable.length > 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed mr-2"
                        onClick={() =>
                            setTable((item: any[]) =>
                                item.filter(
                                    (x: { id: any }) => x.id !== detail.id
                                )
                            )
                        }
                    >
                        -
                    </button>
                )}
                {isTable.length === index + 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed"
                        onClick={() =>
                            setTable((item: any) => [
                                ...item,
                                {
                                    id: newID,
                                    permissions: "",
                                    access: "",
                                    duration: "",
                                },
                            ])
                        }
                    >
                        +
                    </button>
                )}
            </td>
        </tr>
    );
};
