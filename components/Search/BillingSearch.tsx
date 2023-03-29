import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";
import { GetJournalRecentSearch } from "../FINANCE/General-Ledger/Journal/Query";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { format, isValid, parse } from "date-fns";
import { GetInvoiceRecentSearch } from "../FINANCE/CustomerFacility/Billing/Query";

export default function JournalSearch() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    const id: any = router.query.id;
    const { isLoading, isError, data } = GetInvoiceRecentSearch(id, search);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/finance/customer-facility/billing/invoice-list">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Invoice</h1>
                </aside>

                <aside className={style.searchBar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <BsSearch />
                    </div>
                </aside>
            </div>
            <div className=" overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center py-5">
                        <BeatLoader
                            color={"#8f384d"}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    data?.data.map((item: any, index: number) => (
                        <List key={index} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}

const List = ({ item }: any) => {
    const date = parse(item.due_date, "yyyy-MM-dd", new Date());
    return (
        <Link
            href={`/finance/customer-facility/billing/invoice-list/${item.id}`}
        >
            <a className={style.searchedItem}>
                <ul>
                    <li>
                        <h4 className=" capitalize">
                            {item.customer.name === null
                                ? "N/A"
                                : item.customer.name}
                        </h4>
                        <p>
                            {isValid(date)
                                ? format(date, "MMM dd yyyy")
                                : "N/A"}
                        </p>
                    </li>
                    <li>
                        <p>ID: {item.id}</p>
                        <p>{item.status}</p>
                    </li>
                </ul>
            </a>
        </Link>
    );
};
