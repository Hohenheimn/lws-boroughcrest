import React, { useContext, useState } from "react";
import { DeleteButton, PencilButtonTable } from "../../Reusable/Icons";
import AccessForm from "./AccessForm";
import { useRouter } from "next/router";
import AccessModify from "./AccessModify";
import Link from "next/link";
import { DeleteRole, GetRoles } from "./Query";
import TableLoadingNError from "../../Reusable/TableLoadingNError";
import Pagination from "../../Reusable/Pagination";
import AppContext from "../../Context/AppContext";
import { useQueryClient } from "react-query";

export default function AccessTable() {
    const { setPrompt } = useContext(AppContext);

    const router = useRouter();

    const [toggleForm, setToggleForm] = useState(false);

    const [TablePage, setTablePage] = useState(1);

    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries("get-roles");
        setPrompt({
            message: "Role successfully deleted!",
            type: "success",
            toggle: true,
        });
    };

    const onError = (e: any) => {};

    const { isLoading, data, isError } = GetRoles("");

    const { mutate, isLoading: DeleteLoading } = DeleteRole(onSuccess, onError);

    const DeleteHandler = (id: number) => {
        mutate(id);
    };

    return (
        <>
            {(toggleForm || router.query.new !== undefined) && (
                <AccessForm
                    type={"create"}
                    setToggleForm={setToggleForm}
                    RoleName=""
                    DefaultValue={[]}
                    id={0}
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
                            {data?.data.data.map(
                                (
                                    item: { name: string; id: number },
                                    index: number
                                ) => (
                                    <tr key={index}>
                                        <td className="icon">
                                            <div className="icon">
                                                <div className="mr-5">
                                                    <Link
                                                        href={`/project/access?modify=${item.id}`}
                                                    >
                                                        <a>
                                                            <PencilButtonTable />
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        DeleteHandler(item.id)
                                                    }
                                                >
                                                    <DeleteButton />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <Link
                                                href={`/project/access/${item.id}`}
                                            >
                                                <a className="w-full inline-block">
                                                    {item.id}
                                                </a>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                href={`/project/access/${item.id}`}
                                            >
                                                <a className="w-full inline-block">
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    <TableLoadingNError
                        isLoading={isLoading}
                        isError={isError}
                    />
                </div>
                <Pagination
                    setTablePage={setTablePage}
                    TablePage={TablePage}
                    PageNumber={data?.data.meta.last_page}
                    CurrentPage={data?.data.meta.current_page}
                />
            </section>
        </>
    );
}
