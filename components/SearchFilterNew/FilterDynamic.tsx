import React, { useEffect, useRef } from "react";
import style from "../../styles/SearchFilter.module.scss";
import { flip } from "../Animation/SimpleAnimation";
import { motion } from "framer-motion";

type FilterProps = {
    setFilter: Function;
    TableRows: any;
    setTableRows: Function;
    TableColumn: any;
    setTableColumn: Function;
    ColumnList: any;
};

export default function FilterDynamic({
    setFilter,
    TableRows,
    setTableRows,
    TableColumn,
    setTableColumn,
    ColumnList,
}: FilterProps) {
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

    const OnChangeHandler = (e: any) => {
        const name = e.target.id;

        if (TableColumn?.length === ColumnList?.length) {
            setTableColumn([`${name}`]);
            return;
        }
        if (TableColumn.includes(name)) {
            setTableColumn((col: any) =>
                col.filter((item: any) => {
                    return item !== name;
                })
            );
            return;
        }
        if (TableColumn?.length < ColumnList?.length) {
            setTableColumn([...TableColumn, `${name}`]);
            return;
        }
    };

    const AllHandler = () => {
        setTableColumn(ColumnList);
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
            {/* All */}
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    name=""
                    id="All"
                    checked={
                        TableColumn?.length === ColumnList?.length
                            ? true
                            : false
                    }
                    onChange={AllHandler}
                />
                <label htmlFor="All">All</label>
            </li>
            {/* Other Columns */}
            {ColumnList.map((item: string, index: number) => (
                <FilterList
                    name={item}
                    key={index}
                    onChangeHandler={OnChangeHandler}
                    ColumnList={ColumnList}
                    TableColumn={TableColumn}
                />
            ))}
            <li>
                <p className=" font-medium text-[12px]">Rows</p>
                <select
                    className="border border-ThemeRed px-[5px] py-[1px]"
                    onChange={(e) => setTableRows(e.target.value)}
                    value={TableRows}
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

const FilterList = ({
    name,
    onChangeHandler,
    ColumnList,
    TableColumn,
}: any) => {
    return (
        <li className={style.column_item}>
            <input
                type="checkbox"
                name=""
                id={name}
                checked={
                    TableColumn?.includes(`${name}`) ||
                    TableColumn?.length === ColumnList?.length
                        ? true
                        : false
                }
                onChange={onChangeHandler}
            />
            <label htmlFor={name}>{name}</label>
        </li>
    );
};
