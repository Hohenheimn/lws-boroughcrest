import React, { useState } from "react";
import ModalTemp from "../../Reusable/ModalTemp";
import { UserInfo } from "./UserForm";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Tippy from "@tippy.js/react";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";

type Props = {
    setUserForm: Function;
    type: string;
    userInfo: UserInfo;
};

export default function UserRoleAndPermissionsCheckBox({
    setUserForm,
    type,
    userInfo,
}: Props) {
    const [isSave, setSave] = useState(false);

    const [isButtonClicked, setButtonClicked] = useState("");

    const [Roles, setRoles] = useState([
        {
            id: 1,
            menu: "Admin",
            type: "Primary",
            roles: {
                All: null,
                View: false,
                create: false,
                modify: false,
                print: false,
                approve: false,
                duration: "",
            },
        },
        {
            id: 2,
            menu: "Customer",
            type: "Secondary",
            roles: {
                All: null,
                View: false,
                create: false,
                modify: false,
                print: false,
                approve: false,
                duration: "",
            },
        },
    ]);
    return (
        <ModalTemp wide={true}>
            <p className=" text-[16px] mb-3 font-bold">
                Create Roles & Permissions
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
                        <th>CREATE</th>
                        <th>MODIFY</th>
                        <th>PRINT</th>
                        <th>APPROVE</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {Roles.map((item, index) => (
                        <tr key={index}>
                            <td>Admin</td>
                            <td></td>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={style.SaveButton}>
                <aside
                    className={style.back}
                    onClick={() => {
                        setUserForm([true, false]);
                    }}
                >
                    CANCEL
                </aside>

                <div className={style.Save}>
                    <div>
                        <button
                            type="submit"
                            name="save"
                            onClick={() => setButtonClicked("save")}
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
                                    onClick={() => setButtonClicked("new")}
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
