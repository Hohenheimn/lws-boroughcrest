import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import style from "../../styles/SearchSidebar.module.scss";
import api from "../../util/api";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";

export default function CorporateSearch() {
    const [search, setSearch] = useState<string>("");
    let dataSearch;

    let { isLoading, data, isError } = useQuery(
        ["search-corporate", search],
        () => {
            return api.get(`/project/corporate?keywords=${search}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            keepPreviousData: true,
        }
    );

    let {
        isLoading: RecentLoading,
        data: RecentData,
        isError: RecentError,
    } = useQuery("recent-corporate", () => {
        return api.get("/project/corporate/recent-search/3", {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });

    if (!RecentLoading) {
        if (search === "") {
            dataSearch = RecentData?.data;
        } else {
            dataSearch = data?.data;
        }
    }

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

            {isLoading || isError ? (
                <div>
                    {isLoading || (RecentLoading && <span>Loading...</span>)}
                    {isError ||
                        (RecentError && <span>Can't find the result...</span>)}
                </div>
            ) : (
                dataSearch?.map((item: any, index: number) => (
                    <Link key={index} href={`/project/corporate/${item.id}`}>
                        <a className={style.searchedItem}>
                            <ul>
                                <li>
                                    <h4>{item.name}</h4>
                                    <p>{item.address_municipal_city}</p>
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
    );
}
