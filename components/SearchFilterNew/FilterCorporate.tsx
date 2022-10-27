import React, { useEffect, useRef, useContext, useState } from "react";
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

    const { setTableRows, TableRows, corpColumn, setCorpColumn } =
        useContext(AppContext);

    const OnChangeHandler = (e: any) => {
        const name = e.target.id;
        if (corpColumn.length === 6) {
            setCorpColumn([`${name}`]);
            return;
        }
        if (!corpColumn.includes(`${name}`)) {
            setCorpColumn([...corpColumn, `${name}`]);
            return;
        }
        if (corpColumn.length === 1) {
            return;
        }
        if (corpColumn.includes(`${name}`)) {
            setCorpColumn([...corpColumn, `${name}`]);
            setCorpColumn((col: any) =>
                col.filter((item: any) => item !== name)
            );
            return;
        }
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
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    checked={corpColumn.length === 6 ? true : false}
                    onChange={() =>
                        setCorpColumn([
                            "ID",
                            "Name",
                            "Address",
                            "TIN",
                            "Contact no.",
                            "Email",
                        ])
                    }
                    id="All"
                />
                <label htmlFor="All">All</label>
            </li>
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    id="ID"
                    checked={
                        corpColumn.length === 6
                            ? true
                            : corpColumn.includes("ID")
                            ? true
                            : false
                    }
                    onChange={OnChangeHandler}
                />
                <label htmlFor="ID">ID</label>
            </li>
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    id="Name"
                    checked={
                        corpColumn.length === 6
                            ? true
                            : corpColumn.includes("Name")
                            ? true
                            : false
                    }
                    onChange={OnChangeHandler}
                />
                <label htmlFor="Name">Name</label>
            </li>

            <li className={style.column_item}>
                <input
                    type="checkbox"
                    id="Address"
                    checked={
                        corpColumn.length === 6
                            ? true
                            : corpColumn.includes("Address")
                            ? true
                            : false
                    }
                    onChange={OnChangeHandler}
                />
                <label htmlFor="Address">Address</label>
            </li>
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    id="TIN"
                    checked={
                        corpColumn.length === 6
                            ? true
                            : corpColumn.includes("TIN")
                            ? true
                            : false
                    }
                    onChange={OnChangeHandler}
                />
                <label htmlFor="TIN">TIN</label>
            </li>
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    id="Contact no."
                    checked={
                        corpColumn.length === 6
                            ? true
                            : corpColumn.includes("Contact no.")
                            ? true
                            : false
                    }
                    onChange={OnChangeHandler}
                />
                <label htmlFor="Contact no.">Contact no.</label>
            </li>
            <li className={style.column_item}>
                <input
                    type="checkbox"
                    id="Email"
                    checked={
                        corpColumn.length === 6
                            ? true
                            : corpColumn.includes("Email")
                            ? true
                            : false
                    }
                    onChange={OnChangeHandler}
                />
                <label htmlFor="Email">Email</label>
            </li>

            {/* <FilterList name="ID" setColumns={setColumns} />
            <FilterList name="Name" setColumns={setColumns} />
            <FilterList name="Address" setColumns={setColumns} />
            <FilterList name="TIN" setColumns={setColumns} />
            <FilterList name="Contact No." etColumns={setColumns} />
            <FilterList name="Email" etColumns={setColumns} /> */}
            <li>
                <p className=" font-medium text-[12px]">Rows</p>
                <select
                    value={TableRows}
                    onChange={(e) =>
                        setTableRows((no: any) => (no = e.target.value))
                    }
                    className="border border-ThemeRed px-[5px] py-[1px]"
                >
                    <option value="5">10</option>
                    <option value="10">20</option>
                    <option value="15">30</option>
                    <option value="20">40</option>
                    <option value="25">50</option>
                </select>
            </li>
        </motion.ul>
    );
}
