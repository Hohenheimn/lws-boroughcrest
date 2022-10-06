import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import ModifyRolesPermission from "./MofidyRolesPermission";

export default function UserRolePermissions() {
    const [isToggle, setToggle] = useState(false);
    return (
        <div>
            {isToggle && <ModifyRolesPermission setToggle={setToggle} />}
            <header className=" flex w-full justify-between items-center mb-5">
                <aside className=" flex">
                    <p className=" text-gray-400 1024px:text-[14px] mr-2">
                        ROLES:{" "}
                    </p>
                    <h4 className=" text-gray-500 1024px:text-[14px]">
                        Admin Staff
                    </h4>
                </aside>
                <HiPencil
                    className=" text-ThemeRed font-bold text-[32px] 480px:text-[24px] cursor-pointer"
                    onClick={() => setToggle(true)}
                />
            </header>
            <div className=" overflow-auto w-full">
                <table className=" w-full 480px:w-[550px]">
                    <thead>
                        <tr>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin">
                                PERMISSION
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin">
                                ACCESS
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin">
                                DURATION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                        <List />
                        <List />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const List = () => {
    return (
        <tr>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2">
                Corporate
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2">
                View Only
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2">
                -
            </td>
        </tr>
    );
};
