import React, { useEffect, useRef, useContext } from "react";
import AppContext from "../Context/AppContext";
import style from "../../styles/SearchFilter.module.scss";
import { flip } from "../Animation/SimpleAnimation";
import { motion } from "framer-motion";

type setFilter = {
    setFilter: Function;
    isFilter: boolean;
};

export default function FilterUser({ setFilter, isFilter }: setFilter) {
    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setFilter(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    const ColumnList = [
        "Department",
        "Employee ID",
        "Email",
        "Mobile",
        "Role",
        "Status",
    ];
    const {
        userTableRows,
        usersetTableRows,
        userTableColumn,
        setUserTableColumn,
    } = useContext(AppContext);

    const OnChangeHandler = (e: any) => {
        const name = e.target.id;

        if (userTableColumn.length === 6) {
            setUserTableColumn([`${name}`]);
            return;
        }
        if (userTableColumn.includes(name)) {
            setUserTableColumn((col: any) =>
                col.filter((item: any) => {
                    return item !== name;
                })
            );
            return;
        }
        if (userTableColumn.length < 6) {
            setUserTableColumn([...userTableColumn, `${name}`]);
            return;
        }
    };

    const AllHandler = () => {
        setUserTableColumn([
            "Department",
            "Employee ID",
            "Email",
            "Mobile",
            "Role",
            "Status",
        ]);
    };
    return (
        <motion.ul
            ref={modal}
            variants={flip}
            initial="initial"
            animate="animate"
            exit="exit"
            className={style.column}
        >
            <li className="font-medium">Columns</li>
            <FilterList name="All" onChangeHandler={AllHandler} />
            {ColumnList.map((item: string, index: number) => (
                <FilterList
                    name={item}
                    key={index}
                    onChangeHandler={OnChangeHandler}
                />
            ))}
            <li>
                <p className=" font-medium text-[12px]">Rows</p>
                <select
                    className="border border-ThemeRed px-[5px] py-[1px]"
                    onChange={(e) => usersetTableRows(e.target.value)}
                    value={userTableRows}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </li>
        </motion.ul>
    );
}

const FilterList = ({ name, onChangeHandler }: any) => {
    const { userTableColumn } = useContext(AppContext);
    return (
        <li className={style.column_item}>
            <input
                type="checkbox"
                name=""
                id={name}
                checked={
                    userTableColumn.includes(`${name}`) ||
                    userTableColumn.length === 6
                        ? true
                        : false
                }
                onChange={onChangeHandler}
            />
            <label htmlFor={name}>{name}</label>
        </li>
    );
};
