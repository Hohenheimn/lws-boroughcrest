import React from "react";
import Link from "next/link";
import style from "../../../styles/Role/RoleDetails.module.scss";

export default function Index() {
    return (
        <div>
            <header className={style.header}>
                <h1 className="pageTitle">Role Details</h1>
                <Link href="?new">
                    <a className="buttonRed">New Role</a>
                </Link>
            </header>
            <section className={style.container}>
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
