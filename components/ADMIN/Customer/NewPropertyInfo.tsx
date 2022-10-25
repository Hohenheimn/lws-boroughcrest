import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { RiArrowDownSFill } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";

type NewPropertyInfo = {
    setActiveForm: Function;
};

export default function NewPropertyInfo({ setActiveForm }: NewPropertyInfo) {
    const { isNewCustomer } = useContext(AppContext);
    console.log(isNewCustomer);
    const [isTable, setTable] = useState([
        {
            id: 1,
            unitCode: "",
            project: "",
        },
    ]);
    const Back = () => {
        setActiveForm((item: boolean[]) => [
            (item[0] = false),
            (item[1] = true),
            (item[2] = false),
        ]);
    };
    const [isSave, setSave] = useState(false);

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className=" w-full text-[24px] mb-3">Property Information</h1>

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

            <div className=" w-full flex justify-end items-center mb-10">
                <button
                    className=" text-ThemeRed font-semibold text-[14px] mr-5"
                    onClick={Back}
                >
                    BACK
                </button>

                <button className=" relative text-white flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                    <div
                        className=" h-8 px-5 w-full flex justify-center items-center"
                        onClick={() => setSave(!isSave)}
                    >
                        SAVE <RiArrowDownSFill className=" ml-1 text-[24px]" />
                    </div>
                    {isSave && (
                        <ul className=" absolute top-full bg-white w-full">
                            <a
                                onClick={() => console.log(isTable)}
                                className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75"
                            >
                                SAVE
                            </a>
                            <Link href="/admin/customer?new">
                                <a className="text-ThemeRed inline-block py-2 w-full text-center hover:bg-ThemeRed hover:text-white duration-75">
                                    SAVE & NEW
                                </a>
                            </Link>
                        </ul>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
type List = {
    detail: any;
    setTable: Function;
    isTable: {}[];
};
const List = ({ detail, setTable, isTable }: List) => {
    const newID = Math.random();

    const updateValue = (event: any, valueType: string) => {
        const newItems = isTable.map((item: any) => {
            if (detail.id == item.id) {
                if (valueType === "project")
                    return { ...item, project: event.target.value };
                if (valueType === "unitCode")
                    return { ...item, unitCode: event.target.value };
            }
            return item;
        });
        setTable(newItems);
    };

    return (
        <tr>
            <td className=" pr-2">
                <input
                    type="text"
                    value={detail.unitCode}
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none"
                    onChange={(e) => updateValue(e, "unitCode")}
                />
            </td>
            <td className="  pr-2">
                <input
                    type="text"
                    className="w-full rounded-md text-black px-2 text-[14px] py-[2px] outline-none bg-ThemeRed50"
                    value={detail.project}
                    onChange={(e) => updateValue(e, "project")}
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
                            ...item,
                            {
                                id: newID,
                                unitCode: "",
                                project: "",
                            },
                        ])
                    }
                >
                    +
                </button>
            </td>
        </tr>
    );
};
