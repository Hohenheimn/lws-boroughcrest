import React, { useContext, useEffect, useState } from "react";
import ModalTemp from "../../Reusable/ModalTemp";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Tippy from "@tippy.js/react";
import { RiArrowDownSFill } from "react-icons/ri";
import { useRouter } from "next/router";
import AppContext from "../../Context/AppContext";
import {
    RolePermission,
    RolesAndPermissionTable,
} from "../user/RolesAndPermissionTable";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import { PostRole, UpdateRole } from "./Query";
import { ScaleLoader } from "react-spinners";
import { useQueryClient } from "react-query";

type Props = {
    type: string;
    RoleName: string;
    DefaultValue: SelectedRolePermission[];
    setToggleForm: Function;
    id: number;
};
type SelectedRolePermission = {
    menu: string;
    role: string[];
    duration: number;
};

export default function AccessForm({
    type,
    DefaultValue,
    RoleName,
    setToggleForm,
    id,
}: Props) {
    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const ID: any = router.query.id;

    const [isSave, setSave] = useState(false);

    const [isButtonClicked, setButtonClicked] = useState("");

    let buttonClicked = "";

    const [isRoleName, setRoleName] = useState<string>(RoleName);

    const [Roles, setRoles] = useState<RolePermission[]>(
        RolesAndPermissionTable
    );

    const [isSelectedRolePermission, setSelectedRolePermission] =
        useState<SelectedRolePermission[]>(DefaultValue);

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

    const CloseHandler = () => {
        if (type === "create" || router.query.modify !== undefined) {
            router.push("");
        }
        setToggleForm(false);
    };

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
                                console.log(allAllowedPermission);
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

    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries("get-roles");
        queryClient.invalidateQueries(["show-role", `${id}`]);

        let message = "";
        if (type === "modify" && ID !== undefined) {
            message = "Role successfully Updated!";
        } else {
            message = "Role successfully Registered!";
        }
        setPrompt({
            message: message,
            type: "success",
            toggle: true,
        });

        if (buttonClicked === "new") {
            setSelectedRolePermission([]);
            setRoles(RolesAndPermissionTable);
            setRoleName("");
            router.push("/project/access?new");
        } else {
            CloseHandler();
        }
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate: Create, isLoading: CreateLoading } = PostRole(
        onSuccess,
        onError
    );

    const { mutate: Update, isLoading: UpdateLoading } = UpdateRole(
        onSuccess,
        onError,
        id
    );

    const SaveHandler = (button: string) => {
        setButtonClicked(button);
        buttonClicked = button;
        if (isSelectedRolePermission.length <= 0) {
            setPrompt({
                message: "Select a permissions",
                type: "draft",
                toggle: true,
            });
            return;
        }
        // note filter selected Menu na empty ang role
        const filterAccess = isSelectedRolePermission.filter(
            (filteritem) => filteritem.role.length > 0
        );
        const Payload = {
            name: isRoleName,
            permissions: filterAccess.map((item) => {
                return {
                    menu: item.menu,
                    access: item.role,
                };
            }),
        };
        if (type === "modify") {
            Update(Payload);
        } else {
            Create(Payload);
        }
    };

    return (
        <ModalTemp wide={true} alignStart={true}>
            <p className=" text-[16px] mb-3 font-bold capitalize">
                {type} Role
            </p>
            <ul className=" flex justify-between flex-wrap 480px:mb-2 pb-4">
                <li className=" w-4/12 480px:w-full">
                    <p className="text-Themered text-[12px] font-semibold mb-1 uppercase">
                        ROLE
                    </p>
                    <input
                        type="text"
                        className="field"
                        value={isRoleName}
                        onChange={(e) => {
                            if (e.target.value.length <= 50) {
                                setRoleName(e.target.value);
                            }
                        }}
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

            <div className="DropDownSave">
                <button className="ddback" onClick={CloseHandler}>
                    CLOSE
                </button>

                <div className="ddSave">
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className="ddsave_button"
                            onClick={() => {
                                SaveHandler("save");

                                setSave(false);
                            }}
                        >
                            {CreateLoading || UpdateLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "SAVE"
                            )}
                        </button>
                        <aside className="ddArrow">
                            <RiArrowDownSFill
                                onClick={() => setSave(!isSave)}
                            />
                        </aside>
                    </div>
                    {isSave && (
                        <ul className="bottomSide">
                            <li>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        SaveHandler("new");
                                        setSave(false);
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
