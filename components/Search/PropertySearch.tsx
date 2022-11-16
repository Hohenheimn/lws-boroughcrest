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

export default function PropertySearch() {
    const [search, setSearch] = useState<string>("");
    let dataSearch;
    const router = useRouter();

    const {
        isLoading,
        data: RecentData,
        isError,
    } = useQuery(["recent-customer", router.query.id, search], () => {
        return api.get(
            `/admin/property/unit/recent-search/${router.query.id}&keywords=${search}&paginate=3`,
            {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            }
        );
    });

    if (!isLoading) {
        dataSearch = RecentData?.data;
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <aside className={style.title}>
                    <Link href="/admin/property">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Property Unit</h1>
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
                    dataSearch?.map((item: any, index: number) => (
                        <Link key={index} href={`/admin/property/${item.id}`}>
                            <a className={style.searchedItem}>
                                <ul>
                                    <li>
                                        <h4>{item.unit_code}</h4>
                                        <p>{item.class}</p>
                                    </li>
                                    <li>
                                        <p>ID: {item.id}</p>
                                        <p>{item.type}</p>
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
