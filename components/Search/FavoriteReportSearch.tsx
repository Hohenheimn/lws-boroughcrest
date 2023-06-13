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

export default function FavoriteReportSearch() {
    const [search, setSearch] = useState<string>("");

    const router = useRouter();

    const { isLoading, data } = useQuery(
        ["recent-favorite", router.query.id, search],
        () => {
            return api.get(
                `/finance/customer-facility/customer-reports/recent-favorite-reports/${router.query.id}?keywords=${search}&paginate=3`,
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
                    <Link href="/finance/reports/favorite-list-reports">
                        <a>
                            <MdArrowForwardIos className={style.arrow} />
                        </a>
                    </Link>
                    <h1>Favorite List</h1>
                </aside>

                <aside className={style.searchBar}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search"
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
                {data?.data.map((item: any, index: number) => (
                    <ItemList item={item} />
                ))}
                {isLoading && (
                    <div className="flex justify-center py-5">
                        <BeatLoader
                            color={"#8f384d"}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
const ItemList = ({ item }: any) => {
    console.log(item);
    return (
        <Link href={`/admin/property/${item?.id}`}>
            <a className={style.searchedItem}>
                <ul>
                    <li>
                        <p>ID: {item?.id}</p>
                        <p>{item?.report_name}</p>
                    </li>
                </ul>
            </a>
        </Link>
    );
};
