import React, { useState } from "react";
import Link from "next/link";
import style from "../../../styles/Role/RoleDetails.module.scss";
import { HiPencil } from "react-icons/hi";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import RoleForm from "./RoleForm";
import RoleModify from "./RoleModify";
export default function RoleDetails() {
    const [isModify, setModify] = useState(false);
    const [isNew, setNew] = useState(false);
    return (
        <div>
            {isModify && <RoleModify closeFunc={setModify} />}
            {isNew && <RoleForm closeFunc={setNew} type="create" />}
            <header className={style.header}>
                <h1 className="pageTitle">Role Details</h1>

                <button className="buttonRed" onClick={() => setNew(true)}>
                    New Role
                </button>
            </header>
            <section className={style.container}>
                <div className={style.pencilCon}>
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">Modify</span>}
                    >
                        <div>
                            <HiPencil
                                className={style.pencil}
                                onClick={() => setModify(true)}
                            />
                        </div>
                    </Tippy>
                </div>
                <ul>
                    <li>
                        <p className="label_text">Role</p>
                        <h4 className="main_text">Admin Staff</h4>
                    </li>
                </ul>
                <aside>
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">PERMISSIONS</th>
                                <th className="label_text">ACCESS</th>
                                <th className="label_text">DURATION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <List />
                        </tbody>
                    </table>
                </aside>
            </section>
        </div>
    );
}

const List = () => {
    return (
        <tr>
            <td className="label_text">
                <h4 className="main_text">Customer</h4>
            </td>
            <td className="label_text">
                <h4 className="main_text">All Access</h4>
            </td>
            <td className="label_text">
                <h4 className="main_text">No Limit</h4>
            </td>
        </tr>
    );
};
