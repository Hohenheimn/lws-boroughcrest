import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const Project = () => {
    return (
        <div>
            <table className="crud-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <List />
                </tbody>
            </table>
            <h1 className="cursor-pointer text-ThemeRed text-[16px] py-2">
                ADD
            </h1>
        </div>
    );
};

const List = () => {
    const [isModify, setModify] = useState(false);
    const Selected = () => {
        alert("Selected");
    };
    return (
        <tr className="cursor-pointer">
            <td onClick={() => !isModify && Selected()}>
                <input
                    type="text"
                    placeholder="sample"
                    className={`${!isModify && "disabled"}`}
                />
            </td>
            <td onClick={() => !isModify && Selected()}>
                <input
                    type="text"
                    placeholder="sample"
                    className={`${!isModify && "disabled"}`}
                />
            </td>
            <td className="action">
                <div>
                    <BiEdit
                        className="icon"
                        onClick={() => setModify(!isModify)}
                    />
                    <MdDeleteOutline className="icon" />
                </div>
            </td>
        </tr>
    );
};

export default Project;
