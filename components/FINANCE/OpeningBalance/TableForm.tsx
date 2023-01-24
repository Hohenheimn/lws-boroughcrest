import React from "react";
import style from "../../../styles/finance/Crud-table.module.scss";
import Image from "next/image";
import DropdownSearch from "../../DropdownSearch";

export default function TableForm() {
    return (
        <>
            <div className="w-full overflow-hidden">
                <table className={style.crudTable}>
                    <thead>
                        <tr>
                            <th>CHART CODE</th>
                            <th>CATEGORY</th>
                            <th>ACCOUNT NAME</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h2>0001</h2>
                            </td>
                            <td>
                                <h2>lorem ipsum</h2>
                            </td>
                            <td>
                                <DropdownSearch />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-10 border-b border-ThemeRed"></div>
            <div className="flex flex-wrap justify-end py-5 480px:justify-start">
                <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                    SUBTOTAL
                </h1>
                <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] mr-5">
                    <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                        <Image
                            src="/Images/peso.png"
                            height={13}
                            width={10}
                            alt=""
                        />
                    </aside>
                    <p className=" text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]">
                        - 1231233
                    </p>
                </div>
                <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] ">
                    <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                        <Image
                            src="/Images/peso.png"
                            height={13}
                            width={10}
                            alt=""
                        />
                    </aside>
                    <p className=" text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]">
                        -123123123
                    </p>
                </div>
            </div>

            <div className="flex justify-end py-5 mt-20">
                <button className="button_cancel">Cancel</button>
                <button className="buttonRed">SAVE</button>
            </div>
        </>
    );
}
