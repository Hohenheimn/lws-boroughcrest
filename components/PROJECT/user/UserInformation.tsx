import React from "react";
import { UserDetail } from "./UserTable";

type Props = {
    UserInfo: UserDetail;
};

export default function UserInformation({ UserInfo }: Props) {
    return (
        <ul className="flex flex-wrap">
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">POSITION</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.position}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">DEPARTMENT</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.department_id}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">EMPLOYEE ID</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.employee_id}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">MOBILE</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.contact_no}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">EMAIL</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.email}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">CORPORATE</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.corporate_id}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">CREATED ON</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.created_at}
                </h4>
            </li>
            <li className=" w-4/12 mb-10 820px:w-2/4 480px:w-full 480px:mb-3">
                <p className=" text-gray-400 1024px:text-[14px]">TRAIL</p>
                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                    {UserInfo.updated_at}
                </h4>
            </li>
        </ul>
    );
}
