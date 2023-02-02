import React, { useRef, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../styles/Popup_Modal.module.scss";
import Link from "next/link";

type ModifyRolesPermission = {
    setToggle: Function;
};

export default function ModifyRolesPermission({
    setToggle,
}: ModifyRolesPermission) {
    const [isTable, setTable] = useState([
        {
            id: 1,
            permissions: "",
            access: "",
            duration: "",
        },
    ]);
    const [isRole, setRole] = useState<string>("");
    const [isSave, setSave] = useState(false);
    const modal = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <div className={style.container}>
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4ef] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3 font-bold">
                    Modify Roles & Permissions
                </p>
                <ul className=" flex mb-10 justify-between border-b-2 border-white flex-wrap 480px:mb-2 pb-4">
                    <li className=" w-4/12 480px:w-full">
                        <p className="text-Themered text-[12px] font-semibold mb-1 uppercase">
                            ROLE
                        </p>
                        <select
                            name=""
                            id=""
                            onChange={(e) => setRole(e.target.value)}
                            className="field w-full"
                        >
                            <option value="please select"></option>
                            <option
                                value="admin"
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            >
                                Admin
                            </option>
                            <option
                                value="staff"
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            >
                                Staff
                            </option>
                        </select>
                    </li>
                    <li className=" w-7/12 480px:w-full">
                        <p className="text-Themered text-[12px] font-semibold mb-1 uppercase">
                            Discription
                        </p>
                        <p className=" p-3 rounded-lg bg-[#d0babf] text-[12px] text-black">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Cumque explicabo exercitationem magni, culpa
                            omnis ab ipsa dolore doloribus earum. In alias,
                            tempora accusantium error provident neque laboriosam
                            nemo unde explicabo.
                        </p>
                    </li>
                </ul>

                <table className="w-full mb-20">
                    <thead>
                        <tr>
                            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                PERMISSION
                            </th>
                            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                ACCESS
                            </th>
                            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                DURATION
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isTable.map((item, index) => (
                            <List
                                detail={item}
                                setTable={setTable}
                                key={index}
                                isTable={isTable}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>

                <div className={style.SaveButton}>
                    <aside
                        className={style.back}
                        onClick={() => setToggle(false)}
                    >
                        CANCEL
                    </aside>

                    <button className={style.Save}>
                        <div>
                            <button
                                type="submit"
                                name="save"
                                className={style.save_button}
                            >
                                Save
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
                                    <button type="submit" name="save-new">
                                        SAVE & NEW
                                    </button>
                                </li>
                            </ul>
                        )}
                    </button>
                </div>
            </section>
        </div>
    );
}
type List = {
    detail: any;
    setTable: Function;
    isTable: {}[];
    index: number;
};
const List = ({ detail, setTable, isTable, index }: List) => {
    const newID = Math.random();

    const updateValue = (event: any, whatValue: string | undefined) => {
        const newItems = isTable.map((item: any) => {
            if (detail.id == item.id) {
                if (whatValue === "duration")
                    return { ...item, duration: event.target.value };
                if (whatValue === "permission")
                    return { ...item, permissions: event.target.value };
                if (whatValue === "access")
                    return { ...item, access: event.target.value };
            }
            return item;
        });
        setTable(newItems);
    };
    return (
        <tr>
            <td className=" pr-2">
                <select
                    name=""
                    id=""
                    className="field w-full"
                    onChange={(e) => updateValue(e, "permission")}
                    value={detail.permissions}
                >
                    <option value=""></option>
                    <option
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        value="admin"
                    >
                        Admin
                    </option>
                    <option
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        value="Staff"
                    >
                        Staff
                    </option>
                </select>
            </td>
            <td className=" pr-2">
                <select
                    name=""
                    id=""
                    className="field w-full"
                    onChange={(e) => updateValue(e, "access")}
                    value={detail.access}
                >
                    <option value=""></option>
                    <option
                        value="view"
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                    >
                        View
                    </option>
                    <option
                        value="access"
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                    >
                        Access
                    </option>
                </select>
            </td>
            <td className="  pr-2">
                <input
                    type="number"
                    className="field w-full"
                    value={detail.duration}
                    placeholder="Number of Days"
                    onChange={(e) => updateValue(e, "duration")}
                />
            </td>

            <td className=" flex justify-start">
                {isTable.length > 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed mr-2"
                        onClick={() =>
                            setTable((item: any[]) =>
                                item.filter(
                                    (x: { id: any }) => x.id !== detail.id
                                )
                            )
                        }
                    >
                        -
                    </button>
                )}
                {isTable.length === index + 1 && (
                    <button
                        className=" text-[32px] text-ThemeRed"
                        onClick={() =>
                            setTable((item: any) => [
                                ...item,
                                {
                                    id: newID,
                                    permissions: "",
                                    access: "",
                                    duration: "",
                                },
                            ])
                        }
                    >
                        +
                    </button>
                )}
            </td>
        </tr>
    );
};
