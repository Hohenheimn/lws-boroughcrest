import React, { useContext, useEffect, useState } from "react";
import ModalTemp from "../../Reusable/ModalTemp";
import { UserInfo } from "./UserForm";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Tippy from "@tippy.js/react";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import {
    RolePermission,
    RolesAndPermissionTable,
} from "./RolesAndPermissionTable";
import Image from "next/image";
import { useRouter } from "next/router";
import { NumberBlockInvalidKey } from "../../Reusable/InputField";
import AppContext from "../../Context/AppContext";

type Props = {
    setUserForm: Function;
    type: string;
    userInfo: UserInfo;
};
type SelectedRolePermission = {
    menu: string;
    role: string[];
    duration: number;
};

export default function UserRoleAndPermissionsCheckBox({
    setUserForm,
    type,
    userInfo,
}: Props) {
    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const ID: any = router.query.id;

    const [isSave, setSave] = useState(false);

    const [isButtonClicked, setButtonClicked] = useState("");

    const [Roles, setRoles] = useState<RolePermission[]>(
        RolesAndPermissionTable
    );

    const [isSelectedRolePermission, setSelectedRolePermission] = useState<
        SelectedRolePermission[]
    >([
        // {
        //     menu: "Customer",
        //     role: ["modify", "create"],
        //     duration: 10,
        // },
        // {
        //     menu: "Chart of Accounts",
        //     role: ["modify"],
        //     duration: 10,
        // },
        // {
        //     menu: "Charges",
        //     role: ["approve", "view"],
        //     duration: 50,
        // },
    ]);

    useEffect(() => {
        const CloneToUpdate = Roles.map((item: RolePermission) => {
            let update = false;
            const innerCloneToFilter = isSelectedRolePermission.filter(
                (filterItem) => filterItem.menu === item.menu
            );
            const innerClone = innerCloneToFilter.map((innerItem) => {
                update = true;
                return {
                    ...item,
                    roles: {
                        ...item.roles,
                        all:
                            item.roles.all === null
                                ? null
                                : innerItem.role.length >= item.rolesNumber
                                ? true
                                : false,
                        view:
                            item.roles.view === null
                                ? null
                                : innerItem.role.includes("view"),
                        create:
                            item.roles.create === null
                                ? null
                                : innerItem.role.includes("create"),
                        modify:
                            item.roles.modify === null
                                ? null
                                : innerItem.role.includes("modify"),
                        print:
                            item.roles.print === null
                                ? null
                                : innerItem.role.includes("print"),
                        approve:
                            item.roles.approve === null
                                ? null
                                : innerItem.role.includes("approve"),
                    },
                    duration: innerItem.duration,
                };
            });
            if (update) {
                return innerClone[0];
            } else {
                return item;
            }
        });
        setRoles(CloneToUpdate);
    }, [isSelectedRolePermission]);

    const UpdateRow = (
        menu: string,
        permission: string,
        value: number | boolean | string
    ) => {
        if (permission === "duration") {
            let validate = false;
            const cloneUpdateDuration = isSelectedRolePermission.map((item) => {
                if (item.menu === menu && item.role.length > 0) {
                    validate = true;
                    return {
                        ...item,
                        duration: Number(value),
                    };
                }
                return item;
            });

            if (validate) {
                setSelectedRolePermission(cloneUpdateDuration);
            } else {
                setPrompt({
                    message: "Select a Permissions first",
                    type: "draft",
                    toggle: true,
                });
            }
        } else {
            if (
                isSelectedRolePermission.some(
                    (someItem) => someItem.menu === menu
                )
            ) {
                // If exist na si menu, mag add o remove nalng ng role
                const cloneUpdateExistedMenu = isSelectedRolePermission.map(
                    (item) => {
                        if (item.menu === menu) {
                            if (item.role.includes(permission)) {
                                // remove permission
                                const cloneToRemove = item.role.filter(
                                    (filterItem) => filterItem !== permission
                                );
                                return {
                                    ...item,
                                    role: cloneToRemove,
                                };
                            } else {
                                // Add Permision
                                const allAllowedPermission: string[] =
                                    GetAllowedPermissionPerRow(menu);
                                return {
                                    ...item,
                                    role:
                                        permission === "all"
                                            ? allAllowedPermission
                                            : [...item.role, permission],
                                };
                            }
                        }
                        return item;
                    }
                );
                // const filterRole = cloneUpdateExistedMenu.filter(
                //     (itemFilter) => itemFilter.role.length <= 0
                // );
                setSelectedRolePermission(cloneUpdateExistedMenu);
            } else {
                // Add menu
                const allAllowedPermission: string[] =
                    GetAllowedPermissionPerRow(menu);
                setSelectedRolePermission([
                    ...isSelectedRolePermission,
                    {
                        menu: menu,
                        role:
                            permission === "all"
                                ? allAllowedPermission
                                : [permission],
                        duration: 0,
                    },
                ]);
            }
        }
    };

    const GetAllowedPermissionPerRow = (menu: string) => {
        let allAllowedPermission: string[] = [];
        Roles.map((item) => {
            if (item.menu === menu) {
                const roles: any = item.roles;
                const keys = Object.keys(roles);
                keys.forEach((key: any) => {
                    if (roles[key] !== null && key !== "all") {
                        allAllowedPermission = [...allAllowedPermission, key];
                    }
                });
            }
        });
        return allAllowedPermission;
    };

    const SaveHandler = () => {
        // note filter selected Menu na empty ang role
        if (type === "modify" && ID !== undefined) {
            console.log("modify");
        } else {
            console.log("create");
            console.log(isSelectedRolePermission);
        }
    };

    return (
        <ModalTemp wide={true} alignStart={true}>
            <p className=" text-[16px] mb-3 font-bold capitalize">
                {type} Roles & Permissions
            </p>
            <ul className=" flex justify-between flex-wrap 480px:mb-2 pb-4">
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
                        listArray={["Admin Staff", "Finance", " Accounting"]}
                    />
                </li>
            </ul>

            <div className="w-full overflow-x-auto">
                <table className="rolePermisionTable">
                    <thead>
                        <tr>
                            <th>MENU</th>
                            <th className="flex items-center">
                                <Tippy theme="ThemeRed" content={<AllInfo />}>
                                    <div>
                                        <AiOutlineInfoCircle className=" text-ThemeRed font-NHU-bold mr-1" />
                                    </div>
                                </Tippy>
                                ALL
                            </th>
                            <th>VIEW</th>
                            <th>CREATE</th>
                            <th>MODIFY</th>
                            <th>PRINT</th>
                            <th>APPROVE</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Roles.map((item: RolePermission, index) => (
                            <TableList
                                key={index}
                                itemDetail={item}
                                UpdateRow={UpdateRow}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={style.SaveButton}>
                <aside
                    className={style.back}
                    onClick={() => {
                        setUserForm([true, false]);
                    }}
                >
                    BACK
                </aside>

                <div className={style.Save}>
                    <div>
                        <button
                            type="submit"
                            name="save"
                            onClick={() => {
                                SaveHandler();
                                setButtonClicked("save");
                            }}
                            className={style.save_button}
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
                                        SaveHandler();
                                        setButtonClicked("new");
                                    }}
                                >
                                    SAVE & NEW
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </ModalTemp>
    );
}

type TableListProps = {
    itemDetail: RolePermission;
    UpdateRow: (
        menu: string,
        key: string,
        value: number | boolean | string
    ) => void;
};

const TableList = ({ itemDetail, UpdateRow }: TableListProps) => {
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });
    return (
        <tr
            className={`${itemDetail.type} ${
                itemDetail.sectionEnd && "sectionEnd"
            }`}
        >
            <td
                className={`menu ${
                    itemDetail.type === "secondary" && "pl-10"
                } ${itemDetail.type === "tertiary" && "pl-20"}`}
            >
                {itemDetail.menu}
            </td>
            <td>
                {itemDetail.roles.all !== null && (
                    <aside>
                        <input
                            type="checkbox"
                            checked={
                                itemDetail.roles.all !== null
                                    ? itemDetail.roles.all
                                    : false
                            }
                            onChange={(e) =>
                                UpdateRow(
                                    itemDetail.menu,
                                    "all",
                                    e.target.checked
                                )
                            }
                        />
                    </aside>
                )}
            </td>
            <td>
                {itemDetail.roles.view !== null && (
                    <aside>
                        <input
                            type="checkbox"
                            checked={
                                itemDetail.roles.view !== null
                                    ? itemDetail.roles.view
                                    : false
                            }
                            onChange={(e) =>
                                UpdateRow(
                                    itemDetail.menu,
                                    "view",
                                    e.target.checked
                                )
                            }
                        />
                    </aside>
                )}
            </td>
            <td>
                {itemDetail.roles.create !== null && (
                    <aside>
                        <input
                            type="checkbox"
                            checked={
                                itemDetail.roles.create !== null
                                    ? itemDetail.roles.create
                                    : false
                            }
                            onChange={(e) =>
                                UpdateRow(
                                    itemDetail.menu,
                                    "create",
                                    e.target.checked
                                )
                            }
                        />
                    </aside>
                )}
            </td>
            <td>
                {itemDetail.roles.modify !== null && (
                    <aside>
                        <input
                            type="checkbox"
                            checked={
                                itemDetail.roles.modify !== null
                                    ? itemDetail.roles.modify
                                    : false
                            }
                            onChange={(e) =>
                                UpdateRow(
                                    itemDetail.menu,
                                    "modify",
                                    e.target.checked
                                )
                            }
                        />
                    </aside>
                )}
            </td>
            <td>
                {itemDetail.roles.print !== null && (
                    <aside>
                        <input
                            type="checkbox"
                            checked={
                                itemDetail.roles.print !== null
                                    ? itemDetail.roles.print
                                    : false
                            }
                            onChange={(e) =>
                                UpdateRow(
                                    itemDetail.menu,
                                    "print",
                                    e.target.checked
                                )
                            }
                        />
                    </aside>
                )}
            </td>
            <td>
                {itemDetail.roles.approve !== null && (
                    <aside>
                        <input
                            type="checkbox"
                            checked={
                                itemDetail.roles.approve !== null
                                    ? itemDetail.roles.approve
                                    : false
                            }
                            onChange={(e) =>
                                UpdateRow(
                                    itemDetail.menu,
                                    "approve",
                                    e.target.checked
                                )
                            }
                        />
                    </aside>
                )}
            </td>
            <td className="duration">
                <div className="calendar">
                    <span className="cal">
                        <Image
                            src="/Images/CalendarLine.png"
                            width={12}
                            height={12}
                        />
                    </span>
                    <input
                        autoComplete="off"
                        type="number"
                        placeholder="Days"
                        value={
                            itemDetail.duration === 0 ? "" : itemDetail.duration
                        }
                        onChange={(e) => {
                            e.target.value.length <= 6 &&
                                UpdateRow(
                                    itemDetail.menu,
                                    "duration",
                                    e.target.value
                                );
                        }}
                        onKeyDown={NumberBlockInvalidKey}
                        className="field w-full"
                    />
                </div>
            </td>
        </tr>
    );
};

const AllInfo = () => {
    return (
        <table className="">
            <thead>
                <tr>
                    <th className=" text-start">ACCESS</th>
                    <th className=" text-start pl-2">ACTION</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>View</td>
                    <td className="pl-2">
                        Display only/ Unable to download/ Print or Export
                    </td>
                </tr>
                <tr>
                    <td>Create</td>
                    <td className="pl-2">
                        Input/ Import/ Process/ Apply/ Transfer/ Archive
                    </td>
                </tr>
                <tr>
                    <td>Modify</td>
                    <td className="pl-2">Edit/Update</td>
                </tr>
                <tr>
                    <td>Print</td>
                    <td className="pl-2">Print/ Export/ Post to Portal</td>
                </tr>
                <tr>
                    <td>Approved</td>
                    <td className="pl-2">
                        Approved/ Return/ Cancel/ Void/ Reject/ Review/ Send
                        portal access
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
