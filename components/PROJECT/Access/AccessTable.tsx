import React, { useState } from "react";
import { DeleteButton, PencilButtonTable } from "../../Reusable/Icons";
import AccessForm from "./AccessForm";
import { useRouter } from "next/router";
import AccessModify from "./AccessModify";
import Link from "next/link";

export default function AccessTable() {
    const router = useRouter();

    const [toggleForm, setToggleForm] = useState(false);

    return (
        <>
            {(toggleForm || router.query.new !== undefined) && (
                <AccessForm
                    type={"create"}
                    setToggleForm={setToggleForm}
                    RoleName=""
                    DefaultValue={[]}
                />
            )}

            {router.query.modify !== undefined && <AccessModify />}

            <section>
                <div className="w-full flex justify-between items-center mb-5">
                    <h1 className="pageTitle">Roles and Permissions</h1>
                    <button
                        className="newButton"
                        onClick={() => setToggleForm(true)}
                    >
                        New Role
                    </button>
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
                                            <Link href="/project/access?modify=1">
                                                <a>
                                                    <PencilButtonTable />
                                                </a>
                                            </Link>
                                        </div>
                                        <DeleteButton />
                                    </div>
                                </td>
                                <td>
                                    <Link href="/project/access/1">
                                        <a className="w-full inline-block">1</a>
                                    </Link>
                                </td>
                                <td>
                                    <Link href="/project/access/1">
                                        <a className="w-full inline-block">
                                            Admin Staff
                                        </a>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
