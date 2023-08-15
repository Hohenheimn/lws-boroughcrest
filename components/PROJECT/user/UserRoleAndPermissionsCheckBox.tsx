import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { PulseLoader, ScaleLoader } from "react-spinners";
import Tippy from "@tippy.js/react";

import style from "../../../styles/Popup_Modal.module.scss";
import AppContext from "../../Context/AppContext";
import NameIDDropdown from "../../Dropdowns/NameIDDropdown";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import { NumberBlockInvalidKey } from "../../Reusable/InputField";
import ModalLoading from "../../Reusable/ModalLoading";
import ModalTemp from "../../Reusable/ModalTemp";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { ShowRole } from "../Access/Query";
import { CreateUser, UpdateUserInfo, UpdateUserRole } from "./Query";
import {
  RolePermission,
  RolesAndPermissionTable,
} from "./RolesAndPermissionTable";
import { UserInfo } from "./UserForm";

type Props = {
  setUserForm: Function;
  type: string;
  userInfo: UserInfo;
  setSelectedRolePermission: Function;
  DefaultSelected: SelectedRolePermission[];
  isSelectedRolePermission: SelectedRolePermission[];
  isRoleName: {
    id: string;
    value: string;
  };
  setRoleName: Function;
  setUserInfo: Function;
  closeForm?: Function;
  Reset?: () => void;
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
  isSelectedRolePermission,
  DefaultSelected,
  setSelectedRolePermission,
  isRoleName,
  setRoleName,
  closeForm,
  Reset,
}: Props) {
  const { setPrompt } = useContext(AppContext);

  const router = useRouter();

  const [isSave, setSave] = useState(false);

  const [isButtonClicked, setButtonClicked] = useState("");

  let buttonClicked = "";

  const [Roles, setRoles] = useState<RolePermission[]>(RolesAndPermissionTable);

  const [loadOnce, setLoadOnce] = useState(true);

  const [isRoleID, setRoleID] = useState<any>(undefined);

  useEffect(() => {
    if (!loadOnce) {
      setRoleID(isRoleName.id);
      setLoadOnce(false);
    }
  }, [isRoleName.id]);

  const { isLoading, data } = ShowRole(
    type !== "modify" ? isRoleName.id : isRoleID
  );

  const RefreshTable = () => {
    if (router.query.id !== undefined && loadOnce) {
      setSelectedRolePermission(DefaultSelected);
      setLoadOnce(false);
      return;
    }
    if (data?.data !== undefined) {
      const clone = data?.data.permissions.map((item: any) => {
        return {
          menu: item.menu,
          role: item.access,
          duration: 0,
        };
      });

      setSelectedRolePermission(clone);
    }
  };

  useEffect(() => {
    RefreshTable();
  }, [data?.data]);

  useEffect(() => {
    if (isSelectedRolePermission.length > 0) {
      const CloneToUpdate = RolesAndPermissionTable.map(
        (item: RolePermission) => {
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
              duration: innerItem.duration === null ? 0 : innerItem.duration,
            };
          });

          if (update) {
            return innerClone[0];
          } else {
            return item;
          }
        }
      );
      setRoles(CloneToUpdate);
    }
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
      if (isSelectedRolePermission.some((someItem) => someItem.menu === menu)) {
        // If exist na si menu, mag add o remove nalng ng role
        const cloneUpdateExistedMenu = isSelectedRolePermission.map((item) => {
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
        });
        setSelectedRolePermission(cloneUpdateExistedMenu);
      } else {
        // Add menu
        const allAllowedPermission: string[] = GetAllowedPermissionPerRow(menu);
        setSelectedRolePermission([
          ...isSelectedRolePermission,
          {
            menu: menu,
            role: permission === "all" ? allAllowedPermission : [permission],
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

  const id = router.query.id;

  const onSuccess = () => {
    queryClient.invalidateQueries("user-list");

    queryClient.invalidateQueries(["user-detail", `${id}`]);

    let message = `User successfully registered`;

    if (router.query.id !== undefined) {
      message = "User roles and permissions successfully updated";
    }

    setPrompt({
      message: message,
      type: "success",
      toggle: true,
    });

    if (buttonClicked === "new") {
      Reset !== undefined && Reset();
      router.push("/project/user?new");
    } else {
      setUserForm([true, false]);
      closeForm !== undefined && closeForm();
    }
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const { mutate: CreateMutate, isLoading: CreateLoading } = CreateUser(
    onSuccess,
    onError
  );

  const { mutate: UpdateMutate, isLoading: UpdateLoading } = UpdateUserRole(
    Number(id),
    onSuccess,
    onError
  );

  const SaveHandler = async (button: string) => {
    buttonClicked = button;

    const filterAccess = isSelectedRolePermission.filter(
      (filteritem) => filteritem.role.length > 0
    );

    if (type === "modify") {
      const Payload = {
        role_id: isRoleName.id,
        permissions: filterAccess.map((item) => {
          return {
            menu: item.menu,
            access: item.role,
            duration:
              item.duration === null || item.duration === undefined
                ? 0
                : item.duration,
          };
        }),
      };
      UpdateMutate(Payload);
    } else {
      const Payload: any = {
        employee_id: userInfo.employee_id,
        name: userInfo.name,
        email: userInfo.email,
        corporate_id: userInfo.corporate_id,
        department_id: userInfo.department_id,
        contact_no: userInfo.contact_no,
        position: userInfo.position,
        image_photo: userInfo.image_photo,
        image_signature: userInfo.image_signature,
        status: userInfo.status,
        role_id: isRoleName.id,
        permissions: filterAccess.map((item) => {
          return {
            menu: item.menu,
            access: item.role,
            duration:
              item.duration === null || item.duration === undefined
                ? 0
                : item.duration,
          };
        }),
      };

      const formData = new FormData();

      const arrayData: any = [];

      const keys = Object.keys(Payload);

      await keys.forEach((key) => {
        if (
          key === "image_photo" ||
          key === "image_valid_id" ||
          key === "image_signature"
        ) {
          if (Payload[key] === undefined || Payload[key] === null) {
            arrayData.push({
              key: key,
              keyData: "",
            });
          } else {
            arrayData.push({
              key: key,
              keyData: Payload[key],
            });
          }
        } else {
          let value = Payload[key];
          if (key === "contact_no") {
            value = `0${value}`;
          }
          arrayData.push({
            key: key,
            keyData: value,
          });
        }
      });

      arrayData.map(({ key, keyData }: any) => {
        if (key === "permissions") {
          const stringify = JSON.stringify(keyData);
          formData.append(key, stringify);
        } else {
          formData.append(key, keyData);
        }
      });

      CreateMutate(formData);
    }
  };

  return (
    <ModalTemp wide={true} alignStart={true}>
      {isLoading && <ModalLoading />}
      <p className=" text-[16px] mb-3 font-bold capitalize">
        {type} Roles & Permissions
      </p>
      <ul className=" flex justify-between flex-wrap 480px:mb-2 pb-4">
        <li className=" w-4/12 480px:w-full">
          <p className="text-Themered text-[12px] font-semibold mb-1 uppercase">
            ROLE
          </p>
          <NameIDDropdown
            value={isRoleName.value}
            setValue={setRoleName}
            width={"w-[250px] 640px:w-[150px]"}
            placeholder={"Role"}
            endpoint={"/project/roles"}
            onClickFunction={RefreshTable}
          />
        </li>
      </ul>

      {isRoleName.id !== "" && (
        <>
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
        </>
      )}
      <div className={style.SaveButton}>
        <aside
          className={style.back}
          onClick={() => {
            setUserForm([true, false]);
          }}
        >
          {router.query.id === undefined ? "BACK" : "CANCEL"}
        </aside>

        <div className={style.Save}>
          <div>
            <button
              type="submit"
              name="save"
              onClick={() => {
                SaveHandler("save");
                setButtonClicked("save");
              }}
              className={style.save_button}
            >
              {CreateLoading || UpdateLoading ? (
                <ScaleLoader color="#fff" height="10px" width="2px" />
              ) : (
                "SAVE"
              )}
            </button>
            <aside className={style.Arrow}>
              <RiArrowDownSFill onClick={() => setSave(!isSave)} />
            </aside>
          </div>

          {isSave && (
            <ul>
              <li>
                <button
                  type="submit"
                  name="save-new"
                  onClick={() => {
                    SaveHandler("new");
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
      className={`${itemDetail.type} ${itemDetail.sectionEnd && "sectionEnd"}`}
    >
      <td
        className={`menu ${itemDetail.type === "secondary" && "pl-10"} ${
          itemDetail.type === "tertiary" && "pl-20"
        }`}
      >
        {itemDetail.menu}
      </td>
      <td>
        {itemDetail.roles.all !== null && (
          <aside>
            <input
              type="checkbox"
              checked={
                itemDetail.roles.all !== null ? itemDetail.roles.all : false
              }
              onChange={(e) =>
                UpdateRow(itemDetail.menu, "all", e.target.checked)
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
                itemDetail.roles.view !== null ? itemDetail.roles.view : false
              }
              onChange={(e) =>
                UpdateRow(itemDetail.menu, "view", e.target.checked)
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
                UpdateRow(itemDetail.menu, "create", e.target.checked)
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
                UpdateRow(itemDetail.menu, "modify", e.target.checked)
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
                itemDetail.roles.print !== null ? itemDetail.roles.print : false
              }
              onChange={(e) =>
                UpdateRow(itemDetail.menu, "print", e.target.checked)
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
                UpdateRow(itemDetail.menu, "approve", e.target.checked)
              }
            />
          </aside>
        )}
      </td>
      <td className="duration">
        {itemDetail.duration !== null && (
          <div className="calendar">
            <span className="cal">
              <Image
                src="/Images/CalendarLine.png"
                width={12}
                height={12}
                alt="Calendar"
              />
            </span>
            <input
              autoComplete="off"
              type="number"
              placeholder="Days"
              value={itemDetail.duration === 0 ? "" : itemDetail.duration}
              onChange={(e) => {
                e.target.value.length <= 6 &&
                  UpdateRow(itemDetail.menu, "duration", e.target.value);
              }}
              onKeyDown={NumberBlockInvalidKey}
              className="field w-full"
            />
          </div>
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
            Approved/ Return/ Cancel/ Void/ Reject/ Review/ Send portal access
          </td>
        </tr>
      </tbody>
    </table>
  );
};
