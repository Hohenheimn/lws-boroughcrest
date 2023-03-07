import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";
import { GetJournalRecentSearch } from "../FINANCE/General-Ledger/Journal/Query";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

export default function JournalSearch() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    const id: any = router.query.id;
    const { isLoading, isError, data } = GetJournalRecentSearch(id, search);
    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/finance/general-ledger/journal/journal-list">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Journal List</h1>
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
                        <Link
                            key={index}
                            href={`/finance/general-ledger/journal/${item.id}`}
                        >
                            <a className={style.searchedItem}>
                                <ul>
                                    <li>
                                        <h4>
                                            {item.journal_no === null
                                                ? "N/A"
                                                : item.journal_no}
                                        </h4>
                                        <p>{item.date}</p>
                                    </li>
                                    <li>
                                        <p>ID: {item.id}</p>
                                        <p>{item.status}</p>
                                    </li>
                                </ul>
                            </a>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
