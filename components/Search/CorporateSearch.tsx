import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";
import api from "../../util/api";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";

export default function CorporateSearch() {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const { isLoading, data: RecentData } = useQuery(
        ["recent-customer", router.query.id, search],
        () => {
            return api.get(
                `/project/corporate/recent-search/${router.query.id}?keywords=${search}&paginate=3`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/project/corporate">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Corporate</h1>
                </aside>

                <aside className={style.searchBar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search anything here..."
                            value={search}
                            onChange={(e) => {
                                setSearch((text) => (text = e.target.value));
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
                    RecentData?.data?.data.map((item: any, index: number) => (
                        <Link
                            key={index}
                            href={`/project/corporate/${item.id}`}
                        >
                            <a className={style.searchedItem}>
                                <ul>
                                    <li>
                                        <h4>
                                            {item.name} {item.com}
                                        </h4>
                                        <p>{item.tin}</p>
                                    </li>
                                    <li>
                                        <p>ID: {item.id}</p>
                                        <p>TIN: {item.tin}</p>
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
