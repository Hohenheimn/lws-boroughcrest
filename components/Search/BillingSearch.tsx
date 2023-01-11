import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";

export default function BillingSearch() {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/finance/customer-facility/billing/invoice-list/">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Billing List</h1>
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

            <Link href="/finance/customer-facility/billing/invoice-list/3">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <h4>Customer Name</h4>
                            <p>Invoice No.</p>
                        </li>
                        <li>
                            <p>Billing DATE</p>
                            <p>Due Date</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/finance/customer-facility/billing/invoice-list/3">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <h4>JOURNAL NO.</h4>
                            <p>00001</p>
                        </li>
                        <li>
                            <p>DATE</p>
                            <p>01/01/2011</p>
                        </li>
                    </ul>
                </a>
            </Link>
            <Link href="/finance/customer-facility/billing/invoice-list/3">
                <a className={style.searchedItem}>
                    <ul>
                        <li>
                            <h4>JOURNAL NO.</h4>
                            <p>00001</p>
                        </li>
                        <li>
                            <p>DATE</p>
                            <p>01/01/2011</p>
                        </li>
                    </ul>
                </a>
            </Link>
        </div>
    );
}
