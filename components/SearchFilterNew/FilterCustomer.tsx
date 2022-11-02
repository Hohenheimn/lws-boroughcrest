import React, { useEffect, useRef, useContext } from "react";
import AppContext from "../Context/AppContext";
import style from "../../styles/SearchFilter.module.scss";
import { flip } from "../Animation/SimpleAnimation";
import { motion } from "framer-motion";

type setFilter = {
    setFilter: Function;
    isFilter: boolean;
};

export default function FilterCustomer({ setFilter }: setFilter) {
    const {
        cusFilterColumn,
        setCusTableColumn,
        cusTableColumn,
        setTableRows,
        TableRows,
    } = useContext(AppContext);
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
        console.log(cusTableColumn);

        if (cusTableColumn.length === 12) {
            setCusTableColumn([`${name}`]);
            return;
        }
        if (cusTableColumn.includes(name)) {
            setCusTableColumn((col: any) =>
                col.filter((item: any) => {
                    return item !== name;
                })
            );
            return;
        }
        if (cusTableColumn.length < 12) {
            setCusTableColumn([...cusTableColumn, `${name}`]);
            return;
        }
    };

    const AllHandler = () => {
        setCusTableColumn([
            "Class",
            "Mobile",
            "Email",
            "Status",
            "Spouse",
            "Citizenship",
            "Birth Date",
            "Contact Person",
            "Property",
            "TIN",
            "Branch Code",
            "Type",
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
            {cusFilterColumn.map((item: string, index: number) => (
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

const FilterList = ({ name, onChangeHandler }: any) => {
    const { cusFilterColumn, cusTableColumn } = useContext(AppContext);
    return (
        <li className={style.column_item}>
            <input
                type="checkbox"
                name=""
                id={name}
                checked={cusTableColumn.includes(`${name}`) ? true : false}
                onChange={onChangeHandler}
            />
            <label htmlFor={name}>{name}</label>
        </li>
    );
};
