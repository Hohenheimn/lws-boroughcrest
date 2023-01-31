import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus, HiPencil } from "react-icons/hi";

export default function BatchList() {
    return (
        <div>
            <h1 className=" text-[24px] 1366px:text-[20px] mb-5 480px:mb-2">
                Batch List
            </h1>
            <div className="table_container hAuto">
                <table className="table_list">
                    <thead className=" textRed">
                        <tr>
                            <th className="checkbox">
                                <input type="checkbox" />
                            </th>

                            <th>BATCH NO.</th>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>APPLICATION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                        <List />
                        <List />
                        <List />
                        <List />
                        <List />
                    </tbody>
                </table>
            </div>
            <div className="flex w-full justify-end">
                <button className="buttonRed">UPDATE</button>
            </div>
        </div>
    );
}

const List = () => {
    return (
        <tr>
            <td className="checkbox">
                <div className="item">
                    <input type="checkbox" />
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>0101010101</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>rental</h2>
                </div>
            </td>
            <td>
                <div className="item">
                    <h2>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet, dicta?
                    </h2>
                </div>
            </td>

            <td>
                <div className="item">
                    <h2>SB 19</h2>
                </div>
            </td>
            <td className="action">
                <div className="item">
                    <div>
                        <HiMinus />
                    </div>

                    <div className="ml-5 1024px:ml-2">
                        <BsPlusLg />
                    </div>
                    <div className="ml-5 1024px:ml-2">
                        <HiPencil />
                    </div>
                </div>
            </td>
        </tr>
    );
};
