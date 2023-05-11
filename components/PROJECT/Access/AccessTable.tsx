import React from "react";
import { DeleteButton, PencilButtonTable } from "../../Reusable/Icons";

export default function AccessTable() {
    return (
        <section>
            <div className="w-full flex justify-between items-center mb-5">
                <h1 className="pageTitle">Roles and Permissions</h1>
                <button className="newButton">New Role</button>
            </div>
            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>No.</th>
                            <th>Role NAme</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="icon">
                                <div className="icon">
                                    <div className="mr-5">
                                        <PencilButtonTable />
                                    </div>
                                    <DeleteButton />
                                </div>
                            </td>
                            <td>1</td>
                            <td>Admin Staff</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
