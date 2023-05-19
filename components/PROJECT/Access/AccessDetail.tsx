import React, { useState } from "react";
import style from "../../../styles/Project/PropertyDetails.module.scss";
import { PencilButton } from "../../Reusable/Icons";
import AccessForm from "./AccessForm";
import AddUserForm from "./AddUserForm";

type PermissionsRole = {
    access: string[];
    menu: string;
};

type UserRole = {
    id: number;
    employee_id: number;
    name: string;
    position: string;
    department: string;
};

type Props = {
    data: any;
};

export default function AccessDetail({ data }: Props) {
    const [toggleRole, setToggleRole] = useState(false);

    const [toggleUser, setToggleUser] = useState(false);

    const usersID = data.data.users.map((item: { id: number }) => {
        return item.id;
    });

    return (
        <div>
            {toggleUser && (
                <AddUserForm
                    externalDefaultValue={usersID}
                    roleName={data?.data.name}
                    setToggleUser={setToggleUser}
                />
            )}
            {toggleRole && (
                <AccessForm
                    type={"modify"}
                    RoleName={data?.data.name}
                    DefaultValue={data?.data.permissions.map((item: any) => {
                        return {
                            menu: item.menu,
                            role: item.access,
                            duration: 0,
                        };
                    })}
                    setToggleForm={setToggleRole}
                    id={data?.data?.id}
                />
            )}
            <div className="flex justify-between items-center mb-5">
                <h1 className="pageTitle mb-5">Role Details</h1>
            </div>

            <ul className="rounded-lg mb-10 flex flex-wrap w-full justify-between">
                <li className="bg-white flex flex-wrap shadow-lg w-full p-10 rounded-2xl relative">
                    <div className="absolute right-4 top-4">
                        <PencilButton
                            FunctionOnClick={() => setToggleRole(true)}
                            title={"Modify"}
                        />
                    </div>
                    <div className="w-full 640px:w-full">
                        <p className="label_text">ROLE</p>
                        <h1 className="main_text">{data?.data?.name}</h1>
                    </div>
                    <div className="w-full 640px:w-full overflow-auto">
                        <table className="w-full min-w-[300px]">
                            <thead>
                                <tr>
                                    <th className="label_text">PERMISSIONS</th>
                                    <th className="label_text">ACCESS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.permissions.map(
                                    (item: PermissionsRole, index: number) => (
                                        <tr key={index}>
                                            <td>
                                                <h1 className="main_text noMB">
                                                    {item.menu}
                                                </h1>
                                            </td>
                                            <td>
                                                <h1 className="main_text noMB capitalize">
                                                    {item.access.map(
                                                        (
                                                            itemAccess: any,
                                                            index: number
                                                        ) =>
                                                            Number(
                                                                item.access
                                                                    .length
                                                            ) -
                                                                1 ===
                                                            index
                                                                ? itemAccess
                                                                : itemAccess +
                                                                  ", "
                                                    )}
                                                </h1>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>

            <ul className={`${style.OneRow} ${style.narrow} relative`}>
                <li className="table-container ">
                    <div className="absolute right-4 top-4">
                        <PencilButton
                            FunctionOnClick={() => setToggleUser(true)}
                            title={"Modify"}
                        />
                    </div>
                    <h1 className="pageTitle mb-5">User List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">EMPLOYEE ID</th>
                                <th className="label_text">NAME</th>
                                <th className="label_text">POSITION</th>
                                <th className="label_text">DEPARTMENT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.users.map(
                                (item: UserRole, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <h1 className="main_text noMB">
                                                {item.employee_id}
                                            </h1>
                                        </td>
                                        <td>
                                            <h1 className="main_text noMB">
                                                {item.name}
                                            </h1>
                                        </td>
                                        <td>
                                            <h1 className="main_text noMB">
                                                {item.position}
                                            </h1>
                                        </td>
                                        <td>
                                            <h1 className="main_text noMB">
                                                {item.department}
                                            </h1>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    );
}
