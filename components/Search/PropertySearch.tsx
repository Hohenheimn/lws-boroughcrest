import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";

export default function PropertySearch() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/admin/property">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Property</h1>
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

            <Link href="/admin/property/12">
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
            <Link href="/admin/property/234">
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
            <Link href="/admin/property/123">
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
