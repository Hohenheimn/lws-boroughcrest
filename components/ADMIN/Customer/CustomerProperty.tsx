import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import ModifyProperty from "./ModifyProperty";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { PencilButton } from "../../Reusable/Icons";

export default function CustomerProperty({ data, classType }: any) {
    const [isToggle, setToggle] = useState(false);
    return (
        <div>
            {isToggle && (
                <ModifyProperty
                    setToggle={setToggle}
                    properties={data}
                    classType={classType}
                />
            )}
            <header className=" flex w-full justify-between items-center mb-5">
                <h1 className=" w-full text-[24px] mb-3 480px:text-[16px]">
                    Property Information
                </h1>
                <Tippy
                    theme="ThemeRed"
                    content={<span className="capitalize">Modify</span>}
                >
                    <div>
                        <PencilButton
                            FunctionOnClick={() => setToggle(true)}
                            title={"Modify"}
                        />
                    </div>
                </Tippy>
            </header>
            <div className=" overflow-auto w-full">
                <table className=" w-full 480px:w-[800px]">
                    <thead>
                        <tr>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                UNIT CODE
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                TYPE
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                TOWER
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                FLOOR
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                AREA
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                TURN OVER DATE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, index: number) => (
                            <List item={item} key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const List = ({ item }: any) => {
    return (
        <tr>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                {item.unit_code}
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                {item.type}
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                {item.tower.name}
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                {item.floor.name}
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                {item.area}
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                {item.turnover_date}
            </td>
        </tr>
    );
};
