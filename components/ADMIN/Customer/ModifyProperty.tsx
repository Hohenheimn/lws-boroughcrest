import React, { useRef, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import Link from "next/link";
import { IoTerminal } from "react-icons/io5";

type ModifyRolesPermission = {
    setToggle: Function;
};

export default function ModifyProperty({ setToggle }: ModifyRolesPermission) {
    const [isTable, setTable] = useState([
        {
            id: 1,
            unitCode: "123",
            project: "Bay Garden",
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
    }, []);

    return (
        <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] p-10 z-50 flex justify-center items-center origin-top 480px:p-5">
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4ef] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3 font-bold">Create Customer</p>
                <h1 className=" w-full text-[24px] mb-3">
                    Property Information
                </h1>

                <table className="w-full mb-20">
                    <thead>
                        <tr>
                            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                UNIT CODE
                            </th>
                            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                PROJECT
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
                                <Link href="/admin/customer">
                                    <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                        SAVE
                                    </a>
                                </Link>
                                <Link href="/admin/customer?new">
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
                <input
                    type="text"
                    value={detail.unitCode}
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                />
            </td>
            <td className="  pr-2">
                <input
                    type="text"
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none bg-ThemeRed50"
                    value={detail.project}
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
                                unitCode: "123",
                                project: "Bay Garden",
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
