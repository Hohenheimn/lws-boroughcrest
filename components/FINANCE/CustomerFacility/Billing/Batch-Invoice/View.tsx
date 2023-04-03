import React from "react";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { BarLoader, BeatLoader } from "react-spinners";
import { ShowGroup } from "./Query";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import { CustomerGroup } from "./GroupForm";
import Pagination from "../../../../Reusable/Pagination";

type Props = {
    id: number;
    toggleChangeForm: Function;
    toggleForm: Function;
};

export default function View({ id, toggleChangeForm, toggleForm }: Props) {
    const { data, isLoading, isError } = ShowGroup(id);
    console.log(id);
    if (isLoading) {
        return (
            <ModalTemp>
                <div className="pageDetail">
                    <BeatLoader
                        color={"#8f384d"}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </ModalTemp>
        );
    }

    if (isError) {
        return (
            <ModalTemp>
                <div className="pageDetail">
                    <h1>Something is wrong!</h1>
                </div>
            </ModalTemp>
        );
    }

    return (
        <ModalTemp>
            <h3 className="mb-5 1550px:mb-3 text-ThemeRed">Group Details</h3>
            <div>
                <h5 className=" text-ThemeRed text-[14px] mb-5 1550px:mb-3">
                    Group Name:{" "}
                    <span className=" text-RegularColor font-NHU-bold">
                        {data?.data.name}
                    </span>
                </h5>
            </div>
            <div className="w-full overflow-auto max-h-[50vh]">
                <table className="table_list miniTable">
                    <thead className="textRed">
                        <tr>
                            <th className="text-start">Customer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.customers.map(
                            (item: CustomerGroup, index: number) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.preferred_email}</td>
                                    <td>{item.class}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                {isLoading && (
                    <div className="w-full h-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="10px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                {isError && <TableErrorMessage />}
            </div>
            {/* waala pang pagination sa api */}
            {/* <div className="mb-5 1550px:mb-3"></div>
                <Pagination
                    setTablePage={setTablePage}
                    TablePage={TablePage}
                    PageNumber={data?.data.last_page}
                    CurrentPage={data?.data.current_page}
                /> */}

            <div className="mb-5"></div>
            <div className=" flex justify-end items-center w-full">
                <button
                    className="button_cancel"
                    onClick={() => {
                        toggleChangeForm("");
                    }}
                >
                    CANCEL
                </button>
                <button
                    className="buttonRed"
                    onClick={() => {
                        toggleForm(false);
                    }}
                >
                    OK
                </button>
            </div>
        </ModalTemp>
    );
}
