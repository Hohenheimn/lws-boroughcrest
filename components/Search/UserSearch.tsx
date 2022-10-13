import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";

export default function UserSearch() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/project/user">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>User</h1>
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

            <Link href="/project/corporate/345">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <h4>Juan Dela Cruz</h4>
                            <p>Quezon City</p>
                        </li>
                        <li>
                            <p>ID: 1234</p>
                            <p>TIN: 123456489</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/project/corporate/345">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <h4>Juan Dela Cruz</h4>
                            <p>Quezon City</p>
                        </li>
                        <li>
                            <p>ID: 1234</p>
                            <p>TIN: 123456489</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/project/corporate/345">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <h4>Juan Dela Cruz</h4>
                            <p>Quezon City</p>
                        </li>
                        <li>
                            <p>ID: 1234</p>
                            <p>TIN: 123456489</p>
                        </li>
                    </ul>
                </a>
            </Link>
        </div>
    );
}
