import React, { useRef, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import Link from "next/link";
import { IoTerminal } from "react-icons/io5";

type ModifyRolesPermission = {
    setToggle: Function;
};

export default function ModifyRolesPermission({
    setToggle,
}: ModifyRolesPermission) {
    const [isTable, setTable] = useState([
        {
            id: 1,
            permissions: "Corporate",
            access: "View",
            duration: "-",
        },
    ]);
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
        <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] p-10 z-50 flex justify-center items-center origin-top 480px:p-5">
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
                            className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                        >
                            <option
                                value=""
                                className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                            >
                                Admin Staff
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
                            />
                        ))}
                    </tbody>
                </table>

                <div className=" w-full flex justify-end items-center">
                    <button
                        className=" text-ThemeRed font-semibold text-[14px] mr-5"
                        onClick={() => setToggle(false)}
                    >
                        CANCEL
                    </button>

                    <button className=" relative text-white flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                        <div
                            className=" h-8 px-5 w-full flex justify-center items-center"
                            onClick={() => setSave(!isSave)}
                        >
                            SAVE{" "}
                            <RiArrowDownSFill className=" ml-1 text-[24px]" />
                        </div>
                        {isSave && (
                            <ul className=" absolute top-full bg-white w-full">
                                <Link href="/project/user">
                                    <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                        SAVE
                                    </a>
                                </Link>
                                <Link href="/project/user?new">
                                    <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                        SAVE & NEW
                                    </a>
                                </Link>
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
};
const List = ({ detail, setTable, isTable }: List) => {
    const newID = Math.random();

    const updateDuration = (event: any) => {
        const newItems = isTable.map((item: any) => {
            if (detail.id == item.id) {
                return { ...item, duration: event.target.value };
            }
            return item;
        });
        setTable(newItems);
        console.log(isTable);
    };

    return (
        <tr>
            <td className=" pr-2">
                <select
                    name=""
                    id=""
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                >
                    <option
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                        value={detail.permissions}
                        disabled={true}
                        selected
                    >
                        {detail.permissions}
                    </option>
                </select>
            </td>
            <td className=" pr-2">
                <select
                    name=""
                    id=""
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                >
                    <option
                        value={detail.access}
                        disabled={true}
                        selected
                        className="hover:bg-ThemeRed border-none hover:text-white uppercase font-bold text-ThemeRed"
                    >
                        {detail.access}
                    </option>
                </select>
            </td>
            <td className="  pr-2">
                <input
                    type="number"
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none relative after:absolute after:right-1 after:top-[50%] after:content-['Days'] after:translate-x-2/4"
                    value={detail.duration}
                    onChange={updateDuration}
                />
            </td>
            <td className=" flex justify-center">
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
                <button
                    className=" text-[32px] text-ThemeRed"
                    onClick={() =>
                        setTable((item: any) => [
                            {
                                id: newID,
                                permissions: "",
                                access: "",
                                duration: "",
                            },
                            ...item,
                        ])
                    }
                >
                    +
                </button>
            </td>
        </tr>
    );
};
