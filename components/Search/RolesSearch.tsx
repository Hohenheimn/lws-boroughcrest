import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";

export default function RoleSearch() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/project/corporate">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Project</h1>
                </aside>

                <aside className={style.searchBar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search anything here..."
                        />
                        <BsSearch />
                    </div>
                </aside>
            </div>

            <Link href="/project/roles">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <p className={style.roleText}>Admin</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/project/roles">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <p className={style.roleText}>Staff</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/project/roles">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <p className={style.roleText}>Finance</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/project/roles">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <p className={style.roleText}>Accounting</p>
                        </li>
                    </ul>
                </a>
            </Link>
        </div>
    );
}
