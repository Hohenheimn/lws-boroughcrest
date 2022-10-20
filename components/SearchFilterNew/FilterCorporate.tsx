import React, { useEffect, useRef, useContext } from "react";
import AppContext from "../Context/AppContext";
import style from "../../styles/SearchFilter.module.scss";
import { flip } from "../Animation/SimpleAnimation";
import { motion } from "framer-motion";

type setFilter = {
    setFilter: Function;
    isFilter: boolean;
};

export default function FilterCorporate({ setFilter, isFilter }: setFilter) {
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

    const { setTableRows, TableRows } = useContext(AppContext);

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
            <FilterList name="All" />
            <FilterList name="ID" />
            <FilterList name="Name" />
            <FilterList name="Address" />
            <FilterList name="TIN" />
            <FilterList name="Contact No." />
            <FilterList name="Email Address" />
            <li>
                <p className=" font-medium text-[12px]">Rows</p>
                <select
                    value={TableRows}
                    onChange={(e) =>
                        setTableRows((no: any) => (no = e.target.value))
                    }
                    className="border border-ThemeRed px-[5px] py-[1px]"
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
const FilterList = ({ name }: any) => {
    return (
        <li className={style.column_item}>
            <input type="checkbox" name="" id={name} />
            <label htmlFor={name}>{name}</label>
        </li>
    );
};
