import React, { useState } from "react";
import style from "../../../styles/Project/PropertyDetails.module.scss";
import { PencilButton } from "../../Reusable/Icons";
import AccessForm from "./AccessForm";
import AddUserForm from "./AddUserForm";

export default function AccessDetail() {
    const [toggleRole, setToggleRole] = useState(false);
    const [toggleUser, setToggleUser] = useState(false);
    return (
        <div>
            {toggleUser && (
                <AddUserForm
                    externalDefaultValue={[1]}
                    setToggleUser={setToggleUser}
                />
            )}
            {toggleRole && (
                <AccessForm
                    type={"modify"}
                    RoleName={"Admin Staff"}
                    DefaultValue={[
                        {
                            menu: "Customer",
                            role: ["modify", "create"],
                            duration: 10,
                        },
                        {
                            menu: "Chart of Accounts",
                            role: ["modify"],
                            duration: 10,
                        },
                        {
                            menu: "Charges",
                            role: ["approve", "view"],
                            duration: 50,
                        },
                    ]}
                    setToggleForm={setToggleRole}
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
                        <h1 className="main_text">Admin Staff</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">PERMISSIONS</p>
                        <h1 className="main_text noMB">Customer</h1>
                        <h1 className="main_text">Property</h1>
                    </div>
                    <div className="w-2/4 640px:w-full">
                        <p className="label_text">ACCESS</p>
                        <h1 className="main_text noMB">All Access</h1>
                        <h1 className="main_text">View</h1>
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
                            <tr>
                                <td>
                                    <h1 className="main_text">000001</h1>
                                </td>
                                <td>
                                    <h1 className="main_text">
                                        Juan Dela Cruz
                                    </h1>
                                </td>
                                <td>
                                    <h1 className="main_text">Admin Staff</h1>
                                </td>
                                <td>
                                    <h1 className="main_text">Admin</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
    );
}
